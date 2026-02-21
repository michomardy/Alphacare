import React, { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, ChevronRight } from "lucide-react";

import { blogPosts } from "@/data/blogPosts";

/* =========================
   UTILS
========================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(d) {
  return d || "";
}

function estimateReadTime(html) {
  if (!html) return null;
  const text = String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return words ? `${Math.max(1, Math.round(words / 220))} min read` : null;
}

/* =========================
   FAQ SCHEMA
========================= */
function buildFaqSchema(post) {
  if (!post?.faq?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/* =========================
   SERVICE META
========================= */
const SERVICE_META = {
  recovery: {
    label: "How we approach this",
    title: "Recovery Sessions",
    subtitle:
      "A structured, evidence-based approach to support recovery and long-term movement.",
    href: "/services#recovery",
    ctaText: "Learn more",
  },
  "sports-injury": {
    label: "How we approach this",
    title: "Sports Injury Physiotherapy",
    subtitle:
      "Targeted rehab to reduce pain, restore capacity, and guide return to sport.",
    href: "/services#sports-injury",
    ctaText: "Learn more",
  },
  "post-surgical": {
    label: "How we approach this",
    title: "Post-Surgical Rehabilitation",
    subtitle:
      "Progressive, goal-based rehab to restore strength and function after surgery.",
    href: "/services#post-surgical",
    ctaText: "Learn more",
  },
  "neck-back": {
    label: "How we approach this",
    title: "Neck & Back Pain Treatment",
    subtitle:
      "Hands-on care and targeted exercise to ease pain, restore movement, and prevent recurrence.",
    href: "/services#neck-back",
    ctaText: "Learn more",
  },
};

/* =========================
   UI COMPONENTS
========================= */
function PostMeta({ author, date, readTime }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
      {author && (
        <span className="inline-flex items-center gap-2">
          <User className="h-4 w-4" />
          {author}
        </span>
      )}
      {date && (
        <span className="inline-flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(date)}
        </span>
      )}
      {readTime && (
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {readTime}
        </span>
      )}
    </div>
  );
}

function RelatedServiceCard({ relatedServiceId }) {
  const related = SERVICE_META[relatedServiceId];
  if (!related) return null;

  return (
    <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-physio-blue">
            {related.label}
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-physio-blue-dark">
            {related.title}
          </h3>
          <p className="mt-1 text-gray-600">{related.subtitle}</p>
        </div>

        <Link
          to={related.href}
          className="inline-flex items-center rounded-2xl bg-physio-blue px-4 py-2 font-bold text-white transition hover:bg-physio-blue-dark"
        >
          {related.ctaText}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function RelatedArticles({ currentSlug, relatedServiceId }) {
  const items = useMemo(() => {
    const index = blogPosts.findIndex((p) => p.slug === currentSlug);
    const olderPosts = index >= 0 ? blogPosts.slice(index + 1) : [];

    const sameService =
      relatedServiceId &&
      olderPosts.filter((p) => p.relatedServiceId === relatedServiceId);

    return (sameService?.length ? sameService : olderPosts).slice(0, 2);
  }, [currentSlug, relatedServiceId]);

  if (!items.length) return null;

  return (
    <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-physio-blue">Further reading</p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="rounded-2xl border border-gray-100 p-4 transition hover:shadow-sm"
          >
            <div className="font-extrabold text-physio-blue-dark">
              {p.title}
            </div>
            {p.excerpt && (
              <div className="mt-1 text-sm text-gray-600">{p.excerpt}</div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const onClick = (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (
        !href ||
        a.target === "_blank" ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      e.preventDefault();
      navigate(href, { replace: false });

    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [navigate]);

  if (!post) return null;

  const readTime = post.readTime || estimateReadTime(post.content);
  const faqSchema = buildFaqSchema(post);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-10">
      <Helmet>
        <title>{post.title} | AlphaCare Physiotherapy</title>
        <meta
          name="description"
          content={post.metaDescription || post.excerpt || ""}
        />
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <header className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-physio-blue-dark sm:text-4xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-3 text-lg text-gray-700">{post.excerpt}</p>
        )}

        <PostMeta author={post.author} date={post.date} readTime={readTime} />
      </header>

      <article
        ref={contentRef}
        className="prose prose-lg mt-8 max-w-none
             prose-headings:text-physio-blue-dark
             prose-a:text-physio-blue
             prose-strong:text-physio-neutral-900
             prose-li:text-physio-neutral-800
             prose-li:marker:text-physio-blue
             prose-ul:list-disc prose-ol:list-decimal
             prose-ul:pl-6 prose-ol:pl-6
             prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <RelatedServiceCard relatedServiceId={post.relatedServiceId} />
      <RelatedArticles
        currentSlug={post.slug}
        relatedServiceId={post.relatedServiceId}
      />
    </main>
  );
}