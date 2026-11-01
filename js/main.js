/* =============================================================================
   main.js - behaviour for the Tarmeem Center website.
   Depends on js/i18n.js (window.I18n), js/projects.js (window.PROJECTS)
   and js/content.js (window.TEAM, window.PARTNERS).
   ============================================================================ */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var I18n = window.I18n;
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var TEAM = Array.isArray(window.TEAM) ? window.TEAM : [];
  var PARTNERS = window.PARTNERS || { international: [], national: [] };
  var DESKTOP_QUERY = '(min-width: 1100px)';

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

    qsa('.site-nav__link, .site-nav__sublink', nav).forEach(function (link) {
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
    /* only the home page has scroll sections; other pages mark their link in the HTML */
    if (!qs('.hero') || !links.length || !('IntersectionObserver' in window)) { return; }

    /* sections without their own nav link highlight the closest parent topic */
    var sections = [
      { id: 'top', node: qs('.hero') },
      { id: 'about', node: qs('#about') },
      { id: 'about', node: qs('#vision') },
      { id: 'expertise', node: qs('#expertise') },
      { id: 'expertise', node: qs('#materials') },
      { id: 'expertise', node: qs('#methodology') },
      { id: 'projects', node: qs('#projects') },
      { id: 'team', node: qs('#team') },
      { id: 'partners', node: qs('#partners') },
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

      if (isNaN(target) || !motionOK() || node.hasAttribute('data-stat-static')) {
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

  var gridNode = qs('#project-grid');

  function pickList(obj) {
    var value = I18n.pick(obj);
    return Array.isArray(value) ? value : [];
  }

  function buildCard(project, index) {
    var title = I18n.pick(project.title);
    var cover = project.cover || {};
    var photoCount = (project.gallery && project.gallery.length) || 1;

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

    var badges = el('div', { class: 'project-card__badges' }, [
      el('span', { class: 'project-card__badge project-card__badge--num', text: project.number || '' }),
      project.ongoing ? el('span', { class: 'project-card__badge project-card__badge--live', text: I18n.t('projects.ongoing') }) : null
    ]);

    var photos = el('span', { class: 'project-card__photos', 'aria-hidden': 'true' }, [
      cameraIcon(),
      I18n.t('projects.photos', { count: photoCount })
    ]);

    var meta = el('p', { class: 'project-card__meta' }, [
      el('span', { text: I18n.pick(project.location) }),
      el('span', { class: 'project-card__dot', 'aria-hidden': 'true', text: '·' }),
      el('span', { text: project.years || '' })
    ]);

    var cta = el('span', { class: 'project-card__cta', 'aria-hidden': 'true' }, [
      el('span', { text: I18n.t('projects.viewDetails') }),
      cloneTemplate('tpl-icon-arrow')
    ]);

    var card = el('article', { class: 'project-card' }, [
      el('div', { class: 'project-card__media' }, [img, badges, photos]),
      el('div', { class: 'project-card__body' }, [
        el('p', { class: 'project-card__kicker', text: I18n.pick(project.site) }),
        el('h3', { class: 'project-card__title' }, trigger),
        meta,
        el('p', { class: 'project-card__summary', text: I18n.pick(project.summary) }),
        cta
      ])
    ]);

    var item = el('li', { class: 'project-grid__item reveal' }, card);
    item.style.setProperty('--i', String(index % 3));
    return item;
  }

  function cameraIcon() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = doc.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = doc.createElementNS(ns, 'path');
    path.setAttribute('d', 'M4 8h3l2-3h6l2 3h3v11H4z');
    var circle = doc.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '13');
    circle.setAttribute('r', '3.5');
    svg.appendChild(path);
    svg.appendChild(circle);
    return svg;
  }

  function renderProjects() {
    if (!gridNode) { return; }
    gridNode.textContent = '';
    var items = PROJECTS.map(buildCard);
    items.forEach(function (item) { gridNode.appendChild(item); });
    observeReveal(items);
  }

  /* ------------------------------------------------------------------- team */

  function renderTeam() {
    var grid = qs('#team-grid');
    if (!grid) { return; }
    grid.textContent = '';

    var items = TEAM.map(function (person, index) {
      var education = el('ol', { class: 'edu' }, (person.education || []).map(function (entry) {
        return el('li', { class: 'edu__item' }, [
          el('span', { class: 'edu__year', text: entry.year }),
          el('span', { class: 'edu__text' }, [
            el('strong', { text: I18n.pick(entry.title) }),
            el('span', { text: I18n.pick(entry.place) })
          ])
        ]);
      }));

      var details = el('details', { class: 'person__more' }, [
        el('summary', null, [
          el('span', { text: I18n.t('team.more') }),
          el('span', { class: 'person__chev', 'aria-hidden': 'true' })
        ]),
        el('div', { class: 'person__more-body' }, (person.groups || []).map(function (group) {
          return el('div', { class: 'person__group' }, [
            el('h4', { class: 'person__label', text: I18n.pick(group.title) }),
            el('ul', { class: 'ticks' }, pickList(group.items).map(function (text) {
              return el('li', { text: text });
            }))
          ]);
        }))
      ]);

      var card = el('article', { class: 'person' }, [
        el('header', { class: 'person__head' }, [
          el('span', { class: 'person__avatar', 'aria-hidden': 'true', text: I18n.pick(person.initials) }),
          el('div', null, [
            el('h3', { class: 'person__name', text: I18n.pick(person.name) }),
            el('p', { class: 'person__role', text: I18n.pick(person.role) })
          ])
        ]),
        el('p', { class: 'person__bio', text: I18n.pick(person.bio) }),
        person.roleAt ? el('p', { class: 'person__roleat' }, [
          el('strong', { text: I18n.t('team.roleAt') }),
          el('span', { text: I18n.pick(person.roleAt) })
        ]) : null,
        el('h4', { class: 'person__label', text: I18n.t('team.education') }),
        education,
        details
      ]);

      var li = el('li', { class: 'team__item reveal' }, card);
      li.style.setProperty('--i', String(index));
      return li;
    });

    items.forEach(function (item) { grid.appendChild(item); });
    observeReveal(items);
  }

  /* --------------------------------------------------------------- partners */

  function renderPartners() {
    ['international', 'national'].forEach(function (group) {
      var list = qs('#partners-' + group);
      if (!list) { return; }
      list.textContent = '';
      (PARTNERS[group] || []).forEach(function (partner) {
        var name = I18n.pick(partner.name);
        list.appendChild(el('li', { class: 'partner' }, [
          el('span', { class: 'partner__logo' }, el('img', {
            src: 'assets/images/partners/' + partner.logo + '.webp',
            alt: name,
            loading: 'lazy',
            decoding: 'async'
          })),
          el('span', { class: 'partner__name', 'aria-hidden': 'true', text: name })
        ]));
      });
    });
  }

  /* ---------------------------------------------------------- opportunities */

  var OPPS = window.OPPORTUNITIES || {};
  var CONTACT_EMAIL = 'info@tarmeem-center.com';

  function svgIcon(d) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = doc.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = doc.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
    return svg;
  }

  function parseDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  function formatDate(value) {
    var date = parseDate(value);
    if (!date) { return value || ''; }
    try {
      return date.toLocaleDateString(I18n.getLang() === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB',
        { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return value; }
  }

  /** Open until the end of the deadline day; no deadline = open. */
  function isOpen(item) {
    var deadline = parseDate(item.deadline);
    if (!deadline) { return true; }
    deadline.setDate(deadline.getDate() + 1);
    return new Date() < deadline;
  }

  function oppList(kind) { return Array.isArray(OPPS[kind]) ? OPPS[kind] : []; }

  function mailto(subject) {
    return 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject);
  }

  function buildOpportunity(item, index) {
    var open = isOpen(item);
    var title = I18n.pick(item.title);

    var badges = el('div', { class: 'listing__badges' }, [
      el('span', { class: 'listing__badge listing__badge--' + (open ? 'open' : 'closed'), text: I18n.t(open ? 'listing.open' : 'listing.closed') }),
      item.type ? el('span', { class: 'listing__badge', text: I18n.pick(item.type) }) : null
    ]);

    var metaItems = [];
    if (item.location) { metaItems.push(el('li', null, [svgIcon('M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z'), el('span', { text: I18n.pick(item.location) })])); }
    if (item.deadline) { metaItems.push(el('li', null, [svgIcon('M4 6h16v14H4zM4 10h16M8 3v4M16 3v4'), el('span', { text: I18n.t('listing.deadline', { date: formatDate(item.deadline) }) })])); }
    if (item.posted) { metaItems.push(el('li', null, [svgIcon('M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'), el('span', { text: I18n.t('listing.posted', { date: formatDate(item.posted) }) })])); }

    var sections = (item.sections || []).filter(function (s) { return pickList(s.items).length; });
    var details = sections.length ? el('details', { class: 'person__more listing__more' }, [
      el('summary', null, [
        el('span', { text: I18n.t('listing.details') }),
        el('span', { class: 'person__chev', 'aria-hidden': 'true' })
      ]),
      el('div', { class: 'person__more-body' }, sections.map(function (s) {
        return el('div', { class: 'person__group' }, [
          el('h3', { class: 'person__label', text: I18n.pick(s.title) }),
          el('ul', { class: 'ticks' }, pickList(s.items).map(function (text) { return el('li', { text: text }); }))
        ]);
      }))
    ]) : null;

    var actions = [];
    var apply = item.apply || {};
    if (open && (apply.url || apply.email)) {
      var href = apply.url || ('mailto:' + apply.email + '?subject=' + encodeURIComponent(I18n.t('listing.applySubject', { title: title })));
      actions.push(el('a', apply.url
        ? { class: 'btn btn--primary', href: href, target: '_blank', rel: 'noopener' }
        : { class: 'btn btn--primary', href: href }, [el('span', { text: I18n.t('listing.apply') }), cloneTemplate('tpl-icon-arrow')]));
    }
    if (item.file) {
      actions.push(el('a', { class: 'btn btn--outline', href: item.file, target: '_blank', rel: 'noopener' }, [
        svgIcon('M12 4v11M7 10l5 5 5-5M5 20h14'),
        el('span', { text: I18n.t('listing.download') })
      ]));
    }

    var card = el('article', { class: 'listing' + (open ? '' : ' listing--closed') }, [
      badges,
      el('h2', { class: 'listing__title', text: title }),
      metaItems.length ? el('ul', { class: 'listing__meta' }, metaItems) : null,
      item.summary ? el('p', { class: 'listing__summary', text: I18n.pick(item.summary) }) : null,
      details,
      actions.length ? el('div', { class: 'listing__actions' }, actions) : null
    ]);

    var li = el('li', { class: 'listings__item reveal' }, card);
    li.style.setProperty('--i', String(index % 3));
    return li;
  }

  function renderListings() {
    var list = qs('#listings');
    if (!list) { return; }
    var kind = list.getAttribute('data-kind');
    list.textContent = '';

    var items = oppList(kind).slice().sort(function (a, b) {
      var oa = isOpen(a), ob = isOpen(b);
      if (oa !== ob) { return oa ? -1 : 1; }
      return (a.deadline || '9999').localeCompare(b.deadline || '9999');
    });

    var nodes;
    if (!items.length) {
      nodes = [el('li', { class: 'listings__item reveal' }, el('div', { class: 'listing listing--empty' }, [
        el('span', { class: 'listing__empty-mark', 'aria-hidden': 'true' }, svgIcon(kind === 'jobs'
          ? 'M4 8h16v12H4zM9 8V5h6v3M4 13h16'
          : 'M4 5h16v11H8l-4 4zM8 10h8')),
        el('h2', { class: 'listing__title', text: I18n.t(kind + '.empty') }),
        el('p', { class: 'listing__summary', text: I18n.t(kind + '.emptyText') }),
        el('div', { class: 'listing__actions' }, el('a', {
          class: 'btn btn--primary',
          href: mailto(I18n.t(kind === 'jobs' ? 'opp.cvSubject' : 'form.subject'))
        }, [el('span', { text: I18n.t(kind === 'jobs' ? 'opp.cvCta' : 'listing.contact') }), cloneTemplate('tpl-icon-arrow')]))
      ]))];
    } else {
      nodes = items.map(buildOpportunity);
    }
    nodes.forEach(function (n) { list.appendChild(n); });
    observeReveal(nodes);
  }

  function renderOppCounts() {
    qsa('[data-opp-count]').forEach(function (node) {
      var count = oppList(node.getAttribute('data-opp-count')).filter(isOpen).length;
      node.textContent = count ? I18n.t('opp.openCount', { count: count }) : I18n.t('opp.noneOpen');
      node.classList.toggle('is-empty', !count);
    });
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
      alt: qs('#gallery-alt'),
      thumbs: qs('#gallery-thumbs'),
      kicker: qs('#modal-kicker'),
      title: qs('#modal-title'),
      meta: qs('#modal-meta'),
      summary: qs('#modal-summary'),
      figures: qs('#modal-figures'),
      sections: qs('#modal-sections')
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
    n.alt.textContent = I18n.pick(current.alt);
    n.counter.textContent = I18n.t('modal.counter', { current: index + 1, total: images.length });

    qsa('button', n.thumbs).forEach(function (btn, i) {
      btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      if (i === index && btn.scrollIntoView && isModalOpen()) {
        btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
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

  function listSection(titleKey, items, modifier) {
    if (!items.length) { return null; }
    return el('section', { class: 'modal__section' + (modifier ? ' modal__section--' + modifier : '') }, [
      el('h3', { class: 'modal__section-title', text: I18n.t(titleKey) }),
      el('ul', { class: 'ticks' + (modifier === 'achievements' ? ' ticks--check' : '') }, items.map(function (text) {
        return el('li', { text: text });
      }))
    ]);
  }

  function boqSection(rows) {
    if (!rows || !rows.length) { return null; }
    return el('section', { class: 'modal__section' }, [
      el('h3', { class: 'modal__section-title', text: I18n.t('modal.boq') }),
      el('div', { class: 'boq' }, el('table', null, [
        el('thead', null, el('tr', null, [
          el('th', { scope: 'col', text: I18n.t('modal.boqItem') }),
          el('th', { scope: 'col', text: I18n.t('modal.boqQty') })
        ])),
        el('tbody', null, rows.map(function (row) {
          return el('tr', null, [
            el('td', { text: I18n.pick(row.item) }),
            el('td', { class: 'boq__qty', text: I18n.pick(row.qty) })
          ]);
        }))
      ]))
    ]);
  }

  function renderModal() {
    var project = modalState.project;
    if (!project) { return; }
    var n = modalNodes();

    n.kicker.textContent = I18n.t('modal.project', { number: project.number || '' })
      + (project.ongoing ? ' · ' + I18n.t('projects.ongoing') : '');
    n.title.textContent = I18n.pick(project.title);

    n.meta.textContent = '';
    [['modal.location', project.location], ['modal.period', project.period], ['modal.value', project.value]]
      .forEach(function (pair) {
        var value = I18n.pick(pair[1]);
        if (!value) { return; }
        n.meta.appendChild(el('div', { class: 'modal__meta-item' }, [
          el('dt', { text: I18n.t(pair[0]) }),
          el('dd', { text: value })
        ]));
      });

    n.summary.textContent = I18n.pick(project.summary);

    n.figures.textContent = '';
    (project.figures || []).forEach(function (figure) {
      n.figures.appendChild(el('li', { class: 'modal__figure' }, [
        el('strong', { dir: 'ltr', text: figure.value }),
        el('span', { text: I18n.pick(figure.label) })
      ]));
    });
    n.figures.hidden = !(project.figures && project.figures.length);

    n.sections.textContent = '';
    [
      listSection('modal.cooperation', pickList(project.cooperation)),
      listSection('modal.objectives', pickList(project.objectives)),
      listSection('modal.works', pickList(project.works)),
      boqSection(project.boq),
      listSection('modal.achievements', pickList(project.achievements), 'achievements')
    ].forEach(function (section) { if (section) { n.sections.appendChild(section); } });

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
    if (n.image) { n.image.src = 'data:,'; }
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
    renderProjects();
    renderTeam();
    renderPartners();
    renderListings();
    renderOppCounts();
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
