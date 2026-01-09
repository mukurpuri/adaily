/**
 * Google Analytics 4 Event Tracking
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive analytics for understanding user behavior across Adaily.
 * 
 * Events tracked:
 * - Page views (automatic)
 * - Tool interactions (form inputs, calculations, results)
 * - CTA clicks
 * - Navigation
 * - Scroll depth
 * - Time on page
 * - Form completions
 * - Feature usage
 */

// GA4 Measurement ID - Replace with your actual ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Check if GA is available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// ─────────────────────────────────────────────────────────────────────────────
// Core GA Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track page views (called automatically by Next.js router)
 */
export const pageview = (url: string) => {
  if (!isGAAvailable()) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Track custom events
 */
export const event = (action: string, params?: Record<string, unknown>) => {
  if (!isGAAvailable()) return;
  window.gtag('event', action, params);
};

// ─────────────────────────────────────────────────────────────────────────────
// Tool-Specific Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track when a user starts using a tool
 */
export const trackToolStart = (toolName: string) => {
  event('tool_start', {
    tool_name: toolName,
    event_category: 'tools',
  });
};

/**
 * Track when a user completes a calculation
 */
export const trackCalculation = (toolName: string, inputs: Record<string, unknown>) => {
  event('calculation_complete', {
    tool_name: toolName,
    event_category: 'tools',
    ...inputs,
  });
};

/**
 * Track tool result views
 */
export const trackResultView = (toolName: string, resultSummary?: string) => {
  event('result_view', {
    tool_name: toolName,
    event_category: 'tools',
    result_summary: resultSummary,
  });
};

/**
 * Track form field interactions
 */
export const trackFormField = (toolName: string, fieldName: string, value?: string | number) => {
  event('form_field_change', {
    tool_name: toolName,
    field_name: fieldName,
    event_category: 'form_interaction',
    // Don't send actual values for privacy, just that field was used
    field_filled: value !== undefined && value !== '',
  });
};

/**
 * Track preset/example button clicks
 */
export const trackPresetClick = (toolName: string, presetName: string) => {
  event('preset_click', {
    tool_name: toolName,
    preset_name: presetName,
    event_category: 'tools',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Navigation & CTA Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string, destination?: string) => {
  event('cta_click', {
    cta_name: ctaName,
    location: location,
    destination: destination,
    event_category: 'engagement',
  });
};

/**
 * Track navigation clicks
 */
export const trackNavClick = (linkName: string, destination: string) => {
  event('navigation_click', {
    link_name: linkName,
    destination: destination,
    event_category: 'navigation',
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  event('external_link_click', {
    url: url,
    link_text: linkText,
    event_category: 'outbound',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Content & Learning Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track guide/article views
 */
export const trackContentView = (contentType: string, contentTitle: string) => {
  event('content_view', {
    content_type: contentType,
    content_title: contentTitle,
    event_category: 'content',
  });
};

/**
 * Track collapsible section expansions
 */
export const trackSectionExpand = (sectionName: string, pageName: string) => {
  event('section_expand', {
    section_name: sectionName,
    page_name: pageName,
    event_category: 'engagement',
  });
};

/**
 * Track glossary term views
 */
export const trackGlossaryTerm = (term: string) => {
  event('glossary_view', {
    term: term,
    event_category: 'learning',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Engagement Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number, pageName: string) => {
  event('scroll_depth', {
    depth_percent: depth,
    page_name: pageName,
    event_category: 'engagement',
  });
};

/**
 * Track time spent on page/tool
 */
export const trackTimeSpent = (pageName: string, seconds: number) => {
  event('time_spent', {
    page_name: pageName,
    time_seconds: seconds,
    event_category: 'engagement',
  });
};

/**
 * Track share actions
 */
export const trackShare = (toolName: string, method: 'copy' | 'native') => {
  event('share', {
    tool_name: toolName,
    method: method,
    event_category: 'engagement',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Homepage Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track homepage tool preview interactions
 */
export const trackHomepagePreview = (toolName: string, action: 'input' | 'submit') => {
  event('homepage_preview', {
    tool_name: toolName,
    action: action,
    event_category: 'homepage',
  });
};

/**
 * Track homepage section views (for understanding what users see)
 */
export const trackHomepageSection = (sectionName: string) => {
  event('homepage_section_view', {
    section_name: sectionName,
    event_category: 'homepage',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Error & Edge Case Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track form validation errors
 */
export const trackFormError = (toolName: string, errorType: string) => {
  event('form_error', {
    tool_name: toolName,
    error_type: errorType,
    event_category: 'errors',
  });
};

/**
 * Track empty state views (when no results)
 */
export const trackEmptyState = (toolName: string) => {
  event('empty_state_view', {
    tool_name: toolName,
    event_category: 'tools',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// User Behavior Insights
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track user preferences (like beginner mode toggle)
 */
export const trackPreference = (preferenceName: string, value: boolean | string) => {
  event('preference_change', {
    preference_name: preferenceName,
    preference_value: String(value),
    event_category: 'preferences',
  });
};

/**
 * Track modal/detail views
 */
export const trackModalView = (modalName: string, context?: string) => {
  event('modal_view', {
    modal_name: modalName,
    context: context,
    event_category: 'engagement',
  });
};

/**
 * Track "Why this fits" or explanation views
 */
export const trackExplanationView = (toolName: string, itemName: string) => {
  event('explanation_view', {
    tool_name: toolName,
    item_name: itemName,
    event_category: 'learning',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Type declarations for window.gtag
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

