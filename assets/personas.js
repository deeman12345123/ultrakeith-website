/* Personas page: filter by era, search, random card. ?era=octagon opens one era. */
(function () {
  'use strict';
  var KK = window.KK;
  var all = window.KK_PERSONAS || [];
  var eras = window.KK_ERAS || [];
  var grid = document.getElementById('cards');
  var count = document.getElementById('pcount');
  var q = document.getElementById('pq');
  var chipBox = document.getElementById('era-chips');

  var state = { era: new URLSearchParams(location.search).get('era') || '', q: '' };

  eras.forEach(function (e) {
    var n = all.filter(function (p) { return p.era === e.id; }).length;
    if (!n) return;
    chipBox.insertAdjacentHTML('beforeend', '<button type="button" class="chip" data-era="' + e.id + '" aria-pressed="false">' + KK.esc(e.years) + '</button>');
  });
  var chips = chipBox.querySelectorAll('[data-era]');
  function pressChips() { chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-era') === state.era)); }); }

  function render() {
    var list = all.filter(function (p) {
      if (state.era && p.era !== state.era) return false;
      if (state.q) return (p.name + ' ' + (p.aka || '')).toLowerCase().indexOf(state.q.toLowerCase()) !== -1;
      return true;
    });
    grid.innerHTML = list.map(KK.personaCard).join('');
    var era = eras.filter(function (e) { return e.id === state.era; })[0];
    count.textContent = list.length
      ? list.length + (list.length === 1 ? ' persona' : ' personas') + (era ? ' from ' + era.years + ': ' + era.title : '') + '.'
      : 'No persona by that name. Try part of it, like "Dr." or "Willie".';
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { state.era = c.getAttribute('data-era'); pressChips(); render(); });
  });
  q.addEventListener('input', function () { state.q = q.value.trim(); render(); });
  document.getElementById('random').addEventListener('click', function () {
    KK.showPersona(all[Math.floor(Math.random() * all.length)]);
  });
  pressChips();
  render();
})();
