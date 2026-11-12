/* The five eras used by the History page and the home page.
   from/to are years: albums and personas are placed by their year. */
window.KK_ERAS = [
  { id: 'breakers', years: '1984', title: 'Activity and the New York City Breakers', from: 0, to: 1984,
    image: '/personas/activity.jpg', alt: 'Activity, Keith\'s breakdancing persona' },
  { id: 'ultramagnetic', years: '1984-94', title: 'Ultramagnetic MCs', from: 1985, to: 1994,
    image: '/umcbio.jpg', alt: 'Ultramagnetic MCs' },
  { id: 'octagon', years: '1995-2001', title: 'Dr. Octagon, Black Elvis, Dr. Dooom', from: 1995, to: 2001,
    image: '/octobio.jpg', alt: 'Kool Keith in the Dr. Octagon years' },
  { id: 'commissioner', years: '2002-15', title: 'The Commi$$ioner years', from: 2002, to: 2015,
    image: '/personas/tashandorrsett.jpg', alt: 'Tashan Dorrsett, one of Keith\'s 2000s personas' },
  { id: 'today', years: '2016-now', title: 'Today', from: 2016, to: 9999,
    image: '/kkbio-current.jpg', alt: 'Kool Keith today' }
];
window.KK_eraOf = function (year) {
  year = Number(year);
  for (var i = 0; i < window.KK_ERAS.length; i++) {
    var e = window.KK_ERAS[i];
    if (year >= e.from && year <= e.to) return e.id;
  }
  return 'today';
};
