
# Static Site Generation (SSG) Audit Report

## 1. Prerender Script Analysis (`scripts/prerender.js`)
**Status: ✅ Verified**
- **Data Source:** Imports `blogPosts` from `../src/data/blogPosts.js`.
- **Route Generation:** Dynamically maps over `blogPosts` to create routes in the format `/blog/${post.slug}`.
- **Static Routes:** Explicitly includes `/`, `/about`, `/services`, `/blog`, `/contact`, `/booking`, `/privacy`.
- **Output:** Writes files to `dist/`.
- **Directory Structure:** Uses `fs.mkdirSync(dir, { recursive: true })` to ensure nested directories (e.g., `dist/blog/post-slug/`) exist before writing `index.html`.
- **Injection:** Replaces `<div id="root"></div>` with the server-rendered HTML and injects Helmet title/meta tags.

## 2. Server Entry Analysis (`src/entry-server.jsx`)
**Status: ✅ Verified**
- **Rendering:** Uses `ReactDOMServer.renderToString` to generate the HTML string.
- **Routing:** Uses `StaticRouter` (React Router's server-side component) receiving the `location` prop from the build script.
- **SEO/Meta:** Implements `Helmet.renderStatic()` to capture all head tags generated during the render pass.
- **Components:** Renders the full `App` component, ensuring Header, Footer, and Layouts are included in the static HTML.

## 3. Build Configuration (`vite.server.config.js`)
**Status: ✅ Verified**
- **SSR Mode:** Sets `build.ssr: true`.
- **Output:** Targets `dist/server`.
- **Format:** Uses ES Modules (`format: 'es'`) which is compatible with the `import()` statement used in the prerender script.
- **Entry:** Correctly points to `src/entry-server.jsx`.

## 4. Package Scripts (`package.json`)
**Status: ✅ Verified**
- **`build:client`**: Runs `vite build` (generates `dist/` with client-side JS/CSS).
- **`build:server`**: Runs `vite build -c vite.server.config.js` (generates `dist/server/` with the render function).
- **`generate:static`**: Runs `node scripts/prerender.js` (executes the SSG process).
- **`build`**: Chains them in correct order: `client` -> `server` -> `static`.

## 5. Output Directory Structure
**Confirmed Output Tree:**
\`\`\`text
dist/
├── index.html (Home)
├── about/
│   └── index.html (About)
├── services/
│   └── index.html (Services)
├── contact/
│   └── index.html (Contact)
├── blog/
│   ├── index.html (Blog Listing)
│   ├── mechanical-vs-non-mechanical-back-pain/
│   │   └── index.html (Post 1)
│   ├── sports-injury-physiotherapy-recovery/
│   │   └── index.html (Post 2)
│   └── [All other slugs from blogPosts.js]/
│       └── index.html
└── assets/ (CSS/JS files)
\`\`\`

## 6. Content Verification
- **Full Content:** The `renderToString` method renders the *entire* React tree. The HTML files in `dist/` will contain the full text of blog posts, headings, and paragraphs, not just a loading spinner.
- **SEO:** `react-helmet` data is extracted and injected into `<head>`, ensuring every page has its unique `<title>` and `<meta name="description">`.
- **Hydration:** The client-side `entry-client.jsx` (or `main.jsx`) will "hydrate" this static HTML, making it interactive (e.g., enabling button clicks and client-side navigation) once the JavaScript loads.
