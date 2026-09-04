/**
 * ============================================================
 *  METÁLICA ZAMBRANO — main.js  (versión robusta)
 *
 *  ESTRATEGIA ANTI-PANTALLA-NEGRA:
 *  - CSS no oculta nada: todos los elementos son visibles por defecto.
 *  - GSAP setea los estados iniciales (opacity/transform) ANTES de animar.
 *  - Si GSAP falla, el sitio es 100% legible igual.
 *  - Si prefersReducedMotion, no hay animaciones.
 * ============================================================
 */

'use strict';

/* ─── ¿GSAP disponible? ─────────────────────────────────────── */
const HAS_GSAP = typeof gsap !== 'undefined';
const HAS_ST   = typeof ScrollTrigger !== 'undefined';

if (HAS_GSAP && HAS_ST) {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAN_ANIMATE    = HAS_GSAP && !prefersReduced;

/* ─── UTILIDADES ────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

function setText(id, val) {
  const el = $(id);
  if (el && val !== undefined) el.textContent = val;
}

function setAttr(id, attr, val) {
  const el = $(id);
  if (el) el.setAttribute(attr, val);
}

function setLink(id, href, text) {
  const el = $(id);
  if (!el) return;
  el.href = href;
  if (text !== undefined) el.textContent = text;
}

/**
 * Construye spans .word-wrap > .word-inner por palabra.
 * "/" = salto de línea editorial.
 * Los spans se crean VISIBLES; GSAP los ocultará si va a animar.
 */
function buildWordSpans(element, text) {
  if (!element || !text) return [];
  element.innerHTML = '';
  const spans = [];
  const lines = text.split('/').map(l => l.trim()).filter(Boolean);

  lines.forEach((line, li) => {
    line.split(' ').filter(Boolean).forEach(word => {
      const wrap  = document.createElement('span');
      const inner = document.createElement('span');
      wrap.className  = 'word-wrap';
      inner.className = 'word-inner';
      inner.textContent = word + '\u00A0'; // espacio no-rompible
      wrap.appendChild(inner);
      element.appendChild(wrap);
      spans.push(inner);
    });
    if (li < lines.length - 1) {
      const br = document.createElement('span');
      br.className = 'line-break';
      element.appendChild(br);
    }
  });

  return spans;
}

/** Oculta elementos ANTES de animar (solo si CAN_ANIMATE) */
function hideForAnim(elements, props = { opacity: 0, y: 40 }) {
  if (!CAN_ANIMATE) return;
  if (!HAS_GSAP) return;
  gsap.set(elements, props);
}

/* ─── INICIALIZACIÓN ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  try { initSEO(); }       catch(e) { console.warn('SEO init error:', e); }
  try { initNavbar(); }    catch(e) { console.warn('Navbar init error:', e); }
  try { initHero(); }      catch(e) { console.warn('Hero init error:', e); }
  try { initDeclaracion(); } catch(e) { console.warn('Decl init error:', e); }
  try { initServicios(); } catch(e) { console.warn('Servicios init error:', e); }
  try { initGaleria(); }   catch(e) { console.warn('Galería init error:', e); }
  try { initLightbox(); }  catch(e) { console.warn('Lightbox init error:', e); }
  try { initNosotros(); }  catch(e) { console.warn('Nosotros init error:', e); }
  try { initContacto(); }  catch(e) { console.warn('Contacto init error:', e); }
  try { initFooter(); }    catch(e) { console.warn('Footer init error:', e); }
  try { initWAFloat(); }   catch(e) { console.warn('WA float error:', e); }
  if (!prefersReduced) {
    try { initCursor(); }  catch(e) { /* cursor es decorativo, sin warning */ }
  }
});

/* ============================================================
   SEO
   ============================================================ */
function initSEO() {
  const s = CONTENT.seo;
  document.title = s.titulo;
  setAttr('meta-desc',    'content', s.descripcion);
  setAttr('meta-keywords','content', s.keywords);
  setAttr('og-title',     'content', s.titulo);
  setAttr('og-desc',      'content', s.descripcion);
  setAttr('favicon',      'href',    CONTENT.imagenes.favicon);
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const header     = document.querySelector('.header');
  const hamburger  = $('hamburger');
  const navMobile  = $('nav-mobile');
  const navList    = $('nav-list');
  const mobileList = $('mobile-list');

  setAttr('nav-logo',    'src',  CONTENT.imagenes.logo);
  setAttr('footer-logo', 'src',  CONTENT.imagenes.logo);
  setAttr('nav-cta',     'href', CONTENT.hero.ctaLink);
  setAttr('mobile-cta',  'href', CONTENT.hero.ctaLink);

  const buildLi = (item, onClick) => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    if (onClick) a.addEventListener('click', onClick);
    li.appendChild(a);
    return li;
  };

  const closeMobile = () => {
    hamburger && hamburger.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    navMobile && navMobile.classList.remove('open');
    navMobile && navMobile.setAttribute('aria-hidden', 'true');
  };

  CONTENT.menu.forEach(item => {
    navList    && navList.appendChild(buildLi(item));
    mobileList && mobileList.appendChild(buildLi(item, closeMobile));
  });

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      navMobile.classList.toggle('open', open);
      navMobile.setAttribute('aria-hidden', String(!open));
    });
  }

  document.addEventListener('click', e => {
    if (header && !header.contains(e.target)) closeMobile();
  });

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
}

function updateActiveLink() {
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('#nav-list a, #mobile-list a').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

/* ============================================================
   HERO
   ============================================================ */
function initHero() {
  const h = CONTENT.hero;

  setAttr('hero-img', 'src', CONTENT.imagenes.hero);

  const titleEl = $('hero-title');
  const spans   = buildWordSpans(titleEl, h.titulo);

  setText('hero-sub',      h.subtitulo);
  setText('hero-credit',   h.credito);
  setText('hero-cta-text', h.ctaTexto);
  setAttr('hero-cta', 'href', h.ctaLink);

  if (!CAN_ANIMATE) return;

  const tl = gsap.timeline({ delay: 0.2 });
  
  tl.from(spans, { y: '105%', opacity: 0, duration: 0.85, stagger: 0.07, ease: 'power4.out' })
    .from('#hero-sub-wrap', { y: 20, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
    .from('#hero-cta-wrap', { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
    .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');

  // Parallax imagen hero al hacer scroll
  if (HAS_ST) {
    gsap.to('#hero-img', {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

/* ============================================================
   DECLARACIÓN + PARALLAX
   ============================================================ */
function initDeclaracion() {
  const d    = CONTENT.declaracion;
  const imgs = CONTENT.imagenes.galeria;

  const titleEl = $('decl-title');
  const spans   = buildWordSpans(titleEl, d.frase);
  setText('decl-detail', d.detalle);

  // Poblar columnas de parallax
  const distribute = [
    [$('pcol-left'),  imgs.slice(0, 3)],
    [$('pcol-mid'),   imgs.slice(3, 6)],
    [$('pcol-right'), imgs.slice(6, 9)]
  ];
  distribute.forEach(([col, list]) => {
    if (!col) return;
    list.forEach(src => {
      const div = document.createElement('div');
      div.className = 'parallax-img-item';
      div.innerHTML = `<img src="${src}" alt="Trabajo metálico — Metálica Zambrano" loading="lazy" />`;
      col.appendChild(div);
    });
  });

  if (!CAN_ANIMATE || !HAS_ST) return;

  gsap.from('.decl-eyebrow', {
    opacity: 0, y: 20, duration: 0.6,
    scrollTrigger: { trigger: '.section-declaracion', start: 'top 78%' }
  });

  gsap.from(spans, {
    y: '105%', opacity: 0, duration: 0.75, stagger: 0.07, ease: 'power4.out',
    scrollTrigger: { trigger: '.decl-title', start: 'top 82%' }
  });

  gsap.from('.decl-detail', {
    opacity: 0, y: 20, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.decl-detail', start: 'top 88%' }
  });

  // Parallax de columnas a distintas velocidades
  [
    { sel: '#pcol-left',  y: -30 },
    { sel: '#pcol-mid',   y: -70 },
    { sel: '#pcol-right', y: -110 }
  ].forEach(({ sel, y }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.to(el, {
      y,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8
      }
    });
  });
}

/* ============================================================
   SERVICIOS
   ============================================================ */
function initServicios() {
  const grid = $('servicios-grid');
  if (!grid) return;

  CONTENT.servicios.forEach(srv => {
    const card = document.createElement('div');
    card.className = 'srv-card';
    card.innerHTML = `
      <div class="srv-number">${srv.numero}</div>
      <h3 class="srv-title">${srv.titulo}</h3>
      <p class="srv-desc">${srv.descripcion}</p>
      <p class="srv-detail">${srv.detalle}</p>
    `;
    grid.appendChild(card);
  });

  if (!CAN_ANIMATE || !HAS_ST) return;

  gsap.from('.srv-card', {
    opacity: 0, y: 40,
    duration: 0.65, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.servicios-grid', start: 'top 82%' }
  });
}

/* ============================================================
   GALERÍA COMPLETA
   ============================================================ */
function initGaleria() {
  const grid     = $('galeria-grid');
  const TOTAL    = 41;

  const labels = [
    'Estructuras metálicas','Portón artístico','Rejas de seguridad','Soldadura estructural',
    'Herrería artística','Escalera metálica','Galpón industrial','Pasamanos','Portón corredizo',
    'Celosía decorativa','Vigas estructurales','Techo metálico','Puerta de hierro','Marco metálico',
    'Columna reforzada','Soporte industrial','Balcón metálico','Reja artística','Puerta comercial',
    'Estructura de techo','Herraje especial','Peldaños metálicos','Viga de acero','Cerramiento',
    'Malla metálica','Portón batiente','Armadura estructural','Tubo rectangular','Fierro corrugado',
    'Escalera caracol','Marco de ventana','Baranda metálica','Refuerzo estructural','Trabajo personalizado',
    'Estructura galería','Poste metálico','Compuerta metálica','Cubierta metálica','Chasis estructural',
    'Ensamblaje especial','Herrería artística'
  ];

  for (let i = 1; i <= TOTAL; i++) {
    const src   = `assets/images/gallery/trabajo_${i}.jpg`;
    const label = labels[i - 1] || `Trabajo ${i}`;
    const item  = document.createElement('div');
    item.className       = 'gal-item';
    item.dataset.index   = i - 1;
    item.dataset.src     = src;
    item.dataset.caption = label;
    item.innerHTML = `
      <img src="${src}" alt="${label} — Metálica Zambrano" loading="lazy" />
      <div class="gal-overlay">
        <div class="gal-zoom">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
        </div>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(i - 1));
    grid.appendChild(item);
  }

  if (!CAN_ANIMATE || !HAS_ST) return;

  gsap.from('.gal-item', {
    opacity: 0, scale: 0.95,
    duration: 0.55,
    stagger: { each: 0.03, grid: 'auto', from: 'start' },
    ease: 'power2.out',
    scrollTrigger: { trigger: '.galeria-grid', start: 'top 82%' }
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
let lbIndex = 0;
const LB_TOTAL = 41;

function initLightbox() {
  const lb    = $('lightbox');
  const close = $('lb-close');
  const prev  = $('lb-prev');
  const next  = $('lb-next');
  if (!lb) return;

  close && close.addEventListener('click', closeLightbox);
  prev  && prev.addEventListener('click',  () => navLightbox(-1));
  next  && next.addEventListener('click',  () => navLightbox(+1));

  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(+1);
  });

  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) navLightbox(d > 0 ? 1 : -1);
  });
}

function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  const lb = $('lightbox');
  if (lb) lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = $('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function navLightbox(dir) {
  lbIndex = (lbIndex + dir + LB_TOTAL) % LB_TOTAL;
  updateLightbox();
}

function updateLightbox() {
  const items = document.querySelectorAll('.gal-item');
  const item  = items[lbIndex];
  if (!item) return;
  const img = $('lb-img');
  const cap = $('lb-cap');
  if (img) { img.src = item.dataset.src; img.alt = item.dataset.caption; }
  if (cap)   cap.textContent = `${item.dataset.caption} — ${lbIndex + 1}/${LB_TOTAL}`;
}

/* ============================================================
   NOSOTROS
   ============================================================ */
function initNosotros() {
  const n = CONTENT.nosotros;

  setText('nos-tagline', n.tagline);

  const nosTitle = $('nos-title');
  const nosSpans = buildWordSpans(nosTitle, n.titulo);

  const parrafosEl = $('nos-parrafos');
  if (parrafosEl) {
    n.parrafos.forEach(p => {
      const el = document.createElement('p');
      el.textContent = p;
      parrafosEl.appendChild(el);
    });
  }

  const statsEl = $('nos-stats');
  if (statsEl) {
    n.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'nos-stat';
      div.innerHTML = `<span class="nos-stat-val">${s.valor}</span><span class="nos-stat-lbl">${s.label}</span>`;
      statsEl.appendChild(div);
    });
  }

  if (!CAN_ANIMATE || !HAS_ST) return;

  gsap.from(nosSpans, {
    y: '105%', opacity: 0, duration: 0.75, stagger: 0.07, ease: 'power4.out',
    scrollTrigger: { trigger: '#nos-title', start: 'top 82%' }
  });

  gsap.from('#nos-parrafos p', {
    opacity: 0, y: 20, duration: 0.65, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#nos-parrafos', start: 'top 80%' }
  });

  gsap.from('.nos-stat', {
    opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '.nos-stats', start: 'top 88%' }
  });

  gsap.from('.nos-img-wrap', {
    opacity: 0, y: 40, duration: 0.85, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.nos-visual-col', start: 'top 78%' }
  });
}

/* ============================================================
   CONTACTO
   ============================================================ */
function initContacto() {
  const c = CONTENT.contacto;

  const ctaTitle = $('cta-title');
  const ctaSpans = buildWordSpans(ctaTitle, c.tituloHero);
  setText('cta-sub', c.subtitulo);

  const dirEl = $('cta-dir');
  if (dirEl) dirEl.textContent = c.direccion + ', ' + c.ciudad;

  setLink('cta-email', `mailto:${c.email}`, c.email);
  setLink('cta-tel1',  `tel:+${c.telefono1Raw}`, c.telefono1);
  setLink('cta-tel2',  `tel:+${c.telefono2Raw}`, c.telefono2);
  setLink('cta-wa1',   c.whatsappLink1, c.telefono1);
  setLink('cta-wa2',   c.whatsappLink2, c.telefono2);

  setAttr('qr-img', 'src', CONTENT.imagenes.qr);
  setText('qr-texto', c.qrTexto);
  setAttr('qr-cta', 'href', c.whatsappLink1);
  setAttr('map-iframe', 'src', c.mapaEmbed);

  if (!CAN_ANIMATE || !HAS_ST) return;

  gsap.from(ctaSpans, {
    y: '105%', opacity: 0, duration: 0.75, stagger: 0.07, ease: 'power4.out',
    scrollTrigger: { trigger: '#cta-title', start: 'top 82%' }
  });

  gsap.from('.cta-sub', {
    opacity: 0, y: 16, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-sub', start: 'top 88%' }
  });

  gsap.from('.cta-card', {
    opacity: 0, x: -20, duration: 0.55, stagger: 0.09, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-cards', start: 'top 82%' }
  });

  gsap.from('.cta-right', {
    opacity: 0, x: 20, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-right', start: 'top 82%' }
  });
}

/* ============================================================
   FOOTER
   ============================================================ */
function initFooter() {
  const e = CONTENT.empresa;
  const c = CONTENT.contacto;

  setText('footer-slogan',    e.slogan);
  setText('footer-copyright', e.copyright);

  const ftNav = $('footer-nav-list');
  if (ftNav) {
    CONTENT.menu.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
      ftNav.appendChild(li);
    });
  }

  setLink('ft-tel',   `tel:+${c.telefono1Raw}`);
  setText('ft-tel-text', c.telefono1);
  setLink('ft-wa',    c.whatsappLink1);
  setLink('ft-email', `mailto:${c.email}`);
  setText('ft-email-text', c.email);
}

/* ============================================================
   BOTÓN FLOTANTE WHATSAPP
   ============================================================ */
function initWAFloat() {
  setAttr('wa-float', 'href', CONTENT.contacto.whatsappLink1);
}

/* ============================================================
   CURSOR (solo desktop, decorativo)
   ============================================================ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cursor = $('cursor');
  if (!cursor) return;

  const dot  = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  const animRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  };
  animRing();

  document.querySelectorAll('a, button, .gal-item, .srv-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}
