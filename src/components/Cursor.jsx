import React, { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur');
    const cur2 = document.getElementById('cur2');
    const spb = document.getElementById('spb');

    if (!cur || !cur2) return;

    let mx = 0, my = 0, fx = 0, fy = 0;
    let isHovering = false;

    // Mouse movement
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };
    document.addEventListener('mousemove', onMouseMove);

    // Animation frame for secondary smooth cursor
    let frameId;
    const updateCursor2 = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      cur2.style.left = fx + 'px';
      cur2.style.top = fy + 'px';
      frameId = requestAnimationFrame(updateCursor2);
    };
    frameId = requestAnimationFrame(updateCursor2);

    // Scroll progress bar
    const onScroll = () => {
      if (spb) {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
          spb.style.width = (window.scrollY / totalScrollHeight * 100) + '%';
        } else {
          spb.style.width = '0%';
        }
      }
    };
    window.addEventListener('scroll', onScroll);

    // Hover effect event delegation
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .pcard, .skc, .svc, .cc, .trc, .citem, .asc');
      if (target) {
        cur.style.width = '18px';
        cur.style.height = '18px';
        cur2.style.width = '48px';
        cur2.style.height = '48px';
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, .pcard, .skc, .svc, .cc, .trc, .citem, .asc');
      if (target) {
        cur.style.width = '10px';
        cur.style.height = '10px';
        cur2.style.width = '32px';
        cur2.style.height = '32px';
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div id="cur"></div>
      <div id="cur2"></div>
      <div id="spb"></div>
    </>
  );
}
