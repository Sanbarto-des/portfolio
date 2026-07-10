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

// ---- project page image loader — hold the themed loader until the top images are in ----
(function () {
  var loader = document.getElementById("ploader");
  if (!loader) return;                                   // only the project template pages
  var ring = loader.querySelector(".ploader-ring");
  var pctEl = loader.querySelector(".ploader-pct");
  var body = document.getElementById("bodyEl");

  function setPct(v) {
    v = Math.max(0, Math.min(100, Math.round(v)));
    if (ring) ring.style.setProperty("--p", v);
    if (pctEl) pctEl.textContent = v + "%";
  }
  function reveal() {
    setPct(100);
    document.documentElement.classList.add("imgs-ready");  // triggers the rise-in entrance
    loader.classList.add("hidden");
    setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
  }

  // wait on the above-the-fold images (cover + next couple); force them to load eagerly
  var imgs = body ? Array.prototype.slice.call(body.querySelectorAll("img")) : [];
  var priority = imgs.slice(0, 3);
  priority.forEach(function (im) { try { im.loading = "eager"; im.fetchPriority = "high"; } catch (e) {} });

  var total = priority.length;
  if (total === 0) { reveal(); return; }

  var done = 0, finished = false, start = Date.now(), MIN = 500, MAX = 6000;
  function finish() {
    if (finished) return; finished = true;
    setTimeout(reveal, Math.max(0, MIN - (Date.now() - start)));   // brief min so it never flickers
  }
  function bump() {
    done++;
    setPct(done / total * 100);
    if (done >= total) finish();
  }
  priority.forEach(function (im) {
    if (im.complete && im.naturalWidth > 0) { bump(); }
    else {
      im.addEventListener("load", bump, { once: true });
      im.addEventListener("error", bump, { once: true });
    }
  });
  setTimeout(finish, MAX);   // hard cap so a slow/failed image never traps the page
})();
