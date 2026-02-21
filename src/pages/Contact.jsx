import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Loader2, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // ✅ Single source of truth for map links
  const CLINIC = {
    name: 'AlphaCare Physiotherapy',
    addressShort: '855 Marion Rd, Mitchell Park SA 5043',
    addressFull: '855 Marion Rd, Mitchell Park SA 5043, Australia',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=855+Marion+Rd,+Mitchell+Park+SA+5043',
    mapsUrl: 'https://www.google.com/maps?cid=0x52d239295dd1655',
    embedUrl:
      'https://www.google.com/maps?q=855+Marion+Rd,+Mitchell+Park+SA+5043&z=17&output=embed'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }
      ]);

      if (dbError) {
        throw new Error('Failed to save to database: ' + dbError.message);
      }

      const { error: fnError } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (fnError) {
        toast({
          title: 'Message Saved',
          description:
            'We received your details, but the email notification system had a hiccup. We check our database daily!',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Message Sent Successfully!',
          description: "We've received your inquiry and will get back to you shortly.",
          variant: 'default'
        });
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error Sending Message',
        description: error.message || 'Something went wrong. Please try again or call us directly.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-physio-blue" />,
      title: 'Address',
      content: CLINIC.addressFull,
      link: CLINIC.mapsUrl
    },
    {
      icon: <Phone className="w-6 h-6 text-physio-teal" />,
      title: 'Phone',
      content: '1300 433 233',
      link: 'tel:1300433233'
    },
    {
      icon: <Mail className="w-6 h-6 text-physio-blue-dark" />,
      title: 'Email',
      content: 'admin@alphacarephysio.com.au',
      link: 'mailto:admin@alphacarephysio.com.au'
    },
    {
      icon: <Clock className="w-6 h-6 text-physio-green" />,
      title: 'Opening Hours',
      content: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed',
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Alphacare Physiotherapy | Book Your Appointment</title>
        <meta
          name="description"
          content="Get in touch with Alphacare Physiotherapy. Visit our clinic, call us, or fill out our contact form to book your appointment today."
        />
        {/* Optional but helpful for sharing */}
        <link rel="canonical" href="https://alphacarephysio.com.au/contact" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-physio-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-xl text-physio-blue-light leading-relaxed font-medium">
              We&apos;re here to help you on your journey to better health. Get in touch today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-physio-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-physio-neutral-200 hover:border-physio-blue/30 hover:shadow-lg hover:shadow-physio-blue/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-physio-blue-bg rounded-full border border-physio-blue-light">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-physio-blue-dark mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-physio-neutral-600 hover:text-physio-blue transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-physio-neutral-600">{info.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-physio-neutral-200 p-8"
            >
              <h2 className="text-3xl font-bold text-physio-blue-dark mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-physio-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-physio-neutral-50 border border-physio-neutral-300 text-physio-neutral-900 rounded-lg focus:ring-2 focus:ring-physio-blue focus:border-transparent outline-none transition-all disabled:opacity-50 placeholder:text-physio-neutral-400"
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-physio-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-physio-neutral-50 border border-physio-neutral-300 text-physio-neutral-900 rounded-lg focus:ring-2 focus:ring-physio-blue focus:border-transparent outline-none transition-all disabled:opacity-50 placeholder:text-physio-neutral-400"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-physio-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-physio-neutral-50 border border-physio-neutral-300 text-physio-neutral-900 rounded-lg focus:ring-2 focus:ring-physio-blue focus:border-transparent outline-none transition-all disabled:opacity-50 placeholder:text-physio-neutral-400"
                    placeholder="04xx xxx xxx"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-physio-neutral-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-physio-neutral-50 border border-physio-neutral-300 text-physio-neutral-900 rounded-lg focus:ring-2 focus:ring-physio-blue focus:border-transparent outline-none transition-all disabled:opacity-50 placeholder:text-physio-neutral-400"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-physio-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-physio-neutral-50 border border-physio-neutral-300 text-physio-neutral-900 rounded-lg focus:ring-2 focus:ring-physio-blue focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 placeholder:text-physio-neutral-400"
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-physio-blue text-white hover:bg-physio-blue-dark py-6 text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>

                <p className="mt-3 text-xs text-physio-neutral-600 leading-relaxed">
                  By submitting this form, you agree to be contacted by AlphaCare Physiotherapy and you accept our{' '}
                  <a
                    href="https://drive.google.com/file/d/1FLAKXtoTfly96sO_J5kdyZLN4Tfzpq2a/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-physio-blue hover:text-physio-blue-dark underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-physio-neutral-200 overflow-hidden"
            >
              {/* ✅ MOBILE: Directions CTA (no iframe) */}
              <div className="md:hidden p-6">
                <h3 className="text-xl font-bold text-physio-neutral-900">Get Directions</h3>
                <p className="mt-2 text-sm text-physio-neutral-600 leading-relaxed">
                  {CLINIC.name}
                  <br />
                  <span className="font-semibold text-physio-neutral-800">{CLINIC.addressShort}</span>
                </p>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={CLINIC.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get directions to AlphaCare Physiotherapy"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-physio-blue text-white px-5 py-3 font-semibold shadow-md hover:bg-physio-blue-dark transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </a>

                  <a
                    href={CLINIC.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open AlphaCare Physiotherapy in Google Maps"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-physio-neutral-200 bg-white px-5 py-3 font-semibold text-physio-blue hover:bg-physio-neutral-50 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* ✅ DESKTOP/TABLET: Embedded map */}
              <div className="hidden md:block h-full min-h-[400px] lg:min-h-[600px]">
                <iframe
                  title="AlphaCare Physiotherapy Location Map"
                  src={CLINIC.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Desktop footer link */}
              <div className="hidden md:block p-4 border-t border-physio-neutral-200 bg-white">
                <a
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-physio-blue hover:text-physio-blue-dark font-semibold text-sm underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-physio-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-physio-blue-dark mb-6">Before you book</h2>
          <p className="text-physio-neutral-700 mb-6">
            You may find these pages helpful before getting in touch:
          </p>

          <ul className="space-y-3">
            <li>
              <a href="/about" className="text-physio-blue underline hover:no-underline">
                Learn more about AlphaCare Physio
              </a>
            </li>

            <li>
              <a href="/services" className="text-physio-blue underline hover:no-underline">
                View our physiotherapy services
              </a>
            </li>

            <li>
              <a href="/blog/bulk-billing-physiotherapy-marion" className="text-physio-blue underline hover:no-underline">
                Physiotherapist in Marion
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-physio-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prefer to Book Online?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-physio-blue-light">
              Schedule your appointment at a time that suits you with our convenient online booking system.
            </p>
            <Button
              asChild
              className="bg-white text-physio-blue-dark hover:bg-physio-neutral-100 px-8 py-6 text-lg transition-all duration-300 shadow-xl hover:scale-105 font-bold"
            >
              <Link to="/booking">Book Your Appointment</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;