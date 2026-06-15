import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState('scale(1)');
  const [display, setDisplay] = useState('flex');

  useEffect(() => {
    // Fade out loader after 2.3 seconds
    const hideTimer = setTimeout(() => {
      setOpacity(0);
      setTransform('scale(1.04)');

      // Completely remove display after transition (0.8s)
      const removeTimer = setTimeout(() => {
        setDisplay('none');
      }, 800);

      return () => clearTimeout(removeTimer);
    }, 2300);

    return () => clearTimeout(hideTimer);
  }, []);

  if (display === 'none') return null;

  return (
    <div id="ldr" style={{ opacity, transform, display }}>
      <div className="ldr-init">LK</div>
      <div className="ldr-bar">
        <div className="ldr-fill"></div>
      </div>
      <div className="ldr-txt">Loading Portfolio...</div>
    </div>
  );
}
