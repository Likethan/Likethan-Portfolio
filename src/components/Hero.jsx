import React, { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // 1. PARTICLES CANVAS ANIMATION
    const cv = document.getElementById('pcanvas');
    if (cv) {
      const ctx = cv.getContext('2d');
      let pts = [];
      let frameId;

      const resize = () => {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      // Initialize particles
      for (let i = 0; i < 70; i++) {
        pts.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.4 + 0.4,
          a: Math.random() * 0.45 + 0.08,
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, cv.width, cv.height);

        // Draw and update particles
        pts.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,92,246,${p.a})`;
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = cv.width;
          if (p.x > cv.width) p.x = 0;
          if (p.y < 0) p.y = cv.height;
          if (p.y > cv.height) p.y = 0;
        });

        // Draw connecting lines
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
            if (d < 95) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(139,92,246,${0.09 * (1 - d / 95)})`;
              ctx.stroke();
            }
          }
        }
        frameId = requestAnimationFrame(draw);
      };

      frameId = requestAnimationFrame(draw);

      // Cleanup canvas animation
      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(frameId);
      };
    }
  }, []);

  useEffect(() => {
    // 2. MOUSE REACTIVE ORBS PARALLAX
    const handleOrbParallax = (e) => {
      const o1 = document.querySelector('.ho1');
      const o2 = document.querySelector('.ho2');
      if (o1) {
        o1.style.transform = `translate(${e.clientX * 0.018}px, ${e.clientY * 0.018}px)`;
      }
      if (o2) {
        o2.style.transform = `translate(${-e.clientX * 0.01}px, ${-e.clientY * 0.01}px)`;
      }
    };
    document.addEventListener('mousemove', handleOrbParallax);

    return () => {
      document.removeEventListener('mousemove', handleOrbParallax);
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero">
      <canvas id="pcanvas"></canvas>
      <div className="hgrid"></div>
      <div className="horb ho1"></div>
      <div className="horb ho2"></div>
      <div className="horb ho3"></div>
      <div className="hcont">
        <div className="hinner">
          <div className="hleft">
            <div className="hbadge">
              <span className="hbdot"></span>Open to Opportunities
            </div>
            <h1 className="hname reveal">
              Likethan<br /><em>K J</em>
            </h1>
            <div className="hrole-wrap reveal d1">
              <div className="hroles">
                <span>Full Stack Developer</span>
                <span>AI Engineer</span>
                <span>Prompt Engineer</span>
                <span>Creative Technologist</span>
              </div>
            </div>
            <p className="hdesc reveal d2">
              Building intelligent digital experiences at the intersection of full stack engineering, AI systems, and human-centred design.<br />
              <strong style={{ color: 'var(--t1)' }}>Design. Develop. Deploy.</strong>
            </p>
            <div className="hctas reveal d3">
              <a href="#fp" className="btn-p" onClick={(e) => handleSmoothScroll(e, 'fp')}>⚡ Explore Projects</a>
              <a href="#" className="btn-s">↓ Download Resume</a>
              <a href="#contact" className="btn-s" onClick={(e) => handleSmoothScroll(e, 'contact')}>✉ Contact</a>
            </div>
            <div className="hstats reveal d4">
              <div>
                <div className="hstat-num" data-count="2">0+</div>
                <div className="hstat-lbl">Major Projects</div>
              </div>
              <div>
                <div className="hstat-num" data-count="4">0+</div>
                <div className="hstat-lbl">Certifications</div>
              </div>
              <div>
                <div className="hstat-num" data-count="2">0+</div>
                <div className="hstat-lbl">Internships</div>
              </div>
            </div>
          </div>
          <div className="hright">
            <div className="hframe">
              <div className="hframe-glow">
                <div className="hframe-inner">
                  <img src="/profile.jpg" alt="Likethan K J" />
                </div>
              </div>
              <div className="hfc1">
                <span className="fci">🤖</span>
                <div>
                  <div className="fcl">AI Engineer</div>
                  <div className="fcs">Gemini API</div>
                </div>
              </div>
              <div className="hfc2">
                <span className="fci">⚡</span>
                <div>
                  <div className="fcl">Full Stack</div>
                  <div className="fcs">Flask + React</div>
                </div>
              </div>
              <div className="hfc3">
                <span className="fci">🔐</span>
                <div>
                  <div className="fcl">Security</div>
                  <div className="fcs">Ethical Hacking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hscroll">
        <span>Scroll</span>
        <div className="hscrl-line"></div>
      </div>
    </section>
  );
}
