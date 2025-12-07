// js/players_autofilter.js
(function () {
  function getParam(name) {
    const u = new URL(window.location.href);
    return u.searchParams.get(name);
  }

  const desired = getParam("q");
  if (!desired) return;

  function applyFilter() {
    const input = document.getElementById("filterName");
    const btn = document.getElementById("btnFilter");
    if (!input || !btn) return;
    input.value = desired;
    btn.click();
  }

  // Ha az adatok már betöltődtek, azonnal szűrünk,
  // különben várunk egy eseményre / teljes betöltésre.
  if (window._allScorers && window._allScorers.length) {
    applyFilter();
  } else {
    document.addEventListener("leaderboard:ready", applyFilter, { once: true });
    window.addEventListener("load", applyFilter, { once: true }); // végső fallback
  }
})();
