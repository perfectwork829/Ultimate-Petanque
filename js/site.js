(function () {
  function setLang(lang) {
    document.body.classList.remove('lang-fr', 'lang-en');
    document.body.classList.add(lang === 'en' ? 'lang-en' : 'lang-fr');
    document.documentElement.lang = lang === 'en' ? 'en' : 'fr';
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      var isEn = btn.getAttribute('data-lang') === 'en';
      btn.classList.toggle('active', (lang === 'en' && isEn) || (lang === 'fr' && !isEn));
    });
    try {
      localStorage.setItem('up-lang', lang);
    } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try {
      saved = localStorage.getItem('up-lang');
    } catch (e) {}
    var browser = (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'fr';
    setLang(saved === 'en' || saved === 'fr' ? saved : browser);
  }

  function initNav() {
    var path = (window.location.pathname || '').split('/').pop() || 'index.html';
    if (path === '' || path === '/') path = 'index.html';
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('mailto:') === 0) return;
      var linkFile = href.split('/').pop() || 'index.html';
      if (path === linkFile) a.classList.add('active');
    });
  }

  window.setLang = setLang;
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
  });
})();
