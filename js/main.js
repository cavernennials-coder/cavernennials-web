(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
})();

/* El recomendado de la caverna — rota un episodio por semana, empezando
   por el Epi. 1 y subiendo. Ver js/episodes.js para el catálogo. */
(function () {
  var section = document.querySelector('#recomendado');
  var episodes = window.CAVERNENNIALS_EPISODES;
  if (!section || !episodes || episodes.length < 2) return;

  // El último episodio ya se muestra arriba, así que no entra en la rotación.
  var pool = episodes.slice(0, episodes.length - 1);

  var WEEK = 7 * 24 * 60 * 60 * 1000;
  var anchor = Date.UTC(2026, 7, 3); // lunes 3 de agosto de 2026 = semana del Epi. 1
  var now = new Date();
  var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  var weeks = Math.floor((today - anchor) / WEEK);
  if (weeks < 0) weeks = 0;

  var ep = pool[weeks % pool.length];

  var card = section.querySelector('.rec-card');
  var img = card.querySelector('img');

  card.href = 'https://www.youtube.com/watch?v=' + ep.id;
  img.src = 'https://img.youtube.com/vi/' + ep.id + '/hqdefault.jpg';
  img.alt = ep.num;
  card.querySelector('.badge').textContent = ep.num;
  card.querySelector('h3').textContent = ep.title;
  card.querySelector('.guest').textContent = ep.guest;

  section.hidden = false;
})();
