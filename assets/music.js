/* Music page: filter, search and sort the 79 releases in KK_ALBUMS.
   Links like /music/music.html?era=octagon or ?q=octagon open pre-filtered. */
(function () {
  'use strict';
  var KK = window.KK;
  var all = window.KK_ALBUMS || [];
  var grid = document.getElementById('albums');
  var count = document.getElementById('count');
  var q = document.getElementById('q');
  var sort = document.getElementById('sort');
  var chips = document.querySelectorAll('[data-show]');

  var params = new URLSearchParams(location.search);
  var state = { show: 'all', q: params.get('q') || '', sort: 'new', era: params.get('era') || '' };
  if (state.q) q.value = state.q;

  var era = state.era && (window.KK_ERAS || []).filter(function (e) { return e.id === state.era; })[0];

  function matches(a) {
    if (era && (a.year < era.from || a.year > era.to)) return false;
    if (state.show === 'solo' && (a.kind !== 'solo' || a.type)) return false;
    if (state.show === 'collab' && a.kind !== 'collab') return false;
    if (state.show === 'short' && !/EP|Mixtape|Compilation/.test(a.type || '')) return false;
    if (state.show === 'listen' && !a.links) return false;
    if (state.q) {
      var hay = (a.title + ' ' + a.artist + ' ' + a.year + ' ' + (a.type || '')).toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    }
    return true;
  }

  function render() {
    var list = all.filter(matches);
    if (state.sort === 'old') list = list.slice().reverse();
    if (state.sort === 'az') list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
    grid.innerHTML = list.map(function (a) { return KK.albumCard(a); }).join('');
    var what = list.length === 1 ? 'release' : 'releases';
    count.innerHTML = list.length
      ? 'Showing ' + list.length + ' ' + what + (era ? ' from ' + KK.esc(era.years) + ' (<a href="/music/music.html">show all years</a>)' : '') + '.'
      : 'Nothing matches that. Try a shorter search, or <a href="/music/music.html">show everything</a>.';
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      state.show = c.getAttribute('data-show');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      render();
    });
  });
  q.addEventListener('input', function () { state.q = q.value.trim(); render(); });
  sort.addEventListener('change', function () { state.sort = sort.value; render(); });
  render();
})();
