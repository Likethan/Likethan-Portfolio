import React, { useEffect } from 'react';
import Cursor from './components/Cursor.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import FeaturedProject from './components/FeaturedProject.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Services from './components/Services.jsx';
import Trust from './components/Trust.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import useReveal from './hooks/useReveal.js';

export default function App() {
  // Initialize scroll reveal observer
  useReveal();

  useEffect(() => {
    // 1. TILT CARDS GLOBAL EVENT DELEGATION
    let activeCard = null;

    const onMouseMove = (e) => {
      const card = e.target.closest('.skc, .pcard, .svc, .cc, .trc');
      if (card) {
        if (activeCard && activeCard !== card) {
          activeCard.style.transform = '';
        }
        activeCard = card;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        card.style.transform = `perspective(700px) rotateX(${(y - cy) / cy * 5}deg) rotateY(${(cx - x) / cx * 5}deg) translateY(-4px)`;
      } else {
        if (activeCard) {
          activeCard.style.transform = '';
          activeCard = null;
        }
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    // 2. COUNTER ANIMATION VIA INTERSECTION OBSERVER
    const animCount = (el, t) => {
      let c = 0;
      const s = t / 50;
      const iv = setInterval(() => {
        c += s;
        if (c >= t) {
          c = t;
          clearInterval(iv);
        }
        el.textContent = Math.round(c) + '+';
      }, 30);
    };

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const n = parseInt(el.getAttribute('data-count'), 10);
            if (n) {
              animCount(el, n);
            }
            cio.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Setup counter observers (using a short delay to ensure elements are mounted in DOM)
    const timer = setTimeout(() => {
      const counters = document.querySelectorAll('[data-count]');
      counters.forEach((el) => cio.observe(el));
    }, 100);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (activeCard) activeCard.style.transform = '';
      clearTimeout(timer);
      cio.disconnect();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Loader />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <FeaturedProject />
      <Projects />
      <Certifications />
      <Services />
      <Trust />
      <Contact />
      <Footer />
    </>
  );
}
