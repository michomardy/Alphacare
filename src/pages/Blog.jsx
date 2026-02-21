import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import PaginationControls from "@/components/PaginationControls";

const Blog = () => {
  const [searchParams] = useSearchParams();
  const blogListRef = useRef(null);

  /* =========================
     PAGINATION
  ========================= */
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const ITEMS_PER_PAGE = 9;

  const sortedPosts = [...blogPosts].reverse();
  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const isPaginated = currentPage > 1;
  const canonicalUrl = "https://alphacarephysio.com.au/blog";

  /* =========================
     UX
  ========================= */
  useEffect(() => {
    if (currentPage > 1 && blogListRef.current) {
      blogListRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const pageTitle =
    currentPage > 1
      ? `Physiotherapy Blog | AlphaCare Physiotherapy Marion`
      : `Physiotherapy Blog | AlphaCare Physiotherapy Marion`;

  const pageDescription =
    "Read expert articles on physiotherapy, pain relief, injury recovery, and wellness from your local Marion physiotherapists.";

  return (
    <>
      {/* =========================
          SEO
      ========================= */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Canonical: pagination always points to /blog */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Physiotherapy Blog | AlphaCare Physiotherapy Marion" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://alphacarephysio.com.au/images/og-default.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Physiotherapy Blog | AlphaCare Physiotherapy Marion" />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://alphacarephysio.com.au/images/og-default.webp"
        />
      </Helmet>

      {/* =========================
          HERO
      ========================= */}
      <section className="bg-physio-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Health & Wellness Blog
            </h1>
            <p className="text-xl text-physio-blue-light leading-relaxed font-medium">
              Expert insights, recovery tips, and professional advice from your
              local Marion physiotherapists to help you move better and live
              pain-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================
          BLOG LIST
      ========================= */}
      <section
        ref={blogListRef}
        className="py-20 bg-physio-neutral-50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-physio-neutral-200 overflow-hidden hover:shadow-xl hover:shadow-physio-blue/10 transition-all duration-300 flex flex-col h-full hover:border-physio-blue/30"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-physio-blue focus-visible:ring-offset-2"
                    aria-label={`Read article: ${post.title}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-physio-neutral-100">
                      <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="200"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-physio-neutral-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-physio-teal" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-physio-blue" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-physio-blue-dark mb-3 line-clamp-3 leading-snug group-hover:text-physio-blue transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-physio-neutral-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-physio-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-physio-neutral-500 font-medium">
                          <User className="w-3 h-3 text-physio-blue" />
                          {post.author}
                        </div>

                        <span className="flex items-center gap-1 text-physio-blue font-semibold group-hover:text-physio-blue-dark transition-colors">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-physio-neutral-600">
                No posts found for this page.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link to="/blog">Back to Blog</Link>
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="py-20 bg-white border-t border-physio-neutral-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-physio-blue-bg/50 rounded-2xl p-8 md:p-12 text-center border border-physio-blue-light/50">
            <h2 className="text-3xl font-bold text-physio-blue-dark mb-4">
              Need Personalized Advice?
            </h2>
            <p className="text-lg text-physio-neutral-600 mb-8 max-w-2xl mx-auto">
              While our blog provides general information, nothing replaces a
              professional assessment. We serve Marion, Oaklands Park, Brighton,
              Warradale, and surrounding suburbs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-physio-blue text-white px-8 py-6 text-lg font-bold">
                <Link to="/booking">Book Online Now</Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;