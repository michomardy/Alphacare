import React, { useEffect } from 'react';
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

/**
 * Analytics is handled via Google Tag Manager (GTM) in index.html.
 * This file is intentionally a no-op for GA to prevent double-tracking.
 * We keep optional dev-only web-vitals logging.
 */
const Analytics = () => {
  // Performance Monitoring: Core Web Vitals (dev only)
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      onCLS(console.log);
      onFID(console.log);
      onLCP(console.log);
      onFCP(console.log);
      onTTFB(console.log);
    }
  }, []);

  return null;
};

export default Analytics;