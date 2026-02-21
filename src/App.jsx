
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

// Eager imports required for Static Site Generation (prerendering)
// Standard lazy loading causes empty content during SSR renderToString
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import Booking from '@/pages/Booking';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Privacy from '@/pages/Privacy';

// Layout Component for standard pages
const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-grow contain-layout">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Analytics />
      <Routes>
        {/* Main Application Routes wrapped in Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
