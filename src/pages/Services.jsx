import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* =========================
   DATA
========================= */
const SERVICES = [
  {
    id: "recovery",
    shortTitle: "Recovery",
    title: "Recovery Sessions",
    subtitle: "Recover faster, move better, stay consistent.",
    image:
      "https://res.cloudinary.com/diiacrthz/image/upload/v1769756380/back_massage_gun_z1hncu.webp",
    intro:
      "Recovery sessions at AlphaCare Physiotherapy support your body between training, work, or everyday activities—reducing tension, improving movement quality, and helping you bounce back efficiently.",
    whoFor: [
      "People with muscle tightness or general aches",
      "Active individuals managing training load and fatigue",
      "Anyone wanting structured recovery support in Marion & Adelaide",
    ],
    helps: [
      "Mobility and movement check to identify restrictions",
      "Hands-on therapy to reduce muscle tension",
      "Guided stretching and activation exercises",
      "Education on recovery, pacing, and load management",
    ],
    expect: [
      "Less stiffness and improved mobility",
      "Better recovery between training or work demands",
      "A plan to maintain performance and movement health",
    ],
    note:
      "If ongoing soreness or fatigue is limiting your activity, structured recovery sessions can support long-term movement health.",
  },
  {
    id: "sports-injury",
    shortTitle: "Sports injury",
    title: "Sports Injury Physiotherapy",
    subtitle: "Return to sport safely and confidently.",
    image: "https://res.cloudinary.com/diiacrthz/image/upload/v1769755536/image_rcshii.jpg",
    intro:
      "Sports injury physiotherapy helps you recover from injury and return to training with confidence. We address the drivers of injury and guide progressive rehab to reduce recurrence.",
    whoFor: [
      "Athletes recovering from acute or overuse injuries",
      "Active people with pain during training or exercise",
      "Anyone seeking sports injury physio in Marion & Adelaide",
    ],
    helps: [
      "Biomechanical and movement assessment",
      "Hands-on treatment to restore mobility and reduce pain",
      "Sport-specific strength and control exercises",
      "Graduated return-to-sport planning",
    ],
    expect: [
      "Clear recovery plan and timeline",
      "Rehab tailored to your sport and goals",
      "Reduced risk of flare-ups and re-injury",
    ],
    note: "Early physio input can significantly improve recovery outcomes after sports injuries.",
  },
  {
    id: "post-surgical",
    shortTitle: "Post surgery",
    title: "Post-Surgical Rehab",
    subtitle: "Structured rehab after surgery, step by step.",
    image:
      "https://res.cloudinary.com/diiacrthz/image/upload/v1769756927/woman_training_yehz1h.webp",
    intro:
      "Post-surgical rehabilitation supports safe, staged recovery following orthopaedic surgery. We guide you through each phase to restore strength, movement, and confidence.",
    whoFor: [
      "Patients recovering from orthopaedic surgery",
      "People after joint replacement or ligament repair",
      "Anyone needing structured rehab after surgery",
    ],
    helps: [
      "Rehab aligned with your surgeon’s protocol",
      "Progressive strengthening and mobility work",
      "Hands-on therapy to restore joint movement",
      "Education to progress safely and avoid setbacks",
    ],
    expect: [
      "Clear milestones throughout recovery",
      "Progressive plan tailored to your daily needs",
      "Support returning to work, life, and sport",
    ],
    note: "Physiotherapy plays a key role in optimising outcomes after surgery.",
  },
  {
    id: "neck-back",
    shortTitle: "Neck & back",
    title: "Neck & Back Pain Treatment",
    subtitle: "Restore movement, reduce pain, prevent recurrence.",
    image:
      "https://res.cloudinary.com/diiacrthz/image/upload/v1769757100/back_palpation_vmuibd.webp",
    intro:
      "Neck and back pain physiotherapy focuses on identifying drivers of symptoms and restoring comfortable, confident movement—using evidence-based care for both acute and persistent pain.",
    whoFor: [
      "People with neck or low back pain",
      "Work-related or posture-related pain issues",
      "Anyone seeking back pain physiotherapy in Marion & Adelaide",
    ],
    helps: [
      "Comprehensive spinal assessment",
      "Hands-on therapy to improve mobility and reduce pain",
      "Targeted exercises for strength and control",
      "Education around movement strategies and self-management",
    ],
    expect: [
      "Reduced pain and improved function",
      "More confidence with daily activities",
      "Strategies to prevent recurrence and flare-ups",
    ],
    note: "Ongoing neck or back pain doesn’t need to be accepted as normal.",
  },
  {
    id: "headache-dizziness",
    shortTitle: "Headache & dizziness",
    title: "Headache & Dizziness Management",
    subtitle: "Targeted care for neck + balance-related symptoms.",
    image:
      "https://res.cloudinary.com/diiacrthz/image/upload/v1769815747/dizzy_woman_3_pzxuc1.jpg",
    intro:
      "Headache and dizziness management addresses symptoms linked to the neck, balance system, and nervous system. We assess triggers and provide targeted treatment to improve comfort and confidence.",
    whoFor: [
      "People with neck-related headaches",
      "Individuals with dizziness or balance issues",
      "Anyone affected by vestibular or cervicogenic symptoms",
    ],
    helps: [
      "Assessment of neck mobility and balance function",
      "Vestibular and balance retraining exercises",
      "Hands-on treatment for cervical contribution",
      "Education to reduce triggers and flare-ups",
    ],
    expect: [
      "Improved balance and symptom control",
      "Reduced headache frequency/intensity where appropriate",
      "More confidence in daily movement and activity",
    ],
    note:
      "Physiotherapy can play an important role in managing headache and dizziness symptoms.",
  },
  {
    id: "dry-needling",
    shortTitle: "Dry needling",
    title: "Dry Needling",
    subtitle: "Reduce muscle tension and support recovery.",
    image:
      "https://res.cloudinary.com/diiacrthz/image/upload/v1769757627/dry_needles_iskroo.webp",
    intro:
      "Dry needling is used as part of a comprehensive physiotherapy plan to help reduce muscle tension and pain. For best results, it’s combined with hands-on therapy and exercise rehab.",
    whoFor: [
      "People with muscle tightness or trigger points",
      "Those with pain linked to muscle tension and overload",
      "Patients who may benefit from adjunct physio techniques",
    ],
    helps: [
      "Dry needling integrated with manual therapy",
      "Exercise programming to restore movement and strength",
      "Education on posture, loading, and muscle control",
    ],
    expect: [
      "Reduced muscle tension and improved comfort",
      "Better movement and function",
      "A complete plan—not just a quick fix",
    ],
    note:
      "Dry needling is most effective when combined with a personalised physiotherapy plan.",
  },
];

const CONDITIONS_WE_TREAT = [
  {
    title: "Sports Injuries",
    desc: "Assessment and rehab for sprains, strains, tendon pain, and overuse injuries to help you return to sport safely.",
  },
  {
    title: "Headaches",
    desc: "Treatment for neck-related and tension headaches, improving mobility, posture, and symptom control.",
  },
  {
    title: "Post-Surgery Rehabilitation",
    desc: "Structured rehab after orthopaedic surgery to restore movement, strength, and confidence step by step.",
  },
  {
    title: "Lower Back Pain",
    desc: "Evidence-based care for acute or persistent low back pain to improve function and reduce flare-ups.",
  },
  {
    title: "Arthritis",
    desc: "Support for joint pain and stiffness with mobility, strengthening, and activity strategies.",
  },
  {
    title: "Neck Pain",
    desc: "Hands-on treatment and targeted exercises to reduce stiffness and restore comfortable movement.",
  },
  {
    title: "Total Hip/Knee Replacement",
    desc: "Rehabilitation focused on range of motion, strength, walking tolerance, and return to daily activities.",
  },
  {
    title: "ACL Reconstruction",
    desc: "Guided rehab after ACL surgery to restore stability, strength, and return-to-sport readiness.",
  },
  {
    title: "Muscle Recovery",
    desc: "Support for muscle soreness, tightness, or overload with mobility work, hands-on treatment, and progressive strengthening so you recover faster and move better.",
  },
  {
    title: "Rotator Cuff Tears",
    desc: "Non-surgical or post-op support to reduce pain and restore shoulder strength and control.",
  },
];

// Blog links by condition title
const CONDITION_ARTICLES = {
  "Sports Injuries": [
    {
      title: "Runners performance",
      desc: "Improve Performance and Reduce Injury Risk.",
      to: "/blog/strength-training-runners-physio-prevention",
    },
    {
      title: "Muscle tear recovery",
      desc: "Progression safely with strength and control.",
      to: "/blog/muscle-tear-healing-physiotherapy",
    },
    {
      title: "Injury prevention and Recovery",
      desc: "Progressive loading strategies and re-injury prevention.",
      to: "/blog/sports-injury-physiotherapy-recovery",
    },
    {
      title: "Running-Related Injuries",
      desc: "Common causes of running injuries and what typically helps.",
      to: "/blog/shin-splints-vs-stress-fracture",
    },
  ],
  "Lower Back Pain": [
    {
      title: "Mechanical vs non-mechanical back pain",
      desc: "Understanding different causes of back pain and what they mean for recovery.",
      to: "/blog/mechanical-vs-non-mechanical-back-pain",
    },
    {
      title: "Is my back pain posture-related?",
      desc: "What posture really does (and doesn’t) contribute to back pain.",
      to: "/blog/posture-problems-physiotherapy",
    },
    {
      title: "Sciatica pain?",
      desc: "What works best for nerve pain?.",
      to: "/blog/sciatica-physiotherapy-adelaide",
    },
  ],
  "Muscle Recovery": [
    {
      title: "Muscle tear recovery",
      desc: "Progression safely with strength and control.",
      to: "/blog/muscle-tear-healing-physiotherapy",
    },
    {
      title: "Post-Workout Recovery",
      desc: "How to recover faster, reduce soreness, and stay consistent.",
      to: "/blog/post-workout-recovery-physio-guide",
    },
    {
      title: "Dry needling explained",
      desc: "What it is, how it works, and when it helps.",
      to: "/blog/dry-needling-marion",
    },
  ],

  "Neck Pain": [
    {
      title: "Neck pain explained",
      desc: "Common causes of neck pain, what’s normal, and what helps recovery.",
      to: "/blog/neck-pain-explained-types-causes-physiotherapy",
    },
    {
      title: "Whiplash injury rehabilitation",
      desc: "Neck pain, headaches, and stiffness after car accidents.",
      to: "/blog/whiplash-injury-physiotherapy-treatment",
    },
    {
      title: "TMJ (jaw) and neck pain connection",
      desc: "How jaw dysfunction can contribute to neck pain and headaches.",
      to: "/blog/tmj-dysfunction-physiotherapy-treatment",
    },
  ],
  Headaches: [
    {
      title: "Vestibular physiotherapy for dizziness",
      desc: "Assessment and treatment for balance-related dizziness and vertigo.",
      to: "/blog/vestibular-rehabilitation-balance-dizziness",
    },
    {
      title: "Whiplash-associated disorders",
      desc: "Neck pain, headaches, and dizziness after car accidents.",
      to: "/blog/whiplash-injury-physiotherapy-treatment",
    },
    {
      title: "TMJ (jaw) pain and headaches",
      desc: "How jaw dysfunction contributes to headaches and neck pain.",
      to: "/blog/tmj-dysfunction-physiotherapy-treatment",
    },
  ],
  "Post-Surgery Rehabilitation": [
    {
      title: "Knee replacement rehab timeline",
      desc: "Milestones and what to expect week by week.",
      to: "/blog/total-knee-replacement-rehabilitation",
    },
    {
      title: "Evidence-based rehab",
      desc: "Why assessment, loading, and progression matter.",
      to: "/blog/evidence-based-physiotherapy-marion",
    },
    {
      title: "Dry needling explained",
      desc: "What it is, how it works, and when it helps.",
      to: "/blog/dry-needling-marion",
    },
  ],
  Arthritis: [
    {
      title: "Why does my knee hurt?",
      desc: "Common causes of knee pain including arthritis, overload, and biomechanics.",
      to: "/blog/why-does-my-knee-hurt-common-causes-knee-pain-physiotherapy",
    },
    {
      title: "Best exercises for knee arthritis",
      desc: "Safe, evidence-based strengthening and mobility exercises for knee pain.",
      to: "/blog/knee-osteoarthritis-exercises-physio",
    },
    {
      title: "Trigger finger vs arthritis",
      desc: "How to tell the difference and when to get assessed.",
      to: "/blog/trigger-finger-physiotherapy-treatment",
    },
  ],
  "Total Hip/Knee Replacement": [
    {
      title: "Total knee replacement rehabilitation",
      desc: "What to expect after surgery and how physiotherapy supports recovery.",
      to: "/blog/total-knee-replacement-rehabilitation",
    },
    {
      title: "Evidence-based physiotherapy",
      desc: "What research supports for strength, mobility, and long-term outcomes.",
      to: "/blog/evidence-based-physiotherapy-marion",
    },
  ],
  "ACL Reconstruction": [
    {
      title: "Bounce back to a pain-free, active life",
      desc: "How structured physiotherapy supports long-term recovery.",
      to: "/blog/bounce-back-pain-free-life-physical-therapy",
    },
    {
      title: "Sports injury physiotherapy recovery",
      desc: "Why progressive loading and sport-specific rehab reduce re-injury risk.",
      to: "/blog/sports-injury-physiotherapy-recovery",
    },
  ],
  "Rotator Cuff Tears": [
    {
      title: "Shoulder impingement / subacromial pain syndrome",
      desc: "Why the shoulder pinches, what to avoid, and what rehab typically helps.",
      to: "/blog/shoulder-impingement-subacromial-pain-syndrome-physiotherapy",
    },
    {
      title: "Frozen shoulder rehabilitation",
      desc: "Stages, timelines, and how physiotherapy helps restore movement safely.",
      to: "/blog/frozen-shoulder-rehab-physiotherapy",
    },
  ],
};

/* =========================
   HELPERS
========================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PrimaryLinkButton({ to, children }) {
  const isInternal = typeof to === "string" && to.startsWith("/");
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition " +
    "bg-physio-blue text-white hover:bg-physio-blue-dark";

  return isInternal ? (
    <Link className={base} to={to}>
      {children}
    </Link>
  ) : (
    <a className={base} href={to}>
      {children}
    </a>
  );
}

function OutlineLinkButton({ to, children }) {
  const isInternal = typeof to === "string" && to.startsWith("/");
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition " +
    "border border-gray-200 bg-white text-physio-blue-dark hover:bg-physio-blue-bg";

  return isInternal ? (
    <Link className={base} to={to}>
      {children}
    </Link>
  ) : (
    <a className={base} href={to}>
      {children}
    </a>
  );
}

/* =========================
   UI PIECES
========================= */
function ServiceCard({ s, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className="text-left w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-physio-blue focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition h-full flex flex-col">
        <div className="relative h-48 sm:h-56 shrink-0">
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <div className="text-lg font-bold text-white">{s.title}</div>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
            {s.subtitle}
          </div>
          <div className="text-physio-blue font-semibold text-sm mt-auto">
            Read more &rarr;
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ThumbnailCard({ s, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-physio-blue focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <img
              src={s.image}
              alt={s.title}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-physio-blue-dark truncate">
              {s.shortTitle || s.title}
            </div>
            <div className="text-xs text-gray-600 line-clamp-1">{s.subtitle}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ActiveCardHeader({ s }) {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="relative h-44 sm:h-52">
        <img
          src={s.image}
          alt={s.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{s.title}</h2>
          <p className="mt-1 text-white/90 text-sm sm:text-base">{s.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function DetailBody({ s }) {
  const whoFor = Array.isArray(s.whoFor) ? s.whoFor : [];
  const helps = Array.isArray(s.helps) ? s.helps : [];
  const expect = Array.isArray(s.expect) ? s.expect : [];

  return (
    <div className="p-4 sm:p-6">
      <p className="text-gray-700 leading-relaxed">{s.intro}</p>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-physio-blue-bg p-4">
          <h3 className="font-bold text-physio-blue-dark">Who this is for</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {whoFor.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold text-physio-blue-dark">How we help</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {helps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold text-physio-blue-dark">What to expect</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {expect.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-gray-50 border border-gray-100 p-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-semibold text-physio-blue-dark">Note: </span>
          {s.note}
        </p>

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <PrimaryLinkButton to="/booking">Book Online</PrimaryLinkButton>
          <OutlineLinkButton to="/contact">Ask a question</OutlineLinkButton>
        </div>
      </div>
    </div>
  );
}

function ConditionsWeTreatSection() {
  const [openTitle, setOpenTitle] = useState(null);

  const toggle = (title) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  return (
    <section className="mt-12" aria-labelledby="conditions-title">
      <div className="rounded-3xl border border-gray-100 bg-white shadow-xl p-5 sm:p-7">
        <header className="max-w-3xl">
          <h2
            id="conditions-title"
            className="text-3xl sm:text-4xl font-extrabold text-physio-blue-dark"
          >
            Conditions We Treat
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            We treat a wide range of injuries and conditions with hands-on care and personalised rehabilitation.
          </p>
        </header>

        <motion.div layout className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONDITIONS_WE_TREAT.map((c) => {
            const isOpen = openTitle === c.title;
            const articles = (CONDITION_ARTICLES && CONDITION_ARTICLES[c.title]) || [];

            return (
              <motion.div
                key={c.title}
                layout
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="w-full"
              >
                <motion.button
                  type="button"
                  onClick={() => toggle(c.title)}
                  whileTap={{ scale: 0.99 }}
                  className="text-left w-full"
                >
                  <div
                    className={cn(
                      "rounded-2xl border bg-white p-5 shadow-sm transition",
                      "hover:shadow-md",
                      isOpen ? "border-physio-blue/30" : "border-gray-100"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-physio-blue-dark">{c.title}</h3>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                          {c.desc}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "mt-1 shrink-0 rounded-full border px-2 py-1 text-xs font-semibold",
                          isOpen
                            ? "border-physio-blue/30 text-physio-blue-dark bg-physio-blue-bg"
                            : "border-gray-200 text-gray-500 bg-white"
                        )}
                      >
                        {isOpen ? "Hide" : "View"}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="expand"
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 rounded-2xl bg-physio-blue-bg border border-gray-100 p-4">
                            {articles.length > 0 ? (
                              <>
                                <h4 className="text-sm font-extrabold text-physio-blue-dark">
                                  Related articles
                                </h4>

                                <ul className="mt-3 space-y-3">
                                  {articles.map((a) => (
                                    <li key={a.to}>
                                      <Link
                                        to={a.to}
                                        className="text-sm font-semibold text-physio-blue hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {a.title}
                                      </Link>
                                      <p className="mt-1 text-xs text-gray-600">{a.desc}</p>
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                  <span onClick={(e) => e.stopPropagation()}>
                                    <OutlineLinkButton to="/blog">View all articles</OutlineLinkButton>
                                  </span>
                                  <span onClick={(e) => e.stopPropagation()}>
                                    <PrimaryLinkButton to="/booking">Book Online</PrimaryLinkButton>
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <h4 className="text-sm font-extrabold text-physio-blue-dark">
                                  Articles coming soon
                                </h4>
                                <p className="mt-2 text-xs text-gray-600">
                                  We’re adding helpful resources for this condition shortly.
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                  <span onClick={(e) => e.stopPropagation()}>
                                    <PrimaryLinkButton to="/booking">Book Online</PrimaryLinkButton>
                                  </span>
                                  <span onClick={(e) => e.stopPropagation()}>
                                    <OutlineLinkButton to="/contact">Ask a question</OutlineLinkButton>
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="mt-3 text-xs text-gray-500">
                      Tip: click the card to {isOpen ? "collapse" : "expand"}.
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <PrimaryLinkButton to="/booking">Book Online</PrimaryLinkButton>
          <OutlineLinkButton to="/contact">Ask a question</OutlineLinkButton>
        </div>
      </div>
    </section>
  );
}

/* =========================
   MAIN PAGE COMPONENT
========================= */
export default function Services() {
  const location = useLocation();

  // Default: show the 6 cards (no selection)
  const [activeId, setActiveId] = useState(null);
  const topRef = useRef(null);

  // Find active service
  const activeService = useMemo(() => {
    if (!activeId) return null;
    return SERVICES.find((s) => s.id === activeId) || null;
  }, [activeId]);

  const thumbnails = useMemo(() => {
    if (!activeService) return [];
    return SERVICES.filter((s) => s.id !== activeService.id);
  }, [activeService]);

  // ✅ If arriving with /services#id → open that service + scroll
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const exists = SERVICES.some((s) => s.id === id);
    if (!exists) return;

    setActiveId(id);

    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(t);
  }, [location.hash]);

  const openService = (id) => {
    setActiveId(id);

    // ✅ Update URL hash (shareable deep link)
    if (window?.history?.replaceState) {
      window.history.replaceState(null, "", `/services#${id}`);
    }

    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const viewAll = () => {
    setActiveId(null);

    // ✅ Clear hash
    if (window?.history?.replaceState) {
      window.history.replaceState(null, "", `/services`);
    }

    window.requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          Physiotherapy Services in Marion & Mitchell Park | AlphaCare Physio
        </title>

        <meta
          name="description"
          content="Explore physiotherapy services at AlphaCare Physiotherapy in Marion & Mitchell Park. Sports injury rehab, recovery sessions, dry needling, post-surgical rehabilitation, and evidence-based physio care."
        />

        <link rel="canonical" href="https://alphacarephysio.com.au/services" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Physiotherapy Services | AlphaCare Physiotherapy Marion"
        />
        <meta
          property="og:description"
          content="Sports injury rehabilitation, recovery sessions, dry needling, and post-surgical physio care in Marion & Mitchell Park."
        />
        <meta
          property="og:url"
          content="https://alphacarephysio.com.au/services"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://alphacarephysio.com.au/images/services-hero.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Physiotherapy Services | AlphaCare Physio"
        />
        <meta
          name="twitter:description"
          content="Evidence-based physiotherapy services in Marion & Mitchell Park."
        />
      </Helmet>

      <div className="min-h-screen bg-white pb-20 pt-10">
        <div className="container mx-auto px-4">
          <div ref={topRef} className="mb-12 max-w-3xl">
            <h1 className="text-4xl font-extrabold text-physio-blue-dark sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Personalised care to help you move better, feel better, and stay active.
            </p>
          </div>

          {/* DEFAULT VIEW: 6 SERVICE CARDS */}
          {!activeService && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <ServiceCard key={s.id} s={s} onClick={() => openService(s.id)} />
              ))}
            </div>
          )}

          {/* EXPANDED VIEW: DETAILS + 5 THUMBNAILS */}
          {activeService && (
            <div className="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* ✅ Anchor target for /services#id scrolling */}
                  <div id={activeService.id} className="scroll-mt-24" />

                  <ActiveCardHeader s={activeService} />
                  <DetailBody s={activeService} />
                </motion.div>
              </AnimatePresence>

              {/* Bottom thumbnails row (ONLY the other 5) */}
              <div className="border-t border-gray-100 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-extrabold text-physio-blue-dark">
                    Explore other services
                  </h3>

                  <button
                    type="button"
                    onClick={viewAll}
                    className="text-xs font-semibold text-physio-blue hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="mt-4">
                  {/* Mobile: horizontal scroll */}
                  <div className="flex gap-3 overflow-x-auto pb-2 md:hidden">
                    {thumbnails.map((s) => (
                      <div key={s.id} className="min-w-[240px]">
                        <ThumbnailCard s={s} onClick={() => openService(s.id)} />
                      </div>
                    ))}
                  </div>

                  {/* Desktop: 5 columns */}
                  <div className="hidden md:grid md:grid-cols-5 gap-3">
                    {thumbnails.map((s) => (
                      <ThumbnailCard
                        key={s.id}
                        s={s}
                        onClick={() => openService(s.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONDITIONS SECTION */}
          <ConditionsWeTreatSection />
        </div>
      </div>
    </>
  );
}
