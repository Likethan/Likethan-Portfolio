import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Menu, X, Star, ChevronDown } from 'lucide-react';

// Custom Cursor & Progress Bar
function CustomCursor() {
  useEffect(() => {
    const cur = document.getElementById('cur');
    const cur2 = document.getElementById('cur2');
    const spb = document.getElementById('spb');

    const handleMouseMove = (e) => {
      if (cur) {
        cur.style.left = `${e.clientX}px`;
        cur.style.top = `${e.clientY}px`;
      }
      if (cur2) {
        cur2.style.left = `${e.clientX}px`;
        cur2.style.top = `${e.clientY}px`;
      }
    };

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (spb) spb.style.width = `${scrolled}%`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id="cur" aria-hidden="true" />
      <div id="cur2" aria-hidden="true" />
      <div id="spb" aria-hidden="true" />
    </>
  );
}

// Navigation Bar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about-premium' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'fp' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <>
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
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          <span
            style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 900,
              fontSize: '1.4rem',
              color: '#fff',
              letterSpacing: '-0.03em',
            }}
          >
            Likethan<span style={{ color: '#FF2A2A' }}>.</span>
          </span>
        </div>

        <div className="nlinks" style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={`#${item.target}`}
              onClick={(e) => scrollToSection(e, item.target)}
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
                e.currentTarget.style.color = '#fff';
                const underline = e.currentTarget.querySelector('.nav-underline');
                if (underline) underline.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                const underline = e.currentTarget.querySelector('.nav-underline');
                if (underline) underline.style.transform = 'scaleX(0)';
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="btn-hire"
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
              e.currentTarget.style.borderColor = '#FF2A2A';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.3)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            Hire Me
          </a>

          <button
            id="hbg"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
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
            {navLinks.map((item, i) => (
              <motion.a
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
                href={`#${item.target}`}
                onClick={(e) => scrollToSection(e, item.target)}
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
              onClick={(e) => scrollToSection(e, 'contact')}
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

// Hero Section
function HeroSection() {
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        background: 'var(--bg)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="hgrid" style={{ zIndex: 1 }} />
      <div className="horb ho1" style={{ zIndex: 1 }} />
      <div className="horb ho2" style={{ zIndex: 1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="hinner" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div className="hleft">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hbadge"
            >
              <span className="hbdot" />
              LIKETHAN PORTFOLIO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hname"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.05 }}
            >
              Hi, I'm a<br />
              <span className="text-stroke-outline">Full Stack</span>
              <br />
              <span style={{ color: '#FF2A2A' }}>Developer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hdesc"
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                margin: '1.5rem 0 2.5rem 0',
                maxWidth: '540px',
                lineHeight: 1.6,
              }}
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
                onClick={(e) => scrollToSection(e, 'services-process')}
                className="btn-p"
                style={{
                  background: '#FF2A2A',
                  color: '#fff',
                  padding: '1rem 2rem',
                  borderRadius: '99px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(255, 42, 42, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                View Process
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="btn-s"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  padding: '1rem 2rem',
                  borderRadius: '99px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                Contact Me
              </a>
            </motion.div>
          </div>

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
                cursor: 'pointer',
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

      <div className="hscroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ marginTop: '0.5rem', color: '#FF2A2A', cursor: 'pointer' }}
          onClick={(e) => scrollToSection(e, 'about-premium')}
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}

// Marquee Section
function MarqueeSection() {
  const items = [
    { icon: '⚡', name: 'HTML' },
    { icon: '🎨', name: 'CSS' },
    { icon: '🛠', name: 'JavaScript' },
    { icon: '🐍', name: 'Python' },
    { icon: '⚗️', name: 'Flask' },
    { icon: '⚛️', name: 'React' },
    { icon: '🗄️', name: 'MySQL' },
    { icon: '🤖', name: 'Machine Learning' },
    { icon: '🧠', name: 'Gemini API' },
    { icon: '🔐', name: 'Cybersecurity' },
    { icon: '📡', name: 'IoT' },
    { icon: '🔬', name: 'OSINT' },
  ];
  const list = [...items, ...items];

  return (
    <div id="mq">
      <div className="mqt">
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <span className="mqi">
              {item.icon} {item.name}
            </span>
            {index < list.length - 1 && <span className="mqs">·</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// About Premium Section
function AboutSection() {
  return (
    <section id="about-premium">
      <motion.div
        className="star-floating"
        style={{ top: '15%', left: '10%' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <Star size={24} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div
        className="star-floating"
        style={{ top: '65%', left: '45%' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
      >
        <Star size={32} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div
        className="star-floating"
        style={{ top: '25%', right: '15%' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
      >
        <Star size={20} fill="#111111" stroke="none" />
      </motion.div>
      <motion.div
        className="star-floating"
        style={{ bottom: '20%', left: '15%' }}
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.2 }}
      >
        <Star size={28} fill="#111111" stroke="none" />
      </motion.div>

      <div className="container">
        <div className="ag">
          <div className="badge-lanyard-wrapper">
            <div className="lanyard-strap" />
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

          <div className="at">
            <h2
              style={{
                fontFamily: 'var(--font-d)',
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                fontWeight: 900,
                color: '#111111',
                lineHeight: 1,
                marginBottom: '2rem',
              }}
            >
              Hello!
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              I'm <strong style={{ color: '#111111', fontSize: '1.25rem' }}>LIKETHAN</strong>, a Full Stack Developer dedicated to crafting next-generation digital experiences. I specialize in bridging the gap between elegant interface design and robust, secure backend architecture.
            </p>
            <p style={{ fontSize: '1.0rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.8 }}>
              With expertise spanning React, Node.js, and database systems, I design responsive web applications that scale seamlessly. My design philosophy centers on strong color contrast, bold typography, and intuitive user experiences that engage and inspire.
            </p>

            <div className="about-tech-logos">
              <motion.svg
                className="tech-logo-img"
                viewBox="-11.5 -10.23174 23 20.46348"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </motion.svg>

              <motion.svg
                className="tech-logo-img"
                viewBox="0 0 256 293"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <path d="M128 0L38.4 51.7v103.5L128 207l89.6-51.7V51.7L128 0z" fill="#339933" />
                <path d="M128 0v207l89.6-51.7V51.7L128 0z" fill="#66cc33" />
                <path d="M76.8 73.8v77.6L128 181v-77.6L76.8 73.8z" fill="#ffffff" />
              </motion.svg>

              <motion.svg
                className="tech-logo-img"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                whileHover={{ y: -8, scale: 1.15 }}
              >
                <path
                  d="M128 0C78.4 0 76.8 112 76.8 128s1.6 128 51.2 128 51.2-112 51.2-128S177.6 0 128 0zm0 208v-48c-12.8 0-16-12.8-16-24h32v-16h-32c0-11.2 3.2-24 16-24v-40c-25.6 12.8-25.6 51.2-25.6 64S102.4 208 128 208z"
                  fill="#47A248"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>

      <div className="torn-paper-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px', display: 'block' }}>
          <path
            d="M0,120 L1200,120 L1200,40 L1170,35 L1140,55 L1110,30 L1080,48 L1050,32 L1020,58 L990,38 L960,52 L930,32 L900,48 L870,36 L840,56 L810,40 L780,48 L750,32 L720,52 L690,34 L660,58 L630,42 L600,48 L570,30 L540,54 L510,38 L480,44 L450,32 L420,58 L390,36 L360,52 L330,30 L300,48 L270,38 L240,56 L210,40 L180,46 L150,32 L120,54 L90,38 L60,48 L30,32 L0,58 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skillGroups = [
    { title: 'Frontend', delayClass: '', items: ['HTML5', 'CSS3', 'JavaScript', 'React'] },
    { title: 'Backend', delayClass: 'd1', items: ['Python', 'Flask', 'REST APIs', 'MySQL'] },
    { title: 'AI & Data Science', delayClass: 'd2', items: ['Machine Learning', 'Data Analysis', 'Prompt Engineering', 'Gemini API'] },
    { title: 'Cybersecurity', delayClass: 'd1', items: ['Ethical Hacking', 'OSINT', 'Security Assessment', 'CTF Challenges'] },
    { title: 'Hardware / Tools', delayClass: 'd2', items: ['Arduino', 'Raspberry Pi', 'Jupyter Notebook', 'Google Colab'] },
    { title: 'Core CS', delayClass: 'd3', items: ['DBMS', 'Data Structures', 'Algorithms', 'System Design'] },
  ];

  return (
    <section id="skills">
      <div className="container">
        <div className="stag">Expertise</div>
        <h2 className="stitle reveal">
          Skills & <span className="gt">Technologies</span>
        </h2>
        <p className="ssub reveal d1">
          Full-spectrum toolkit spanning frontend, backend, AI, security, and hardware.
        </p>

        <div className="skgrid">
          {skillGroups.map((group, index) => (
            <div key={index} className={`skc reveal ${group.delayClass}`}>
              <div className="skct">{group.title}</div>
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="ski">
                  <span className="skd" />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Work Experience Section
function ExperienceSection() {
  const experiences = [
    {
      date: '2024 — Present',
      role: 'Web Development Intern',
      company: 'Emglitz Technologies',
      description:
        'Contributed to frontend and web development tasks, gaining industry-level exposure to production-grade software workflows, client requirements, and real-world development practices.',
      tags: ['HTML/CSS', 'JavaScript', 'Frontend Dev', 'UI/UX'],
      delayClass: '',
    },
    {
      date: '2024',
      role: 'Data Science Intern',
      company: 'Training Trains',
      description:
        'Worked on data preprocessing pipelines, machine learning fundamentals, model evaluation strategies, and Python-based statistical analysis to extract actionable insights from datasets.',
      tags: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation'],
      delayClass: 'd1',
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <div className="stag">Career</div>
        <h2 className="stitle reveal">
          Work <span className="gt">Experience</span>
        </h2>

        <div className="tl">
          {experiences.map((exp, i) => (
            <div key={i} className={`tli reveal ${exp.delayClass}`}>
              <div className="tldot" />
              <div className="tldate">{exp.date}</div>
              <div className="tlrole">{exp.role}</div>
              <div className="tlco">{exp.company}</div>
              <div className="tldesc">{exp.description}</div>
              <div className="tags">
                {exp.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Project Section
function FlagshipProjectSection() {
  return (
    <section id="fp">
      <div className="container">
        <div className="stag">Flagship Project</div>
        <h2 className="stitle reveal">
          Featured <span className="gt">Work</span>
        </h2>

        <div className="fpwrap reveal d1">
          <div className="fpinner">
            <div className="fpinfo">
              <div className="fptag">🤖 Autonomous Research Platform</div>
              <h3 className="fptitle">
                InsightForge<br />
                <span className="gt">AI</span>
              </h3>
              <p className="fpdesc">
                An AI-powered autonomous research & strategic intelligence platform using Google Gemini API. Generates analytical reports, intelligent insights, trend analysis, and AI-driven case studies — transforming complex queries into boardroom-ready intelligence with voice command support.
              </p>
              <div className="fpstack">
                <span className="spl">Flask</span>
                <span className="spl">React</span>
                <span className="spl">Gemini 2.0</span>
                <span className="spl">Prompt Engineering</span>
                <span className="spl">Python</span>
                <span className="spl">Autonomous Web Search</span>
              </div>
              <div className="fpbtns">
                <a href="#" className="btn-p">🚀 Live Demo</a>
                <a href="https://github.com/Likethan" target="_blank" rel="noopener noreferrer" className="btn-s">⌥ GitHub</a>
                <a href="#" className="btn-s">📄 Case Study</a>
              </div>
            </div>

            <div className="fpvis">
              <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '430px' }}>
                <div className="fpscreen">
                  <img src="/project1.jpg" alt="InsightForge AI platform" />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg,var(--p),var(--v))',
                      color: '#fff',
                      fontFamily: 'var(--font-m)',
                      fontSize: '.62rem',
                      padding: '.3rem 1rem',
                      borderRadius: '99px',
                      letterSpacing: '.1em',
                    }}
                  >
                    ✦ LIVE PROJECT INTERFACE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Other Projects Section
function OtherProjectsSection() {
  const projects = [
    {
      icon: '🔐',
      name: 'Cyber Analyzer',
      description:
        'Cybersecurity assessment tool using OSINT-based vulnerability analysis to identify security weaknesses and deliver actionable security recommendations.',
      tags: ['Python', 'OSINT', 'Security'],
      link: 'https://github.com/Likethan',
      delayClass: '',
    },
    {
      icon: '📡',
      name: 'IoT Monitoring System',
      description:
        'Raspberry Pi & Python-powered IoT sensor dashboard with real-time data collection, analysis, and remote monitoring for smart environments.',
      tags: ['Raspberry Pi', 'Python', 'IoT'],
      link: 'https://github.com/Likethan',
      delayClass: 'd1',
    },
    {
      icon: '🤖',
      name: 'Robotics Automation',
      description:
        'Arduino-based robotics project with autonomous navigation logic, sensor fusion, and real-time motor control for intelligent task automation.',
      tags: ['Arduino', 'C++', 'Robotics'],
      link: 'https://github.com/Likethan',
      delayClass: 'd2',
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <div className="stag">More Work</div>
        <h2 className="stitle reveal">
          Other <span className="gt">Projects</span>
        </h2>

        <div className="pgrid">
          {projects.map((proj, i) => (
            <div key={i} className={`pcard reveal ${proj.delayClass}`}>
              <div className="pico">{proj.icon}</div>
              <div className="pname">{proj.name}</div>
              <p className="pdesc">{proj.description}</p>
              <div className="tags" style={{ marginBottom: '1rem' }}>
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="plink">
                ⌥ GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certifications Section
function CertificationsSection() {
  const certs = [
    { badge: '🤖', name: 'Arduino Robotics', issuer: 'Top Engineers, Chennai', delayClass: '' },
    { badge: '📡', name: 'IoT using Python & Raspberry Pi', issuer: 'Industry Certification', delayClass: 'd1' },
    { badge: '🔐', name: 'Ethical Hacking & Cyber Security', issuer: 'CTF Challenge Certified', delayClass: 'd2' },
    { badge: '💡', name: 'Tech Byte 2024 Workshop', issuer: 'Technical Excellence Award', delayClass: 'd3' },
  ];

  return (
    <section id="certifications">
      <div className="container">
        <div className="stag">Credentials</div>
        <h2 className="stitle reveal">
          Certifications &<br />
          <span className="gt">Achievements</span>
        </h2>

        <div className="cgrid">
          {certs.map((c, i) => (
            <div key={i} className={`cc reveal ${c.delayClass}`}>
              <div className="cbadge">{c.badge}</div>
              <div className="cname">{c.name}</div>
              <div className="ciss">{c.issuer}</div>
              <div className="cver">✓ Verified</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Step Card
function ProcessStepCard({ num, title, desc, active, rowClass, rotation }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div ref={ref} className={rowClass} style={{ position: 'relative', zIndex: 10 }}>
      <motion.div
        className={`process-card ${active || isInView ? 'active' : ''}`}
        style={{ rotate: rotation, transformOrigin: 'center center' }}
        whileHover={{ scale: 1.05, rotate: '0deg' }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <div className="process-step-num">{num}</div>
        <h4 className="process-step-title">{title}</h4>
        <p className="process-step-desc">{desc}</p>
      </motion.div>
    </div>
  );
}

// How We Work Process Section
function ProcessSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start center', 'end center'] });
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [1600, 0]);

  const [step1Active, setStep1Active] = useState(false);
  const [step2Active, setStep2Active] = useState(false);
  const [step3Active, setStep3Active] = useState(false);
  const [step4Active, setStep4Active] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((val) => {
      setStep1Active(val >= 0.15);
      setStep2Active(val >= 0.4);
      setStep3Active(val >= 0.65);
      setStep4Active(val >= 0.85);
    });
  }, [scrollYProgress]);

  const steps = [
    {
      num: '01',
      title: 'Define',
      desc: 'Collaborating to extract raw project requirements, map goals, detail milestones, and architect core developer guidelines.',
      rotation: '3deg',
      rowClass: 'process-card-row-0',
      active: step1Active,
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Creating interactive user interfaces and premium visual designs, establishing custom design tokens, and wireframing user journeys.',
      rotation: '-2deg',
      rowClass: 'process-card-row-1',
      active: step2Active,
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Writing clean, production-ready React and Node.js micro-architecture code with extreme focus on security, scaling, and testability.',
      rotation: '2deg',
      rowClass: 'process-card-row-2',
      active: step3Active,
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Deploying optimized builds to staging/production clusters, monitoring analytics, and delivering a seamless product live experience.',
      rotation: '-3deg',
      rowClass: 'process-card-row-3',
      active: step4Active,
    },
  ];

  return (
    <section id="services-process" ref={targetRef}>
      <div className="grid-bg-overlay" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '0.4rem 1rem',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '99px',
              fontSize: '0.72rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FF2A2A',
              marginBottom: '1rem',
              background: '#F9F9F9',
            }}
          >
            How We Work
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-d)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: '#111111',
              lineHeight: 1.1,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Let us show you how we drive your brand to new heights
            <span style={{ display: 'inline-block', marginLeft: '10px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ verticalAlign: 'middle' }}>
                <path
                  d="M10 25 C15 32, 28 32, 30 20 C31 16, 28 10, 22 12 C18 13, 16 19, 21 23"
                  stroke="#FF2A2A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 23 L22 23 L20 17" stroke="#FF2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', marginTop: '1.25rem', maxWidth: '520px', margin: '1.25rem auto 0' }}>
            Our structured, end-to-end development cycle guarantees award-winning quality and bulletproof execution at every stage.
          </p>
        </div>

        <div className="process-timeline-wrap">
          <svg className="svg-timeline-path" viewBox="0 0 900 1200" fill="none" preserveAspectRatio="none">
            <path
              d="M 450 0 C 450 150, 100 150, 100 300 C 100 450, 800 450, 800 600 C 800 750, 100 750, 100 900 C 100 1050, 450 1050, 450 1200"
              stroke="#EBEBEB"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.path
              d="M 450 0 C 450 150, 100 150, 100 300 C 100 450, 800 450, 800 600 C 800 750, 100 750, 100 900 C 100 1050, 450 1050, 450 1200"
              stroke="#FF2A2A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={1600}
              style={{ strokeDashoffset: pathLength }}
            />
          </svg>

          {steps.map((item, idx) => (
            <ProcessStepCard
              key={idx}
              num={item.num}
              title={item.title}
              desc={item.desc}
              active={item.active}
              rowClass={item.rowClass}
              rotation={item.rotation}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <motion.div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-d)',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#111111',
            }}
            animate={{ rotate: [-4, -2, -4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            Ready to be delivered! 🚀
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Philosophy / Trust Section
function TrustSection() {
  const items = [
    {
      emoji: '🚀',
      name: 'Innovation-First',
      text: 'Exploring emerging technologies and applying them to solve real problems creatively.',
      delayClass: '',
    },
    {
      emoji: '🎯',
      name: 'Precision Engineering',
      text: 'Clean architecture, readable code, and thoughtful system design at every layer.',
      delayClass: 'd1',
    },
    {
      emoji: '🤝',
      name: 'Collaborative Spirit',
      text: 'Strong team player with leadership experience, driving projects from idea to deploy.',
      delayClass: 'd2',
    },
    {
      emoji: '⚡',
      name: 'Fast Execution',
      text: 'Rapid prototyping and delivery without sacrificing quality or standards.',
      delayClass: 'd3',
    },
  ];

  return (
    <section id="trust">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="stag" style={{ margin: '0 auto 1rem' }}>
          Philosophy
        </div>
        <h2 className="stitle reveal" style={{ margin: '0 auto 1rem' }}>
          "Building Intelligent<br />
          <span className="gt">Digital Experiences"</span>
        </h2>
        <p className="ssub reveal d1" style={{ margin: '0 auto 2.75rem' }}>
          Every project is a commitment to excellence — combining technical rigor with creative vision to build solutions that matter.
        </p>

        <div className="trgrid">
          {items.map((item, i) => (
            <div key={i} className={`trc reveal ${item.delayClass}`}>
              <div className="tremo">{item.emoji}</div>
              <div className="trn">{item.name}</div>
              <p className="trt2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="stag">Let's Connect</div>
        <h2 className="stitle reveal">
          Let's Build Something<br />
          <span className="gt">Intelligent Together</span>
        </h2>
        <p className="ssub reveal d1" style={{ marginBottom: '2.75rem' }}>
          Open to internships, full-time roles, freelance projects, and exciting collaborations.
        </p>

        <div className="cwrap">
          <div className="cinfo">
            <a href="mailto:likethankj751@gmail.com" className="citem reveal">
              <div className="cic">✉</div>
              <div>
                <div className="cdl">Email</div>
                <div className="cdv">likethankj751@gmail.com</div>
              </div>
            </a>
            <a href="tel:+918270036537" className="citem reveal d1">
              <div className="cic">📞</div>
              <div>
                <div className="cdl">Phone</div>
                <div className="cdv">+91 82700 36537</div>
              </div>
            </a>
            <a href="https://github.com/Likethan" target="_blank" rel="noopener noreferrer" className="citem reveal d2">
              <div className="cic">⌥</div>
              <div>
                <div className="cdl">GitHub</div>
                <div className="cdv">github.com/Likethan</div>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/likethan-kj"
              target="_blank"
              rel="noopener noreferrer"
              className="citem reveal d3"
            >
              <div className="cic">💼</div>
              <div>
                <div className="cdl">LinkedIn</div>
                <div className="cdv">likethan-kj</div>
              </div>
            </a>
          </div>

          <form className="cform reveal d2" onSubmit={handleSubmit}>
            <div className="fg">
              <label className="fl">Your Name</label>
              <input type="text" className="fi" placeholder="John Doe" required />
            </div>
            <div className="fg">
              <label className="fl">Email</label>
              <input type="email" className="fi" placeholder="john@company.com" required />
            </div>
            <div className="fg">
              <label className="fl">Subject</label>
              <input type="text" className="fi" placeholder="Internship / Project Collab" />
            </div>
            <div className="fg">
              <label className="fl">Message</label>
              <textarea className="fta" placeholder="Tell me about the opportunity..." required />
            </div>
            <button
              type="submit"
              className="btn-p"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: submitted ? 'linear-gradient(135deg,#10B981,#059669)' : undefined,
              }}
            >
              {submitted ? '✓ Sent!' : 'Send Message ✉'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Luxury Footer
function LuxuryFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer-luxury">
      <div className="container">
        <div className="footer-info-grid">
          <div className="footer-info-col">
            <h4>Services</h4>
            <p
              style={{
                fontFamily: 'var(--font-m)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 2,
              }}
            >
              Full Stack Engineering<br />
              AI Solutions<br />
              Web Development<br />
              UI/UX Design
            </p>
          </div>

          <div className="footer-info-col">
            <h4>Experience</h4>
            <p style={{ color: '#D4D4D4', marginBottom: '0.5rem' }}>Full Stack & AI Development</p>
            <a
              href="#fp"
              onClick={(e) => scrollToSection(e, 'fp')}
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

          <div className="footer-info-col">
            <h4>Status</h4>
            <p style={{ color: '#D4D4D4' }}>Available for Opportunities</p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.25rem' }}>
              Year: {currentYear}
            </p>
          </div>
        </div>

        <div className="footer-center-branding">
          <motion.h3
            className="footer-giant-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            likethan
          </motion.h3>
        </div>

        <div className="footer-bottom-row">
          <div>
            <span>© {currentYear} Likethan K J · Built with React</span>
          </div>
          <div>
            <a
              href="mailto:likethankj751@gmail.com"
              style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '4px' }}
            >
              likethankj751@gmail.com
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

// Scroll Reveal Hook Effect
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
}

// Main App Component
export default function App() {
  useRevealOnScroll();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <FlagshipProjectSection />
        <OtherProjectsSection />
        <CertificationsSection />
        <ProcessSection />
        <TrustSection />
        <ContactSection />
      </main>
      <LuxuryFooter />
    </>
  );
}
