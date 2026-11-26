import React, { useEffect, useRef } from 'react';

/**
 * Ultra-Responsive Zero-Latency Hardware-Accelerated Custom Cursor:
 * - 100% Direct GPU transform (translate3d) via DOM refs
 * - Zero React re-renders on mouse movement or rAF loop
 * - Instant 0ms input responsiveness at 120Hz/144Hz/240Hz refresh rates
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktop mice/trackpads)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isVisible = false;
    let frameId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${isHovered ? 0 : 1})`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, input, textarea, select, [role="button"], .interactive')
      ) {
        if (!isHovered) {
          isHovered = true;
          ring.style.borderColor = '#d4af37';
          ring.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
        }
      } else {
        if (isHovered) {
          isHovered = false;
          ring.style.borderColor = 'rgba(197, 160, 89, 0.45)';
          ring.style.backgroundColor = 'transparent';
        }
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`;
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
