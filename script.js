/* ============================================================
   Herbology — behaviour
   ============================================================ */

(function () {
  "use strict";

  /* ---- specimen card flip (click / tap, in addition to :focus-within hover) ---- */
  document.querySelectorAll(".specimen").forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("is-flipped");
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });

  /* ---- reveal-on-scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- ambient spore canvas ---- */
  var canvas = document.getElementById("spores");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ctx = canvas.getContext("2d");
    var spores = [];
    var W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    var count = Math.min(60, Math.floor((W * H) / 26000));
    for (var i = 0; i < count; i++) {
      spores.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.08 + Math.random() * 0.22,
        vx: (Math.random() - 0.5) * 0.15,
        o: 0.15 + Math.random() * 0.35
      });
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(198, 164, 86, 1)";
      spores.forEach(function (s) {
        ctx.globalAlpha = s.o;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.vy;
        s.x += s.vx;
        if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; }
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- final fragment ---- */
  console.log(
    "%cThree fragments down. The last was never hidden — only unspoken.\np3t4ls}",
    "color:#c6a456; font-family:monospace; font-size:13px;"
  );
})();
