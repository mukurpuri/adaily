'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  trackScrollDepth,
  trackTimeSpent,
  trackToolStart,
  trackCalculation,
  trackResultView,
  trackFormField,
  trackPresetClick,
  trackCTAClick,
  trackSectionExpand,
  trackHomepagePreview,
} from '@/lib/analytics';

/**
 * Hook to track scroll depth on a page
 */
export function useScrollTracking(pageName: string) {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone, pageName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
}

/**
 * Hook to track time spent on a page
 */
export function useTimeTracking(pageName: string) {
  const startTime = useRef<number>(Date.now());
  const trackedTimes = useRef<Set<number>>(new Set());

  useEffect(() => {
    startTime.current = Date.now();
    trackedTimes.current = new Set();

    const interval = setInterval(() => {
      const secondsSpent = Math.round((Date.now() - startTime.current) / 1000);
      
      // Track at 30s, 60s, 120s, 300s
      const milestones = [30, 60, 120, 300];
      milestones.forEach((milestone) => {
        if (secondsSpent >= milestone && !trackedTimes.current.has(milestone)) {
          trackedTimes.current.add(milestone);
          trackTimeSpent(pageName, milestone);
        }
      });
    }, 5000); // Check every 5 seconds

    // Track on page leave
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const secondsSpent = Math.round((Date.now() - startTime.current) / 1000);
        trackTimeSpent(pageName, secondsSpent);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Track final time on unmount
      const secondsSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (secondsSpent > 5) {
        trackTimeSpent(pageName, secondsSpent);
      }
    };
  }, [pageName]);
}

/**
 * Combined hook for tool pages
 */
export function useToolAnalytics(toolName: string) {
  const hasTrackedStart = useRef(false);

  // Track tool start on mount
  useEffect(() => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackToolStart(toolName);
    }
  }, [toolName]);

  // Track scroll and time
  useScrollTracking(toolName);
  useTimeTracking(toolName);

  // Return tracking functions for the tool
  return {
    trackCalculation: useCallback(
      (inputs: Record<string, unknown>) => trackCalculation(toolName, inputs),
      [toolName]
    ),
    trackResultView: useCallback(
      (summary?: string) => trackResultView(toolName, summary),
      [toolName]
    ),
    trackFormField: useCallback(
      (fieldName: string, value?: string | number) => trackFormField(toolName, fieldName, value),
      [toolName]
    ),
    trackPresetClick: useCallback(
      (presetName: string) => trackPresetClick(toolName, presetName),
      [toolName]
    ),
    trackSectionExpand: useCallback(
      (sectionName: string) => trackSectionExpand(sectionName, toolName),
      [toolName]
    ),
  };
}

/**
 * Hook for homepage analytics
 */
export function useHomepageAnalytics() {
  useScrollTracking('homepage');
  useTimeTracking('homepage');

  return {
    trackPreviewInput: useCallback(
      (toolName: string) => trackHomepagePreview(toolName, 'input'),
      []
    ),
    trackPreviewSubmit: useCallback(
      (toolName: string) => trackHomepagePreview(toolName, 'submit'),
      []
    ),
    trackCTA: useCallback(
      (ctaName: string, destination?: string) => trackCTAClick(ctaName, 'homepage', destination),
      []
    ),
  };
}

/**
 * Hook for content pages (guides, glossary, etc.)
 */
export function useContentAnalytics(contentType: string, contentTitle: string) {
  useScrollTracking(contentTitle);
  useTimeTracking(contentTitle);

  useEffect(() => {
    // Content view is tracked via pageview, but we can add specific content tracking
    import('@/lib/analytics').then(({ trackContentView }) => {
      trackContentView(contentType, contentTitle);
    });
  }, [contentType, contentTitle]);

  return {
    trackSectionExpand: useCallback(
      (sectionName: string) => trackSectionExpand(sectionName, contentTitle),
      [contentTitle]
    ),
  };
}

