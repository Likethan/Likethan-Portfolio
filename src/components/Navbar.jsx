import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('t') || 'dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  // Sync theme to <html> tag and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('t', theme);
  }, [theme]);

  // Scroll listener to hide navbar on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavHidden(currentScrollY > lastScrollY && currentScrollY > 120);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* MOBILE NAV OVERLAY */}
      <div id="mnav" className={mobileOpen ? 'open' : ''}>
        <button id="mcl" onClick={() => setMobileOpen(false)}>✕</button>
        <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
        <a href="#skills" onClick={(e) => handleSmoothScroll(e, 'skills')}>Skills</a>
        <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')}>Experience</a>
        <a href="#fp" onClick={(e) => handleSmoothScroll(e, 'fp')}>Projects</a>
        <a href="#certifications" onClick={(e) => handleSmoothScroll(e, 'certifications')}>Certs</a>
        <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
        <a href="#" className="btn-p" style={{ marginTop: '1rem' }}>↓ Resume</a>
      </div>

      {/* NAVBAR */}
      <nav id="nav" className={navHidden ? 'hide' : ''}>
        <div className="nlogo" onClick={(e) => handleSmoothScroll(e, 'hero')}>LK.dev</div>
        <div className="nlinks">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, 'skills')}>Skills</a>
          <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')}>Experience</a>
          <a href="#fp" onClick={(e) => handleSmoothScroll(e, 'fp')}>Projects</a>
          <a href="#certifications" onClick={(e) => handleSmoothScroll(e, 'certifications')}>Certs</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
        </div>
        <div className="nacts">
          <button id="thm" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
          <a href="#" className="nres">Resume ↓</a>
          <button id="hbg" onClick={() => setMobileOpen(true)}>☰</button>
        </div>
      </nav>
    </>
  );
}
