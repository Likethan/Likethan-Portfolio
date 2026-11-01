(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  document.body.classList.add("is-loading");

  const minDuration = 2200;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }, minDuration);
  });

  setTimeout(() => {
    if (!loader.classList.contains("is-hidden")) {
      loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }
  }, minDuration + 1500);
})();
