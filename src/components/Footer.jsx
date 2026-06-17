import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer-luxury">
      <div className="container">
        
        {/* TOP INFORMATION GRID */}
        <div className="footer-info-grid">
          {/* Column 1: Services */}
          <div className="footer-info-col">
            <h4>Services</h4>
            <p style={{ fontFamily: 'var(--font-m)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 2.0 }}>
              Cinematic Production<br />
              Motion Graphics<br />
              Web Development<br />
              UI/UX Design
            </p>
          </div>

          {/* Column 2: Experience */}
          <div className="footer-info-col">
            <h4>Experience</h4>
            <p style={{ color: '#D4D4D4', marginBottom: '0.5rem' }}>5+ Years of Experience</p>
            <a 
              href="#fp" 
              onClick={(e) => handleSmoothScroll(e, 'fp')}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              View Work
            </a>
          </div>

          {/* Column 3: Availability */}
          <div className="footer-info-col">
            <h4>Status</h4>
            <p style={{ color: '#D4D4D4' }}>Available Worldwide</p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.25rem' }}>
              Current Year: {currentYear}
            </p>
          </div>
        </div>

        {/* CENTER BRANDING CENTERPIECE */}
        <div className="footer-center-branding">
          <motion.h3 
            className="footer-giant-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            likethan
          </motion.h3>
        </div>

        {/* BOTTOM CONTACT ROW */}
        <div className="footer-bottom-row">
          <div>
            <span>© {currentYear} Likethan · Built with React</span>
          </div>
          <div>
            <a 
              href="mailto:contact@likethan.dev" 
              style={{ 
                color: '#FFFFFF', 
                fontWeight: 600, 
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
            >
              contact@likethan.dev
            </a>
          </div>
          <div>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              Privacy Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
