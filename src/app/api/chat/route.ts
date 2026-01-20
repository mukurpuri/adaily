import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sun - warm, India-first finance companion
const systemPrompt = `You are Sun, a warm and grounded personal finance companion designed for people in India.

Your personality:
- Warm, patient, and genuinely caring
- You speak with clarity and gentle encouragement
- You use simple, clear language - no financial jargon
- You're supportive and never judgmental
- You acknowledge that money can be emotional

Your approach:
- Help people think clearly about money decisions
- Encourage mindful saving and spending habits
- Ask thoughtful questions to understand their situation
- Celebrate progress, no matter how small
- Ground advice in Indian context (₹, Indian banks, local practices)

Important boundaries:
- You are NOT a registered financial advisor
- You don't give specific investment recommendations
- You don't know the user's actual balances or transactions
- For complex matters, you suggest consulting a professional
- Default currency is INR (₹)

Keep responses concise (2-4 sentences) unless more detail is needed.
For first messages, greet warmly and invite them to share what's on their mind.`;

// In-memory session store (will reset on server restart)
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

    // Get or create session
    const sid = sessionId || crypto.randomUUID();
    if (!sessions.has(sid)) {
      sessions.set(sid, []);
    }
    const sessionMessages = sessions.get(sid)!;

    // Add user message
    sessionMessages.push({ role: 'user', content: message });

    // Build messages for OpenAI
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...sessionMessages,
    ];

    // Check if we have an API key
    if (!process.env.OPENAI_API_KEY) {
      // Mock response for development
      const mockResponse = getMockResponse(message, sessionMessages.length);
      sessionMessages.push({ role: 'assistant', content: mockResponse });
      
      return new Response(
        mockResponse.split(' ').map(word => `data: ${word} \n\n`).join('') + 'data: [DONE]\n\n',
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    }

    // Stream from OpenAI
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    });

    // Create a readable stream
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
        // Store assistant response
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

function getMockResponse(message: string, messageCount: number): string {
  const lowerMessage = message.toLowerCase();

  if (messageCount <= 1) {
    return "Hey there! ☀️ I'm Sun, your personal finance companion. I'm here to help you think through money matters with clarity and calm. What's on your mind today?";
  }

  if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
    return "Saving is a beautiful practice of caring for your future self. Even ₹100 set aside regularly builds a powerful habit. What's inspiring you to save right now?";
  }

  if (lowerMessage.includes('spend') || lowerMessage.includes('spending')) {
    return "Being aware of where your money flows is the first step to peace of mind. Would you like to explore what feels challenging about your spending?";
  }

  if (lowerMessage.includes('budget')) {
    return "A budget is simply a plan that reflects your values. Many find the 50/30/20 approach helpful - 50% needs, 30% wants, 20% savings. Shall we explore what might work for you?";
  }

  if (lowerMessage.includes('invest')) {
    return "Investing is a topic close to many hearts. While I can share general concepts, specific recommendations are best discussed with a SEBI-registered advisor. What aspect of investing are you curious about?";
  }

  return "I hear you. Money decisions can feel heavy sometimes. Take a breath - we can work through this together. What would feel most helpful to focus on?";
}

