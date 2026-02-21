import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { blogPosts } from "../src/data/blogPosts.js";

const ROOT = process.cwd();

const CLIENT_INDEX = path.join(ROOT, "dist", "client", "index.html");
const CLIENT_ASSETS_DIR = path.join(ROOT, "dist", "client", "assets");
const SERVER_ENTRY = path.join(ROOT, "dist", "server", "entry-server.js");

const PUBLIC_SITEMAP = path.join(ROOT, "public", "sitemap.xml");
const PUBLIC_ROBOTS = path.join(ROOT, "public", "robots.txt");
const PUBLIC_FAVICON = path.join(ROOT, "public", "favicon.svg");

const OUT_DIR = path.join(ROOT, "dist", "static");
const OUT_ASSETS_DIR = path.join(OUT_DIR, "assets");

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/booking",
  "/privacy",
];

const NOINDEX_ROUTES = new Set(["/booking", "/privacy"]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function routeToFilePath(route) {
  // "/" -> "index.html"
  // "/blog/slug" -> "blog/slug/index.html"
  if (route === "/") return "index.html";
  return path.join(route.replace(/^\//, ""), "index.html");
}

function injectNoindex(html) {
  const tag = `<meta name="robots" content="noindex, nofollow">`;
  if (html.includes(`name="robots"`) || html.includes(`name='robots'`))
    return html;
  return html.replace("</head>", `${tag}\n</head>`);
}

function injectHelmet(html, helmet) {
  if (!helmet) return html;

  const title = helmet.title ? helmet.title.toString() : "";
  const meta = helmet.meta ? helmet.meta.toString() : "";
  const link = helmet.link ? helmet.link.toString() : "";
  const script = helmet.script ? helmet.script.toString() : ""; // ✅ ADD (JSON-LD, etc.)

  // Title
  if (title) {
    if (html.match(/<title>.*<\/title>/s)) {
      html = html.replace(/<title>.*?<\/title>/s, title);
    } else {
      html = html.replace("<head>", `<head>\n${title}\n`);
    }
  }

  // Meta + links + scripts
  if (meta || link || script) {
    html = html.replace("</head>", `\n${meta}\n${link}\n${script}\n</head>`);
  }

  return html;
}

function injectAppHtml(html, appHtml) {
  // Primary pattern
  if (html.includes(`<div id="root"></div>`)) {
    return html.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );
  }

  // Fallback: if root exists but not empty stub
  const rootOpen = html.match(/<div\s+id=["']root["']\s*>/);
  if (rootOpen) {
    return html.replace(rootOpen[0], `<div id="root">${appHtml}`);
  }

  // Last resort
  return html.replace("</body>", `<div id="root">${appHtml}</div>\n</body>`);
}

(async () => {
  console.log("🚀 Starting static site generation (SSG)...");

  // Validate blog data
  if (!Array.isArray(blogPosts) || blogPosts.length === 0) {
    console.error("❌ Error: No blog posts found in src/data/blogPosts.js");
    process.exit(1);
  }
  console.log(`📘 Loaded ${blogPosts.length} blog posts from data source.`);

  // Validate build outputs exist
  if (!fs.existsSync(CLIENT_INDEX)) {
    console.error(
      `❌ Error: ${CLIENT_INDEX} not found. Run "npm run build:client" first.`
    );
    process.exit(1);
  }
  if (!fs.existsSync(SERVER_ENTRY)) {
    console.error(
      `❌ Error: ${SERVER_ENTRY} not found. Run "npm run build:server" first.`
    );
    process.exit(1);
  }

  const template = fs.readFileSync(CLIENT_INDEX, "utf-8");
  console.log("✅ Loaded client template (dist/client/index.html)");

  // Load server render()
  let render;
  try {
    const serverModule = await import(pathToFileURL(SERVER_ENTRY).href);
    render = serverModule.render;
    if (typeof render !== "function") throw new Error("render() export not found");
    console.log("✅ Loaded server entry bundle (dist/server/entry-server.js)");
  } catch (e) {
    console.error("❌ Error loading server entry bundle:", e);
    process.exit(1);
  }

  // Build route list
  const blogRoutes = blogPosts
    .filter((p) => p?.slug)
    .map((p) => `/blog/${p.slug}`);

  const routes = [...new Set([...STATIC_ROUTES, ...blogRoutes])];

  console.log(`🔍 Total routes to prerender: ${routes.length}`);

  // Ensure output dir exists
  ensureDir(OUT_DIR);

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const result = await render(route);
      const appHtml = result?.appHtml ?? result?.html ?? "";
      const helmet = result?.helmet;

      if (!appHtml || appHtml.length < 50) {
        throw new Error(`Rendered HTML empty/too short (${appHtml?.length ?? 0})`);
      }

      let html = template;
      html = injectHelmet(html, helmet);
      html = injectAppHtml(html, appHtml);

      if (NOINDEX_ROUTES.has(route)) {
        html = injectNoindex(html);
      }

      const relPath = routeToFilePath(route);
      const outFile = path.join(OUT_DIR, relPath);

      ensureDir(path.dirname(outFile));
      fs.writeFileSync(outFile, html, "utf-8");

      console.log(`✅ ${route} -> dist/static/${relPath}`);
      success++;
    } catch (e) {
      console.error(`❌ Failed: ${route}: ${e.message}`);
      failed++;
    }
  }

  // Copy assets so static HTML loads CSS/JS
  console.log("📦 Copying client assets to dist/static/assets...");
  copyRecursive(CLIENT_ASSETS_DIR, OUT_ASSETS_DIR);

  // Copy SEO files into dist/static (since Cloudflare will serve dist/static)
  console.log("🧭 Copying sitemap.xml + robots.txt to dist/static...");
  copyRecursive(PUBLIC_SITEMAP, path.join(OUT_DIR, "sitemap.xml"));
  copyRecursive(PUBLIC_ROBOTS, path.join(OUT_DIR, "robots.txt"));
  copyRecursive(PUBLIC_FAVICON, path.join(OUT_DIR, "favicon.svg"));

  console.log("------------------------------------------------");
  console.log(`🎉 SSG finished. ✅ Success: ${success} | ❌ Failed: ${failed}`);
  console.log("📁 Output: dist/static/ (serve this on Cloudflare Pages)");

  if (failed > 0) process.exit(1);
})();
