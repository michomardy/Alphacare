import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog data
import { blogPosts } from "../src/data/blogPosts.js";

// Canonical site URL (no trailing slash)
const SITE_URL = (process.env.SITE_URL || "https://alphacarephysio.com.au")
  .replace(/\/+$/, "")
  .replace("://www.", "://");
const PUBLIC_DIR = path.resolve(__dirname, "../public");

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

/** Format date to ISO 8601 (YYYY-MM-DD) */
function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10);
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

/** Escape special characters for XML */
function escapeXml(value) {
  const s = String(value ?? "");
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

/** Normalize path (no trailing slash except "/") */
function normalizePath(p) {
  let s = String(p || "/");
  if (!s.startsWith("/")) s = "/" + s;
  if (s.length > 1) s = s.replace(/\/+$/, "");
  return s;
}

function generateSitemap() {
  console.log("Generating sitemap...");

  // Static routes configuration with requested priorities and changefreqs
  const staticRoutes = [
    { loc: "/",        priority: "1.0", changefreq: "daily" },
    { loc: "/services",priority: "0.9", changefreq: "weekly" },
    { loc: "/booking", priority: "0.9", changefreq: "weekly" },
    { loc: "/blog",    priority: "0.8", changefreq: "daily" },
    { loc: "/about",   priority: "0.7", changefreq: "yearly" },
    { loc: "/contact", priority: "0.7", changefreq: "yearly" },
  ];

  const today = formatDate(new Date());

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1) Static routes
  for (const route of staticRoutes) {
    const loc = `${SITE_URL}${normalizePath(route.loc)}`;
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2) Blog posts
  const processedSlugs = new Set();
  let blogCount = 0;

  for (const post of blogPosts || []) {
    const rawSlug = (post?.slug || "").trim();
    const title = (post?.title || "").trim();

    // Skip invalid entries
    if (!rawSlug || !title) continue;
    
    // Explicitly filter out sample/placeholder slugs to avoid SEO issues
    if (rawSlug.toLowerCase().includes("sample") || rawSlug.toLowerCase().includes("placeholder")) continue;

    // Normalize slug
    const slug = rawSlug.replace(/^\/+/, "").replace(/\/+$/, "");

    if (processedSlugs.has(slug)) continue;
    processedSlugs.add(slug);

    // Prioritize available dates: lastmod > updatedAt > date
    const lastmod = formatDate(post.lastmod || post.updatedAt || post.date);
    const url = `${SITE_URL}/blog/${slug}`;

    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
    
    blogCount++;
  }

  xml += `</urlset>\n`;

  const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");

  console.log(`✅ Sitemap generated at: ${sitemapPath}`);
  console.log(`✅ Static routes included: ${staticRoutes.length}`);
  console.log(`✅ Blog posts included: ${blogCount}`);
}

function generateRobotsTxt() {
  console.log("Generating robots.txt...");
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  const robotsPath = path.join(PUBLIC_DIR, "robots.txt");
  fs.writeFileSync(robotsPath, content, "utf8");

  console.log(`✅ robots.txt generated at: ${robotsPath}`);
}

try {
  generateSitemap();
  generateRobotsTxt();
  console.log("SEO files generation complete.");
} catch (error) {
  console.error("❌ Error generating SEO files:", error);
  process.exit(1);
}