import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async'; // ✅ FIXED: Use async version
import App from './App';

export function render(url) {
  console.log(`[SSR] Rendering URL: ${url}`);
  
  // ✅ FIXED: Create helmet context for this specific render
  const helmetContext = {};
  
  // 1. Render the App to a string using StaticRouter for the specific URL
  // StaticRouter is essential for server-side rendering as it doesn't depend on the browser history API
  // ✅ FIXED: Wrap in HelmetProvider to capture head data
  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  
  // 2. Extract the helmet data from context (NOT from global Helmet.renderStatic)
  // ✅ FIXED: Get helmet from context object
  const { helmet } = helmetContext;
  
  // Basic validation that something rendered
  if (!appHtml || appHtml.length < 50) {
    console.warn(`[SSR] Warning: Rendered HTML for ${url} seems suspiciously short (length: ${appHtml?.length}).`);
  } else {
    console.log(`[SSR] Successfully rendered ${appHtml.length} chars for ${url}`);
  }

  // ✅ ADDED: Validate helmet data exists
  if (!helmet) {
    console.warn(`[SSR] Warning: No helmet data for ${url}. Check if App uses <Helmet> components.`);
  } else {
    console.log(`[SSR] Helmet title: ${helmet.title?.toString() || 'None'}`);
  }

  return { appHtml, helmet };
}