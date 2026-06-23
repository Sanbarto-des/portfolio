// site.js — prefetch same-origin pages on hover/touch so navigation feels instant.
// Static MPA enhancement: no framework, degrades gracefully.
(function () {
  if (!document.querySelector) return;
  var seen = {};

  function prefetch(path) {
    if (seen[path]) return;
    seen[path] = true;
    var link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    document.head.appendChild(link);
  }

  function onIntent(e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;          // external link
    if (url.pathname === location.pathname) return;       // same page / in-page anchor
    prefetch(url.pathname + url.search);
  }

  document.addEventListener("pointerover", onIntent, { passive: true });
  document.addEventListener("touchstart", onIntent, { passive: true });
})();
