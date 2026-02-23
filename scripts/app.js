/* Formación Global Online - JS común (Bootstrap + jQuery) */

(function () {
  const STORAGE_KEY = "fgo_font_scale";

  function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

  function applyFontScale(scale) {
    const root = document.documentElement;
    root.style.setProperty("--fgo-font-scale", String(scale));
  }

  function loadFontScale() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const val = raw ? Number(raw) : 1;
    return Number.isFinite(val) ? clamp(val, 0.85, 1.25) : 1;
  }

  function saveFontScale(scale) {
    localStorage.setItem(STORAGE_KEY, String(scale));
  }

  function startClock() {
    const el = document.getElementById("fechaHora");
    if (!el) return;

    const tick = () => {
      const now = new Date();
      // Formato ES: dd/mm/aaaa hh:mm:ss
      const pad = (x) => String(x).padStart(2, "0");
      const s = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      el.textContent = s;
    };

    tick();
    setInterval(tick, 1000);
  }

  function wireFontButtons() {
    const plus = document.getElementById("btnFontPlus");
    const minus = document.getElementById("btnFontMinus");
    const reset = document.getElementById("btnFontReset");
    if (!plus || !minus || !reset) return;

    let scale = loadFontScale();
    applyFontScale(scale);

    plus.addEventListener("click", () => {
      scale = clamp(Number((scale + 0.05).toFixed(2)), 0.85, 1.25);
      applyFontScale(scale);
      saveFontScale(scale);
    });

    minus.addEventListener("click", () => {
      scale = clamp(Number((scale - 0.05).toFixed(2)), 0.85, 1.25);
      applyFontScale(scale);
      saveFontScale(scale);
    });

    reset.addEventListener("click", () => {
      scale = 1;
      applyFontScale(scale);
      saveFontScale(scale);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyFontScale(loadFontScale());
    wireFontButtons();
    startClock();
  });
})();
