/* History page: fills each era's records, personas, videos and old-site photos,
   and lights up the era menu as you scroll. */
(function () {
  'use strict';
  var KK = window.KK;
  var eras = window.KK_ERAS || [];
  var albums = window.KK_ALBUMS || [];
  var personas = window.KK_PERSONAS || [];
  var videos = window.KK_VIDEOS || [];
  var photos = window.KK_PHOTOS || [];
  var MAX_ALBUMS = 10, MAX_PERSONAS = 8;

  function sub(title, more) {
    return '<div class="section-head" style="margin:44px 0 18px"><h3 class="era__sub" style="margin:0">' + title + '</h3>' + (more || '') + '</div>';
  }

  eras.forEach(function (e) {
    var sec = document.querySelector('[data-era="' + e.id + '"]');
    if (!sec) return;
    var fill = function (slot, html) { var el = sec.querySelector('[data-slot="' + slot + '"]'); if (el) el.innerHTML = html; };

    // Records: oldest first. Long eras show the main albums and link to the rest.
    var recs = albums.filter(function (a) { return a.year >= e.from && a.year <= e.to; }).reverse();
    if (recs.length) {
      var shown = recs.length > MAX_ALBUMS ? recs.filter(function (a) { return !a.type || a.type === 'Group'; }).slice(0, MAX_ALBUMS) : recs;
      var more = recs.length > shown.length ? '<a class="text-link" href="/music/music.html?era=' + e.id + '">All ' + recs.length + ' from these years</a>' : '';
      fill('albums', sub('Records', more) + '<div class="albums albums--5">' + shown.map(function (a) { return KK.albumCard(a); }).join('') + '</div>');
    }

    var ps = personas.filter(function (p) { return p.era === e.id; });
    if (ps.length) {
      var pics = ps.filter(function (p) { return p.image; }).concat(ps.filter(function (p) { return !p.image; }));
      var pmore = ps.length > MAX_PERSONAS ? '<a class="text-link" href="/personas/personas.html?era=' + e.id + '">All ' + ps.length + ' personas from these years</a>' : '';
      fill('personas', sub('Personas', pmore) + '<div class="cards">' + pics.slice(0, MAX_PERSONAS).map(KK.personaCard).join('') + '</div>');
    }

    var vs = videos.filter(function (v) { return v.era === e.id; });
    if (vs.length) fill('videos', sub('Videos') + '<div class="videos videos--3">' + vs.map(KK.videoCard).join('') + '</div>');

    var ph = photos.filter(function (p) { return p.era === e.id; });
    if (ph.length) {
      fill('photos', sub('From the ultrakeith.net archive') + '<div class="photo-strip">' + ph.map(function (p) {
        return '<figure><a href="' + KK.esc(p.src) + '"><img src="' + KK.esc(p.src) + '" alt="' + KK.esc(p.alt) + '" loading="lazy"></a>' +
          '<figcaption>' + KK.esc(p.caption || '') + (p.credit ? ' ' + KK.esc(p.credit) + '.' : '') + '</figcaption></figure>';
      }).join('') + '</div>');
    }
  });

  // Highlight the era in view
  var links = document.querySelectorAll('.era-nav a');
  if ('IntersectionObserver' in window && links.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.era').forEach(function (s) { io.observe(s); });
  }
})();
