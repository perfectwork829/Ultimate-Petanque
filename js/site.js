(function () {
  var LANGS = ['fr', 'en', 'es', 'de', 'th', 'ar', 'it', 'nl'];

  function norm(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function clearInjected() {
    document.querySelectorAll('[data-xlang]').forEach(function (node) {
      node.remove();
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = 'fr';
    LANGS.forEach(function (code) {
      document.body.classList.remove('lang-' + code);
    });
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    clearInjected();
    if (lang !== 'fr' && lang !== 'en') {
      var pack = (window.UP_DICT && window.UP_DICT[lang]) || {};
      document.querySelectorAll('[lang="en"]').forEach(function (enEl) {
        var source = norm(enEl.textContent);
        var translated = pack[source] || source;
        var node = enEl.cloneNode(false);
        node.setAttribute('lang', lang);
        node.setAttribute('data-xlang', '1');
        node.textContent = translated;
        enEl.parentNode.insertBefore(node, enEl.nextSibling);
      });
    }
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    var titleKey = document.body.getAttribute('data-title-en');
    if (titleKey) {
      var packTitle = (window.UP_DICT && window.UP_DICT[lang]) || {};
      var titleFr = document.body.getAttribute('data-title-fr');
      document.title = lang === 'fr' ? (titleFr || document.title) : (packTitle[titleKey] || titleKey);
    }
    try {
      localStorage.setItem('up-lang', lang);
    } catch (e) {}
  }

  function browserLang() {
    var code = (navigator.language || 'fr').toLowerCase().slice(0, 2);
    return LANGS.indexOf(code) >= 0 ? code : 'fr';
  }

  function initLang() {
    var saved = null;
    try {
      saved = localStorage.getItem('up-lang');
    } catch (e) {}
    setLang(LANGS.indexOf(saved) >= 0 ? saved : browserLang());
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

  document.addEventListener('click', function (event) {
    var btn = event.target.closest ? event.target.closest('.lang-switch button') : null;
    if (!btn) return;
    setLang(btn.getAttribute('data-lang'));
  });

  window.setLang = setLang;
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
  });
})();
