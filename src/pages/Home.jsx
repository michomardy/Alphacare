import React from "react";
import { Helmet } from "react-helmet";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  Award,
  Users,
  Clock,
  Activity,
  Dumbbell,
  Zap,
  ShieldCheck,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Constants hoisted outside component so they
   never trigger unnecessary re-renders / memo
   dependency confusion.
───────────────────────────────────────────── */
const HERO_IMG =
  "https://res.cloudinary.com/diiacrthz/image/upload/v1771565861/close-up-physiotherapist-helping-patient_bmyjl8.webp";

/* Single source of truth for FAQ content.
   Drives BOTH the rendered <details> elements
   AND the JSON-LD schema — they can never drift. */
const FAQ_ITEMS = [
  {
    question: "Do I need a referral?",
    answer:
      "No referral is needed for physiotherapy — you can book directly. If you're using a GP Care Plan, NDIS, DVA, WorkCover, or CTP, relevant paperwork may be required."
  },
  {
    question: "Do you treat sports injuries?",
    answer:
      "Yes. We treat sports injuries such as sprains, strains, tendon pain, and muscle tears — and guide you safely back to training and sport."
  },
  {
    question: "Where are you located?",
    answer:
      "We're located at 855 Marion Road, Mitchell Park SA 5043, convenient for Mitchell Park, Marion, Oaklands Park, Ascot Park and surrounding suburbs."
  },
  {
    question: "How do I book?",
    answer:
      "You can book online through our booking page, or call us on 1300 433 233. If you're not sure which appointment type to choose, give us a call and we'll help."
  },
  {
    question: "How many recovery sessions will I need?",
    answer:
      "Recovery time varies depending on your condition, goals, and history. After your first assessment, your physiotherapist will outline an expected number of sessions and adjust the plan as you progress."
  }
];

/* Schema objects defined outside component:
   - No stale closure risk
   - No useMemo needed
   - clinicSchema no longer has HERO_IMG as
     a dependency (it was a constant anyway) */
const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://alphacarephysio.com.au/#clinic",
  name: "AlphaCare Physiotherapy",
  url: "https://alphacarephysio.com.au/",
  image: HERO_IMG,
  description:
    "Professional physiotherapy clinic in Mitchell Park & Marion SA, providing sports injury rehabilitation, back and neck pain treatment, post-operative rehabilitation, balance training, and chronic pain management.",
  telephone: "+611300433233",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "855 Marion Road",
    addressLocality: "Mitchell Park",
    addressRegion: "SA",
    postalCode: "5043",
    addressCountry: "AU"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -35.005153,
    longitude: 138.5582211
  },
  hasMap: "https://www.google.com/maps?cid=0x52d239295dd1655",
  medicalSpecialty: "Physiotherapy",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday"
      ],
      opens: "09:00",
      closes: "19:00"
    }
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+611300433233",
      contactType: "customer service",
      areaServed: "AU"
    }
  ],
  areaServed: [
    "Mitchell Park SA",
    "Marion SA",
    "Oaklands Park SA",
    "Ascot Park SA"
  ],
  sameAs: [
    "https://www.google.com/maps?cid=0x52d239295dd1655",
    "https://www.facebook.com/profile.php?id=61585261652940",
    "https://www.instagram.com/alphacarephysiotherapy",
    "https://www.tiktok.com/@alphacarephysio1",
    "https://www.youtube.com/@Alphacare855",
    "https://www.linkedin.com/company/110925038/"
  ]
};

/* faqSchema now derived from FAQ_ITEMS — single source of truth */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }))
};

/* Static data arrays also hoisted — no re-creation on each render */
const features = [
  {
    icon: <Award className="w-8 h-8 text-physio-blue" />,
    title: "Expert Therapists",
    description:
      "Highly qualified and experienced physiotherapists dedicated to your recovery"
  },
  {
    icon: <Users className="w-8 h-8 text-physio-teal" />,
    title: "Personalised Care",
    description:
      "Customised treatment plans tailored to your specific needs and goals"
  },
  {
    icon: <Clock className="w-8 h-8 text-physio-green" />,
    title: "Flexible Hours",
    description:
      "Open Monday to Saturday, 9am to 7pm — convenient times to fit your schedule"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-physio-blue-dark" />,
    title: "Proven Results",
    description: "Evidence-based treatments that deliver measurable outcomes"
  }
];

const localServices = [
  {
    title: "Sports Injury Rehabilitation",
    description:
      "Get back to the game safely. We treat sprains, strains, and tears common in local sports.",
    icon: <Dumbbell className="w-5 h-5 text-physio-blue" />,
    href: "/services"
  },
  {
    title: "Back and Neck Pain",
    description:
      "Effective relief for stiffness and pain caused by posture, injury, or disc issues.",
    icon: <Activity className="w-5 h-5 text-physio-teal" />,
    href: "/services"
  },
  {
    title: "Post-Operative Rehab",
    description:
      "Guided recovery after surgery to restore strength and mobility safely.",
    icon: <CheckCircle className="w-5 h-5 text-physio-green" />,
    href: "/services"
  },
  {
    title: "Balance & Falls Prevention",
    description:
      "Programs designed to improve stability and confidence for older adults.",
    icon: <ShieldCheck className="w-5 h-5 text-physio-blue-dark" />,
    href: "/services"
  },
  {
    title: "Chronic Pain Management",
    description:
      "Long-term strategies to manage and reduce persistent pain conditions.",
    icon: <Zap className="w-5 h-5 text-physio-teal-dark" />,
    href: "/services"
  }
];

/* Replaces the old "Why Choose" section */
const EXPECTATIONS = [
  {
    title: "A proper assessment (not guesswork)",
    description:
      "We’ll listen to your story and assess movement, strength and key tests to understand what’s driving your symptoms — not just where it hurts."
  },
  {
    title: "Clear explanation in plain English",
    description:
      "You’ll leave knowing what we think is happening, what helps, what to avoid short-term, and what progress should look like."
  },
  {
    title: "Treatment that matches your goals",
    description:
      "Depending on your needs, we may use hands-on treatment, guided exercise, or a combination — always chosen for your presentation and goals."
  },
  {
    title: "A simple plan + next steps",
    description:
      "Before you go, we’ll outline your plan, home exercises (if needed), and a realistic timeline — then adjust as you progress."
  }
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleBookOnline = () => navigate("/booking");

  // Reusable animation variants
  const fadeInLeft = {
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <Helmet>
        <title>
          AlphaCare Physiotherapy | Physiotherapist in Mitchell Park & Marion
        </title>
        <meta
          name="description"
          content="Physiotherapy clinic in Mitchell Park & Marion SA. Sports injuries, back & neck pain, post-op rehab and chronic pain management. Book online today."
        />
        <link rel="canonical" href="https://alphacarephysio.com.au/" />

        {/* Preload hero image for faster LCP */}
        <link rel="preload" as="image" href={HERO_IMG} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative bg-physio-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/25 z-0" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeft}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Your expert Physio in Marion
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-medium">
                Personalised physiotherapy care to relieve pain, restore
                movement, and support long-term recovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleBookOnline}
                  className="bg-white text-physio-blue-dark hover:bg-physio-neutral-100 text-lg px-8 py-6 transition-all duration-300 shadow-xl hover:scale-105 font-bold"
                >
                  Book Physiotherapy Appointment
                </Button>

                <Button
                  onClick={() => navigate("/services")}
                  variant="outline"
                  className="border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-6 transition-all duration-300"
                >
                  View Our Services
                </Button>
              </div>

              {/* Phone + location quick actions */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3 text-white/90 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Open Mon–Sat, 9am–7pm
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 855 Marion Rd, Mitchell Park
                  5043
                </span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/10 text-white border border-white/25 hover:bg-white/20"
                >
                  <a
                    href="tel:1300433233"
                    className="inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Call 1300 433 233
                  </a>
                </Button>

                {/* Updated: true directions to Google Maps */}
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/10 text-white border border-white/25 hover:bg-white/20"
                >
                  <a
                    href="https://www.google.com/maps?cid=0x52d239295dd1655"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* LCP image: intentionally no motion wrapper to avoid delaying paint */}
            <div className="relative z-10">
              <img
                className="block rounded-lg shadow-2xl shadow-physio-blue-dark/50 w-full h-auto object-cover border-4 border-white/20"
                alt="Professional physiotherapist working with patient"
                src={HERO_IMG}
                width="600"
                height="400"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL COMMUNITY ── */}
      <section className="py-16 bg-white border-b border-physio-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg shadow-physio-neutral-300 border border-physio-neutral-200"
            >
              <img
                src="https://res.cloudinary.com/diiacrthz/image/upload/v1769256593/Alphacare_1_rgbmns.webp"
                alt="AlphaCare physiotherapy clinic exterior"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-physio-blue-dark mb-6">
                Your Local Physiotherapy Clinic in Marion Road
              </h2>

              <p className="text-physio-neutral-800 mb-6 leading-relaxed">
                Located at{" "}
                <strong>855 Marion Road, Mitchell Park SA</strong>, AlphaCare
                Physiotherapy supports the local community with evidence-based
                care. Whether you're recovering from a sports injury or managing
                persistent pain, we're here to help you move better and feel
                better.
              </p>

              <p className="text-physio-neutral-800 mb-8 leading-relaxed">
                We also commonly see patients from Marion, Oaklands Park, Ascot
                Park and nearby suburbs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/blog/physiotherapist-mitchell-park"
                  className="text-physio-blue font-semibold hover:text-physio-blue-dark transition-colors flex items-center gap-2"
                >
                  Read more about our Mitchell Park services{" "}
                  <CheckCircle className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-8">
                <Link
                  to="/blog/physiotherapist-marion"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-physio-blue-dark rounded-full
                             hover:bg-physio-blue-bg hover:text-physio-blue transition-colors font-medium
                             border border-physio-neutral-200 shadow-sm"
                >
                  Physiotherapist in Marion <Users className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SUMMARY ── */}
      <section className="py-20 bg-physio-neutral-50 border-b border-physio-neutral-200">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-physio-blue-dark mb-4">
              Our Physiotherapy Services
            </h2>
            <p className="text-physio-neutral-600 max-w-2xl mx-auto">
              Comprehensive care tailored to your goals — from injury rehab to
              long-term pain management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                  duration: 0.4
                }}
                className="bg-white p-6 rounded-xl shadow-sm border border-physio-neutral-200 hover:border-physio-blue/30 hover:shadow-lg hover:shadow-physio-blue/5 transition-all will-change-transform group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-physio-blue-bg rounded-lg group-hover:text-physio-blue-dark transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-physio-neutral-900">
                    {service.title}
                  </h3>
                </div>

                <p className="text-physio-neutral-600 text-sm mb-4">
                  {service.description}
                </p>

                <Link
                  to={service.href}
                  className="text-physio-blue text-sm font-semibold hover:text-physio-blue-dark transition-colors flex items-center gap-1"
                >
                  Learn more &rarr;
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
              className="bg-physio-blue-dark p-6 rounded-xl shadow-md flex flex-col justify-center items-center text-center text-white"
            >
              <h3 className="font-bold text-xl mb-2">Need something else?</h3>
              <p className="text-white/90 text-sm mb-4">
                We offer a wide range of specialised treatments.
              </p>
              <Button
                asChild
                variant="secondary"
                className="bg-white text-physio-blue-dark hover:bg-physio-neutral-100"
              >
                <Link to="/services">View All Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="py-20 bg-white border-b border-physio-neutral-200">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-physio-blue-dark mb-4">
              What to Expect at AlphaCare Physiotherapy
            </h2>
            <p className="text-lg text-physio-neutral-600 max-w-2xl mx-auto">
              A clear plan, practical treatment, and guidance you can trust —
              from your first appointment onwards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPECTATIONS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.05
                }}
                className="bg-physio-neutral-50 rounded-xl p-7 border border-physio-neutral-200 hover:bg-white hover:shadow-lg hover:shadow-physio-blue/5 transition-all"
              >
                <h3 className="text-xl font-bold text-physio-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-physio-neutral-700 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("/booking")}
              className="bg-physio-blue text-white hover:bg-physio-blue-dark px-8 py-6 text-lg shadow-md"
            >
              Book Your First Appointment
            </Button>

            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              Questions? Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-physio-neutral-50 border-b border-physio-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-physio-blue-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-physio-neutral-600">
                Quick answers to common questions about physiotherapy at
                AlphaCare.
              </p>
            </motion.div>

            <div className="space-y-4">
              {FAQ_ITEMS.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-xl border border-physio-neutral-200 bg-white p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold text-physio-neutral-900 flex items-center justify-between">
                    {question}
                    <span
                      aria-hidden="true"
                      className="text-physio-blue group-open:rotate-45 transition-transform"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-physio-neutral-700 leading-relaxed">
                    {answer}
                  </p>

                  {question === "How do I book?" && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => navigate("/booking")}
                        className="bg-physio-blue text-white hover:bg-physio-blue-dark"
                      >
                        Book Online
                      </Button>
                      <Button
                        onClick={() => navigate("/contact")}
                        variant="outline"
                      >
                        Contact Us
                      </Button>
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-physio-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Book your appointment today and take the first step towards a
              pain-free, active lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleBookOnline}
                className="bg-white text-physio-blue-dark hover:bg-physio-neutral-100 px-8 py-6 text-lg transition-all duration-300 shadow-xl hover:scale-105 font-bold"
              >
                Book Your Appointment
              </Button>
              <Button
                asChild
                variant="secondary"
                className="bg-white/10 text-white border border-white/25 hover:bg-white/20 px-8 py-6 text-lg"
              >
                <a
                  href="tel:1300433233"
                  className="inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Call 1300 433 233
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;