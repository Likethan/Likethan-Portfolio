(function () {
  /* Scroll progress */
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      },
      { passive: true }
    );
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* Animated counters */
  function animateCount(el, target, duration = 2000) {
    const start = performance.now();
    const startVal = 0;
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + (el.dataset.suffix || "");
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) animateCount(el, target);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

  /* Mockup counters */
  const mockupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll("[data-mockup-count]").forEach((el) => {
          const target = parseInt(el.dataset.mockupCount, 10);
          if (!isNaN(target)) animateCount(el, target, 1500);
        });
        mockupObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  const mockup = document.querySelector(".mockup");
  if (mockup) mockupObserver.observe(mockup);

  /* Skill bars */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".skill-item__fill").forEach((fill) => {
          fill.style.width = fill.dataset.level + "%";
        });
        skillObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-category").forEach((cat) => skillObserver.observe(cat));

  /* Chart bars */
  function initChartBars() {
    const container = document.getElementById("chartBars");
    if (!container) return;
    const heights = [45, 72, 58, 90, 65, 82, 48, 75];
    heights.forEach((h) => {
      const bar = document.createElement("div");
      bar.className = "mockup__chart-bar";
      bar.style.height = "0%";
      bar.dataset.height = h;
      container.appendChild(bar);
    });

    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll(".mockup__chart-bar").forEach((bar, i) => {
            setTimeout(() => {
              bar.style.height = bar.dataset.height + "%";
            }, i * 80);
          });
          chartObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    chartObserver.observe(container);
  }
  initChartBars();

  /* Role rotation */
  const roleEl = document.getElementById("roleText");
  if (roleEl) {
    const roles = [
      "Full Stack Developer",
      "AI Engineer",
      "Prompt Engineer",
      "Creative Technologist",
    ];
    let index = 0;
    setInterval(() => {
      roleEl.classList.add("is-fading");
      setTimeout(() => {
        index = (index + 1) % roles.length;
        roleEl.textContent = roles[index];
        roleEl.classList.remove("is-fading");
      }, 300);
    }, 3500);
  }

  /* Hero glow follows mouse */
  const heroGlow = document.getElementById("heroGlow");
  const hero = document.getElementById("hero");
  if (heroGlow && hero) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      heroGlow.style.left = `${e.clientX - rect.left}px`;
      heroGlow.style.top = `${e.clientY - rect.top}px`;
    });
  }

})();
