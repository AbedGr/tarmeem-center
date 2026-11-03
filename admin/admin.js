/* =============================================================================
   Tarmeem Site Editor
   A browser-only editor for the website content. It reads the site files from
   GitHub, lets you edit text and drag & drop photos, and publishes everything
   as a single commit through the GitHub API (no server needed).

   Files it edits:
     js/projects.js  - projects (text, cover, gallery)
     js/content.js   - team and partners
     js/opportunities.js - job vacancies and calls
     js/i18n.js      - page text (only the changed strings are rewritten)
     *.html pages    - page photo paths (and their width/height)
   Photos are resized in the browser and saved as WebP.
   ============================================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'tarmeem-admin';
  /* every site page: page photos can appear on any of them */
  var PAGE_FILES = ['index.html', 'about.html', 'expertise.html', 'projects.html', 'team.html', 'partners.html',
    'contact.html', 'opportunities.html', 'jobs.html', 'calls.html'];
  var DATA_FILES = PAGE_FILES.concat(['js/projects.js', 'js/content.js', 'js/i18n.js', 'js/opportunities.js', 'css/style.css', '404.html']);
  var PROJECT_KEYS = ['id', 'number', 'years', 'ongoing', 'site', 'title', 'location', 'period', 'value', 'summary',
    'figures', 'cooperation', 'objectives', 'works', 'boq', 'achievements', 'cover', 'gallery'];
  var LIST_KEYS = ['cooperation', 'objectives', 'works', 'achievements'];
  var OPP_KEYS = ['id', 'title', 'type', 'location', 'posted', 'deadline', 'status', 'summary', 'sections', 'apply', 'file', 'fileLabel'];
  var OPP_KINDS = [['calls', 'Calls', 'calls.html'], ['jobs', 'Jobs', 'jobs.html']];
  var SECTION_NAMES = {
    meta: 'Browser title & search description', a11y: 'Accessibility labels', brand: 'Brand name', nav: 'Menu',
    lang: 'Language switch', hero: 'Hero (top of the page)', about: 'About', stats: 'Key numbers',
    vm: 'Vision & mission', exp: 'Expertise', mat: 'Materials', method: 'Methodology', projects: 'Projects section',
    modal: 'Project details window', team: 'Team section', partners: 'Partners section', contact: 'Contact',
    form: 'Contact form', footer: 'Footer', home: 'Home page cards', opp: 'Opportunities page',
    jobs: 'Jobs page', calls: 'Calls page', listing: 'Job / call listings'
  };

  var S = {
    cfg: null,
    headSha: null,
    tree: new Map(),       // path -> blob sha (repository state when loaded)
    files: {},             // path -> { sha, text }
    projects: [], team: [], partners: { international: [], national: [] },
    opps: { jobs: [], calls: [] },
    tr: { ar: {}, en: {} },
    pages: {},             // page file -> current HTML (photo edits are applied here)
    photos: [],
    orig: {},
    origRefs: new Set(),
    pending: new Map(),    // new image path -> { blob, url }
    open: { projects: null, team: null, opps: null },
    tab: 'projects',
    busy: false
  };

  /* ===================================================================== utils */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    var value;
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) { return; }
      if (k.slice(0, 2) === 'on' && typeof v === 'function') { el.addEventListener(k.slice(2), v); }
      else if (k === 'class') { el.className = v; }
      else if (k === 'text') { el.textContent = v; }
      else if (k === 'value') { value = v; }
      else { el.setAttribute(k, v === true ? '' : v); }
    });
    var kids = Array.prototype.slice.call(arguments, 2);
    (function add(list) {
      list.forEach(function (c) {
        if (c == null || c === false) { return; }
        if (Array.isArray(c)) { add(c); return; }
        el.append(c.nodeType ? c : document.createTextNode(String(c)));
      });
    })(kids);
    if (value !== undefined) { el.value = value; }
    return el;
  }

  var toastTimer;
  function toast(msg, isError) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.toggle('is-error', !!isError);
    t.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-shown'); }, isError ? 6000 : 2600);
  }

  function slugify(s) {
    return String(s || '').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  }
  function dirname(p) { return p.slice(0, p.lastIndexOf('/')); }
  function basename(p) { return p.slice(p.lastIndexOf('/') + 1); }
  function stripSuffix(name) { return name.replace(/\.[a-z0-9]+$/i, '').replace(/-[a-z0-9]{5}$/, ''); }

  function storeGet() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || sessionStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return null; } }
  function storeSet(cfg, remember) {
    try {
      localStorage.removeItem(STORE_KEY); sessionStorage.removeItem(STORE_KEY);
      (remember ? localStorage : sessionStorage).setItem(STORE_KEY, JSON.stringify(cfg));
    } catch (e) { /* storage unavailable: stay signed in for this page only */ }
  }
  function storeClear() { try { localStorage.removeItem(STORE_KEY); sessionStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ } }

  function b64ToText(b64) {
    var bin = atob(b64.replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
    return new TextDecoder().decode(bytes);
  }
  function blobToB64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(',')[1]); };
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  }

  /* ===================================================================== GitHub */
  function gh(method, path, body) {
    return fetch('https://api.github.com' + path, {
      method: method,
      headers: Object.assign({
        Authorization: 'Bearer ' + S.cfg.token,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }, body ? { 'Content-Type': 'application/json' } : {}),
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    }).then(function (res) {
      if (res.ok) { return res.status === 204 ? null : res.json(); }
      return res.json().catch(function () { return {}; }).then(function (j) {
        var msg = j.message || res.statusText;
        if (res.status === 401) { msg = 'The access token is invalid or has expired.'; }
        if (res.status === 403 && /not accessible by personal access token/i.test(msg)) {
          msg = 'Your token is not allowed to save to this repository. On GitHub, edit the token: Repository access must include "'
            + S.cfg.repo.split('/')[1] + '" and Permissions → Contents must be "Read and write". Then click Try again - your edits are kept.';
        }
        if (res.status === 404) { msg = 'Not found - check the repository name, branch and token access. (' + path + ')'; }
        throw new Error(msg);
      });
    });
  }
  function repoPath(rest) { return '/repos/' + S.cfg.repo + rest; }

  /* ===================================================================== JS (de)serialisation */
  function jsString(s) {
    return "'" + String(s)
      .replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      .replace(/\r/g, '\\r').replace(/\n/g, '\\n')
      .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + "'";
  }
  function jsKey(k) { return /^[A-Za-z_$][\w$]*$/.test(k) ? k : jsString(k); }

  /** Pretty-print a value as a JS literal (single quotes, 2-space indent, short items inline). */
  function ser(v, indent) {
    indent = indent || 0;
    var pad = '  '.repeat(indent), pad2 = '  '.repeat(indent + 1);
    if (typeof v === 'string') { return jsString(v); }
    if (typeof v === 'number' || typeof v === 'boolean') { return String(v); }
    if (v == null) { return 'null'; }
    var parts, inline;
    if (Array.isArray(v)) {
      if (!v.length) { return '[]'; }
      parts = v.map(function (x) { return ser(x, indent + 1); });
      inline = '[ ' + parts.join(', ') + ' ]';
      if (inline.indexOf('\n') === -1 && inline.length + pad.length < 110 && v.every(function (x) { return typeof x !== 'string'; })) { return inline; }
      return '[\n' + parts.map(function (p) { return pad2 + p; }).join(',\n') + '\n' + pad + ']';
    }
    var keys = Object.keys(v);
    if (!keys.length) { return '{}'; }
    parts = keys.map(function (k) { return jsKey(k) + ': ' + ser(v[k], indent + 1); });
    inline = '{ ' + parts.join(', ') + ' }';
    if (inline.indexOf('\n') === -1 && inline.length + pad.length < 110) { return inline; }
    return '{\n' + parts.map(function (p) { return pad2 + p; }).join(',\n') + '\n' + pad + '}';
  }

  function skipString(src, i) {
    var q = src[i];
    for (i++; i < src.length; i++) {
      if (src[i] === '\\') { i++; continue; }
      if (src[i] === q) { return i; }
    }
    return -1;
  }
  /** Index of the brace that closes the one at `start` (skips strings and comments). */
  function matchBrace(src, start) {
    var depth = 0;
    for (var i = start; i < src.length; i++) {
      var c = src[i];
      if (c === "'" || c === '"' || c === '`') { i = skipString(src, i); if (i < 0) { return -1; } continue; }
      if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) { return -1; } continue; }
      if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 1; if (i <= 0) { return -1; } continue; }
      if (c === '{') { depth++; }
      else if (c === '}') { depth--; if (!depth) { return i; } }
    }
    return -1;
  }

  function translationsRange(src) {
    var at = src.indexOf('var translations');
    var start = src.indexOf('{', at);
    var end = at < 0 ? -1 : matchBrace(src, start);
    if (at < 0 || end < 0) { throw new Error('Could not find the translations in js/i18n.js'); }
    return { start: start, end: end };
  }
  function extractTranslations(src) {
    var r = translationsRange(src);
    return new Function('return (' + src.slice(r.start, r.end + 1) + ');')();
  }
  function langRange(src, lang) {
    var r = translationsRange(src);
    var re = new RegExp('[\\s{,]' + lang + '\\s*:\\s*\\{', 'g');
    re.lastIndex = r.start + 1;
    var m = re.exec(src);
    if (!m || m.index > r.end) { throw new Error('Language "' + lang + '" not found in js/i18n.js'); }
    var start = m.index + m[0].length - 1;
    return { start: start, end: matchBrace(src, start) };
  }
  /** Rewrite only the strings that changed, keeping comments and layout of i18n.js. */
  function writeTranslations(src) {
    ['ar', 'en'].forEach(function (lang) {
      Object.keys(S.tr[lang]).forEach(function (key) {
        var val = S.tr[lang][key];
        if (val === S.orig.trObj[lang][key]) { return; }
        var r = langRange(src, lang);
        var needle = "'" + key + "'";
        var i = src.indexOf(needle, r.start);
        while (i !== -1 && i < r.end && !/^\s*:/.test(src.slice(i + needle.length, i + needle.length + 20))) {
          i = src.indexOf(needle, i + 1);
        }
        if (i !== -1 && i < r.end) {
          var v = src.slice(i + needle.length).search(/['"`]/) + i + needle.length;
          var vEnd = skipString(src, v);
          src = src.slice(0, v) + jsString(val) + src.slice(vEnd + 1);
        } else {
          var j = r.end - 1;
          while (/\s/.test(src[j])) { j--; }
          var comma = src[j] === ',' ? '' : ',';
          src = src.slice(0, j + 1) + comma + '\n      ' + jsString(key) + ': ' + jsString(val) + src.slice(j + 1);
        }
      });
    });
    return src;
  }

  function evalData(src) { var w = {}; new Function('window', src)(w); return w; }
  function eolOf(text) { return text.indexOf('\r\n') !== -1 ? '\r\n' : '\n'; }

  function buildProjectsJs() {
    var src = S.files['js/projects.js'].text;
    var at = src.indexOf('window.PROJECTS');
    var head = at > 0 ? src.slice(0, at) : '';
    var body = S.projects.map(cleanProject).map(function (p) {
      return '  /* ' + '-'.repeat(66) + ' ' + (p.number || '') + ' */\n  ' + ser(p, 1);
    }).join(',\n');
    return (head + 'window.PROJECTS = [\n' + body + '\n];\n').replace(/\r?\n/g, eolOf(src));
  }
  function buildContentJs() {
    var src = S.files['js/content.js'].text;
    var at = src.indexOf('window.TEAM');
    var head = at > 0 ? src.slice(0, at) : '';
    return (head + 'window.TEAM = ' + ser(S.team.map(cleanMember), 0) + ';\n\nwindow.PARTNERS = ' + ser(S.partners, 0) + ';\n')
      .replace(/\r?\n/g, eolOf(src));
  }

  function buildOppsJs() {
    var src = S.files['js/opportunities.js'].text;
    var at = src.indexOf('window.OPPORTUNITIES');
    var head = at > 0 ? src.slice(0, at) : '';
    var lists = ['jobs', 'calls'].map(function (kind) {
      var items = S.opps[kind].map(cleanOpp).map(function (o) { return '    ' + ser(o, 2); });
      return '  ' + kind + ': [\n' + (items.length ? items.join(',\n\n') + '\n' : '') + '  ]';
    });
    return (head + 'window.OPPORTUNITIES = {\n' + lists.join(',\n\n') + '\n};\n').replace(/\r?\n/g, eolOf(src));
  }
  function cleanOpps() { return { jobs: S.opps.jobs.map(cleanOpp), calls: S.opps.calls.map(cleanOpp) }; }

  /* ===================================================================== data shape */
  function bi(v) { return { ar: (v && v.ar) || '', en: (v && v.en) || '' }; }
  function biArr(v) { return { ar: (v && Array.isArray(v.ar)) ? v.ar.slice() : [], en: (v && Array.isArray(v.en)) ? v.en.slice() : [] }; }

  function normalizeProject(p) {
    p = clone(p);
    ['site', 'title', 'location', 'period', 'value', 'summary'].forEach(function (k) { p[k] = bi(p[k]); });
    LIST_KEYS.forEach(function (k) { p[k] = biArr(p[k]); });
    p.figures = (p.figures || []).map(function (f) { return { value: f.value || '', label: bi(f.label) }; });
    p.boq = (p.boq || []).map(function (r) { return { item: bi(r.item), qty: bi(r.qty) }; });
    p.cover = { src: (p.cover && p.cover.src) || '', alt: bi(p.cover && p.cover.alt) };
    p.gallery = (p.gallery || []).map(function (g) { return { src: g.src || '', alt: bi(g.alt) }; });
    p.ongoing = !!p.ongoing;
    p.id = p.id || ''; p.number = p.number || ''; p.years = p.years || '';
    return p;
  }
  /** Canonical key order; optional fields dropped when empty. */
  function cleanProject(p) {
    var out = {};
    PROJECT_KEYS.forEach(function (k) {
      var v = p[k];
      if (k === 'value' && !(v.ar || v.en)) { return; }
      if ((k === 'figures' || k === 'boq') && !v.length) { return; }
      out[k] = v;
    });
    Object.keys(p).forEach(function (k) { if (PROJECT_KEYS.indexOf(k) === -1) { out[k] = p[k]; } });
    return out;
  }
  function normalizeMember(m) {
    m = clone(m);
    ['initials', 'name', 'role', 'bio'].forEach(function (k) { m[k] = bi(m[k]); });
    m.education = (m.education || []).map(function (e) { return { year: e.year || '', title: bi(e.title), place: bi(e.place) }; });
    m.groups = (m.groups || []).map(function (g) { return { title: bi(g.title), items: biArr(g.items) }; });
    return m;
  }
  function cleanMember(m) {
    var out = {};
    Object.keys(m).forEach(function (k) {
      if ((k === 'education' || k === 'groups') && !m[k].length) { return; }
      out[k] = m[k];
    });
    return out;
  }

  function normalizeOpp(o) {
    o = clone(o || {});
    ['title', 'type', 'location', 'summary', 'fileLabel'].forEach(function (k) { o[k] = bi(o[k]); });
    o.sections = (o.sections || []).map(function (s) { return { title: bi(s.title), items: biArr(s.items) }; });
    o.apply = { email: (o.apply && o.apply.email) || '', url: (o.apply && o.apply.url) || '' };
    ['id', 'posted', 'deadline', 'file'].forEach(function (k) { o[k] = o[k] || ''; });
    o.status = o.status === 'open' || o.status === 'closed' ? o.status : '';
    return o;
  }
  /** Canonical key order; optional fields dropped when empty. */
  function cleanOpp(o) {
    var out = {};
    function has(v) { return !!(v && (v.ar || v.en)); }
    OPP_KEYS.forEach(function (k) {
      var v = o[k];
      if (k === 'id' || k === 'title' || k === 'summary') { out[k] = v; return; }
      if (k === 'type' || k === 'location' || k === 'fileLabel') { if (has(v)) { out[k] = v; } return; }
      if (k === 'sections') {
        var secs = v.filter(function (s) { return has(s.title) || s.items.ar.length || s.items.en.length; });
        if (secs.length) { out[k] = secs; }
        return;
      }
      if (k === 'apply') {
        if (v.url) { out[k] = { url: v.url }; } else if (v.email) { out[k] = { email: v.email }; }
        return;
      }
      if (v) { out[k] = v; }
    });
    if (!o.file) { delete out.fileLabel; }
    Object.keys(o).forEach(function (k) { if (OPP_KEYS.indexOf(k) === -1) { out[k] = o[k]; } });
    return out;
  }
  /** Same rule as the site: a set status wins; otherwise open until the end of the deadline day. */
  function oppIsOpen(o) {
    if (o.status === 'closed') { return false; }
    if (o.status === 'open') { return true; }
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(o.deadline || '');
    if (!m) { return true; }
    return new Date() < new Date(+m[1], +m[2] - 1, +m[3] + 1);
  }

  function partnerPath(slug) { return 'assets/images/partners/' + slug + '.webp'; }

  function collectRefs() {
    var refs = new Set();
    S.projects.forEach(function (p) {
      if (p.cover.src) { refs.add(p.cover.src); }
      p.gallery.forEach(function (g) { if (g.src) { refs.add(g.src); } });
    });
    ['international', 'national'].forEach(function (g) {
      (S.partners[g] || []).forEach(function (pt) { if (pt.logo) { refs.add(partnerPath(pt.logo)); } });
    });
    S.photos.forEach(function (ph) { refs.add(ph.src); });
    return refs;
  }

  function parsePhotos(html) {
    var out = [];
    var re = /<img\b[^>]*>/g, m;
    while ((m = re.exec(html))) {
      var tag = m[0];
      var src = /\ssrc="(assets\/images\/[^"]+\.(?:webp|jpe?g))"/.exec(tag);
      if (!src) { continue; }
      var alt = /data-i18n-attr="[^"]*alt:([\w.]+)/.exec(tag);
      if (out.some(function (o) { return o.src === src[1]; })) { continue; }
      out.push({ src: src[1], altKey: alt ? alt[1] : null });
    }
    return out;
  }

  function isDirty() {
    if (!S.orig.projects) { return false; }
    return JSON.stringify(S.projects.map(cleanProject)) !== S.orig.projects ||
      JSON.stringify(S.team) !== S.orig.team ||
      JSON.stringify(S.partners) !== S.orig.partners ||
      JSON.stringify(cleanOpps()) !== S.orig.opps ||
      JSON.stringify(S.tr) !== S.orig.tr ||
      PAGE_FILES.some(function (p) { return S.pages[p] !== S.files[p].text; });
  }
  var dirtyTimer;
  function changed() {
    clearTimeout(dirtyTimer);
    dirtyTimer = setTimeout(function () {
      var d = isDirty();
      $('#dirty-badge').hidden = !d;
      $('#btn-publish').disabled = !d || S.busy;
    }, 120);
  }

  /* ===================================================================== images */
  function imgUrl(path) {
    if (!path) { return ''; }
    if (S.pending.has(path)) { return S.pending.get(path).url; }
    return 'https://raw.githubusercontent.com/' + S.cfg.repo + '/' + S.headSha + '/' + path;
  }
  function setImg(img, path) {
    img.onerror = function () { img.onerror = null; img.src = '../' + path; };
    if (path) { img.src = imgUrl(path); } else { img.removeAttribute('src'); }
  }
  function newAssetPath(dir, base) {
    base = slugify(base) || 'image';
    var p;
    do { p = dir + '/' + base + '-' + Math.random().toString(36).slice(2, 7) + '.webp'; }
    while (S.tree.has(p) || S.pending.has(p));
    return p;
  }

  /** Resize a dropped image in the browser and encode it as WebP. */
  function processImage(file, maxDim) {
    if (!/^image\//.test(file.type)) { return Promise.reject(new Error(file.name + ' is not an image.')); }
    return createImageBitmap(file).then(function (bmp) {
      var scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
      var w = Math.round(bmp.width * scale), hgt = Math.round(bmp.height * scale);
      var c = document.createElement('canvas');
      c.width = w; c.height = hgt;
      var ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(bmp, 0, 0, w, hgt);
      return new Promise(function (resolve, reject) {
        c.toBlob(function (blob) {
          if (!blob || blob.type !== 'image/webp') {
            reject(new Error('This browser cannot create WebP images. Please use Chrome, Edge or Firefox.'));
          } else { resolve({ blob: blob, width: w, height: hgt }); }
        }, 'image/webp', 0.82);
      });
    });
  }
  /** Process + queue an image for upload. Resolves to { path, width, height } or null. */
  function storeImage(file, dir, base, maxDim) {
    toast('Optimising ' + file.name + '…');
    return processImage(file, maxDim).then(function (r) {
      var path = newAssetPath(dir, base);
      S.pending.set(path, { blob: r.blob, url: URL.createObjectURL(r.blob) });
      toast('Photo ready (' + Math.round(r.blob.size / 1024) + ' KB) - publish to make it live');
      return { path: path, width: r.width, height: r.height };
    }).catch(function (e) { toast(e.message, true); return null; });
  }

  function hasFiles(e) { return e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types, 'Files') !== -1; }
  function fileDrop(el, cb) {
    el.addEventListener('dragover', function (e) {
      if (!hasFiles(e)) { return; }
      e.preventDefault(); e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      el.classList.add('is-over');
    });
    el.addEventListener('dragleave', function (e) { if (!el.contains(e.relatedTarget)) { el.classList.remove('is-over'); } });
    el.addEventListener('drop', function (e) {
      if (!hasFiles(e)) { return; }
      e.preventDefault(); e.stopPropagation();
      el.classList.remove('is-over');
      var files = Array.prototype.filter.call(e.dataTransfer.files, function (f) { return /^image\//.test(f.type); });
      if (files.length) { cb(files); } else { toast('Please drop image files (JPG, PNG, WebP…).', true); }
    });
  }
  function fileInput(multiple, cb) {
    var inp = h('input', { type: 'file', accept: 'image/*', multiple: multiple || null, 'aria-label': 'Choose image' });
    inp.addEventListener('change', function () {
      var files = Array.prototype.slice.call(inp.files);
      inp.value = '';
      if (files.length) { cb(files); }
    });
    return inp;
  }

  function imageSlot(opts) {
    var img = h('img', { alt: '' });
    setImg(img, opts.src);
    var slot = h('div', { class: 'img-slot' + (opts.logo ? ' img-slot--logo' : '') },
      opts.src ? img : null,
      opts.src && S.pending.has(opts.src) ? h('span', { class: 'new-flag' }, 'New') : null,
      h('div', { class: 'overlay', style: opts.src ? null : 'opacity:1;background:transparent;color:inherit' },
        opts.label || (opts.src ? 'Drop a photo here or click to replace' : 'Drop a photo here or click to choose')),
      fileInput(false, function (files) { opts.onFile(files[0]); })
    );
    if (!opts.src) { slot.classList.add('dropzone'); }
    fileDrop(slot, function (files) { opts.onFile(files[0]); });
    return slot;
  }

  /* ===================================================================== drag-to-reorder */
  var drag = null;
  function clearMarks(container) {
    Array.prototype.forEach.call(container.querySelectorAll('.drop-before,.drop-after'), function (n) {
      n.classList.remove('drop-before', 'drop-after');
    });
  }
  function sortable(container, arr, redraw, axis) {
    container.addEventListener('dragover', function (e) {
      if (!drag || drag.container !== container) { return; }
      var item = e.target.closest('[data-idx]');
      if (!item || item.parentElement !== container) { return; }
      e.preventDefault(); e.stopPropagation();
      e.dataTransfer.dropEffect = 'move';
      var r = item.getBoundingClientRect();
      var after = axis === 'x' ? (e.clientX - r.left) > r.width / 2 : (e.clientY - r.top) > r.height / 2;
      clearMarks(container);
      item.classList.add(after ? 'drop-after' : 'drop-before');
      drag.target = +item.dataset.idx; drag.after = after;
    });
    container.addEventListener('drop', function (e) {
      if (!drag || drag.container !== container) { return; }
      e.preventDefault(); e.stopPropagation();
      clearMarks(container);
      if (drag.target == null) { return; }
      var from = drag.from, to = drag.target + (drag.after ? 1 : 0);
      if (to > from) { to--; }
      if (to !== from) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        drag = null;
        redraw(); changed();
      }
    });
  }
  function dragItem(item, handle, container, idx) {
    item.dataset.idx = idx;
    handle.addEventListener('mousedown', function () { item.draggable = true; });
    handle.addEventListener('mouseup', function () { item.draggable = false; });
    item.addEventListener('dragstart', function (e) {
      if (!item.draggable || e.target !== item) { return; }
      e.stopPropagation();
      drag = { container: container, from: idx, target: null };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
      item.classList.add('is-dragging');
    });
    item.addEventListener('dragend', function () {
      item.draggable = false;
      item.classList.remove('is-dragging');
      clearMarks(container);
      drag = null;
    });
  }
  function handleEl() { return h('span', { class: 'handle', title: 'Drag to reorder', 'aria-hidden': 'true' }, '⋮⋮'); }

  /* ===================================================================== form fields */
  function autosize(t) { t.style.height = 'auto'; t.style.height = (t.scrollHeight + 2) + 'px'; }
  function autosizeAll(root) {
    requestAnimationFrame(function () { Array.prototype.forEach.call(root.querySelectorAll('textarea'), autosize); });
  }

  function field(obj, key, opts) {
    opts = opts || {};
    var el = opts.multiline
      ? h('textarea', { dir: opts.dir || null, rows: opts.rows || 2, placeholder: opts.placeholder || null })
      : h('input', { dir: opts.dir || null, placeholder: opts.placeholder || null, type: 'text' });
    el.value = obj[key] == null ? '' : obj[key];
    el.addEventListener('input', function () {
      obj[key] = el.value;
      if (opts.onInput) { opts.onInput(el.value); }
      changed();
    });
    return el;
  }
  function labelEl(text, hint) {
    return h('span', { class: 'label' }, text, hint ? h('span', { class: 'hint' }, ' - ' + hint) : null);
  }
  function biField(label, o, opts) {
    opts = opts || {};
    return h('div', { class: 'field' },
      label ? labelEl(label, opts.hint) : null,
      h('div', { class: 'bi' },
        h('div', null, h('span', { class: 'lang' }, 'English'), field(o, 'en', Object.assign({}, opts, { dir: 'ltr' }))),
        h('div', null, h('span', { class: 'lang lang-ar' }, 'العربية'), field(o, 'ar', Object.assign({}, opts, { dir: 'rtl' })))
      )
    );
  }
  /** { ar: [...], en: [...] } edited as one item per line. */
  function biListField(label, o, hint) {
    function area(lang) {
      var t = h('textarea', { dir: lang === 'ar' ? 'rtl' : 'ltr', rows: 3 });
      t.value = o[lang].join('\n');
      t.addEventListener('input', function () {
        o[lang] = t.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
        changed();
      });
      return t;
    }
    return h('div', { class: 'field' },
      labelEl(label, hint || 'one item per line'),
      h('div', { class: 'bi' },
        h('div', null, h('span', { class: 'lang' }, 'English'), area('en')),
        h('div', null, h('span', { class: 'lang lang-ar' }, 'العربية'), area('ar'))
      )
    );
  }
  function subList(label, arr, make, body, hint) {
    var box = h('div', { class: 'group' });
    function draw() {
      var list = h('div', { class: 'sortable' });
      arr.forEach(function (it, i) {
        var hd = handleEl();
        var item = h('div', { class: 'subitem' }, hd, h('div', { class: 'subitem__body' }, body(it)),
          h('button', { class: 'icon-btn icon-btn--danger', type: 'button', title: 'Remove', 'aria-label': 'Remove',
            onclick: function () { arr.splice(i, 1); draw(); changed(); } }, '✕'));
        dragItem(item, hd, list, i);
        list.append(item);
      });
      sortable(list, arr, draw);
      box.replaceChildren(
        h('div', { class: 'group__head' }, labelEl(label, hint)),
        arr.length ? list : h('p', { class: 'muted', style: 'margin:0;font-size:13.5px' }, 'None yet.'),
        h('button', { class: 'btn btn--ghost btn--sm add-line', type: 'button',
          onclick: function () { arr.push(make()); draw(); changed(); } }, '+ Add')
      );
      autosizeAll(box);
    }
    draw();
    return box;
  }

  /* expandable rows (projects, team) */
  function expandRow(opts) {
    var hd = handleEl();
    var row = h('div', {
      class: 'row' + (opts.open ? ' is-open' : ''),
      onclick: function (e) { if (!e.target.closest('.handle')) { opts.toggle(); } }
    }, hd, opts.thumb, h('div', { class: 'row__body' }, opts.title, opts.sub), h('span', { class: 'muted' }, opts.open ? '▾' : '▸'));
    var wrap = h('div', { class: 'wrap' + (opts.open ? ' is-open' : '') }, row, opts.open ? opts.editor() : null);
    dragItem(wrap, hd, opts.list, opts.index);
    return wrap;
  }

  /* ===================================================================== tab: projects */
  function renderProjects() {
    var root = $('#tab-projects');
    var list = h('div', { class: 'sortable' });
    S.projects.forEach(function (p, i) {
      var thumb = h('img', { class: 'row__thumb', alt: '' });
      var title = h('div', { class: 'row__title' }), sub = h('div', { class: 'row__sub' });
      function refresh() {
        title.textContent = (p.number || '—') + ' · ' + (p.site.en || p.site.ar || 'Untitled project');
        sub.textContent = p.title.en || p.title.ar || '';
        setImg(thumb, p.cover.src);
      }
      refresh();
      var open = S.open.projects === p;
      list.append(expandRow({
        list: list, index: i, open: open, thumb: thumb, title: title, sub: sub,
        toggle: function () { S.open.projects = open ? null : p; renderProjects(); },
        editor: function () { return projectEditor(p, refresh); }
      }));
    });
    sortable(list, S.projects, renderProjects);
    root.replaceChildren(
      h('div', { class: 'tab-head' },
        h('div', null, h('h2', null, 'Projects'),
          h('p', null, 'Click a project to edit its text and photos. Drag ⋮⋮ to change the order on the site.')),
        h('button', { class: 'btn btn--primary', type: 'button', onclick: addProject }, '+ Add project')),
      list
    );
  }

  function addProject() {
    var n = String(S.projects.length + 1).padStart(2, '0');
    var p = normalizeProject({ id: 'project-' + n, number: n, years: String(new Date().getFullYear()) });
    S.projects.push(p);
    S.open.projects = p;
    renderProjects();
    changed();
    var last = $('#tab-projects .sortable').lastElementChild;
    if (last) { last.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  function projectEditor(p, refreshRow) {
    var coverBox = h('div', { class: 'field' });
    var galleryBox = h('div', { class: 'field' });

    function drawImages() { drawCover(); drawGallery(); refreshRow(); }

    function drawCover() {
      coverBox.replaceChildren(
        labelEl('Cover photo', 'shown on the project card'),
        h('div', { class: 'cover-row' },
          imageSlot({
            src: p.cover.src,
            onFile: function (f) {
              storeImage(f, 'assets/images/projects', p.id || 'project', 1600).then(function (r) {
                if (!r) { return; }
                var old = p.cover.src;
                p.cover.src = r.path;
                if (p.gallery[0] && p.gallery[0].src === old) { p.gallery[0].src = r.path; }
                else if (!old) { p.gallery.unshift({ src: r.path, alt: clone(p.cover.alt) }); }
                drawImages(); changed();
              });
            }
          }),
          h('div', { style: 'display:grid;gap:10px' },
            biField('Cover description', p.cover.alt, { hint: 'describes the photo for screen readers & Google' }),
            h('p', { class: 'muted', style: 'margin:0;font-size:13px' }, 'Tip: in the gallery below, click ★ on any photo to use it as the cover.'))
        )
      );
    }

    function drawGallery() {
      var grid = h('div', { class: 'gallery' });
      p.gallery.forEach(function (g, i) {
        var hd = handleEl();
        var tile = h('div', { class: 'tile' },
          imageSlot({
            src: g.src,
            onFile: function (f) {
              storeImage(f, 'assets/images/projects', p.id || 'project', 1600).then(function (r) {
                if (!r) { return; }
                if (p.cover.src === g.src) { p.cover.src = r.path; }
                g.src = r.path;
                drawImages(); changed();
              });
            }
          }),
          h('div', { class: 'tile__bar' }, hd,
            h('span', { class: 'grow' }, 'Photo ' + (i + 1) + (g.src === p.cover.src ? ' · cover' : '')),
            h('button', { class: 'icon-btn', type: 'button', title: 'Use as cover photo', 'aria-label': 'Use as cover photo',
              onclick: function () { p.cover = { src: g.src, alt: clone(g.alt) }; drawImages(); changed(); toast('Cover photo updated'); } }, '★'),
            h('button', { class: 'icon-btn icon-btn--danger', type: 'button', title: 'Remove photo', 'aria-label': 'Remove photo',
              onclick: function () { p.gallery.splice(i, 1); drawImages(); changed(); } }, '✕')),
          field(g.alt, 'en', { placeholder: 'Description (English)', dir: 'ltr' }),
          field(g.alt, 'ar', { placeholder: 'الوصف (عربي)', dir: 'rtl' })
        );
        dragItem(tile, hd, grid, i);
        grid.append(tile);
      });
      var add = h('label', { class: 'dropzone dropzone--add' },
        h('span', null, h('strong', null, '+'), 'Drop photos here', h('br'), 'or click to choose (several at once is fine)'),
        fileInput(true, addFiles));
      fileDrop(add, addFiles);
      grid.append(add);
      sortable(grid, p.gallery, drawImages, 'x');
      galleryBox.replaceChildren(labelEl('Photo gallery', 'drag ⋮⋮ to reorder · drop a photo on an image to replace it'), grid);
    }

    function addFiles(files) {
      files.reduce(function (chain, f) {
        return chain.then(function () {
          return storeImage(f, 'assets/images/projects', p.id || 'project', 1600).then(function (r) {
            if (r) { p.gallery.push({ src: r.path, alt: { ar: '', en: '' } }); }
          });
        });
      }, Promise.resolve()).then(function () {
        if (!p.cover.src && p.gallery[0]) { p.cover = { src: p.gallery[0].src, alt: clone(p.gallery[0].alt) }; }
        drawImages(); changed();
      });
    }

    drawCover(); drawGallery();

    var idInput = field(p, 'id', { placeholder: 'e.g. petra-temple', onInput: function () {} });
    idInput.addEventListener('change', function () { p.id = slugify(p.id); idInput.value = p.id; changed(); });
    var ongoing = h('input', { type: 'checkbox' });
    ongoing.checked = p.ongoing;
    ongoing.addEventListener('change', function () { p.ongoing = ongoing.checked; changed(); });

    var box = h('div', { class: 'editor' },
      h('div', { class: 'inline-fields' },
        h('label', { class: 'field' }, labelEl('Number'), field(p, 'number', { onInput: refreshRow })),
        h('label', { class: 'field' }, labelEl('Years', 'card label'), field(p, 'years')),
        h('label', { class: 'field' }, labelEl('ID', 'letters & dashes'), idInput),
        h('label', { class: 'check' }, ongoing, 'Ongoing project (untick = Accomplished)')
      ),
      biField('Site name', p.site, { hint: 'short name shown on the card', onInput: refreshRow }),
      biField('Project title', p.title, { multiline: true, onInput: refreshRow }),
      biField('Location', p.location),
      biField('Period', p.period),
      biField('Contract value', p.value, { hint: 'optional' }),
      biField('Summary', p.summary, { multiline: true, rows: 4 }),
      coverBox,
      galleryBox,
      subList('Key figures', p.figures, function () { return { value: '', label: { ar: '', en: '' } }; }, function (f) {
        return [h('label', { class: 'field', style: 'max-width:200px' }, labelEl('Number'), field(f, 'value', { placeholder: 'e.g. 150+', dir: 'ltr' })),
          biField('Label', f.label)];
      }, 'optional - big numbers in the project window'),
      biListField('Cooperation & funding', p.cooperation),
      biListField('Objectives', p.objectives),
      biListField('Works carried out', p.works),
      subList('Bill of quantities', p.boq, function () { return { item: { ar: '', en: '' }, qty: { ar: '', en: '' } }; }, function (r) {
        return [biField('Item', r.item), biField('Quantity', r.qty)];
      }, 'optional'),
      biListField('Achievements', p.achievements),
      h('div', { style: 'display:flex;justify-content:flex-end' },
        h('button', { class: 'btn btn--danger btn--sm', type: 'button', onclick: function () {
          if (!confirm('Delete the project "' + (p.site.en || p.site.ar || p.id) + '"? (Nothing changes on the live site until you publish.)')) { return; }
          S.projects.splice(S.projects.indexOf(p), 1);
          S.open.projects = null;
          renderProjects(); changed();
        } }, 'Delete project'))
    );
    autosizeAll(box);
    return box;
  }

  /* ===================================================================== tab: page photos */
  function renderImages() {
    var root = $('#tab-images');
    var grid = h('div', { class: 'photo-grid' });
    S.photos.forEach(function (ph) {
      var card = h('div', { class: 'card photo-card' });
      function draw() {
        var altEn = ph.altKey ? S.tr.en[ph.altKey] : '';
        var section = ph.altKey ? (SECTION_NAMES[ph.altKey.split('.')[0]] || ph.altKey.split('.')[0]) : 'Photo';
        var altProxy = ph.altKey ? {
          get en() { return S.tr.en[ph.altKey] || ''; }, set en(v) { S.tr.en[ph.altKey] = v; },
          get ar() { return S.tr.ar[ph.altKey] || ''; }, set ar(v) { S.tr.ar[ph.altKey] = v; }
        } : null;
        card.replaceChildren(
          h('h3', null, section),
          imageSlot({ src: ph.src, onFile: function (f) { replacePhoto(ph, f).then(function (ok) { if (ok) { draw(); } }); } }),
          h('div', { class: 'path', title: altEn || '' }, ph.src),
          altProxy ? biField('Description', altProxy, { multiline: true, rows: 2 }) : null
        );
        autosizeAll(card);
      }
      draw();
      grid.append(card);
    });
    root.replaceChildren(
      h('div', { class: 'tab-head' }, h('div', null, h('h2', null, 'Page photos'),
        h('p', null, 'Photos used in the page sections. Drop a new photo onto any image to replace it.'))),
      grid
    );
  }

  function replacePhoto(ph, file) {
    var dir = dirname(ph.src);
    if (/\/(projects|partners)$/.test(dir)) { dir = 'assets/images/site'; }
    return storeImage(file, dir, stripSuffix(basename(ph.src)), 2000).then(function (r) {
      if (!r) { return false; }
      var old = ph.src;
      var imgRe = new RegExp('<img\\b[^>]*src="' + r.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[^>]*>', 'g');
      PAGE_FILES.forEach(function (p) {
        var html = S.pages[p].split('"' + old + '"').join('"' + r.path + '"');
        S.pages[p] = html.replace(imgRe, function (tag) {
          return tag.replace(/\swidth="\d+"/, ' width="' + r.width + '"').replace(/\sheight="\d+"/, ' height="' + r.height + '"');
        });
      });
      ph.src = r.path;
      changed();
      return true;
    });
  }

  /* ===================================================================== tab: page text */
  var textFilter = '';
  function renderText() {
    var root = $('#tab-text');
    var keys = Object.keys(S.tr.ar);
    Object.keys(S.tr.en).forEach(function (k) { if (keys.indexOf(k) === -1) { keys.push(k); } });
    var groups = {};
    var order = [];
    keys.forEach(function (k) {
      var g = k.split('.')[0];
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push(k);
    });
    var sections = h('div');
    var search = h('input', { type: 'search', placeholder: 'Search text…', value: textFilter, 'aria-label': 'Search text' });

    function draw() {
      var q = textFilter.trim().toLowerCase();
      sections.replaceChildren();
      order.forEach(function (g) {
        var ks = groups[g].filter(function (k) {
          if (!q) { return true; }
          return (k + ' ' + (S.tr.en[k] || '') + ' ' + (S.tr.ar[k] || '')).toLowerCase().indexOf(q) !== -1;
        });
        if (!ks.length) { return; }
        var rows = h('div', { class: 'rows' });
        ks.forEach(function (k) {
          var row = h('div', { class: 'field' });
          var mark = function () {
            row.classList.toggle('is-changed', S.tr.en[k] !== S.orig.trObj.en[k] || S.tr.ar[k] !== S.orig.trObj.ar[k]);
          };
          var vars = ((S.tr.en[k] || '') + (S.tr.ar[k] || '')).match(/\{\w+\}/g);
          var long = Math.max((S.tr.en[k] || '').length, (S.tr.ar[k] || '').length) > 60;
          row.append(
            h('span', { class: 'text-key' }, k, vars ? h('span', { class: 'hint' }, ' - keep ' + Array.from(new Set(vars)).join(' ') + ' exactly as written') : null),
            h('div', { class: 'bi' },
              field(S.tr.en, k, { dir: 'ltr', multiline: long, onInput: mark }),
              field(S.tr.ar, k, { dir: 'rtl', multiline: long, onInput: mark }))
          );
          mark();
          rows.append(row);
        });
        sections.append(h('details', { class: 'card text-section', open: q ? true : null },
          h('summary', null, (SECTION_NAMES[g] || g) + '  ', h('span', { class: 'muted', style: 'font-weight:400' }, '(' + ks.length + ')')), rows));
      });
      if (!sections.children.length) { sections.append(h('p', { class: 'muted' }, 'No text matches your search.')); }
      Array.prototype.forEach.call(sections.querySelectorAll('details'), function (d) {
        d.addEventListener('toggle', function () { if (d.open) { autosizeAll(d); } });
      });
      autosizeAll(sections);
    }
    search.addEventListener('input', function () { textFilter = search.value; draw(); });
    draw();
    root.replaceChildren(
      h('div', { class: 'tab-head' }, h('div', null, h('h2', null, 'Page text'),
        h('p', null, 'All fixed text on the page, in English and Arabic. Changed fields are highlighted.'))),
      h('div', { class: 'text-tools' }, search),
      sections
    );
  }

  /* ===================================================================== tab: team */
  function renderTeam() {
    var root = $('#tab-team');
    var list = h('div', { class: 'sortable' });
    S.team.forEach(function (m, i) {
      var initials = h('div', { class: 'row__initials' });
      var title = h('div', { class: 'row__title' }), sub = h('div', { class: 'row__sub' });
      function refresh() {
        initials.textContent = m.initials.en || '?';
        title.textContent = m.name.en || m.name.ar || 'New team member';
        sub.textContent = m.role.en || '';
      }
      refresh();
      var open = S.open.team === m;
      list.append(expandRow({
        list: list, index: i, open: open, thumb: initials, title: title, sub: sub,
        toggle: function () { S.open.team = open ? null : m; renderTeam(); },
        editor: function () { return memberEditor(m, refresh); }
      }));
    });
    sortable(list, S.team, renderTeam);
    root.replaceChildren(
      h('div', { class: 'tab-head' },
        h('div', null, h('h2', null, 'Team'), h('p', null, 'Key personnel. Drag ⋮⋮ to change the order.')),
        h('button', { class: 'btn btn--primary', type: 'button', onclick: function () {
          var m = normalizeMember({ id: 'member-' + (S.team.length + 1) });
          S.team.push(m); S.open.team = m; renderTeam(); changed();
        } }, '+ Add member')),
      list
    );
  }

  function memberEditor(m, refresh) {
    var box = h('div', { class: 'editor' },
      biField('Name', m.name, { onInput: refresh }),
      biField('Initials', m.initials, { hint: 'shown in the circle', onInput: refresh }),
      biField('Role', m.role, { multiline: true, onInput: refresh }),
      biField('Biography', m.bio, { multiline: true, rows: 4 }),
      subList('Education', m.education, function () { return { year: '', title: { ar: '', en: '' }, place: { ar: '', en: '' } }; }, function (e) {
        return [h('label', { class: 'field', style: 'max-width:140px' }, labelEl('Year'), field(e, 'year', { dir: 'ltr' })),
          biField('Degree', e.title), biField('Institution', e.place)];
      }),
      subList('Experience groups', m.groups, function () { return { title: { ar: '', en: '' }, items: { ar: [], en: [] } }; }, function (g) {
        return [biField('Group title', g.title), biListField('Items', g.items)];
      }, 'e.g. academic appointments, memberships'),
      h('div', { style: 'display:flex;justify-content:flex-end' },
        h('button', { class: 'btn btn--danger btn--sm', type: 'button', onclick: function () {
          if (!confirm('Remove ' + (m.name.en || m.name.ar || 'this member') + ' from the team?')) { return; }
          S.team.splice(S.team.indexOf(m), 1); S.open.team = null; renderTeam(); changed();
        } }, 'Remove member'))
    );
    autosizeAll(box);
    return box;
  }

  /* ===================================================================== tab: partners */
  function renderPartners() {
    var root = $('#tab-partners');
    var groups = h('div', { class: 'partner-groups' });
    [['international', 'International partners'], ['national', 'National partners']].forEach(function (g) {
      var key = g[0], arr = S.partners[key] = S.partners[key] || [];
      var other = key === 'international' ? 'national' : 'international';
      var list = h('div', { class: 'sortable' });
      arr.forEach(function (pt, i) {
        var hd = handleEl();
        var slot = imageSlot({
          src: partnerPath(pt.logo), logo: true, label: 'Replace',
          onFile: function (f) {
            storeImage(f, 'assets/images/partners', stripSuffix(pt.logo), 600).then(function (r) {
              if (!r) { return; }
              pt.logo = basename(r.path).replace(/\.webp$/, '');
              renderPartners(); changed();
            });
          }
        });
        slot.style.cssText = 'width:110px;height:64px;flex:none';
        var row = h('div', { class: 'row', style: 'cursor:default' }, hd, slot,
          h('div', { class: 'row__body bi' },
            field(pt.name, 'en', { placeholder: 'Name (English)', dir: 'ltr' }),
            field(pt.name, 'ar', { placeholder: 'الاسم (عربي)', dir: 'rtl' })),
          h('div', { class: 'row__actions' },
            h('button', { class: 'icon-btn', type: 'button', title: 'Move to ' + other + ' partners', 'aria-label': 'Move to ' + other + ' partners',
              onclick: function () { arr.splice(i, 1); S.partners[other].push(pt); renderPartners(); changed(); } }, '⇅'),
            h('button', { class: 'icon-btn icon-btn--danger', type: 'button', title: 'Remove partner', 'aria-label': 'Remove partner',
              onclick: function () { arr.splice(i, 1); renderPartners(); changed(); } }, '✕'))
        );
        dragItem(row, hd, list, i);
        list.append(row);
      });
      sortable(list, arr, renderPartners);
      var add = h('label', { class: 'dropzone dropzone--add', style: 'min-height:80px;margin-top:10px' },
        h('span', null, '+ Drop partner logos here or click to add'),
        fileInput(true, addLogos));
      fileDrop(add, addLogos);
      function addLogos(files) {
        files.reduce(function (chain, f) {
          return chain.then(function () {
            return storeImage(f, 'assets/images/partners', slugify(f.name) || 'partner', 600).then(function (r) {
              if (r) { arr.push({ logo: basename(r.path).replace(/\.webp$/, ''), name: { ar: '', en: '' } }); }
            });
          });
        }, Promise.resolve()).then(function () { renderPartners(); changed(); toast('Logo added - now type the partner name'); });
      }
      groups.append(h('div', null, h('h3', null, g[1]), list, add));
    });
    root.replaceChildren(
      h('div', { class: 'tab-head' }, h('div', null, h('h2', null, 'Partners'),
        h('p', null, 'Drop a logo on an existing one to replace it. Drag ⋮⋮ to reorder; ⇅ moves a partner to the other group.'))),
      groups
    );
  }

  /* ===================================================================== tab: jobs & calls */
  function renderOpps() {
    var root = $('#tab-opps');
    var groups = h('div');
    OPP_KINDS.forEach(function (kind) {
      var key = kind[0], arr = S.opps[key];
      var single = kind[1].toLowerCase().replace(/s$/, '');
      var list = h('div', { class: 'sortable' });
      arr.forEach(function (o, i) {
        var status = h('span', { class: 'status' });
        var title = h('div', { class: 'row__title' }), sub = h('div', { class: 'row__sub' });
        function refresh() {
          var open = oppIsOpen(o);
          status.textContent = open ? 'Open' : 'Closed';
          status.className = 'status status--' + (open ? 'open' : 'closed');
          title.textContent = o.title.en || o.title.ar || 'Untitled';
          sub.textContent = (o.status ? 'Set to ' + o.status + ' manually · ' : '') +
            (o.deadline ? 'Deadline ' + o.deadline : 'No deadline');
        }
        refresh();
        var isOpen = S.open.opps === o;
        list.append(expandRow({
          list: list, index: i, open: isOpen, thumb: status, title: title, sub: sub,
          toggle: function () { S.open.opps = isOpen ? null : o; renderOpps(); },
          editor: function () { return oppEditor(o, arr, refresh); }
        }));
      });
      sortable(list, arr, renderOpps);
      groups.append(h('div', { class: 'opp-group' },
        h('div', { class: 'opp-group__head' },
          h('h3', null, kind[1] + ' ', h('span', { class: 'muted', style: 'font-weight:400' }, '(' + arr.length + ') · ' + kind[2])),
          h('button', { class: 'btn btn--primary btn--sm', type: 'button', onclick: function () {
            var o = normalizeOpp({ id: single + '-' + Date.now().toString(36), posted: new Date().toISOString().slice(0, 10) });
            arr.unshift(o); S.open.opps = o; renderOpps(); changed();
          } }, '+ Add ' + single)),
        arr.length ? list : h('p', { class: 'muted' }, 'Nothing published - the page shows a "nothing open right now" note.')));
    });
    root.replaceChildren(
      h('div', { class: 'tab-head' }, h('div', null, h('h2', null, 'Jobs & calls'),
        h('p', null, 'Status "Automatic" opens/closes a listing by its deadline (Closed after that day); choose Open or Closed to set it yourself. ' +
          'On the site, open listings come first (soonest deadline first), then closed ones (newest first).'))),
      groups
    );
  }

  function oppEditor(o, arr, refresh) {
    function dateInput(key) {
      var el = h('input', { type: 'date', dir: 'ltr' });
      el.value = o[key];
      el.addEventListener('input', function () { o[key] = el.value; refresh(); changed(); });
      return el;
    }
    var status = h('select', null,
      h('option', { value: '' }, 'Automatic (from deadline)'),
      h('option', { value: 'open' }, 'Open'),
      h('option', { value: 'closed' }, 'Closed'));
    status.value = o.status;
    status.addEventListener('change', function () { o.status = status.value; refresh(); changed(); });
    var idInput = field(o, 'id', { placeholder: 'e.g. site-conservator-2026', dir: 'ltr' });
    idInput.addEventListener('change', function () { o.id = slugify(o.id); idInput.value = o.id; changed(); });

    var applyMode = h('select', null,
      h('option', { value: 'none' }, 'No apply button'),
      h('option', { value: 'email' }, 'E-mail'),
      h('option', { value: 'url' }, 'Link to a form / website'));
    applyMode.value = o.apply.url ? 'url' : (o.apply.email ? 'email' : 'none');
    var applyValue = h('input', { type: 'text', dir: 'ltr' });
    function syncApply() {
      var m = applyMode.value;
      applyValue.hidden = m === 'none';
      applyValue.placeholder = m === 'url' ? 'https://…' : 'info@tarmeem-center.org';
      applyValue.value = m === 'url' ? o.apply.url : o.apply.email;
    }
    applyMode.addEventListener('change', function () {
      var v = applyValue.value.trim();
      o.apply = { email: '', url: '' };
      if (applyMode.value !== 'none') { o.apply[applyMode.value] = v; }
      syncApply(); changed();
    });
    applyValue.addEventListener('input', function () {
      o.apply = { email: '', url: '' };
      o.apply[applyMode.value] = applyValue.value.trim();
      changed();
    });
    syncApply();

    var box = h('div', { class: 'editor' },
      h('div', { class: 'inline-fields' },
        h('label', { class: 'field' }, labelEl('Status'), status),
        h('label', { class: 'field' }, labelEl('Deadline', 'optional'), dateInput('deadline')),
        h('label', { class: 'field' }, labelEl('Posted', 'optional'), dateInput('posted')),
        h('label', { class: 'field' }, labelEl('ID', 'letters & dashes'), idInput)
      ),
      biField('Title', o.title, { multiline: true, onInput: refresh }),
      biField('Type', o.type, { hint: 'short label, e.g. Full-time · Call for experts' }),
      biField('Location', o.location, { hint: 'optional' }),
      biField('Summary', o.summary, { multiline: true, rows: 4 }),
      subList('Details', o.sections, function () { return { title: { ar: '', en: '' }, items: { ar: [], en: [] } }; }, function (s) {
        return [biField('Heading', s.title, { hint: 'e.g. Requirements, How to apply' }), biListField('Points', s.items)];
      }, 'shown under "View details"'),
      h('div', { class: 'field' }, labelEl('Apply button', 'hidden automatically once the listing is closed'),
        h('div', { class: 'inline-fields' }, applyMode, applyValue)),
      h('label', { class: 'field' }, labelEl('Document link', 'optional - a PDF on the site or any URL, e.g. Google Drive'),
        field(o, 'file', { dir: 'ltr', placeholder: 'assets/docs/call.pdf or https://…' })),
      biField('Document button text', o.fileLabel, { hint: 'optional - default "Download announcement"' }),
      h('div', { style: 'display:flex;justify-content:flex-end' },
        h('button', { class: 'btn btn--danger btn--sm', type: 'button', onclick: function () {
          if (!confirm('Delete "' + (o.title.en || o.title.ar || o.id) + '"? (Nothing changes on the live site until you publish.)')) { return; }
          arr.splice(arr.indexOf(o), 1); S.open.opps = null; renderOpps(); changed();
        } }, 'Delete listing'))
    );
    autosizeAll(box);
    return box;
  }

  /* ===================================================================== tabs */
  var RENDER = { projects: renderProjects, images: renderImages, text: renderText, team: renderTeam, partners: renderPartners, opps: renderOpps };
  function showTab(name) {
    if (!RENDER[name]) { name = 'projects'; }
    S.tab = name;
    try { localStorage.setItem(STORE_KEY + '-tab', name); } catch (e) { /* ignore */ }
    Array.prototype.forEach.call(document.querySelectorAll('[data-tab]'), function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-tab') === name ? 'true' : 'false');
    });
    Object.keys(RENDER).forEach(function (k) { $('#tab-' + k).hidden = k !== name; });
    RENDER[name]();
  }

  /* ===================================================================== load */
  function load() {
    $('#loading').hidden = false;
    $('#loading').textContent = 'Loading site content from GitHub…';
    Object.keys(RENDER).forEach(function (k) { $('#tab-' + k).hidden = true; });
    return gh('GET', repoPath('/git/ref/heads/' + encodeURIComponent(S.cfg.branch))).then(function (ref) {
      S.headSha = ref.object.sha;
      return gh('GET', repoPath('/git/commits/' + S.headSha));
    }).then(function (commit) {
      return gh('GET', repoPath('/git/trees/' + commit.tree.sha + '?recursive=1'));
    }).then(function (tree) {
      S.tree = new Map();
      tree.tree.forEach(function (e) { if (e.type === 'blob') { S.tree.set(e.path, e.sha); } });
      return Promise.all(DATA_FILES.map(function (p) {
        var sha = S.tree.get(p);
        if (!sha) {
          if (/^(index\.html|js\/)/.test(p)) { throw new Error(p + ' was not found in the repository.'); }
          S.files[p] = { sha: null, text: '' };
          return null;
        }
        return gh('GET', repoPath('/git/blobs/' + sha)).then(function (b) { S.files[p] = { sha: sha, text: b64ToText(b.content) }; });
      }));
    }).then(function () {
      setup();
      $('#loading').hidden = true;
      showTab(S.tab);
    }).catch(function (e) {
      $('#loading').textContent = 'Could not load the site: ' + e.message;
      throw e;
    });
  }

  function setup() {
    var data = evalData(S.files['js/projects.js'].text + '\n' + S.files['js/content.js'].text + '\n' + S.files['js/opportunities.js'].text);
    S.projects = (data.PROJECTS || []).map(normalizeProject);
    S.team = (data.TEAM || []).map(normalizeMember);
    S.partners = clone(data.PARTNERS || { international: [], national: [] });
    var opps = data.OPPORTUNITIES || {};
    S.opps = { jobs: (opps.jobs || []).map(normalizeOpp), calls: (opps.calls || []).map(normalizeOpp) };
    var tr = extractTranslations(S.files['js/i18n.js'].text);
    S.tr = { ar: clone(tr.ar || {}), en: clone(tr.en || {}) };
    S.pages = {};
    PAGE_FILES.forEach(function (p) { S.pages[p] = S.files[p].text; });
    S.photos = parsePhotos(PAGE_FILES.map(function (p) { return S.pages[p]; }).join('\n'));
    S.orig = {
      projects: JSON.stringify(S.projects.map(cleanProject)),
      team: JSON.stringify(S.team),
      partners: JSON.stringify(S.partners),
      opps: JSON.stringify(cleanOpps()),
      tr: JSON.stringify(S.tr),
      trObj: clone(S.tr)
    };
    S.origRefs = collectRefs();
    S.pending.forEach(function (v) { URL.revokeObjectURL(v.url); });
    S.pending.clear();
    S.open = { projects: null, team: null, opps: null };
    changed();
  }

  /* ===================================================================== publish */
  function validate() {
    var errors = [];
    var ids = {};
    S.projects.forEach(function (p, i) {
      var name = p.site.en || p.site.ar || ('project ' + (i + 1));
      p.id = slugify(p.id);
      if (!p.id) { errors.push('Project "' + name + '" needs an ID.'); }
      else if (ids[p.id]) { errors.push('Two projects use the ID "' + p.id + '".'); }
      ids[p.id] = true;
      if (!p.cover.src && p.gallery[0]) { p.cover = { src: p.gallery[0].src, alt: clone(p.gallery[0].alt) }; }
      if (!p.cover.src) { errors.push('Project "' + name + '" needs a cover photo.'); }
      if (!(p.title.en || p.title.ar)) { errors.push('Project "' + name + '" needs a title.'); }
    });
    ['international', 'national'].forEach(function (g) {
      S.partners[g].forEach(function (pt) {
        if (!(pt.name.en || pt.name.ar)) { errors.push('A partner logo (' + pt.logo + ') has no name.'); }
      });
    });
    var oppIds = {};
    OPP_KINDS.forEach(function (kind) {
      var single = kind[1].toLowerCase().replace(/s$/, '');
      S.opps[kind[0]].forEach(function (o, i) {
        var name = o.title.en || o.title.ar || (single + ' ' + (i + 1));
        o.id = slugify(o.id);
        if (!o.id) { errors.push('"' + name + '" needs an ID.'); }
        else if (oppIds[o.id]) { errors.push('Two jobs/calls use the ID "' + o.id + '".'); }
        oppIds[o.id] = true;
        if (!(o.title.en || o.title.ar)) { errors.push('A ' + single + ' needs a title.'); }
        if (o.apply.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.apply.email)) { errors.push('"' + name + '": the apply e-mail looks wrong.'); }
        if (o.apply.url && !/^https?:\/\//.test(o.apply.url)) { errors.push('"' + name + '": the apply link must start with https://'); }
      });
    });
    return errors;
  }

  function buildChanges() {
    var writes = [];
    var texts = {};
    if (JSON.stringify(S.projects.map(cleanProject)) !== S.orig.projects) {
      texts['js/projects.js'] = buildProjectsJs();
      var check = evalData(texts['js/projects.js']).PROJECTS;
      if (JSON.stringify(check) !== JSON.stringify(S.projects.map(cleanProject))) { throw new Error('Internal check failed for js/projects.js - nothing was published.'); }
    }
    if (JSON.stringify(S.team) !== S.orig.team || JSON.stringify(S.partners) !== S.orig.partners) {
      texts['js/content.js'] = buildContentJs();
      var c = evalData(texts['js/content.js']);
      if (JSON.stringify(c.TEAM) !== JSON.stringify(S.team.map(cleanMember)) || JSON.stringify(c.PARTNERS) !== JSON.stringify(S.partners)) {
        throw new Error('Internal check failed for js/content.js - nothing was published.');
      }
    }
    if (JSON.stringify(cleanOpps()) !== S.orig.opps) {
      texts['js/opportunities.js'] = buildOppsJs();
      var o = evalData(texts['js/opportunities.js']).OPPORTUNITIES;
      if (JSON.stringify(o) !== JSON.stringify(cleanOpps())) { throw new Error('Internal check failed for js/opportunities.js - nothing was published.'); }
    }
    if (JSON.stringify(S.tr) !== S.orig.tr) {
      texts['js/i18n.js'] = writeTranslations(S.files['js/i18n.js'].text);
      var t = extractTranslations(texts['js/i18n.js']);
      if (JSON.stringify({ ar: t.ar, en: t.en }) !== JSON.stringify(S.tr)) {
        // key order can differ for newly inserted keys - compare per key
        var bad = ['ar', 'en'].some(function (l) { return Object.keys(S.tr[l]).some(function (k) { return t[l][k] !== S.tr[l][k]; }); });
        if (bad) { throw new Error('Internal check failed for js/i18n.js - nothing was published.'); }
      }
    }
    PAGE_FILES.forEach(function (p) { if (S.pages[p] !== S.files[p].text) { texts[p] = S.pages[p]; } });
    Object.keys(texts).forEach(function (p) { writes.push({ path: p, text: texts[p] }); });

    var refs = collectRefs();
    S.pending.forEach(function (v, path) { if (refs.has(path)) { writes.push({ path: path, blob: v.blob }); } });

    // remove photos that nothing uses any more
    var finalText = DATA_FILES.map(function (p) { return texts[p] != null ? texts[p] : S.files[p].text; }).join('\n');
    var deletes = [];
    S.origRefs.forEach(function (path) {
      if (!refs.has(path) && S.tree.has(path) && finalText.indexOf(path) === -1) { deletes.push(path); }
    });
    return { writes: writes, deletes: deletes };
  }

  var planned = null;
  function openPublish() {
    var errors = validate();
    if (errors.length) { toast(errors[0] + (errors.length > 1 ? ' (+' + (errors.length - 1) + ' more)' : ''), true); return; }
    try { planned = buildChanges(); } catch (e) { toast(e.message, true); return; }
    if (!planned.writes.length && !planned.deletes.length) { toast('Nothing to publish.'); return; }
    var list = $('#publish-files');
    list.replaceChildren();
    planned.writes.forEach(function (w) {
      list.append(h('li', { class: S.tree.has(w.path) ? '' : 'add' }, (S.tree.has(w.path) ? '✎ ' : '+ ') + w.path));
    });
    planned.deletes.forEach(function (p) { list.append(h('li', { class: 'del' }, '− ' + p + ' (no longer used)')); });
    $('#publish-target').textContent = S.cfg.repo + ' @ ' + S.cfg.branch;
    $('#publish-error').textContent = '';
    $('#publish-confirm').disabled = false;
    $('#publish-confirm').textContent = 'Publish now';
    $('#publish-dialog').showModal();
  }

  function doPublish() {
    var btn = $('#publish-confirm');
    var message = $('#publish-message').value.trim() || 'Update site content';
    var writes = planned.writes, deletes = planned.deletes;
    var parent;
    S.busy = true;
    btn.disabled = true;
    btn.textContent = 'Checking…';
    $('#publish-error').textContent = '';
    return gh('GET', repoPath('/git/ref/heads/' + encodeURIComponent(S.cfg.branch))).then(function (ref) {
      parent = ref.object.sha;
      return gh('GET', repoPath('/git/commits/' + parent));
    }).then(function (commit) {
      if (parent === S.headSha) { return commit; }
      // Someone pushed in the meantime: only continue if the files we rewrite are untouched.
      return gh('GET', repoPath('/git/trees/' + commit.tree.sha + '?recursive=1')).then(function (t) {
        var now = new Map(t.tree.map(function (e) { return [e.path, e.sha]; }));
        var conflicts = writes.filter(function (w) { return w.text != null && now.get(w.path) !== S.files[w.path].sha; })
          .map(function (w) { return w.path; });
        if (conflicts.length) {
          throw new Error(conflicts.join(', ') + ' changed on GitHub after you opened the editor. Copy any text you need, then reload this page.');
        }
        deletes = deletes.filter(function (p) { return now.has(p); });
        return commit;
      });
    }).then(function (commit) {
      var tree = [];
      var i = 0;
      return writes.reduce(function (chain, w) {
        return chain.then(function () {
          btn.textContent = 'Uploading ' + (++i) + ' / ' + writes.length + '…';
          var body = w.text != null ? Promise.resolve({ content: w.text, encoding: 'utf-8' })
            : blobToB64(w.blob).then(function (b) { return { content: b, encoding: 'base64' }; });
          return body.then(function (b) { return gh('POST', repoPath('/git/blobs'), b); }).then(function (blob) {
            tree.push({ path: w.path, mode: '100644', type: 'blob', sha: blob.sha });
          });
        });
      }, Promise.resolve()).then(function () {
        deletes.forEach(function (p) { tree.push({ path: p, mode: '100644', type: 'blob', sha: null }); });
        btn.textContent = 'Publishing…';
        return gh('POST', repoPath('/git/trees'), { base_tree: commit.tree.sha, tree: tree });
      });
    }).then(function (newTree) {
      return gh('POST', repoPath('/git/commits'), { message: message, tree: newTree.sha, parents: [parent] });
    }).then(function (newCommit) {
      return gh('PATCH', repoPath('/git/refs/heads/' + encodeURIComponent(S.cfg.branch)), { sha: newCommit.sha });
    }).then(function () {
      S.busy = false;
      $('#publish-dialog').close();
      toast('Published! The live site updates in 1–2 minutes.');
      return load();
    }).catch(function (e) {
      S.busy = false;
      btn.disabled = false;
      btn.textContent = 'Try again';
      $('#publish-error').textContent = e.message;
      changed();
    });
  }

  /* ===================================================================== boot */
  function pagesUrl(repo) {
    var parts = repo.split('/');
    var owner = parts[0].toLowerCase(), name = parts[1] || '';
    return name.toLowerCase() === owner + '.github.io' ? 'https://' + owner + '.github.io/' : 'https://' + owner + '.github.io/' + name + '/';
  }

  function startApp() {
    $('#login').hidden = true;
    $('#app').hidden = false;
    $('#view-site').href = pagesUrl(S.cfg.repo);
    try { S.tab = localStorage.getItem(STORE_KEY + '-tab') || 'projects'; } catch (e) { /* ignore */ }
    load().catch(function () { /* message shown in #loading */ });
  }

  function showLogin(err) {
    $('#app').hidden = true;
    $('#login').hidden = false;
    $('#login-error').textContent = err || '';
    var saved = storeGet();
    if (saved) { $('#login-repo').value = saved.repo || $('#login-repo').value; $('#login-branch').value = saved.branch || 'main'; }
  }

  function init() {
    // Dropping a file outside a drop zone must not navigate away from the editor.
    window.addEventListener('dragover', function (e) { if (hasFiles(e)) { e.preventDefault(); e.dataTransfer.dropEffect = 'none'; } });
    window.addEventListener('drop', function (e) { if (hasFiles(e)) { e.preventDefault(); } });
    document.addEventListener('input', function (e) { if (e.target.tagName === 'TEXTAREA') { autosize(e.target); } });
    window.addEventListener('beforeunload', function (e) { if (isDirty()) { e.preventDefault(); e.returnValue = ''; } });

    $('#login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var cfg = {
        repo: $('#login-repo').value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').replace(/\/$/, ''),
        branch: $('#login-branch').value.trim() || 'main',
        token: $('#login-token').value.trim()
      };
      var btn = e.submitter || $('#login-form button[type=submit]');
      btn.disabled = true;
      $('#login-error').textContent = '';
      S.cfg = cfg;
      gh('GET', repoPath('')).then(function (repo) {
        if (!repo.permissions || !repo.permissions.push) { throw new Error('This token can read the repository but cannot write to it. Give it "Contents: Read and write".'); }
        // Fine-grained tokens report the account's role above, not the token's own rights,
        // so prove write access with a harmless unreferenced blob.
        return gh('POST', repoPath('/git/blobs'), { content: '', encoding: 'utf-8' });
      }).then(function () {
        storeSet(cfg, $('#login-remember').checked);
        $('#login-token').value = '';
        startApp();
      }).catch(function (err) {
        $('#login-error').textContent = err.message;
      }).then(function () { btn.disabled = false; });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-tab]'), function (b) {
      b.addEventListener('click', function () { if (S.orig.projects) { showTab(b.getAttribute('data-tab')); } });
    });
    $('#btn-publish').addEventListener('click', openPublish);
    $('#publish-form').addEventListener('submit', function (e) {
      if (e.submitter && e.submitter.value === 'cancel') { return; }
      e.preventDefault();
      doPublish();
    });
    $('#btn-discard').addEventListener('click', function () {
      if (!isDirty() && !S.pending.size) { toast('No changes to discard.'); return; }
      if (!confirm('Discard all unsaved changes?')) { return; }
      setup();
      showTab(S.tab);
      toast('Changes discarded.');
    });
    $('#btn-logout').addEventListener('click', function () {
      if (isDirty() && !confirm('You have unsaved changes. Disconnect anyway?')) { return; }
      storeClear();
      S.orig = {};
      location.reload();
    });

    var saved = storeGet();
    if (saved && saved.token) { S.cfg = saved; startApp(); } else { showLogin(); }
  }

  init();
})();
