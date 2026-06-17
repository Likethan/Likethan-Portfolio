import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function ProcessCard({ num, title, desc, active, rowClass, rotation }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  return (
    <div ref={cardRef} className={rowClass} style={{ position: 'relative', zIndex: 10 }}>
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

export default function Services() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the services section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Animate path dashoffset from full path length to 0
  const pathLength = 1600;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 0.9], [pathLength, 0]);

  // Determine active cards based on scroll progress thresholds
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange(v => {
      setActive1(v >= 0.15);
      setActive2(v >= 0.40);
      setActive3(v >= 0.65);
      setActive4(v >= 0.85);
    });
  }, [scrollYProgress]);

  const cardsData = [
    {
      num: '01',
      title: 'Define',
      desc: 'Collaborating to extract raw project requirements, map goals, detail milestones, and architect core developer guidelines.',
      rotation: '3deg',
      rowClass: 'process-card-row-0',
      active: active1
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Creating interactive user interfaces and premium visual designs, establishing custom design tokens, and wireframing user journeys.',
      rotation: '-2deg',
      rowClass: 'process-card-row-1',
      active: active2
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Writing clean, production-ready React and Node.js micro-architecture code with extreme focus on security, scaling, and testability.',
      rotation: '2deg',
      rowClass: 'process-card-row-2',
      active: active3
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Deploying optimized builds to staging/production clusters, monitoring analytics, and delivering a seamless product live experience.',
      rotation: '-3deg',
      rowClass: 'process-card-row-3',
      active: active4
    }
  ];

  return (
    <section id="services-process" ref={containerRef}>
      <div className="grid-bg-overlay"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF2A2A', marginBottom: '1rem', background: '#F9F9F9' }}>
            How We Work
          </div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#111111', lineHeight: 1.1, maxWidth: '800px', margin: '0 auto' }}>
            Let us show you how we drive your brand to new heights
            <span style={{ display: 'inline-block', marginLeft: '10px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ verticalAlign: 'middle' }}>
                <path d="M10 25 C15 32, 28 32, 30 20 C31 16, 28 10, 22 12 C18 13, 16 19, 21 23" stroke="#FF2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 23 L22 23 L20 17" stroke="#FF2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', marginTop: '1.25rem', maxWidth: '520px', margin: '1.25rem auto 0' }}>
            Our structured, end-to-end development cycle guarantees award-winning quality and bulletproof execution at every stage.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="process-timeline-wrap">
          {/* Dashboard S-curve SVG line */}
          <svg className="svg-timeline-path" viewBox="0 0 900 1200" fill="none" preserveAspectRatio="none">
            {/* Gray path outline background */}
            <path
              d="M 450 0 C 450 150, 100 150, 100 300 C 100 450, 800 450, 800 600 C 800 750, 100 750, 100 900 C 100 1050, 450 1050, 450 1200"
              stroke="#EBEBEB"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Animated drawing red path */}
            <motion.path
              d="M 450 0 C 450 150, 100 150, 100 300 C 100 450, 800 450, 800 600 C 800 750, 100 750, 100 900 C 100 1050, 450 1050, 450 1200"
              stroke="#FF2A2A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              style={{ strokeDashoffset }}
            />
          </svg>

          {/* PROCESS CARDS */}
          {cardsData.map((card, idx) => (
            <ProcessCard
              key={idx}
              num={card.num}
              title={card.title}
              desc={card.desc}
              active={card.active}
              rowClass={card.rowClass}
              rotation={card.rotation}
            />
          ))}
        </div>

        {/* Ready to be delivered signature */}
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <motion.div 
            style={{ 
              display: 'inline-block',
              fontFamily: 'var(--font-d)', 
              fontSize: '1.8rem', 
              fontWeight: 800, 
              color: '#111111'
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
