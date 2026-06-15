import React, { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 3000);
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
            <a href="https://linkedin.com/in/likethan-kj" target="_blank" rel="noopener noreferrer" className="citem reveal d3">
              <div className="cic">💼</div>
              <div>
                <div className="cdl">LinkedIn</div>
                <div className="cdv">likethan-kj</div>
              </div>
            </a>
          </div>
          <div className="cform reveal d2">
            <div className="fg">
              <label className="fl">Your Name</label>
              <input type="text" className="fi" placeholder="John Doe" />
            </div>
            <div className="fg">
              <label className="fl">Email</label>
              <input type="email" className="fi" placeholder="john@company.com" />
            </div>
            <div className="fg">
              <label className="fl">Subject</label>
              <input type="text" className="fi" placeholder="Internship / Project Collab" />
            </div>
            <div className="fg">
              <label className="fl">Message</label>
              <textarea className="fta" placeholder="Tell me about the opportunity..."></textarea>
            </div>
            <button
              className="btn-p"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: sent ? 'linear-gradient(135deg,#10B981,#059669)' : undefined,
              }}
              onClick={handleContact}
            >
              {sent ? '✓ Sent!' : 'Send Message ✉'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
