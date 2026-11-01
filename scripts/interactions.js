(function () {
  /* Tilt cards */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* Magnetic buttons */
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* Navbar scroll behavior */
  const navWrap = document.querySelector(".nav-wrap");
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (navbar) {
            navbar.classList.toggle("is-scrolled", currentScroll > 50);
          }
          if (navWrap && currentScroll > 200) {
            if (currentScroll > lastScroll && currentScroll > 400) {
              navWrap.classList.add("is-hidden");
            } else {
              navWrap.classList.remove("is-hidden");
            }
          } else if (navWrap) {
            navWrap.classList.remove("is-hidden");
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  /* Active nav link */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-20% 0px -60% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      document.getElementById("navLinks")?.classList.remove("is-open");
      document.getElementById("navBurger")?.classList.remove("is-open");
    });
  });
})();
