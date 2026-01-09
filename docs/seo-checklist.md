# Adaily SEO Checklist

Guidelines for creating SEO-optimized content on Adaily.

---

## Page Structure Rules

### 1. One Page = One Intent
- Each page should answer ONE clear question
- Don't mix unrelated topics on the same page
- Example: `/invest` = "Where should I invest?" (not "How to save + invest + tax")

### 2. Heading Structure
- **H1**: Only ONE per page (the main title)
- **H2**: 2-4 sections per page
- **H3**: For subsections within H2s
- Never skip heading levels (don't go H1 → H3)

### 3. Required Sections
Every tool/content page should have:
- [ ] H1: Clear, descriptive title
- [ ] Brief intro paragraph (what this page helps with)
- [ ] 2-4 H2 content sections
- [ ] Example with ₹ amounts (Indian context)
- [ ] 5-8 FAQs at the bottom
- [ ] Links to 2+ glossary terms
- [ ] Link to 1 related tool
- [ ] Educational-only disclaimer

---

## Metadata Checklist

### Title Tag
- [ ] Under 60 characters
- [ ] Include main keyword
- [ ] Include "India" if relevant
- [ ] Format: "Page Title | Adaily"

### Meta Description
- [ ] Under 160 characters
- [ ] Include main keyword naturally
- [ ] Mention "free" or "no signup"
- [ ] Call to action or value prop

### Canonical URL
- [ ] Every page has `alternates.canonical`
- [ ] Points to exact URL (not variations)

### OpenGraph
- [ ] `og:title` matches page title
- [ ] `og:description` matches meta description
- [ ] `og:url` matches canonical

---

## Content Guidelines

### Tone
- ✅ Calm, educational, beginner-friendly
- ✅ Plain English, no jargon
- ✅ First person plural ("we suggest") or second person ("you can")
- ❌ No urgency or pressure
- ❌ No selling or recommendations

### Words to AVOID
- "best" / "top" / "recommended"
- "guaranteed" / "risk-free"
- "high returns" / "sure profit"
- "limited time" / "act now"
- "secret" / "exclusive"

### Words to INCLUDE
- "India" / "Indian" (local SEO)
- "₹" with examples (₹50,000, not 50k)
- "free" / "no signup"
- "simple" / "easy to understand"
- "educational" / "informational"

---

## Internal Linking Rules

### From Tool Pages
- Link to 2-3 related glossary terms
- Link to 1 related tool
- Use descriptive anchor text (not "click here")

### From Glossary Pages
- Link to 1-2 tools that use this concept
- Link to 3 related terms
- Example: PPF glossary → links to Investment Explorer + NPS term

### Anchor Text Examples
- ✅ "Learn what PPF means"
- ✅ "Try our Emergency Fund Planner"
- ❌ "Click here"
- ❌ "Read more"

---

## FAQ Schema

### When to Add
- Every tool page
- Every landing page
- Guide/learn pages with Q&A content

### Format
```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Question text here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Answer text here.',
      },
    },
  ],
};
```

### Rules
- 5-8 questions per page
- Questions should match real search queries
- Answers should be 1-3 sentences
- Include ₹ examples where relevant

---

## Technical Checklist

### Before Publishing
- [ ] Metadata set (title, description, canonical, OG)
- [ ] H1 is unique and descriptive
- [ ] FAQ schema added (if applicable)
- [ ] Internal links added (glossary + tools)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Page loads under 3 seconds

### Sitemap
- [ ] New pages added to `app/sitemap.ts`
- [ ] Priority set appropriately (1.0 for home, 0.8-0.9 for tools)

---

## Example Page Structure

```
Page: /tools/emergency-fund-planner

H1: Emergency Fund Planner

[Tool interface here]

H2: What is an emergency fund?
[Paragraph explaining concept]

H2: Example: Rahul in Bangalore
[₹ example with real numbers]

H2: Why 3-6 months?
[Explanation with bullet points]

H2: Where to keep it in India
[Options: savings, FD, liquid fund]

H2: Frequently Asked Questions
[5-8 FAQs with schema]

[Related tools section]
[Disclaimer]
```

---

## Quick Reference

| Element | Requirement |
|---------|-------------|
| Title | Under 60 chars |
| Description | Under 160 chars |
| H1 | 1 per page |
| H2 sections | 2-4 per page |
| FAQs | 5-8 per page |
| Internal links | 2-3 glossary + 1 tool |
| Example | Include ₹ amounts |
| Disclaimer | Always present |

---

*Last updated: January 2026*

