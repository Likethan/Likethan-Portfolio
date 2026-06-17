import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about-premium">
      {/* Floating stars */}
      <motion.div className="star-floating" style={{ top: '15%', left: '10%' }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
        <Star size={24} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div className="star-floating" style={{ top: '65%', left: '45%' }} animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}>
        <Star size={32} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div className="star-floating" style={{ top: '25%', right: '15%' }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}>
        <Star size={20} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div className="star-floating" style={{ bottom: '20%', left: '15%' }} animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.2 }}>
        <Star size={28} fill="#111111" stroke="none" />
      </motion.div>

      <div className="container">
        <div className="ag">
          
          {/* LEFT COLUMN: HANGING EMPLOYEE ID BADGE */}
          <div className="badge-lanyard-wrapper">
            <div className="lanyard-strap"></div>
            <motion.div 
              className="employee-id-badge"
              whileHover={{ rotate: 0, scale: 1.05, y: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="badge-photo-frame">
                <img src="/profile_resting.png" alt="Likethan Developer portrait" />
              </div>
              <div className="badge-meta">
                <div className="badge-name">LIKETHAN</div>
                <div className="badge-role">FULL STACK DEVELOPER</div>
                <div style={{ fontSize: '0.55rem', opacity: 0.5, marginTop: '0.4rem', fontFamily: 'var(--font-m)' }}>
                  MEMBER ID: 884-912-A
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT */}
          <div className="at">
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 900, color: '#111111', lineHeight: 1.0, marginBottom: '2rem' }}>
              Hello!
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              I'm <strong style={{ color: '#111111', fontSize: '1.25rem' }}>LIKETHAN</strong>, a Full Stack Developer dedicated to crafting next-generation digital experiences. 
              I specialize in bridging the gap between elegant interface design and robust, secure backend architecture.
            </p>
            <p style={{ fontSize: '1.0rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.8 }}>
              With expertise spanning React, Node.js, and database systems, I design responsive web applications that scale seamlessly. 
              My design philosophy centers on strong color contrast, bold typography, and intuitive user experiences that engage and inspire.
            </p>

            {/* Tech stack icons */}
            <div className="about-tech-logos">
              {/* React SVG */}
              <motion.svg 
                className="tech-logo-img" 
                viewBox="-11.5 -10.23174 23 20.46348" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
              </motion.svg>

              {/* Node.js SVG */}
              <motion.svg 
                className="tech-logo-img" 
                viewBox="0 0 256 293" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <path d="M128 0L38.4 51.7v103.5L128 207l89.6-51.7V51.7L128 0z" fill="#339933"/>
                <path d="M128 0v207l89.6-51.7V51.7L128 0z" fill="#66cc33"/>
                <path d="M76.8 73.8v77.6L128 181v-77.6L76.8 73.8z" fill="#ffffff"/>
              </motion.svg>

              {/* MongoDB SVG */}
              <motion.svg 
                className="tech-logo-img" 
                viewBox="0 0 256 256" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <path d="M128 0C78.4 0 76.8 112 76.8 128s1.6 128 51.2 128 51.2-112 51.2-128S177.6 0 128 0zm0 208v-48c-12.8 0-16-12.8-16-24h32v-16h-32c0-11.2 3.2-24 16-24v-40c-25.6 12.8-25.6 51.2-25.6 64S102.4 208 128 208z" fill="#47A248"/>
              </motion.svg>
            </div>
          </div>

        </div>
      </div>

      {/* Torn Paper Divider */}
      <div className="torn-paper-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px', display: 'block' }}>
          <path d="M0,120 L1200,120 L1200,40 L1170,35 L1140,55 L1110,30 L1080,48 L1050,32 L1020,58 L990,38 L960,52 L930,32 L900,48 L870,36 L840,56 L810,40 L780,48 L750,32 L720,52 L690,34 L660,58 L630,42 L600,48 L570,30 L540,54 L510,38 L480,44 L450,32 L420,58 L390,36 L360,52 L330,30 L300,48 L270,38 L240,56 L210,40 L180,46 L150,32 L120,54 L90,38 L60,48 L30,32 L0,58 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
