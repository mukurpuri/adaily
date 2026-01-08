# Adaily Tool Page Template

Use this template when creating new tool pages to maintain consistency.

---

## 🎯 Tool Hero Section

```
[ICON] [BADGE TEXT]

# [Tool Name]

[One-line description of what this tool helps with]

⚠️ Educational tool only. Not financial advice.
```

**Example:**
```
🛡️ Financial Safety Net

# Emergency Fund Planner

Calculate how much emergency fund you need based on your expenses and situation.

⚠️ Educational tool only. Not financial advice.
```

---

## 📋 How It Works (3 Steps)

Always show 3 simple steps:

| Step | Title | Description |
|------|-------|-------------|
| 1 | Enter your details | [What inputs the user provides] |
| 2 | See your options | [What the tool calculates/shows] |
| 3 | Understand why | [How the tool explains the reasoning] |

**Template:**
```
### How it works

1. **Enter your details** — Tell us about [specific inputs]
2. **See your options** — We'll show you [what they get]
3. **Understand why** — Each result includes [explanation type]
```

---

## 📝 Input Fields Format

For each input, include:
- **Label** (clear, simple)
- **Help text** (one line, explains why we ask)
- **Format hint** (₹, years, etc.)

**Template:**
```
**[Input Label]** [optional/required]
Help: [One line explaining why this matters]
Example: [A realistic example value]
```

**Example:**
```
**Monthly Expenses** (required)
Help: Include rent, bills, groceries, and EMIs — your essential spending.
Example: ₹50,000
```

---

## 📊 Result Section Format

Results should always include:

1. **Primary number/recommendation** (big, clear)
2. **Supporting details** (secondary info)
3. **Why this fits you** (explanation)
4. **What to do next** (educational, no pressure)

**Template:**
```
### Your Result

**[Main Metric]**: [Value]
[Supporting context in 1 line]

---

**Why this fits you:**
- [Reason 1 based on their input]
- [Reason 2 based on their input]
- [Reason 3 based on their input]

---

**Next steps (optional):**
- [Educational action 1]
- [Educational action 2]
```

---

## 💡 "Why This Fits You" Block

Always tie recommendations back to user inputs:

**Template:**
```
### Why this fits you

Based on what you told us:

✓ [Input they gave] → [How it affected the result]
✓ [Input they gave] → [How it affected the result]
✓ [Input they gave] → [How it affected the result]

This is a general suggestion, not a personalized recommendation.
```

**Example:**
```
### Why this fits you

Based on what you told us:

✓ Your job is stable → 3-4 months is typically sufficient
✓ You have dependents → Added 1-2 months for family security
✓ You have ₹1L saved → You're 40% of the way there

This is a general suggestion, not a personalized recommendation.
```

---

## 🚶 Next Steps Section

Always educational, never pushy:

**Template:**
```
### What you could do next

These are learning steps, not instructions:

1. **[Action]** — [Why it helps]
2. **[Action]** — [Why it helps]
3. **[Action]** — [Why it helps]

Take your time. There's no rush.
```

**Example:**
```
### What you could do next

These are learning steps, not instructions:

1. **Track your expenses for a month** — Know your real spending
2. **Set up auto-transfer** — Move savings before you spend
3. **Read about liquid funds** — Understand where to park money

Take your time. There's no rush.
```

---

## ❓ FAQ Section (6 Questions)

Standard FAQ format:

```
### Frequently Asked Questions

**Q: [Common question about the tool]?**
A: [Simple, direct answer in 2-3 sentences]

**Q: [Question about methodology]?**
A: [Explain how calculations work simply]

**Q: [Question about accuracy]?**
A: [Honest answer about limitations]

**Q: [Question about what to do with results]?**
A: [Educational guidance, no pressure]

**Q: [Question about data/privacy]?**
A: [Reassure about no data collection]

**Q: [Question comparing to other tools]?**
A: [Explain Adaily's approach]
```

---

## 📱 Responsive Considerations

- Mobile: Stack form and results vertically
- Tablet: Side-by-side layout
- Desktop: Two-column with sticky results

---

## ✅ Pre-Launch Checklist

Before publishing a new tool:

- [ ] Hero section complete with icon and badge
- [ ] All inputs have help text
- [ ] Results include "Why this fits you"
- [ ] Disclaimer visible on page
- [ ] FAQs added (minimum 6)
- [ ] Meta title and description set
- [ ] Mobile layout tested
- [ ] Empty state designed
- [ ] Error states handled
- [ ] Added to /tools page
- [ ] Added to sitemap.ts

