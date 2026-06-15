import React from 'react';

export default function FeaturedProject() {
  return (
    <section id="fp">
      <div className="container">
        <div className="stag">Flagship Project</div>
        <h2 className="stitle reveal">Featured <span className="gt">Work</span></h2>
        <div className="fpwrap reveal d1">
          <div className="fpinner">
            <div className="fpinfo">
              <div className="fptag">🤖 Autonomous Research Platform</div>
              <h3 className="fptitle">InsightForge<br /><span className="gt">AI</span></h3>
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
                  <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg,var(--p),var(--v))',
                    color: '#fff',
                    fontFamily: 'var(--font-m)',
                    fontSize: '.62rem',
                    padding: '.3rem 1rem',
                    borderRadius: '99px',
                    letterSpacing: '.1em'
                  }}>
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
