/* eslint-disable no-undef */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blogPosts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

// Define static routes that should always be generated
const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/booking',
  '/privacy'
];

(async () => {
  console.log('🚀 Starting static site generation (SSG)...');

  // 1. Validate Blog Post Data
  if (!blogPosts || !Array.isArray(blogPosts) || blogPosts.length === 0) {
    console.error('❌ Error: No blog posts found in src/data/blogPosts.js');
    process.exit(1);
  }
  console.log(`📘 Loaded ${blogPosts.length} blog posts from data source.`);

  // 2. Build Route List
  const routes = [...STATIC_ROUTES, ...blogPosts.map((post) => `/blog/${post.slug}`)];
  console.log(`🔍 Total routes to prerender: ${routes.length}`);
  console.log('📋 Route list:', routes.join(', '));

  // 3. Read index.html template from CLIENT build (FIXED PATH)
  const templatePath = toAbsolute('dist/static/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Error: dist/client/index.html not found. Run "npm run build:client" first.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');
  console.log('✅ Loaded client template (dist/client/index.html)');

  // 4. Load server entry point
  const serverEntryPath = toAbsolute('dist/server/entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    console.error('❌ Error: dist/server/entry-server.js not found. Run "npm run build:server" first.');
    process.exit(1);
  }
  
  let render;
  try {
    const serverModule = await import(serverEntryPath);
    render = serverModule.render;
    console.log('✅ Loaded server entry bundle (dist/server/entry-server.js)');
  } catch (e) {
    console.error('❌ Error loading server entry bundle:', e);
    process.exit(1);
  }

  // 5. Render each route
  let successCount = 0;
  let errorCount = 0;

  console.log('\n🔄 Specific page generation starting...\n');

  for (const url of routes) {
    try {
      console.log(`Processing: ${url}`);
      const { appHtml, helmet } = render(url);

      if (!appHtml || appHtml.length < 100) {
        throw new Error(`Rendered appHtml is empty or too short for ${url}. Length: ${appHtml?.length}`);
      }

      // Start with template
      let html = template;

      // Inject Helmet data (Title, Meta, Link tags)
      if (helmet) {
        const title = helmet.title ? helmet.title.toString() : '';
        const meta = helmet.meta ? helmet.meta.toString() : '';
        const link = helmet.link ? helmet.link.toString() : '';
        
        // Replace or inject title
        if (title) {
          if (html.includes('<title>')) {
            html = html.replace(/<title>.*?<\/title>/s, title);
          } else {
            html = html.replace('<head>', `<head>${title}`);
          }
        }
        
        // Inject meta and link tags before </head>
        if (meta || link) {
          html = html.replace('</head>', `${meta}${link}</head>`);
        }
      }

      // Inject App Content into the root div (CRITICAL FOR SEO)
      if (!html.includes('<div id="root"></div>')) {
        console.warn(`⚠️  Warning: Template doesn't contain '<div id="root"></div>', trying alternate patterns...`);
        // Fallback patterns
        html = html.replace(
          /<div id=["']root["']\s*\/?>/,
          `<div id="root">${appHtml}</div>`
        );
      } else {
        html = html.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
      }

      // Determine output path (FIXED: output to dist/static/)
      const filePath = url === '/' ? 'index.html' : `${url.substring(1)}/index.html`;
      const fullPath = toAbsolute(`dist/static/${filePath}`); // FIXED: static folder
      const dir = path.dirname(fullPath);

      // Create directory structure
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(fullPath, html);
      
      // ==========================================
      // VERIFICATION STEP
      // ==========================================
      const writtenContent = fs.readFileSync(fullPath, 'utf-8');
      
      // Verification 1: Check file size
      if (writtenContent.length < 1000) {
         console.warn(`⚠️  Warning: File size for ${url} is suspiciously small (${writtenContent.length} bytes).`);
      }

      // Verification 2: Check for populated root div
      const rootPopulated = writtenContent.includes('<div id="root">') && 
                           !writtenContent.includes('<div id="root"></div>') &&
                           writtenContent.includes('</div>'); // Has closing tag after content
      
      if (!rootPopulated) {
        console.error(`❌ CRITICAL: Root div is empty for ${url}!`);
        console.error('   HTML snippet:', writtenContent.substring(writtenContent.indexOf('<div id="root">'), writtenContent.indexOf('<div id="root">') + 200));
        throw new Error(`Root div not populated for ${url}`);
      }

      // Verification 3: Check for blog post content
      if (url.startsWith('/blog/')) {
        const slug = url.split('/blog/')[1];
        const post = blogPosts.find(p => p.slug === slug);
        
        if (post) {
          const titleFound = writtenContent.includes(post.title);
          const contentFound = writtenContent.length > 2000; // Rough check for substantial content
          
          if (!titleFound) {
             console.warn(`⚠️  Title not found as plain text (might be encoded): "${post.title}"`);
          }
          if (!contentFound) {
             console.warn(`⚠️  Content seems short for blog post: ${writtenContent.length} bytes`);
          }
        }
      }

      console.log(`   ✅ Saved: dist/static/${filePath} (${(writtenContent.length / 1024).toFixed(2)} KB)`);
      successCount++;

    } catch (e) {
      console.error(`❌ Failed to render ${url}:`, e.message);
      if (e.stack) console.error(e.stack);
      errorCount++;
    }
  }

  console.log('\n------------------------------------------------');
  console.log(`🎉 Static generation finished.`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors:  ${errorCount}`);
  console.log(`📁 Output: dist/static/ (ready for deployment)`);
  
  if (errorCount > 0) {
    console.error('⚠️ Some pages failed to generate.');
    process.exit(1);
  }
})();