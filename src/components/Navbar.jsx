import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about-premium' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'fp' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: scrolled ? 'calc(100% - 2rem)' : 'calc(100% - 4rem)',
          maxWidth: '1200px',
          background: scrolled ? 'rgba(17, 17, 17, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          borderRadius: '99px',
          padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* LOGO */}
        <div 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
          onClick={(e) => handleSmoothScroll(e, 'hero')}
        >
          <span style={{ 
            fontFamily: 'var(--font-d)', 
            fontWeight: 900, 
            fontSize: '1.4rem', 
            color: '#fff',
            letterSpacing: '-0.03em'
          }}>
            Likethan<span style={{ color: '#FF2A2A' }}>.</span>
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="nlinks" style={{ display: 'flex', gap: '2rem' }}>
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.target}`}
              onClick={(e) => handleSmoothScroll(e, item.target)}
              style={{
                color: 'rgba(255, 255, 255, 0.75)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                position: 'relative',
                padding: '0.25rem 0',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff';
                const bar = e.target.querySelector('.nav-underline');
                if (bar) bar.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.75)';
                const bar = e.target.querySelector('.nav-underline');
                if (bar) bar.style.transform = 'scaleX(0)';
              }}
            >
              {item.label}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#FF2A2A',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </a>
          ))}
        </div>

        {/* HIRE ME BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              borderRadius: '99px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.82rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#FF2A2A';
              e.target.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            className="btn-hire"
          >
            Hire Me
          </a>

          {/* HAMBURGER FOR MOBILE */}
          <button
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
            id="hbg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: '#FF2A2A',
              zIndex: 998,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {menuItems.map((item, idx) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.2 }}
                key={idx}
                href={`#${item.target}`}
                onClick={(e) => handleSmoothScroll(e, item.target)}
                style={{
                  fontFamily: 'var(--font-d)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              style={{
                marginTop: '1.5rem',
                display: 'inline-block',
                padding: '1rem 2.5rem',
                borderRadius: '99px',
                background: '#fff',
                color: '#FF2A2A',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width: 920px) {
          .nlinks, .btn-hire {
            display: none !important;
          }
          #hbg {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
