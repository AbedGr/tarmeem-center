/* =============================================================================
   main.js - behaviour for the Tarmeem Center website.
   Depends on js/i18n.js (window.I18n) and js/projects.js (window.PROJECTS).
   ============================================================================ */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var I18n = window.I18n;
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var CATEGORIES = ['restoration', 'documentation', 'education', 'exhibitions'];
  var DESKTOP_QUERY = '(min-width: 900px)';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motionOK = function () { return !reduceMotion.matches; };

  /* ------------------------------------------------------------------ utils */

  function qs(selector, scope) { return (scope || doc).querySelector(selector); }
  function qsa(selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); }

  /** Tiny element builder: el('a', { class: 'x', href: '#' }, [child, 'text']) */
  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];
      if (value == null || value === false) { return; }
      if (key === 'class') { node.className = value; }
      else if (key === 'text') { node.textContent = value; }
      else { node.setAttribute(key, value === true ? '' : value); }
    });
    [].concat(children || []).forEach(function (child) {
      if (child == null) { return; }
      node.appendChild(typeof child === 'string' ? doc.createTextNode(child) : child);
    });
    return node;
  }

  function cloneTemplate(id) {
    var tpl = doc.getElementById(id);
    return tpl && tpl.content && tpl.content.firstElementChild
      ? tpl.content.firstElementChild.cloneNode(true)
      : null;
  }

  function isRTL() { return root.dir === 'rtl'; }

  /* ----------------------------------------------------------------- header */

  function initHeader() {
    var header = qs('#site-header');
    var toggle = qs('#nav-toggle');
    var nav = qs('#site-nav');
    if (!header || !toggle || !nav) { return; }

    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', I18n.t(open ? 'nav.close' : 'nav.open'));
      toggle.setAttribute('data-i18n-attr', 'aria-label:' + (open ? 'nav.close' : 'nav.open'));
      nav.classList.toggle('is-open', open);
      doc.body.classList.toggle('nav-open', open);
    };
    var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };

    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    qsa('.site-nav__link', nav).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    doc.addEventListener('click', function (event) {
      if (isOpen() && !header.contains(event.target)) { setOpen(false); }
    });

    var desktop = window.matchMedia(DESKTOP_QUERY);
    var onBreakpoint = function (e) { if (e.matches) { setOpen(false); } };
    if (desktop.addEventListener) { desktop.addEventListener('change', onBreakpoint); }
    else if (desktop.addListener) { desktop.addListener(onBreakpoint); }
  }

  /* ------------------------------------------------------------ active link */

  function initActiveNav() {
    var links = qsa('.site-nav__link[data-nav]');
    if (!links.length || !('IntersectionObserver' in window)) { return; }

    var sections = [
      { id: 'top', node: qs('.hero') },
      { id: 'about', node: qs('#about') },
      { id: 'projects', node: qs('#projects') },
      { id: 'contact', node: qs('#contact') }
    ].filter(function (s) { return s.node; });

    var setActive = function (id) {
      links.forEach(function (link) {
        if (link.getAttribute('data-nav') === id) { link.setAttribute('aria-current', 'true'); }
        else { link.removeAttribute('aria-current'); }
      });
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var match = sections.filter(function (s) { return s.node === entry.target; })[0];
          if (match) { setActive(match.id); }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s.node); });
  }

  /* --------------------------------------------------------------- language */

  function initLanguage() {
    I18n.init();
    qsa('[data-lang]').forEach(function (button) {
      button.addEventListener('click', function () {
        var lang = button.getAttribute('data-lang');
        if (lang !== I18n.getLang()) { I18n.setLang(lang); }
      });
    });
  }

  /* ------------------------------------------------------------ reveal anim */

  var revealObserver = null;

  function observeReveal(nodes) {
    nodes = [].concat(nodes);
    if (!motionOK() || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    nodes.forEach(function (n) { revealObserver.observe(n); });
  }

  function initReveal() {
    observeReveal(qsa('.reveal'));
    var onMotionChange = function () {
      if (!motionOK()) { qsa('.reveal').forEach(function (n) { n.classList.add('is-visible'); }); }
    };
    if (reduceMotion.addEventListener) { reduceMotion.addEventListener('change', onMotionChange); }
  }

  /* ------------------------------------------------------------------ stats */

  function initStats() {
    var values = qsa('.stat__value');
    if (!values.length) { return; }

    var animate = function (node) {
      var raw = (node.getAttribute('data-stat-value') || '').trim();
      var suffix = node.getAttribute('data-stat-suffix') || '';
      var target = /^\d+$/.test(raw) ? parseInt(raw, 10) : NaN;

      if (isNaN(target) || !motionOK()) {
        node.textContent = raw + suffix;
        return;
      }
      var duration = 1200;
      var start = null;
      var step = function (timestamp) {
        if (start === null) { start = timestamp; }
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) { window.requestAnimationFrame(step); }
      };
      window.requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      values.forEach(animate);
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    values.forEach(function (v) { observer.observe(v); });
  }

  /* --------------------------------------------------------------- projects */

  var projectState = { filter: 'all' };
  var filtersNode = qs('#project-filters');
  var gridNode = qs('#project-grid');
  var emptyNode = qs('#projects-empty');
  var statusNode = qs('#projects-status');

  function categoryLabel(category) { return I18n.t('category.' + category); }

  function renderFilters() {
    if (!filtersNode) { return; }
    filtersNode.textContent = '';
    ['all'].concat(CATEGORIES).forEach(function (key) {
      var active = projectState.filter === key;
      var chip = el('button', {
        type: 'button',
        class: 'chip',
        'data-filter': key,
        'aria-pressed': active ? 'true' : 'false',
        text: key === 'all' ? I18n.t('filters.all') : categoryLabel(key)
      });
      chip.addEventListener('click', function () {
        if (projectState.filter === key) { return; }
        projectState.filter = key;
        qsa('.chip', filtersNode).forEach(function (c) {
          c.setAttribute('aria-pressed', c.getAttribute('data-filter') === key ? 'true' : 'false');
        });
        renderProjects();
      });
      filtersNode.appendChild(chip);
    });
  }

  function buildCard(project, index) {
    var title = I18n.pick(project.title);
    var cover = project.cover || {};

    var img = el('img', {
      src: cover.src || '',
      alt: I18n.pick(cover.alt),
      width: '1200',
      height: '800',
      loading: 'lazy',
      decoding: 'async'
    });

    var trigger = el('button', {
      type: 'button',
      class: 'project-card__trigger',
      'data-project-id': project.id,
      'aria-haspopup': 'dialog',
      'aria-label': I18n.t('projects.openDetails', { title: title }),
      text: title
    });
    trigger.addEventListener('click', function () { openProject(project.id, trigger); });

    var cta = el('span', { class: 'project-card__cta', 'aria-hidden': 'true' }, [
      el('span', { text: I18n.t('projects.viewDetails') }),
      cloneTemplate('tpl-icon-arrow')
    ]);

    var meta = el('p', { class: 'project-card__meta' }, [
      el('span', { text: I18n.pick(project.location) }),
      el('span', { class: 'project-card__dot', 'aria-hidden': 'true', text: '\u00B7' }),
      el('span', { text: project.year || '' })
    ]);

    var card = el('article', { class: 'project-card' }, [
      el('div', { class: 'project-card__media' }, [
        img,
        el('span', { class: 'project-card__badge', text: categoryLabel(project.category) })
      ]),
      el('div', { class: 'project-card__body' }, [
        el('h3', { class: 'project-card__title' }, trigger),
        meta,
        cta
      ])
    ]);

    var item = el('li', { class: 'project-grid__item reveal' }, card);
    item.style.setProperty('--i', String(index));
    return item;
  }

  function renderProjects() {
    if (!gridNode) { return; }
    var visible = PROJECTS.filter(function (p) {
      return projectState.filter === 'all' || p.category === projectState.filter;
    });

    gridNode.textContent = '';
    var items = visible.map(buildCard);
    items.forEach(function (item) { gridNode.appendChild(item); });

    if (emptyNode) { emptyNode.hidden = visible.length > 0; }
    if (statusNode) { statusNode.textContent = I18n.t('projects.status', { count: visible.length }); }

    observeReveal(items);
  }

  /* ------------------------------------------------------------------ modal */

  var modal = qs('#project-modal');
  var modalState = { project: null, index: 0, trigger: null, images: [] };

  function modalNodes() {
    return {
      close: qs('#modal-close'),
      image: qs('#gallery-image'),
      prev: qs('#gallery-prev'),
      next: qs('#gallery-next'),
      counter: qs('#gallery-counter'),
      thumbs: qs('#gallery-thumbs'),
      category: qs('#modal-category'),
      title: qs('#modal-title'),
      location: qs('#modal-location'),
      year: qs('#modal-year'),
      description: qs('#modal-description')
    };
  }

  function isModalOpen() { return !!(modal && modal.hasAttribute('open')); }

  function showImage(index) {
    var n = modalNodes();
    var images = modalState.images;
    if (!images.length) { return; }
    index = ((index % images.length) + images.length) % images.length;
    modalState.index = index;

    var current = images[index];
    n.image.src = current.src || '';
    n.image.alt = I18n.pick(current.alt);
    n.counter.textContent = I18n.t('modal.counter', { current: index + 1, total: images.length });

    qsa('button', n.thumbs).forEach(function (btn, i) {
      btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });

    var single = images.length < 2;
    n.prev.hidden = single;
    n.next.hidden = single;
    n.thumbs.hidden = single;

    /* warm the cache for the next image */
    if (!single) {
      var preload = new Image();
      preload.src = images[(index + 1) % images.length].src || '';
    }
  }

  function renderModal() {
    var project = modalState.project;
    if (!project) { return; }
    var n = modalNodes();

    n.category.textContent = categoryLabel(project.category);
    n.title.textContent = I18n.pick(project.title);
    n.location.textContent = I18n.pick(project.location);
    n.year.textContent = project.year || '';

    n.description.textContent = '';
    String(I18n.pick(project.description)).split(/\n\s*\n/).forEach(function (paragraph) {
      if (paragraph.trim()) { n.description.appendChild(el('p', { text: paragraph.trim() })); }
    });

    modalState.images = (project.gallery && project.gallery.length) ? project.gallery : [project.cover];

    n.thumbs.textContent = '';
    modalState.images.forEach(function (image, i) {
      var btn = el('button', {
        type: 'button',
        class: 'gallery__thumb',
        'aria-label': I18n.t('modal.showImage', { index: i + 1 }),
        'aria-pressed': 'false'
      }, el('img', {
        src: image.src || '',
        alt: '',
        width: '1200',
        height: '800',
        loading: 'lazy',
        decoding: 'async'
      }));
      btn.addEventListener('click', function () { showImage(i); });
      n.thumbs.appendChild(el('li', null, btn));
    });

    showImage(modalState.index);
  }

  function openProject(id, trigger) {
    if (!modal) { return; }
    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) { return; }

    modalState.project = project;
    modalState.index = 0;
    modalState.trigger = trigger || doc.activeElement;
    renderModal();

    if (typeof modal.showModal === 'function') { modal.showModal(); }
    else { modal.setAttribute('open', ''); }
    doc.body.classList.add('modal-open');

    var closeBtn = qs('#modal-close');
    if (closeBtn) { closeBtn.focus(); }
    modal.scrollTop = 0;
    var inner = qs('.modal__inner', modal);
    if (inner) { inner.scrollTop = 0; }
  }

  function closeProject() {
    if (!modal || !isModalOpen()) { return; }
    if (typeof modal.close === 'function') { modal.close(); }
    else { modal.removeAttribute('open'); onModalClosed(); }
  }

  function onModalClosed() {
    doc.body.classList.remove('modal-open');
    var n = modalNodes();
    if (n.image) { n.image.removeAttribute('src'); }
    var trigger = modalState.trigger;
    modalState.project = null;
    modalState.trigger = null;
    if (trigger && doc.contains(trigger)) { trigger.focus(); }
  }

  function initModal() {
    if (!modal) { return; }
    var n = modalNodes();

    n.close.addEventListener('click', closeProject);
    n.prev.addEventListener('click', function () { showImage(modalState.index - 1); });
    n.next.addEventListener('click', function () { showImage(modalState.index + 1); });

    /* click on the backdrop (outside the inner panel) closes the dialog */
    modal.addEventListener('click', function (event) {
      if (event.target === modal) { closeProject(); }
    });

    modal.addEventListener('close', onModalClosed);
    modal.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeProject();
    });

    modal.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        closeProject();
        return;
      }
      if (!modalState.images || modalState.images.length < 2) { return; }
      var tag = (event.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') { return; }

      var rtl = isRTL();
      var next = rtl ? 'ArrowLeft' : 'ArrowRight';
      var prev = rtl ? 'ArrowRight' : 'ArrowLeft';

      if (event.key === next) { event.preventDefault(); showImage(modalState.index + 1); }
      else if (event.key === prev) { event.preventDefault(); showImage(modalState.index - 1); }
      else if (event.key === 'Home') { event.preventDefault(); showImage(0); }
      else if (event.key === 'End') { event.preventDefault(); showImage(modalState.images.length - 1); }
    });
  }

  /* ---------------------------------------------------------------- contact */

  function initContactForm() {
    var form = qs('#contact-form');
    if (!form) { return; }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        if (typeof form.reportValidity === 'function') { form.reportValidity(); }
        return;
      }

      var emailLink = qs('#contact-email');
      var href = emailLink ? emailLink.getAttribute('href') || '' : '';
      var to = href.replace(/^mailto:/i, '').split('?')[0];

      var name = (qs('#form-name', form) || {}).value || '';
      var email = (qs('#form-email', form) || {}).value || '';
      var message = (qs('#form-message', form) || {}).value || '';

      var body = I18n.t('form.bodyName') + ': ' + name + '\n'
        + I18n.t('form.bodyEmail') + ': ' + email + '\n\n'
        + I18n.t('form.bodyMessage') + ':\n' + message;

      window.location.href = 'mailto:' + encodeURIComponent(to).replace(/%40/g, '@')
        + '?subject=' + encodeURIComponent(I18n.t('form.subject'))
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ----------------------------------------------------------------- footer */

  function initFooter() {
    var year = qs('#footer-year');
    if (year) { year.textContent = String(new Date().getFullYear()); }
  }

  /* ------------------------------------------------------------------- boot */

  function onLangChange() {
    renderFilters();
    renderProjects();
    if (isModalOpen()) { renderModal(); }
  }

  function init() {
    initLanguage();            /* triggers 'langchange' -> first render */
    initHeader();
    initActiveNav();
    initReveal();
    initStats();
    initModal();
    initContactForm();
    initFooter();
  }

  doc.addEventListener('langchange', onLangChange);

  if (doc.readyState === 'loading') { doc.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
