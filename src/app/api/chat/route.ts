import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sun — calm, structured, and readable finance companion for India
const systemPrompt = `You are Sun, a calm, warm, and intelligent personal finance companion for people in India.

Your job is to make money explanations feel clear, spacious, and easy to scan.

────────────────────
ABSOLUTE OUTPUT RULES (CRITICAL)
────────────────────
- NEVER write everything in one paragraph
- ALWAYS separate ideas using blank lines
- ALWAYS use clear section breaks
- ALWAYS use real bullet points on separate lines
- NEVER inline lists inside sentences
- NEVER compress multiple ideas into one line

If spacing is lost, the answer is considered WRONG.

────────────────────
FORMATTING CONTRACT (VERY IMPORTANT)
────────────────────
You MUST follow this structure exactly:

1. Short opening paragraph (1–2 lines)
2. Blank line
3. A list using bullet points, ONE point per line
4. Blank line
5. Optional sub-sections using labels like:
   "Pros:", "Cons:", "Example:"
   Each on its own line
6. Blank line
7. A calm closing paragraph with natural next thoughts

Use line breaks generously.

────────────────────
BULLET RULES
────────────────────
- Each bullet must be on its own line
- Never chain bullets in the same line
- Never use hyphens inside sentences to simulate bullets

Correct:
• This is one idea
• This is another idea

Incorrect:
This is one idea - this is another idea

────────────────────
EMPHASIS RULES
────────────────────
- Use **bold** only for headings or labels
- Do NOT bold every keyword
- Do NOT over-highlight

────────────────────
TONE
────────────────────
- Calm
- Clear
- Experienced
- Not salesy
- Not academic

────────────────────
FOLLOW-UP QUESTIONS (MANDATORY)
────────────────────
At the end of EVERY answer, add exactly 3 related questions.

Format them EXACTLY like this:

---
[Q1] What is the difference between SIP and lump sum investing?
[Q2] How do I choose my first mutual fund?
[Q3] Is ₹500 per month enough to start?

Rules:
- Be naturally related to what was just discussed
- Be specific, not generic
- Always use [Q1], [Q2], [Q3] markers

────────────────────
CROSS-THINKING
────────────────────
Before the follow-up questions, end with 1–2 calm, natural reflections users often move toward next.
Do NOT ask questions in this section.

Example style:
"Once people understand this, they usually start thinking about time horizon, liquidity, and how much stability they want in their overall plan."

────────────────────
STRICTLY AVOID
────────────────────
- One-paragraph answers
- Dense blocks of text
- Inline pros/cons
- Emoji overload (0–1 max)
- Em dashes (—), use commas instead

Remember:
Spacing is not decoration.
Spacing is meaning.`;

// In-memory session store
const sessions = new Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>();

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sid = sessionId || crypto.randomUUID();
    if (!sessions.has(sid)) {
      sessions.set(sid, []);
    }
    const sessionMessages = sessions.get(sid)!;

    sessionMessages.push({ role: 'user', content: message });

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...sessionMessages,
    ];

    if (!process.env.OPENAI_API_KEY) {
      const mockResponse = getMockResponse(message);
      sessionMessages.push({ role: 'assistant', content: mockResponse });
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = mockResponse.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(`data: ${word} \n\n`));
            await new Promise(r => setTimeout(r, 30));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    let fullResponse = '';

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            fullResponse += content;
            controller.enqueue(encoder.encode(`data: ${content}\n\n`));
          }
        }
        sessionMessages.push({ role: 'assistant', content: fullResponse });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('first salary')) {
    return `Your first salary is a meaningful milestone. The smartest thing you can do right now is build a simple system before lifestyle inflation kicks in.

Here's what works:

• Save 20% of your income before you spend anything
• Transfer it to a separate account on day one
• The remaining 80% is yours to manage between needs and wants

**Example:**
If your salary is ₹40,000, moving ₹8,000 to a separate savings account immediately means you're already ahead of most people your age.

You don't need a complex budget. Just this one habit. Once this feels natural, people usually start thinking about where to keep that money and whether it should be earning interest.

---
[Q1] How do I actually stick to saving every month?
[Q2] Where should I keep my savings, bank or somewhere else?
[Q3] What's the 50-30-20 rule I keep hearing about?`;
  }

  if (lowerMessage.includes('disappear') || lowerMessage.includes('month-end')) {
    return `This happens to most people. The reason is usually simple: money leaves before you decide where it should go.

The fix:

• On salary day, transfer a fixed amount to a separate account
• Don't touch that account
• What remains is what you have to spend

**Example:**
If you earn ₹35,000, move ₹5,000 to ₹7,000 immediately. The rest is for bills, groceries, and life.

It takes 2-3 months to adjust. After that, month-end stress mostly disappears. Once this becomes routine, people often start wondering about the right split between needs and wants.

---
[Q1] How do I decide how much to save vs spend?
[Q2] Should I use separate bank accounts for this?
[Q3] What if I have irregular income?`;
  }

  if (lowerMessage.includes('sip')) {
    return `A **SIP** (Systematic Investment Plan) is simply investing a fixed amount every month into a mutual fund. The money is auto-debited, so you don't have to think about it.

Why it works:

• You buy more units when prices are low
• You buy fewer when prices are high
• Over time, this averages out and reduces timing risk

**Example:**
₹2,000 monthly for 15 years at around 12% returns could grow to roughly ₹10 lakhs.

The key is consistency, not the amount. Most apps like Groww, Zerodha, or Kuvera let you start with as little as ₹500. Once people start a SIP, they usually begin thinking about which fund to pick and whether they can pause it later.

---
[Q1] Which mutual fund should I pick for my first SIP?
[Q2] What's the difference between SIP and lump sum investing?
[Q3] Can I stop or pause my SIP anytime?`;
  }

  if (lowerMessage.includes('emergency fund')) {
    return `An **emergency fund** is money you set aside for unexpected situations. Job loss, medical issues, urgent repairs. It's not for vacations or sales.

How much to aim for:

• 3 to 6 months of your monthly expenses
• Start small, even ₹10,000 is better than nothing

Where to keep it:

• A separate savings account
• Or a liquid mutual fund
• Not in stocks or locked FDs

**Example:**
If you spend ₹25,000 per month, aim for ₹75,000 to ₹1,50,000 over time.

Once people build this safety net, they usually start thinking about what actually counts as an emergency and whether the money should earn some interest.

---
[Q1] How do I build an emergency fund if I'm already tight on money?
[Q2] What counts as a real emergency?
[Q3] Should I invest my emergency fund or keep it in savings?`;
  }

  if (lowerMessage.includes('invest') && lowerMessage.includes('500')) {
    return `Yes, ₹500 is enough to start. Many mutual funds accept SIPs starting at ₹100 or ₹500.

What matters more than the amount:

• Starting early
• Being consistent
• Letting time do the work

**Example:**
₹500 monthly for 20 years at 12% average returns could grow to around ₹5 lakhs.

Someone who invests ₹500 consistently will likely do better than someone who waits to have "enough" and never starts. Once people begin, they usually start thinking about which fund to choose and how the whole process actually works.

---
[Q1] What's the best mutual fund for beginners?
[Q2] How do I actually open an investment account?
[Q3] Is ₹500 per month really worth it in the long run?`;
  }

  return `The basics of managing money are simpler than most people make them sound.

The core ideas:

• Spend less than you earn
• Save 10-20% before you spend on anything else
• Build an emergency fund before investing
• When you invest, start small and stay consistent

**Example:**
If you earn ₹30,000, saving ₹5,000 monthly gives you ₹60,000 in a year. That's real progress.

Don't compare yourself to others. Everyone's starting point is different. Once people get the basics down, they usually start thinking about the difference between saving and investing, and whether to pay off loans first.

---
[Q1] How do I actually start saving if I'm living paycheck to paycheck?
[Q2] What's the difference between saving and investing?
[Q3] Should I pay off loans first or start saving?`;
}
