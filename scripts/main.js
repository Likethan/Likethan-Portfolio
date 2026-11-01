(function () {
  /* Theme toggle */
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    window.PortfolioTheme?.toggle();
  });

  /* Mobile nav */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  burger?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  /* Skills data */
  const skillsData = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML / CSS", level: 92 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 82 },
        { name: "Flask", level: 88 },
      ],
    },
    {
      title: "AI & Data Science",
      skills: [
        { name: "Machine Learning", level: 85 },
        { name: "Jupyter Notebook", level: 88 },
        { name: "Google Colab", level: 90 },
      ],
    },
    {
      title: "Cybersecurity",
      skills: [
        { name: "Ethical Hacking", level: 80 },
        { name: "OSINT", level: 78 },
        { name: "CTF Practices", level: 75 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "DBMS", level: 82 },
        { name: "Data Structures", level: 88 },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Arduino", level: 80 },
        { name: "Raspberry Pi", level: 78 },
        { name: "Git / GitHub", level: 88 },
      ],
    },
  ];

  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    const delayClasses = ["", "reveal--delay", "reveal--delay-2", "reveal--delay-3", "reveal--delay-4"];
    skillsData.forEach((cat, i) => {
      const article = document.createElement("article");
      article.className = `skill-category glass reveal tilt-card ${delayClasses[Math.min(i, delayClasses.length - 1)]}`.trim();
      article.dataset.tilt = "";
      article.innerHTML = `
        <h3 class="skill-category__title">${cat.title}</h3>
        ${cat.skills
          .map(
            (s) => `
          <div class="skill-item">
            <div class="skill-item__header">
              <span>${s.name}</span>
              <span>${s.level}%</span>
            </div>
            <div class="skill-item__bar">
              <div class="skill-item__fill" data-level="${s.level}" style="width:0"></div>
            </div>
          </div>`
          )
          .join("")}
      `;
      skillsGrid.appendChild(article);
    });

    /* Re-observe new reveal elements */
    document.querySelectorAll(".skills__grid .reveal").forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
    });

    skillsGrid.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* Marquee duplicate for seamless loop */
  const marqueeInner = document.getElementById("marqueeInner");
  if (marqueeInner) {
    const track = marqueeInner.querySelector(".marquee__track");
    if (track) {
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      marqueeInner.appendChild(clone);
    }
  }

  /* Contact form */
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ["name", "email", "message"];

    fields.forEach((id) => {
      const input = document.getElementById(id);
      const errorEl = form.querySelector(`[data-for="${id}"]`);
      if (!input || !errorEl) return;

      errorEl.textContent = "";
      if (!input.value.trim()) {
        errorEl.textContent = "This field is required.";
        valid = false;
      } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        errorEl.textContent = "Please enter a valid email.";
        valid = false;
      }
    });

    if (valid) {
      const success = document.getElementById("formSuccess");
      if (success) {
        success.hidden = false;
        form.reset();
        setTimeout(() => {
          success.hidden = true;
        }, 5000);
      }
    }
  });

  /* Footer year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Resume placeholder */
  document.getElementById("resumeBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your resume PDF to assets/resume.pdf and update the link in index.html");
  });
})();
