import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

/* =========================
   ABOUT PAGE – AlphaCare Physio
   Single default export
========================= */
export default function About() {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          About AlphaCare Physiotherapy | Trusted Physio in Marion & Mitchell Park
        </title>

        <meta
          name="description"
          content="Learn about AlphaCare Physiotherapy in Marion & Mitchell Park. Led by Dr Michael Ghattas (DPT), we provide evidence-based physiotherapy, sports injury rehab, dry needling, and recovery-focused care."
        />

        <link rel="canonical" href="https://alphacarephysio.com.au/about" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="About AlphaCare Physiotherapy | Your Local Marion Physio"
        />
        <meta
          property="og:description"
          content="Meet the team behind AlphaCare Physiotherapy. Local, evidence-based physio care in Marion & Mitchell Park helping you move with confidence again."
        />
        <meta
          property="og:url"
          content="https://alphacarephysio.com.au/about"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://alphacarephysio.com.au/images/about-hero.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About AlphaCare Physiotherapy" />
        <meta
          name="twitter:description"
          content="Local physiotherapy clinic in Marion & Mitchell Park led by Dr Michael Ghattas (DPT)."
        />
      </Helmet>

      <div className="w-full">
        {/* HERO */}
        <section className="bg-physio-blue-bg">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-physio-blue-dark">
                Hey, I’m Michael - your recovery physio in Mitchell Park
              </h1>

              <p className="mt-3 text-gray-700 text-lg font-semibold">
                Doctor of Physical Therapy | Sports Injury
              </p>

              {/* Local SEO line */}
              <p className="mt-2 text-sm font-medium text-gray-500">
                Mitchell Park • Marion • surrounding suburbs
              </p>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                I help people in Marion and Mitchell Park get back to doing what
                they love — whether that’s sport, work, or simply moving without
                pain. For me, physiotherapy isn’t just about treating injuries;
                it’s about helping you move with confidence again.
              </p>
            </div>
          </div>
        </section>

        {/* BACKGROUND */}
        <section className="container mx-auto px-4 py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Photo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white w-full max-w-sm">
                <div className="relative aspect-[4/5]">
                  <img
                    src="https://res.cloudinary.com/diiacrthz/image/upload/v1770034643/gemini-2.5-flash-image_regenrate_this_photo_wearing_black_shirt_under_white_healthcare_coat-0_rwkxuu.jpg"
                    alt="Michael Ghattas – Physiotherapist celebrating with Hawks"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-8 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-physio-blue-dark">
                A bit about my background
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                My career has taken me from working with elite sports teams to
                clinics across the world, shaping a practical, down-to-earth
                approach to rehabilitation.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                I’ve worked with professional athletes, including the{" "}
                <strong>Al-Qadsya</strong> team in Kuwait and the{" "}
                <strong>Hawks Netball Team</strong> in Tasmania. That experience
                helps me design rehab programs that are efficient, targeted, and
                focused on real results.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                I’ve also practiced in several countries — from{" "}
                <strong>Egypt</strong> and <strong>Kuwait</strong> to right here
                in <strong>Australia</strong> — which has given me exposure to a
                wide range of conditions and taught me how to adapt treatment to
                what works best for each individual.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Above all, I keep things simple and focused on what actually
                matters for your recovery and day-to-day life here in Adelaide.
              </p>
            </div>
          </div>
        </section>

        {/* MEET YOUR PHYSIO (PHOTO + CARD) */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 sm:w-72 overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white">
                <div className="relative aspect-[3/4]">
                  <img
                    src="https://res.cloudinary.com/diiacrthz/image/upload/v1770033546/physio_celebrating_cup_Hawks_ufyvmb.webp"
                    alt="Michael Ghattas – Physiotherapist at AlphaCare Physiotherapy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-gray-100 bg-white shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-physio-blue-dark">
                  Why I do what I do
                </h2>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  I became a physiotherapist because I genuinely enjoy
                  connecting with people and helping them feel better in their
                  bodies. There’s nothing more rewarding than seeing someone
                  regain confidence in their movement.
                </p>

                <div className="mt-6 rounded-2xl bg-physio-blue-bg border border-gray-100 p-5">
                  <h3 className="font-bold text-physio-blue-dark">
                    Outside the clinic
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    When I’m not in the clinic, you’ll usually find me spending
                    time with my 4-year-old daughter, <strong>Carla</strong>,
                    listening to music, or experimenting in the kitchen (with
                    some… very questionable results!). That everyday life
                    balance matters — and it helps me understand the demands
                    you’re juggling between recovery, work, family, and life.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-physio-blue text-white hover:bg-physio-blue-dark transition"
                  >
                    Book an appointment
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-gray-200 bg-white text-physio-blue-dark hover:bg-physio-blue-bg transition"
                  >
                    View services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT TO EXPECT */}
        <section className="container mx-auto px-4 py-12 sm:py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-physio-blue-dark">
              What to expect if we work together
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              No complicated jargon and no one-size-fits-all programs. Just
              straightforward, personalised care focused on:
            </p>

            <ul className="mt-5 space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-physio-blue shrink-0" />
                <span>Reducing pain</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-physio-blue shrink-0" />
                <span>Restoring movement</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-physio-blue shrink-0" />
                <span>Giving you the tools to stay healthy long-term</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-12">
          <div className="rounded-3xl bg-physio-blue-bg border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-physio-blue-dark">
                  If you’re ready to get started, I’d love to help.
                </h2>
                <p className="mt-2 text-gray-600">
                  Book online or get in touch — I’m happy to answer any
                  questions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-physio-blue text-white hover:bg-physio-blue-dark transition"
                >
                  Book online
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-gray-200 bg-white text-physio-blue-dark hover:bg-physio-blue-bg transition"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}