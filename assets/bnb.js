/* Apartment 223: listen links for First Come, First Served. */
(function () {
  var a = (window.KK_ALBUMS || []).filter(function (x) { return x.title === 'First Come, First Served'; })[0];
  var el = document.getElementById('ffs-listen');
  if (a && el) el.innerHTML = window.KK.listenLinks(a.links, a.title) || '<p><a href="/music/music.html?q=first+come">Find it on the music page</a></p>';
})();
