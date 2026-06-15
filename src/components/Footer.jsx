import React from 'react';

export default function Footer() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="fin">
          <div className="flogo" onClick={(e) => handleSmoothScroll(e, 'hero')}>LK.dev</div>
          <div className="flinks">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
            <a href="#skills" onClick={(e) => handleSmoothScroll(e, 'skills')}>Skills</a>
            <a href="#fp" onClick={(e) => handleSmoothScroll(e, 'fp')}>Projects</a>
            <a href="https://github.com/Likethan" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/likethan-kj" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="fcopy">© 2024 Likethan K J · Made with ⚡</div>
        </div>
      </div>
    </footer>
  );
}
