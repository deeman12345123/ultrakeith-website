/* Home page: fills the hero, latest releases, era tiles, a random persona and videos. */
(function () {
  'use strict';
  var KK = window.KK;
  var albums = window.KK_ALBUMS || [];
  var find = function (t) { return albums.filter(function (a) { return a.title === t; })[0]; };

  // Hero cover and listen links for the newest release
  document.querySelectorAll('[data-cover]').forEach(function (el) {
    var a = find(el.getAttribute('data-cover'));
    if (!a) return;
    el.innerHTML = a.cover
      ? '<div class="album__cover"><img src="' + KK.esc(a.cover) + '" alt="' + KK.esc(a.title) + ' cover" width="520" height="520"></div>'
      : '<div class="album__cover album__cover--none" role="img" aria-label="' + KK.esc(a.title) + '"><span style="font-size:clamp(1.6rem,5vw,3rem)">' + KK.esc(a.title) + '</span></div>';
  });
  document.querySelectorAll('[data-listen]').forEach(function (el) {
    var a = find(el.getAttribute('data-listen'));
    if (a && a.links) el.innerHTML = KK.listenLinks(a.links, a.title).replace('class="listen"', 'class="listen listen--big"');
  });
  document.querySelectorAll('[data-also]').forEach(function (el) {
    var a = find(el.getAttribute('data-also'));
    if (!a) return;
    if (a.cover) el.insertAdjacentHTML('afterbegin', '<img src="' + KK.esc(a.cover) + '" alt="' + KK.esc(a.title) + ' cover" width="72" height="72" loading="lazy">');
    if (a.links) el.querySelector('p').insertAdjacentHTML('beforeend', KK.listenLinks(a.links, a.title));
  });

  // Newest six releases
  var rail = document.getElementById('latest-rail');
  // A release marked front: false in albums.js stays on the Music page but never leads here.
  var upFront = albums.filter(function (a) { return a.front !== false; });
  if (rail) rail.innerHTML = upFront.slice(0, 6).map(function (a) { return KK.albumCard(a); }).join('');

  // Era tiles
  var tiles = document.getElementById('era-tiles');
  if (tiles && window.KK_ERAS) {
    tiles.innerHTML = window.KK_ERAS.map(function (e) {
      return '<a class="era-tile" href="/history.html#' + e.id + '">' +
        '<img src="' + KK.esc(e.image) + '" alt="" loading="lazy">' +
        '<span class="era-tile__text"><span class="era-tile__years">' + KK.esc(e.years) + '</span>' +
        '<span class="era-tile__name">' + KK.esc(e.title) + '</span></span></a>';
    }).join('');
  }

  // Random persona, favouring ones with a picture
  var pick = document.getElementById('persona-pick');
  var people = (window.KK_PERSONAS || []).filter(function (p) { return p.image; });
  var last = -1;
  function another() {
    if (!pick || !people.length) return;
    var i;
    do { i = Math.floor(Math.random() * people.length); } while (people.length > 1 && i === last);
    last = i;
    pick.innerHTML = KK.personaCard(people[i]);
  }
  another();
  var btn = document.getElementById('another');
  if (btn) btn.addEventListener('click', another);

  // Videos: the three newest
  var vids = document.getElementById('home-videos');
  if (vids && window.KK_VIDEOS) {
    vids.innerHTML = window.KK_VIDEOS.filter(function (v) { return v.home; }).slice(0, 3).map(KK.videoCard).join('');
  }
})();
