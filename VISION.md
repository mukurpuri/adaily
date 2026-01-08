# Adaily: The AI Trading Companion
## *"Cursor for Traders"*

**Created**: 6 Jan 2026  
**Status**: Vision Document  
**Confidential**: Yes

---

## The Big Idea

Instead of building "another algo trading platform" (crowded market), we position Adaily as:

> **An AI-powered daily companion for traders** - where algo trading is just one feature among many that make your trading day better.

Think of it like:
- **Cursor** = VS Code + AI (marketed as AI coding, not just an IDE)
- **Notion** = Docs + Database (marketed as all-in-one workspace)
- **Adaily** = Trading + AI (marketed as your daily trading partner)

---

## Positioning Difference

| Traditional Algo Platform | Adaily |
|--------------------------|--------|
| "Execute your strategies" | "Your AI trading partner for the day" |
| Feature-heavy, complex | Simple, opinionated, smart |
| You build everything | AI suggests, you approve |
| Cold, technical | Feels like a co-pilot |
| Compete with Tradetron | Create new category |

---

## Core Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              ADAILY                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Morning   │  │    News     │  │    Trade    │  │     Tax     │   │
│  │  Briefing   │  │   Digest    │  │   Journal   │  │   Helper    │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Earnings   │  │   Voice     │  │  Learning   │  │  Community  │   │
│  │  Calendar   │  │  Updates    │  │    Path     │  │   Signals   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│                    🧠 JARVIS ENGINE (Hidden)                           │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Regime    │  │  Strategy   │  │    Risk     │  │     ML      │   │
│  │ Detection   │  │  Selector   │  │   Guards    │  │   Learning  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Feature Set

### 🌅 Morning Briefing (Daily @ 8:30 AM)

AI-generated summary delivered via WhatsApp/Email/App:

```
☀️ Good morning, Mukur!

📊 MARKET OUTLOOK
• Nifty futures: +0.8% (Gap up expected)
• Market regime: TRENDING
• My confidence today: 72%

📰 KEY NEWS
• HDFC Bank Q3 results today (expect volatility)
• RBI policy unchanged (neutral)
• US markets closed flat

🎯 MY PICKS TODAY
1. RELIANCE - ORB breakout setup (Long)
2. ITC - Strong at support (Watch)
3. ICICIBANK - Avoid (Choppy)

💰 YOUR STATUS
• Capital: ₹1,20,000
• Yesterday: +₹450 (2 trades)
• This week: +₹1,200

[Start Trading] [Just Watch] [Take Day Off]
```

### 📰 News Digest

- Curated news for YOUR watchlist only
- AI filters noise, shows what moves prices
- "Why this matters" for each story
- Saves 30 min of morning research

### 📓 Auto Trade Journal

Instead of manually writing:
```
❌ "Bought RELIANCE at 2450, sold at 2480, made 30 points because..."
```

Adaily writes it for you:
```
✅ Trade #47 | RELIANCE | +₹3,000

What happened:
• ORB breakout triggered at 9:22 AM
• Entry: ₹2,450 | Exit: ₹2,480 (target hit)
• Hold time: 47 minutes
• R-multiple: 1.5R

Market context:
• Regime was TRENDING (ADX: 28)
• Stock was above VWAP all day
• Gap up of 0.6% from previous close

What I learned:
• ORB works well in trending markets
• RELIANCE respects VWAP as support
```

### 🗓️ Earnings Calendar

- Auto-tracks all stocks in your watchlist
- Notifies 1 day before earnings
- Shows historical earnings reactions
- Suggests: "Avoid trading" or "Expect volatility"

### 📊 Tax Helper

- Auto-generates P&L statement
- Calculates STCG/LTCG automatically
- Broker-wise breakdown
- Export for CA in one click
- Saves ₹5,000+ in CA fees

### 🎓 Learning Path

Personalized education based on YOUR trades:

```
Based on your last 50 trades, I noticed:

❌ You lose money on Fridays (win rate: 30%)
   → Lesson: "Why Fridays are dangerous"

❌ You overtrade after a loss
   → Lesson: "Revenge trading psychology"

✅ You're great at ORB on banks
   → Advanced: "ORB variations for banking stocks"
```

### 🎤 Voice Updates

"Hey Adaily, how's my position?"

```
"Your RELIANCE long is up ₹1,200. 
 Target is ₹300 away. 
 I'd recommend holding.
 Want me to trail the stop loss?"
```

### 🤖 Auto-Trading (The JARVIS Engine)

The algo trading happens quietly in the background:
- User sets risk tolerance once
- AI picks strategies based on regime
- Executes with guards (trend, cooldown, etc.)
- User can override anytime

---

## Product Tiers

### 🆓 Adaily Free
| Feature | Included |
|---------|----------|
| Morning briefing | ✅ |
| News digest | ✅ (3/day) |
| Watchlist | 5 stocks |
| Paper trading | ✅ |
| Basic journal | ✅ |
| Tax helper | ❌ |
| Auto-trading | ❌ |

### 💎 Adaily Pro — ₹999/month
| Feature | Included |
|---------|----------|
| Everything in Free | ✅ |
| Unlimited watchlist | ✅ |
| AI trade suggestions | ✅ |
| Auto-execution (paper) | ✅ |
| Full journal | ✅ |
| Tax reports | ✅ |
| Voice assistant | ✅ |
| Learning path | ✅ |

### 🚀 Adaily Trader — ₹2,499/month
| Feature | Included |
|---------|----------|
| Everything in Pro | ✅ |
| **Live auto-trading** | ✅ |
| Priority signals | ✅ |
| Advanced analytics | ✅ |
| API access | ✅ |
| 1-on-1 onboarding | ✅ |
| WhatsApp support | ✅ |

---

## Revenue Model

### Primary Revenue
```
1000 Pro users × ₹999/mo = ₹9.99L/month
500 Trader users × ₹2499/mo = ₹12.5L/month
                              ─────────────
                              ₹22.5L/month
                              ₹2.7Cr/year
```

### Secondary Revenue
```
Broker referrals: ₹300-500 per account + lifetime brokerage share
Data/API licensing: Enterprise deals
White-label: For RIAs and advisors
```

---

## Competitive Positioning

### Not Competing With:
| Player | Why Not Competing |
|--------|-------------------|
| Tradetron | They're "build your algo" — we're "AI does it" |
| Streak | They're Zerodha-only — we're broker-agnostic |
| Groww/Zerodha | They're brokers — we sit ON TOP of brokers |
| Moneycontrol | They're news — we're action |

### Unique Advantages:
1. **AI-Native**: Not "added AI" but "AI is the product"
2. **Daily Habit**: Morning briefing creates stickiness
3. **Personalized**: Learns from YOUR trades
4. **Simple**: 10 magical features, not 100 complex ones
5. **Mobile-First**: Most traders check phone 50x/day

---

## Go-To-Market Strategy

### Phase 1: Build Audience (Month 1-3)
```
Product: Free Morning Briefing
Channel: WhatsApp + Twitter + YouTube
Goal: 10,000 subscribers
Cost: ₹0 (organic content)
```

### Phase 2: Prove Value (Month 4-6)
```
Product: Adaily Free (full app)
Channel: Convert briefing subscribers
Goal: 5,000 app users, 500 Pro trials
Revenue: ~₹2-3L/month
```

### Phase 3: Monetize (Month 7-12)
```
Product: Pro + Trader tiers
Channel: In-app conversion
Goal: 1,000 paying users
Revenue: ~₹15-20L/month
```

### Phase 4: Scale (Year 2)
```
Product: API, White-label, Enterprise
Channel: Partnerships, ads
Goal: 10,000 paying users
Revenue: ₹1-2Cr/month
```

---

## Branding

### Name: Adaily
- **Meaning**: "A Daily" — your daily companion
- **Sound**: Modern, tech-y, memorable
- **Domain**: adaily.in / adaily.io / getadaily.com

### Taglines (Options)
1. "Your AI Trading Day"
2. "Cursor for Traders"
3. "Trade Smarter, Not Harder"
4. "Your Daily Edge"
5. "AI-Powered Trading Companion"

### Visual Identity
- **Primary Color**: Deep teal (trust, finance)
- **Accent**: Cyan/emerald (growth, AI)
- **Font**: Modern sans-serif (Inter, SF Pro)
- **Logo**: Stylized "A" with subtle chart line

---

## Technical Stack

### What We Already Have (JARVIS)
- [x] NestJS backend with phase-based engine
- [x] React frontend (HUD)
- [x] Upstox API integration
- [x] ORB + VWAP strategies
- [x] Regime detection
- [x] Risk guards
- [x] ML data logging
- [x] SSE real-time streaming

### What We Need to Add
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration (Twilio/Gupshup)
- [ ] Voice assistant (Whisper + TTS)
- [ ] News aggregation (RSS + AI summary)
- [ ] Tax calculation engine
- [ ] Journal AI writer (GPT)
- [ ] Multi-broker support

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| SEBI regulation | Stay compliant, paper trading first |
| Broker dependencies | Multi-broker from start |
| AI accuracy | Clear disclaimers, human override |
| Competition copies | Move fast, build community |
| Server costs | Start lean, scale with revenue |

---

## Success Metrics

### Year 1 Goals
| Metric | Target |
|--------|--------|
| App downloads | 50,000 |
| Daily active users | 5,000 |
| Paying subscribers | 1,000 |
| Monthly revenue | ₹15L |
| NPS score | 50+ |

### North Star Metric
> **"Daily briefing open rate"**
> 
> If users open their briefing every day, everything else follows.

---

## The Vision

> **"Adaily becomes the first thing every trader checks in the morning, and the last thing they check before market close. Not because we nag them, but because we make their day better."**

The algo trading (JARVIS) is the powerful engine under the hood.
The daily AI companion (Adaily) is the beautiful car everyone wants to drive.

---

## Next Steps

1. **Finish JARVIS v0.3** — Trailing stops, fix ML logging
2. **Build Morning Briefing** — MVP for WhatsApp delivery
3. **Get 100 beta users** — Friends, Twitter, trading forums
4. **Validate stickiness** — Do they open it daily?
5. **Build full app** — If validation positive

---

*Document Version: 1.0*  
*Last Updated: 6 Jan 2026*  
*Author: Mukur + Claude*

