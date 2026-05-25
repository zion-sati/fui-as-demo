(function () {
  const script = document.currentScript;
  const base = script && script.src ? script.src : window.location.href;
  window.__effindomRuntime = Object.assign({}, window.__effindomRuntime, {
    manifestUrl: new URL('./v2/browser-bridge/effindom.v2.manifest.json', base).toString(),
  });
})();
