/* =============================================================================
   i18n.js - bilingual (Arabic / English) text for the Tarmeem Center website.

   HOW IT WORKS
   - Every translatable element in index.html carries data-i18n="key"
     (text content) or data-i18n-attr="attribute:key;attribute2:key2"
     (attributes such as aria-label, alt, content, placeholder).
   - Text in [square brackets] is a PLACEHOLDER that must be replaced with the
     Center's real content before publishing.
   - To add a new string: add the same key to BOTH `ar` and `en`, then use it
     in index.html (or via I18n.t('key') from main.js).
   ============================================================================ */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'tarmeem-lang';
  var DEFAULT_LANG = 'ar';
  var SUPPORTED = ['ar', 'en'];

  var translations = {
    /* ----------------------------------------------------------------------- */
    ar: {
      'meta.title': 'مركز ترميم للمحافظة على التراث',
      'meta.description': 'الموقع الرسمي لمركز ترميم للمحافظة على التراث. استعرضوا مشاريع المركز في الترميم والتوثيق والتعليم والمعارض.',

      'a11y.skip': 'الانتقال إلى المحتوى',

      'brand.name': 'مركز ترميم',
      'brand.sub': 'للمحافظة على التراث',
      'brand.homeLink': 'مركز ترميم للمحافظة على التراث - الرئيسية',
      'brand.logoAlt': 'شعار مركز ترميم للمحافظة على التراث',

      'nav.label': 'القائمة الرئيسية',
      'nav.open': 'فتح القائمة',
      'nav.close': 'إغلاق القائمة',
      'nav.home': 'الرئيسية',
      'nav.about': 'عن المركز',
      'nav.projects': 'المشاريع',
      'nav.contact': 'تواصل معنا',

      'lang.label': 'اللغة',

      'hero.eyebrow': 'مركز ترميم',
      'hero.title': 'مركز ترميم للمحافظة على التراث',
      'hero.mission': '[نص الرسالة في جملة واحدة]',
      'hero.cta': 'استعرض المشاريع',
      'hero.ctaSecondary': 'تعرّف على المركز',
      'hero.imageAlt': 'أعمدة كورنثية في الشارع المعمّد بمدينة جرش الأثرية عند الغروب',

      'about.eyebrow': 'من نحن',
      'about.title': 'عن المركز',
      'about.intro': '[نبذة عن المركز: سنة التأسيس، والموقع، ومجالات العمل الرئيسية]',
      'about.missionTitle': 'رسالتنا',
      'about.mission': '[نص الرسالة]',
      'about.visionTitle': 'رؤيتنا',
      'about.vision': '[نص الرؤية]',

      'stats.label': 'أرقام رئيسية',
      'stats.projects': 'مشاريع منجزة',
      'stats.years': 'سنوات من العمل',
      'stats.sites': 'مواقع مُرمَّمة',
      'stats.events': 'فعاليات ومعارض',

      'projects.eyebrow': 'أعمالنا',
      'projects.title': 'المشاريع',
      'projects.subtitle': 'نماذج من أعمال المركز في الترميم والتوثيق والتعليم والمعارض.',
      'projects.empty': 'لا توجد مشاريع في هذه الفئة حاليًا.',
      'projects.viewDetails': 'عرض التفاصيل',
      'projects.status': 'يتم عرض {count} من المشاريع.',
      'projects.openDetails': 'عرض تفاصيل مشروع: {title}',

      'filters.label': 'تصفية المشاريع حسب الفئة',
      'filters.all': 'الكل',
      'category.restoration': 'ترميم',
      'category.documentation': 'توثيق',
      'category.education': 'تعليم',
      'category.exhibitions': 'معارض',

      'modal.close': 'إغلاق',
      'modal.location': 'الموقع',
      'modal.year': 'السنة',
      'modal.prev': 'الصورة السابقة',
      'modal.next': 'الصورة التالية',
      'modal.thumbs': 'الصور المصغّرة',
      'modal.counter': 'الصورة {current} من {total}',
      'modal.showImage': 'عرض الصورة {index}',

      'contact.eyebrow': 'نرحّب بكم',
      'contact.title': 'تواصل معنا',
      'contact.subtitle': 'يسعدنا تواصلكم للاستفسار أو التعاون أو زيارة المركز.',
      'contact.email': 'البريد الإلكتروني',
      'contact.phone': 'الهاتف',
      'contact.address': 'العنوان',
      'contact.addressValue': '[العنوان الكامل]',
      'contact.social': 'تابعونا',
      'contact.socialLabel': 'روابط التواصل الاجتماعي',

      'form.note': 'سيؤدي الإرسال إلى فتح تطبيق البريد الإلكتروني لديكم مع رسالة مُعدّة مسبقًا.',
      'form.name': 'الاسم',
      'form.email': 'البريد الإلكتروني',
      'form.message': 'الرسالة',
      'form.submit': 'إرسال الرسالة',
      'form.subject': 'رسالة من موقع مركز ترميم',
      'form.bodyName': 'الاسم',
      'form.bodyEmail': 'البريد الإلكتروني',
      'form.bodyMessage': 'الرسالة',

      'footer.founded': 'تأسس عام [سنة التأسيس] - [الموقع]',
      'footer.navLabel': 'روابط التذييل',
      'footer.rights': 'مركز ترميم للمحافظة على التراث. جميع الحقوق محفوظة.',
      'footer.backToTop': 'العودة إلى الأعلى'
    },

    /* ----------------------------------------------------------------------- */
    en: {
      'meta.title': 'Tarmeem Center for the Preservation of Heritage',
      'meta.description': 'Official website of the Tarmeem Center for the Preservation of Heritage. Explore our projects in restoration, documentation, education and exhibitions.',

      'a11y.skip': 'Skip to content',

      'brand.name': 'Tarmeem Center',
      'brand.sub': 'for the Preservation of Heritage',
      'brand.homeLink': 'Tarmeem Center for the Preservation of Heritage - Home',
      'brand.logoAlt': 'Tarmeem Center for the Preservation of Heritage logo',

      'nav.label': 'Main navigation',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',

      'lang.label': 'Language',

      'hero.eyebrow': 'Tarmeem Center',
      'hero.title': 'Tarmeem Center for the Preservation of Heritage',
      'hero.mission': '[ONE-SENTENCE MISSION TEXT]',
      'hero.cta': 'View Projects',
      'hero.ctaSecondary': 'About the Center',
      'hero.imageAlt': 'Corinthian columns along the colonnaded street of ancient Jerash at sunset',

      'about.eyebrow': 'Who we are',
      'about.title': 'About the Center',
      'about.intro': '[ABOUT TEXT: founding year, location and main areas of work]',
      'about.missionTitle': 'Our Mission',
      'about.mission': '[MISSION TEXT]',
      'about.visionTitle': 'Our Vision',
      'about.vision': '[VISION TEXT]',

      'stats.label': 'Key numbers',
      'stats.projects': 'Projects completed',
      'stats.years': 'Years of work',
      'stats.sites': 'Sites restored',
      'stats.events': 'Events & exhibitions',

      'projects.eyebrow': 'Our work',
      'projects.title': 'Projects',
      'projects.subtitle': 'A selection of the Center\u2019s work in restoration, documentation, education and exhibitions.',
      'projects.empty': 'There are no projects in this category yet.',
      'projects.viewDetails': 'View details',
      'projects.status': 'Showing {count} projects.',
      'projects.openDetails': 'View project details: {title}',

      'filters.label': 'Filter projects by category',
      'filters.all': 'All',
      'category.restoration': 'Restoration',
      'category.documentation': 'Documentation',
      'category.education': 'Education',
      'category.exhibitions': 'Exhibitions',

      'modal.close': 'Close',
      'modal.location': 'Location',
      'modal.year': 'Year',
      'modal.prev': 'Previous image',
      'modal.next': 'Next image',
      'modal.thumbs': 'Thumbnails',
      'modal.counter': 'Image {current} of {total}',
      'modal.showImage': 'Show image {index}',

      'contact.eyebrow': 'Get in touch',
      'contact.title': 'Contact Us',
      'contact.subtitle': 'We welcome inquiries, collaborations and visits to the Center.',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.address': 'Address',
      'contact.addressValue': '[FULL ADDRESS]',
      'contact.social': 'Follow us',
      'contact.socialLabel': 'Social media links',

      'form.note': 'Sending opens your email application with a pre-filled message.',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.message': 'Message',
      'form.submit': 'Send Message',
      'form.subject': 'Message from the Tarmeem Center website',
      'form.bodyName': 'Name',
      'form.bodyEmail': 'Email',
      'form.bodyMessage': 'Message',

      'footer.founded': 'Founded in [FOUNDED YEAR] - [LOCATION]',
      'footer.navLabel': 'Footer links',
      'footer.rights': 'Tarmeem Center for the Preservation of Heritage. All rights reserved.',
      'footer.backToTop': 'Back to top'
    }
  };

  /* ------------------------------------------------------------------------- */

  function readStoredLang() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(value) !== -1 ? value : null;
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore: private mode or storage disabled */ }
  }

  function getLang() {
    var lang = document.documentElement.lang;
    return SUPPORTED.indexOf(lang) !== -1 ? lang : DEFAULT_LANG;
  }

  function interpolate(str, vars) {
    if (!vars) { return str; }
    return str.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
    });
  }

  /** Translate a key for the current language, with optional {placeholders}. */
  function t(key, vars) {
    var lang = getLang();
    var table = translations[lang] || {};
    var fallback = translations[DEFAULT_LANG] || {};
    var str = Object.prototype.hasOwnProperty.call(table, key) ? table[key]
      : Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key]
      : key;
    return interpolate(str, vars);
  }

  /** Pick a language variant from an object such as { ar: '...', en: '...' }. */
  function pick(obj) {
    if (obj == null) { return ''; }
    if (typeof obj === 'string') { return obj; }
    var lang = getLang();
    return obj[lang] != null ? obj[lang] : (obj[DEFAULT_LANG] != null ? obj[DEFAULT_LANG] : '');
  }

  /** Apply translations to every [data-i18n] / [data-i18n-attr] element. */
  function applyTranslations(root) {
    root = root || document;

    var textNodes = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i++) {
      var node = textNodes[i];
      node.textContent = t(node.getAttribute('data-i18n'));
    }

    var attrNodes = root.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var el = attrNodes[j];
      var pairs = el.getAttribute('data-i18n-attr').split(';');
      for (var k = 0; k < pairs.length; k++) {
        var pair = pairs[k].trim();
        if (!pair) { continue; }
        var idx = pair.indexOf(':');
        if (idx === -1) { continue; }
        var attr = pair.slice(0, idx).trim();
        var key = pair.slice(idx + 1).trim();
        el.setAttribute(attr, t(key));
      }
    }
  }

  /** Switch the site language: updates <html lang/dir>, storage and all text. */
  function setLang(lang, options) {
    options = options || {};
    if (SUPPORTED.indexOf(lang) === -1) { lang = DEFAULT_LANG; }

    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (options.persist !== false) { storeLang(lang); }

    applyTranslations();

    var buttons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute('data-lang') === lang;
      buttons[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    var event;
    try {
      event = new CustomEvent('langchange', { detail: { lang: lang } });
    } catch (e) {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('langchange', false, false, { lang: lang });
    }
    document.dispatchEvent(event);
  }

  /** Initialise from storage (or the default) on page load. */
  function init() {
    var lang = readStoredLang() || DEFAULT_LANG;
    setLang(lang, { persist: false });
  }

  global.I18n = {
    t: t,
    pick: pick,
    getLang: getLang,
    setLang: setLang,
    applyTranslations: applyTranslations,
    init: init,
    SUPPORTED: SUPPORTED,
    DEFAULT_LANG: DEFAULT_LANG,
    STORAGE_KEY: STORAGE_KEY
  };
})(window);
