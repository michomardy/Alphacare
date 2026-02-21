import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Music,
  Linkedin,
  Youtube,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CLINIC = {
  phoneDisplay: '1300 433 233',
  phoneTel: 'tel:1300433233',
  email: 'admin@alphacarephysio.com.au',
  addressShort: '855 Marion Rd, Mitchell Park, SA 5043',
  hoursLine1: 'Mon - Sat: 9:00 AM - 7:00 PM',
  hoursLine2: 'Sun: Closed',
  socials: {
    facebook: 'https://www.facebook.com/61585261652940',
    instagram: 'https://instagram.com/alphacarephysiotherapy',
    tiktok: 'https://tiktok.com/@alphacarephysio1',
    linkedin: 'https://www.linkedin.com/company/alphacare-physio',
    x: 'https://x.com/Alphacare855',
    youtube: 'https://www.youtube.com/@Alphacare855',
  },
};

// Memoized Footer for performance
const Footer = memo(() => {
  return (
    <footer className="bg-physio-neutral-900 border-t border-physio-blue-dark content-visibility-auto contain-content text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div>
            <span className="text-xl font-bold text-white block mb-4">
              AlphaCare
            </span>
            <p className="text-physio-neutral-300 text-sm leading-relaxed mb-6">
              Professional physiotherapy services dedicated to keeping you moving and living your best life.
            </p>

            <div className="flex items-center gap-6">
              <a
                href={CLINIC.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-physio-blue-light hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href={CLINIC.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-physio-teal hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

              <a
                href={CLINIC.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-physio-green hover:scale-110 transition-all duration-300"
                aria-label="TikTok"
              >
                <Music size={20} />
              </a>

              <a
                href={CLINIC.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-physio-blue-light hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href={CLINIC.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>

              <a
                href={CLINIC.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-physio-neutral-300 hover:text-red-400 hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-semibold text-white block mb-4">
              Quick Links
            </span>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                Services
              </Link>
              <Link to="/blog" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                Blog
              </Link>
              <Link to="/contact" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                Contact
              </Link>
              <Link to="/privacy" className="text-physio-neutral-300 hover:text-physio-teal-light transition-colors text-sm">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <span className="text-lg font-semibold text-white block mb-4">
              Contact Info
            </span>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-physio-teal-light mt-0.5 flex-shrink-0" />
                <span className="text-physio-neutral-300 text-sm">
                  {CLINIC.addressShort}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-physio-teal-light flex-shrink-0" />
                <a
                  href={CLINIC.phoneTel}
                  className="text-physio-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {CLINIC.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} className="text-physio-teal-light flex-shrink-0" />
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="text-physio-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {CLINIC.email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours + CTA */}
          <div>
            <span className="text-lg font-semibold text-white block mb-4">
              Opening Hours
            </span>

            <div className="flex items-start gap-2 mb-6">
              <Clock size={18} className="text-physio-teal-light mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-white">{CLINIC.hoursLine1}</p>
                <p className="text-white">{CLINIC.hoursLine2}</p>
              </div>
            </div>

            <Button
              asChild
              className="bg-physio-teal hover:bg-physio-teal-dark text-white w-full transition-all duration-300 hover:shadow-lg hover:shadow-physio-teal/30 border-0"
            >
              <Link to="/booking">Book Online</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-physio-blue-dark/50 pt-6">
          <p className="text-center text-physio-neutral-400 text-sm">
            © {new Date().getFullYear()} Alphacare Physiotherapy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;