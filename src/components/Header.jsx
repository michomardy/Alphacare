import React, { memo, useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';

// Memoized Header to prevent unnecessary re-renders
const Header = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative text-physio-neutral-800 hover:text-physio-blue font-medium transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:bg-physio-teal after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100 text-physio-blue' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  // Helper for mobile links - not using navLinkClass to avoid 'isActive' logic duplication
  const getMobileLinkClass = (isActive) => 
    `block w-full rounded-xl px-4 py-3 font-semibold transition-colors ${
      isActive ? 'bg-physio-blue/10 text-physio-blue' : 'text-physio-neutral-900 hover:bg-physio-neutral-50'
    }`;

  return (
    <header className="bg-white shadow-sm border-b border-physio-neutral-200 sticky top-0 z-50 will-change-transform">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://res.cloudinary.com/diiacrthz/image/upload/v1771316993/logo_cipskl.webp" 
              alt="AlphaCare Physiotherapy Logo" 
              className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-105" 
            />
            
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <a
              href="tel:1300433233"
              className="flex items-center gap-2 text-physio-blue font-semibold hover:text-physio-blue-dark transition-colors duration-300"
            >
              <Phone className="h-4 w-4" /> 1300 433 233
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:inline-flex bg-physio-blue hover:bg-physio-blue-dark text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-physio-blue/20 hover:scale-105 border-0"
            >
              <Link to="/booking">Book Online</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border border-physio-neutral-200 bg-white hover:bg-physio-neutral-50 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40 cursor-default"
            aria-label="Close menu backdrop"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-2xl p-5 border-b border-physio-neutral-200 animate-accordion-down">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-physio-neutral-900">Menu</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl p-2 border border-physio-neutral-200 bg-white hover:bg-physio-neutral-50 transition-colors"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink to="/" className={({ isActive }) => getMobileLinkClass(isActive)}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => getMobileLinkClass(isActive)}>
                About
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => getMobileLinkClass(isActive)}>
                Services
              </NavLink>
              <NavLink to="/blog" className={({ isActive }) => getMobileLinkClass(isActive)}>
                Blog
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => getMobileLinkClass(isActive)}>
                Contact
              </NavLink>

              <div className="mt-3 border-t border-physio-neutral-200 pt-4 flex flex-col gap-3">
                <a
                  href="tel:1300433233"
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-physio-blue hover:bg-physio-blue/10 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call 1300 433 233
                </a>

                <Button
                  asChild
                  className="w-full bg-physio-blue hover:bg-physio-blue-dark text-white font-semibold transition-all duration-300 shadow-md border-0 py-6 text-lg"
                >
                  <Link to="/booking">Book Online</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;