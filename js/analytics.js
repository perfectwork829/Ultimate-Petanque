/* Marketing pixel.
   No pixel ID was supplied with this site, so nothing is loaded.
   Cloudflare Web Analytics, when switched on for the zone, is injected by
   Cloudflare itself. Do not paste that beacon here as well.
   When the owner has an ID, set one of these before this file loads:
     window.UP_ANALYTICS = { provider: 'google', id: 'G-XXXXXXXX' };
     window.UP_ANALYTICS = { provider: 'meta', id: '1234567890' };
*/
(function () {
  var cfg = window.UP_ANALYTICS;
  if (!cfg || !cfg.provider || !cfg.id) return;

  if (cfg.provider === 'google' && /^G-[A-Z0-9]+$/.test(cfg.id)) {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.id);
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.id);
    return;
  }

  if (cfg.provider === 'meta' && /^\d{8,20}$/.test(cfg.id)) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', cfg.id);
    window.fbq('track', 'PageView');
  }
})();
