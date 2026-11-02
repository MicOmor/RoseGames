(() => {
  const key = 'rosegames-appearance';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['light', 'dark', 'system'].includes(value);
  let preference = 'system';
  try { const saved = localStorage.getItem(key); if (valid(saved)) preference = saved; } catch {}
  function apply() {
    const mode = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.appearance = mode;
    document.documentElement.style.colorScheme = mode;
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.content = mode === 'dark' ? '#211c1b' : '#f8f6ef';
    window.dispatchEvent(new CustomEvent('rosegames:appearance'));
  }
  window.RoseAppearance = {
    get preference() { return preference; },
    get dark() { return document.documentElement.dataset.appearance === 'dark'; },
    set(value) {
      if (!valid(value)) return;
      preference = value;
      try { localStorage.setItem(key, value); } catch {}
      apply();
    }
  };
  media.addEventListener('change', () => { if (preference === 'system') apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : 'system';
      apply();
    }
  });
  apply();
})();
