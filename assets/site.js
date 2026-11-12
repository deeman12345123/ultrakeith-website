/* Kool Keith - Official Site
   Shared header, menu and footer for every page. Edit the lists below and
   every page updates. */
(function () {
  'use strict';

  // Every page on the site. "main" pages sit in the top bar, the rest under More.
  var PAGES = [
    { href: '/', label: 'Home', main: true },
    { href: '/music/music.html', label: 'Music', main: true },
    { href: '/history.html', label: 'History', main: true },
    { href: '/personas/personas.html', label: 'Personas', main: true },
    { href: '/videos.html', label: 'Videos', main: true },
    { href: '/tour.html', label: 'Tour', main: true },
    { href: '/bio.html', label: 'Bio', main: true },
    { href: '/press.html', label: 'Bookings & Press', main: true },
    { href: '/shop.html', label: 'Where to buy' },
    { href: '/stats.html', label: 'Stats' },
    { href: '/players/playersclub.html', label: 'Players Club' },
    { href: '/house.html', label: 'Apartment 223' },
    { href: '/bnb.html', label: 'Rent Apartment 223' },
    { href: 'https://ultrakeithdotcom.blogspot.com/', label: 'News', external: true },
    { href: 'https://koolkeith.proboards.com/', label: 'Forum', external: true }
  ];

  // Official accounts. Only confirmed ones go here (see RELEASE-PLAN.md).
  var SOCIALS = [
    // SOCIALS_START
    // SOCIALS_END
  ];

  // GoatCounter analytics: after signing up at goatcounter.com as "koolkeith",
  // remove the two slashes at the start of the next line.
  // var GOATCOUNTER = 'https://koolkeith.goatcounter.com/count';

  var ICONS = {
      "applemusic": "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z",
      "bandcamp": "M0 18.75l7.437-13.5H24l-7.438 13.5H0z",
      "bandsintown": "M6.399 12.8v4.8H19.2v1.6H4.799V0H0v24h24V12.8H6.399Zm4.801-8H6.399v6.4H11.2V4.8Zm6.4 0h-4.8v6.4h4.8V4.8ZM24 0h-4.8v11.2H24V0Z",
      "facebook": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
      "instagram": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
      "spotify": "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
      "tiktok": "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
      "x": "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
      "youtube": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  };

  function icon(name) {
    var d = ICONS[name];
    if (!d) return '';
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + d + '"/></svg>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Album "listen" links. Takes { bandcamp, spotify, apple, youtube } and returns a <ul>.
  var SERVICES = [
    { key: 'bandcamp', label: 'Bandcamp', icon: 'bandcamp' },
    { key: 'spotify', label: 'Spotify', icon: 'spotify' },
    { key: 'apple', label: 'Apple Music', icon: 'applemusic' },
    { key: 'youtube', label: 'YouTube', icon: 'youtube' }
  ];
  function listenLinks(links, title) {
    if (!links) return '';
    var items = SERVICES.filter(function (s) { return links[s.key]; }).map(function (s) {
      var label = title ? 'Listen to ' + title + ' on ' + s.label : 'Listen on ' + s.label;
      return '<li><a href="' + esc(links[s.key]) + '" target="_blank" rel="noopener" aria-label="' + esc(label) + '">' +
        icon(s.icon) + '<span>' + s.label + '</span></a></li>';
    });
    return items.length ? '<ul class="listen">' + items.join('') + '</ul>' : '';
  }

  function socialLinks(cls) {
    return SOCIALS.map(function (s) {
      return '<a class="' + cls + '" href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="Kool Keith on ' + esc(s.name) + '" title="' + esc(s.name) + '">' + icon(s.icon) + '</a>';
    }).join('');
  }

  function here() {
    var p = location.pathname.replace(/index\.html$/, '');
    if (p === '/home.html') p = '/';
    return p;
  }

  function link(p, current) {
    var attrs = p.external ? ' target="_blank" rel="noopener"' : '';
    var cur = !p.external && p.href === current ? ' aria-current="page"' : '';
    return '<a href="' + p.href + '"' + attrs + cur + '>' + esc(p.label) + '</a>';
  }

  function buildHeader(current) {
    var main = PAGES.filter(function (p) { return p.main && p.href !== '/'; });
    var more = PAGES.filter(function (p) { return !p.main; });
    var moreCurrent = more.some(function (p) { return p.href === current; });
    return '' +
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<div class="wrap kk-header__bar">' +
        '<a class="kk-header__logo" href="/" aria-label="Kool Keith home"><img src="/koolkeithmainlogo.png" alt="Kool Keith" width="104" height="48"></a>' +
        '<nav class="kk-nav" aria-label="Main">' +
          '<ul>' + main.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') +
            '<li class="kk-more"><button class="kk-more__btn" type="button" aria-expanded="false" aria-controls="kk-more-panel"' + (moreCurrent ? ' style="color:var(--gold)"' : '') + '>More</button>' +
              '<div class="kk-more__panel" id="kk-more-panel"><ul>' +
                more.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') +
              '</ul></div></li>' +
          '</ul>' +
        '</nav>' +
        '<div class="kk-header__social">' + socialLinks('kk-icon-link') + '</div>' +
        '<button class="kk-menu-btn" type="button" aria-expanded="false" aria-controls="kk-sheet">Menu</button>' +
      '</div>';
  }

  function buildSheet(current) {
    var main = PAGES.filter(function (p) { return p.main; });
    var more = PAGES.filter(function (p) { return !p.main; });
    return '' +
      '<div class="wrap">' +
        '<div class="kk-sheet__top"><img src="/koolkeithmainlogo.png" alt="Kool Keith" width="86" height="40">' +
          '<button class="kk-menu-btn" type="button" data-close>Close</button></div>' +
        '<nav aria-label="All pages">' +
          '<ul class="kk-sheet__main">' + main.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') + '</ul>' +
          '<ul class="kk-sheet__extra">' + more.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') + '</ul>' +
        '</nav>' +
        '<div class="kk-sheet__social">' + socialLinks('kk-icon-link') + '</div>' +
      '</div>';
  }

  function buildFooter(current) {
    var year = new Date().getFullYear();
    var main = PAGES.filter(function (p) { return p.main; });
    var more = PAGES.filter(function (p) { return !p.main; });
    return '' +
      '<div class="wrap">' +
        '<div class="kk-footer__grid">' +
          '<div class="kk-footer__brand">' +
            '<a href="/"><img src="/koolkeithmainlogo.png" alt="Kool Keith" width="121" height="56" loading="lazy"></a>' +
            '<p>Kool Keith - Official Site. Bronx, New York, since 1984.</p>' +
            '<p><a href="/press.html">Bookings and press</a></p>' +
            '<div class="kk-footer__social">' + socialLinks('kk-icon-link') + '</div>' +
          '</div>' +
          '<div><h2>Site</h2><ul>' + main.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') + '</ul></div>' +
          '<div><h2>More</h2><ul>' + more.map(function (p) { return '<li>' + link(p, current) + '</li>'; }).join('') + '</ul></div>' +
          '<div><h2>Listen</h2><ul>' +
            SOCIALS.filter(function (s) { return s.listen; }).map(function (s) {
              return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>';
            }).join('') +
          '</ul></div>' +
        '</div>' +
        '<div class="kk-footer__base">' +
          '<p>&copy; ' + year + ' Kool Keith. All rights reserved.</p>' +
          '<p>koolkeith.net</p>' +
        '</div>' +
      '</div>';
  }

  function setMenu(sheet, btn, open) {
    sheet.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('kk-locked', open);
    if (open) {
      var first = sheet.querySelector('[data-close]');
      if (first) first.focus();
    } else {
      btn.focus();
    }
  }

  function init() {
    var current = here();

    var header = document.getElementById('kk-header');
    if (!header) {
      header = document.createElement('header');
      header.id = 'kk-header';
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.className = 'kk-header';
    header.innerHTML = buildHeader(current);

    var sheet = document.createElement('div');
    sheet.className = 'kk-sheet';
    sheet.id = 'kk-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', 'Menu');
    sheet.innerHTML = buildSheet(current);
    document.body.appendChild(sheet);

    var footer = document.getElementById('kk-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'kk-footer';
      document.body.appendChild(footer);
    }
    footer.className = 'kk-footer';
    footer.innerHTML = buildFooter(current);

    var menuBtn = header.querySelector('.kk-menu-btn');
    menuBtn.addEventListener('click', function () { setMenu(sheet, menuBtn, true); });
    sheet.querySelector('[data-close]').addEventListener('click', function () { setMenu(sheet, menuBtn, false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.classList.contains('is-open')) setMenu(sheet, menuBtn, false);
    });

    var more = header.querySelector('.kk-more');
    var moreBtn = header.querySelector('.kk-more__btn');
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !more.classList.contains('is-open');
      more.classList.toggle('is-open', open);
      moreBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!more.contains(e.target)) { more.classList.remove('is-open'); moreBtn.setAttribute('aria-expanded', 'false'); }
    });
    more.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { more.classList.remove('is-open'); moreBtn.setAttribute('aria-expanded', 'false'); moreBtn.focus(); }
    });

    // Click-to-play YouTube: show a thumbnail first, load the player only when asked.
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.video__play');
      if (!b) return;
      var id = b.getAttribute('data-id');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      frame.title = b.getAttribute('data-title') || 'YouTube video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      b.parentNode.replaceChild(frame, b);
    });

    if (typeof GOATCOUNTER !== 'undefined') {
      var gc = document.createElement('script');
      gc.async = true;
      gc.src = 'https://gc.zgo.at/count.js';
      gc.setAttribute('data-goatcounter', GOATCOUNTER);
      document.head.appendChild(gc);
    }
  }

  // A video card: thumbnail with a play button, swapped for the player on click.
  function videoCard(v) {
    return '<figure class="video"><div class="video__frame">' +
      '<button class="video__play" type="button" data-id="' + esc(v.id) + '" data-title="' + esc(v.title) + '" aria-label="Play ' + esc(v.title) + '">' +
        '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" loading="lazy"><span></span>' +
      '</button></div>' +
      '<figcaption>' + esc(v.title) + (v.note ? '<small>' + esc(v.note) + '</small>' : '') + '</figcaption></figure>';
  }

  // Album card. a = one entry from KK_ALBUMS.
  function albumCard(a, opts) {
    opts = opts || {};
    var tag = opts.tag || 'article';
    var cover = a.cover
      ? '<div class="album__cover"><img src="' + esc(a.cover) + '" alt="' + esc(a.title) + ' cover" loading="lazy" width="300" height="300"></div>'
      : '<div class="album__cover album__cover--none" role="img" aria-label="' + esc(a.title) + ' (no cover yet)"><span>' + esc(a.title) + '</span></div>';
    var meta = '<span>' + a.year + '</span>' + (a.type ? '<span>' + esc(a.type === 'Group' ? 'Group album' : a.type) + '</span>' : '');
    return '<' + tag + ' class="album">' + cover +
      '<h3 class="album__title">' + esc(a.title) + '</h3>' +
      '<p class="album__artist">' + esc(a.artist) + '</p>' +
      '<p class="album__meta">' + meta + '</p>' +
      (opts.noLinks ? '' : listenLinks(a.links, a.title)) +
      '</' + tag + '>';
  }

  // Persona trading card. p = one entry from KK_PERSONAS. Opens the detail view when clicked.
  function personaCard(p) {
    var img = p.image
      ? '<span class="pcard__img"><img src="/personas/' + esc(p.image) + '" alt="" loading="lazy"></span>'
      : '<span class="pcard__img pcard__img--none"><img src="/personas/logoback.png" alt="" loading="lazy"></span>';
    return '<button type="button" class="pcard" data-persona="' + esc(p.number) + '" aria-label="' + esc(p.name) + ', ' + esc(p.year) + '. Open card">' +
      img + '<span class="pcard__no">#' + esc(p.number) + '</span>' +
      '<span class="pcard__body"><span class="pcard__name">' + esc(p.name) + '</span>' +
      '<span class="pcard__year">' + esc(p.year) + (p.aka ? ', aka ' + esc(p.aka) : '') + '</span></span></button>';
  }

  // Detail view for a persona, in a <dialog>. Created once per page.
  function personaDialog() {
    var d = document.getElementById('kk-persona');
    if (d) return d;
    d = document.createElement('dialog');
    d.id = 'kk-persona';
    d.className = 'kk-dialog';
    d.setAttribute('aria-labelledby', 'kk-persona-name');
    document.body.appendChild(d);
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    return d;
  }
  function showPersona(p) {
    var d = personaDialog();
    var img = p.image ? '/personas/' + p.image : '/personas/logoback.png';
    var row = function (k, v) { return v ? '<dt>' + k + '</dt><dd>' + esc(v) + '</dd>' : ''; };
    d.innerHTML = '<div class="kk-dialog__in">' +
      '<button type="button" class="btn btn--ghost kk-dialog__close" data-close>Close</button>' +
      '<div class="pdetail">' +
        '<div><div class="pcard__img' + (p.image ? '' : ' pcard__img--none') + '" style="margin:0"><img src="' + esc(img) + '" alt=""></div></div>' +
        '<div>' +
          '<p class="muted small" style="margin:0 0 4px">Persona #' + esc(p.number) + ', ' + esc(p.year) + '</p>' +
          '<h2 class="h-lg" id="kk-persona-name" style="color:var(--gold);margin-bottom:6px">' + esc(p.name) + '</h2>' +
          (p.aka ? '<p style="margin:0 0 14px">Also known as ' + esc(p.aka) + '</p>' : '') +
          (p.quote ? '<blockquote>&ldquo;' + esc(p.quote.replace(/^["“]+|["”]+$/g, '')) + '&rdquo;</blockquote>' : '') +
          '<p>' + esc(p.biography || '') + '</p>' +
          '<dl>' + row('First used', p.debut) + row('From', p.origin) + row('Age', p.age) + row('Likes', p.likes) + row('Dislikes', p.dislikes) + '</dl>' +
        '</div>' +
      '</div></div>';
    d.querySelector('[data-close]').addEventListener('click', function () { d.close(); });
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  }
  // Any .pcard on any page opens its persona.
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('[data-persona]');
    if (!c || !window.KK_PERSONAS) return;
    var p = window.KK_PERSONAS.filter(function (x) { return x.number === c.getAttribute('data-persona'); })[0];
    if (p) showPersona(p);
  });

  window.KK = { icon: icon, esc: esc, listenLinks: listenLinks, videoCard: videoCard, albumCard: albumCard,
    personaCard: personaCard, showPersona: showPersona, socials: SOCIALS };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
