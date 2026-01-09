# Adaily - Your Finance Dashboard

> A simple, free, educational tool that helps people understand investment options - not act on them.

**Domain**: [adaily.in](https://adaily.in)

## Philosophy

> "I help you think. You decide."

No trading, no execution, no advice liability. Just clear thinking tools.

## Features

### Investment Landscape Explorer
- 15+ investment buckets (PPF, FD, ELSS, Index Funds, REITs, NPS, etc.)
- Smart scoring engine that ranks by your risk/timeline/goals
- Tax info, platforms, "how to start" guides
- Gamification (milestones, confetti 🎉)
- Mobile-responsive, beautiful UI

### Coming Soon
- Wealth Scenarios (compound interest projections)
- Mental Models Library
- Personal Journal
- Learning Paths

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## SEO

This project is SEO-optimized with:
- Server-side rendering (SSR)
- Meta tags for Open Graph and Twitter
- Sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- PWA manifest
- FAQ schema (JSON-LD) on tool pages
- Canonical URLs on all pages

### SEO Verification Checklist

Before deploying, verify:

1. **Sitemap loads correctly**
   ```
   curl https://adaily.in/sitemap.xml
   ```
   Should return XML with all page URLs.

2. **Robots.txt loads correctly**
   ```
   curl https://adaily.in/robots.txt
   ```
   Should show `Allow: /` and sitemap URL.

3. **Metadata renders in view-source**
   - Open any page in browser
   - View source (Ctrl+U)
   - Check for `<title>`, `<meta name="description">`, `<link rel="canonical">`

4. **FAQ schema validation**
   - Go to [Schema Markup Validator](https://validator.schema.org/)
   - Test `/invest` and `/tools/emergency-fund-planner`
   - Should detect `FAQPage` schema with questions

5. **Lighthouse performance baseline**
   - Run Lighthouse in Chrome DevTools
   - Target scores:
     - Performance: 90+
     - SEO: 95+
     - Accessibility: 90+
     - Best Practices: 90+

### SEO Content Guidelines

See `docs/seo-checklist.md` for detailed content creation rules.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/adaily)

Or manually:

```bash
npm run build
vercel --prod
```

## Disclaimer

This tool is for **educational purposes only**. Please consult a SEBI-registered advisor before making investment decisions.

---

Made with 🧡 by Adaily

