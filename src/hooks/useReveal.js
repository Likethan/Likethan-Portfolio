import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Observe all elements with .reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => io.observe(el));

    // Cleanup observer on unmount or rerender
    return () => {
      revealElements.forEach((el) => io.unobserve(el));
    };
  }); // Run on every update to catch dynamically loaded/rendered elements
}
