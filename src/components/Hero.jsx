import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" style={{ background: 'var(--bg)', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="hgrid" style={{ zIndex: 1 }}></div>
      <div className="horb ho1" style={{ zIndex: 1 }}></div>
      <div className="horb ho2" style={{ zIndex: 1 }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="hinner" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* LEFT CONTENT */}
          <div className="hleft">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hbadge"
            >
              <span className="hbdot"></span>LIKETHAN PORTFOLIO
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hname"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.05 }}
            >
              Hi, I'm a<br />
              <span className="text-stroke-outline">Full Stack</span><br />
              <span style={{ color: '#FF2A2A' }}>Developer</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hdesc"
              style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', margin: '1.5rem 0 2.5rem 0', maxWidth: '540px', lineHeight: 1.6 }}
            >
              Building next-generation web applications, elegant user interfaces, and scalable backend platforms. Let's design and deploy your digital experiences together.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hbuttons"
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
            >
              <a 
                href="#services-process" 
                onClick={(e) => handleSmoothScroll(e, 'services-process')}
                className="btn-p"
                style={{
                  background: '#FF2A2A',
                  color: '#fff',
                  padding: '1rem 2rem',
                  borderRadius: '99px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(255, 42, 42, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                View Process
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="btn-s"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  padding: '1rem 2rem',
                  borderRadius: '99px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: PREMIUM PORTRAIT */}
          <div className="hright" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, rotate: '1deg' }}
              style={{
                position: 'relative',
                width: '340px',
                height: '420px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#111111',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                cursor: 'pointer'
              }}
            >
              <img
                src="/profile_upright.png"
                alt="Likethan Developer Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bouncing Scroll indicator */}
      <div className="hscroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ marginTop: '0.5rem', color: '#FF2A2A', cursor: 'pointer' }}
          onClick={(e) => handleSmoothScroll(e, 'about-premium')}
        >
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
