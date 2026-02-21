import React, { useRef, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

const Booking = () => {
  const iframeRef = useRef(null);
  const iframeSrc = 'https://physiotohome.au4.cliniko.com/bookings?business_id=1827967436272445060&embedded=true';
  const iframeId = 'cliniko-14300845';

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://physiotohome.au4.cliniko.com') {
        return;
      }

      if (!iframeRef.current || iframeRef.current.id !== iframeId) {
        return;
      }

      const data = event.data;

      if (data.height) {
        iframeRef.current.style.height = `${data.height + 50}px`;
      }

      if (data.scrollTo) {
        const iframeTop = iframeRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: iframeTop + data.scrollTo - 100,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Booking page should NOT be indexed */}
        <meta name="robots" content="noindex, follow" />
        <link
          rel="canonical"
          href="https://alphacarephysio.com.au/booking"
        />

        <title>Book Online - Alphacare Physiotherapy</title>
        <meta
          name="description"
          content="Schedule your physiotherapy appointment online with Alphacare Physiotherapy. Choose a time that suits you and book instantly."
        />
      </Helmet>


      <section className="py-12 md:py-20 pb-32 bg-physio-neutral-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-physio-blue-dark mb-4">Book Your Appointment</h1>
            <p className="text-lg text-physio-neutral-600 max-w-3xl mx-auto">Use our simple and secure online booking system.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-physio-neutral-200 overflow-hidden"
          >
            <iframe
              ref={iframeRef}
              id={iframeId}
              src={iframeSrc}
              frameBorder="0"
              scrolling="auto"
              width="100%"
              className="w-full min-h-[1300px] md:min-h-[800px]"
              title="Cliniko Booking"
            ></iframe>
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <p className="text-physio-neutral-600 text-sm mb-2">Having trouble with the form?</p>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-physio-blue text-white px-6 py-3 rounded-md font-medium hover:shadow-lg hover:bg-physio-blue-dark transition-all"
            >
              Open Booking Page
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;