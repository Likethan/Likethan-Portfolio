import React from 'react';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="ag">
          <div className="at">
            <div className="stag">About Me</div>
            <h2 className="stitle reveal">
              Building the<br />
              <span className="gt">Intelligent Web</span>
            </h2>
            <p className="reveal d1">
              Dedicated AI & Data Science engineering student with strong expertise in full stack development, intelligent systems, prompt engineering, and cybersecurity. Passionate about building modern AI-powered applications that solve real-world problems.
            </p>
            <p className="reveal d2">
              My approach combines clean architecture with creative thinking — every project is an opportunity to push the boundaries of what technology can achieve through innovation and elegant engineering.
            </p>
            <div className="astats">
              <div className="asc reveal">
                <div className="asn" data-count="2">0</div>
                <div className="asl">Major Projects</div>
              </div>
              <div className="asc reveal d1">
                <div className="asn" data-count="4">0</div>
                <div className="asl">Certifications</div>
              </div>
              <div className="asc reveal d2">
                <div className="asn" data-count="2">0</div>
                <div className="asl">Internships</div>
              </div>
              <div className="asc reveal d3">
                <div className="asn">∞</div>
                <div className="asl">Curiosity</div>
              </div>
            </div>
          </div>
          <div className="reveal d2">
            <div className="acard">
              <div className="acth">Core Traits</div>
              <div className="atr">
                <span className="tri">🚀</span>
                <span className="trt">AI-first engineering mindset — always exploring emerging tech</span>
              </div>
              <div className="atr">
                <span className="tri">🎯</span>
                <span className="trt">Problem-solver who turns complex ideas into elegant solutions</span>
              </div>
              <div className="atr">
                <span className="tri">🔒</span>
                <span className="trt">Security-conscious developer — building with safety by design</span>
              </div>
              <div className="atr">
                <span className="tri">💡</span>
                <span className="trt">Creative technologist bridging design and engineering</span>
              </div>
              <div className="atr">
                <span className="tri">🌐</span>
                <span className="trt">Full stack visionary — IoT hardware to cloud deployment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
