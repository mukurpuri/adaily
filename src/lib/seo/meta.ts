// SEO Meta Helpers for Adaily
// Standardizes metadata across all pages

export const SITE_NAME = 'Adaily';
export const SITE_URL = 'https://adaily.in';
export const SITE_DESCRIPTION = 'Free financial tools for India. No jargon, no selling, no signup.';

/**
 * Generate a standardized page title
 * Format: "Page Title | Adaily" or just "Adaily - Tagline" for homepage
 */
export function generateTitle(pageTitle: string, includeSiteName = true): string {
  if (!includeSiteName) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonical(path: string): string {
  // Remove leading slash if present, then add it back consistently
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Generate OpenGraph metadata
 */
export function generateOpenGraph(params: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}) {
  return {
    title: params.title,
    description: params.description,
    url: generateCanonical(params.path),
    siteName: SITE_NAME,
    type: params.type || 'website',
    locale: 'en_IN',
  };
}

/**
 * Generate complete metadata object for a page
 */
export function generateMetadata(params: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
}) {
  return {
    title: generateTitle(params.title),
    description: params.description,
    keywords: params.keywords,
    openGraph: generateOpenGraph({
      title: params.title,
      description: params.description,
      path: params.path,
      type: params.type,
    }),
    alternates: {
      canonical: generateCanonical(params.path),
    },
  };
}

/**
 * SEO Content Guidelines
 * - Use plain English, avoid jargon
 * - Mention India where relevant for local SEO
 * - Avoid clickbait words: "best", "top", "guaranteed", "high returns"
 * - Title: under 60 characters
 * - Description: under 160 characters
 * - Include ₹ examples for Indian context
 */
export const SEO_GUIDELINES = {
  maxTitleLength: 60,
  maxDescriptionLength: 160,
  avoidWords: ['best', 'top', 'guaranteed', 'high returns', 'risk-free', 'sure', 'secret'],
  includeWords: ['India', 'Indian', '₹', 'free', 'simple', 'educational'],
};

