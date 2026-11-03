/* =============================================================================
   i18n.js - bilingual (Arabic / English) text for the Tarmeem Center website.

   HOW IT WORKS
   - Every translatable element in index.html carries data-i18n="key"
     (text content) or data-i18n-attr="attribute:key;attribute2:key2"
     (attributes such as aria-label, alt, content, placeholder).
   - Content source: "Tarmeem Center Portfolio 2026".
   - Every visit starts in English (DEFAULT_LANG). A visitor's switch to Arabic
     is remembered for the rest of that visit only (sessionStorage).
   - To add a new string: add the same key to BOTH `ar` and `en`, then use it
     in index.html (or via I18n.t('key') from main.js).
   ============================================================================ */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'tarmeem-lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['ar', 'en'];

  var translations = {
    /* ----------------------------------------------------------------------- */
    ar: {
      'meta.title': 'مركز ترميم للمحافظة على التراث',
      'meta.description': 'مركز ترميم للمحافظة على التراث - شركة غير ربحية تأسست عام 2014 في عمّان، تعمل على صون التراث الثقافي والطبيعي في الأردن وتمكين المجتمعات المحلية. قصر المشتى، محطة سكة حديد معان، قرية المعطن، مسرح بيت رأس وغيرها.',

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
      'nav.expertise': 'خبراتنا',
      'nav.projects': 'المشاريع',
      'nav.team': 'الفريق',
      'nav.partners': 'الشركاء',
      'nav.contact': 'تواصل معنا',

      'lang.label': 'اللغة',

      'hero.eyebrow': 'تأسس عام 2014 · عمّان، الأردن',
      'hero.title': 'مركز ترميم للمحافظة على التراث',
      'hero.mission': 'نصون التراث الثقافي والطبيعي الغني في الأردن، ونمكّن المجتمعات المحلية عبر التدريب والتشغيل، ونعزّز التنمية الثقافية المستدامة للأجيال القادمة.',
      'hero.cta': 'استعرض المشاريع',
      'hero.ctaSecondary': 'تعرّف على المركز',
      'hero.imageAlt': 'تفاصيل زخرفة حجرية أموية منحوتة بأوراق العنب والكروم',
      'hero.highlights': 'أبرز الأعمال',
      'hero.h1': 'قصر المشتى الأموي',
      'hero.h2': 'محطة سكة حديد معان',
      'hero.h3': 'قرية المعطن التراثية',
      'hero.h4': 'مسرح بيت رأس الروماني',

      'about.eyebrow': 'من نحن',
      'about.title': 'صون تراث الأردن مع مجتمعاته',
      'about.p1': 'تأسس مركز ترميم للمحافظة على التراث عام 2014، وهو شركة ذات مسؤولية محدودة لا تهدف إلى الربح، مكرّسة للحفاظ على التراث الثقافي والطبيعي الغني في الأردن.',
      'about.p2': 'نركّز على تعظيم المنافع الاجتماعية والاقتصادية لمشاريعنا لصالح المجتمعات المحلية المجاورة، من خلال تقديم برامج التدريب وفرص العمل في توثيق التراث، وأعمال الصون والترميم، وتنمية السياحة، والهندسة والعمارة.',
      'about.p3': 'قدّمنا حتى تاريخه أكثر من 150 فرصة عمل مباشرة، ودرّبنا طلبة الجامعات وأفراد المجتمع المحلي على أعمال الترميم والصون والحفاظ على التراث. وقد أصبح كثير منهم فنيين محترفين يساهمون في مشاريعنا الجارية.',
      'about.imageAlt1': 'فريق المركز يرمّم هيكلاً خشبياً تاريخياً في الموقع',
      'about.imageAlt2': 'رافعة ترفع كتلاً حجرية خلال أعمال الترميم في موقع أثري',
      'about.badge': 'شركة غير ربحية',

      'stats.label': 'أرقام رئيسية',
      'stats.founded': 'سنة التأسيس',
      'stats.jobs': 'فرصة عمل مباشرة',
      'stats.governorates': 'محافظات',
      'stats.buildings': 'مبنى في مجمّع واحد',

      'vm.eyebrow': 'الرؤية والرسالة',
      'vm.title': 'ما الذي يحرّكنا',
      'vm.visionTitle': 'رؤيتنا',
      'vm.vision': 'أن نكون مؤسسة رائدة في الحفاظ على التراث الثقافي والطبيعي، بما يضمن صون كنوز الأردن للأجيال القادمة، مع تعزيز النمو الاجتماعي والاقتصادي من خلال مشاريع تراثية مستدامة.',
      'vm.missionTitle': 'رسالتنا',
      'vm.mission': 'الحفاظ على التراث الثقافي والطبيعي الغني في الأردن، وتمكين المجتمعات المحلية عبر التدريب والتشغيل، وتعزيز التنمية الثقافية المستدامة للأجيال القادمة.',
      'vm.visionAlt': 'أحد أفراد فريق ترميم بسترة السلامة الحاملة لشعار المركز يعمل في الموقع',
      'vm.missionAlt': 'يد مرمّم تحمل قطعة جصّية مزخرفة خلال المعالجة',

      'exp.eyebrow': 'مجالات خبرتنا',
      'exp.title': 'خمسة مجالات تخصص متكاملة',
      'exp.lead': 'يقدّم مركز ترميم خدمات صون التراث عبر خمسة مجالات تخصص متكاملة، تجمع بين المعرفة الحرفية التقليدية والقدرة الفنية المتقدمة.',
      'exp.1.title': 'الصون المعماري',
      'exp.1.text': 'الحفاظ على المنشآت التاريخية وترميمها باستخدام المواد التقليدية والتقنيات المتوافقة معها.',
      'exp.2.title': 'صون الأعمال الفنية',
      'exp.2.text': 'الحفاظ على الأعمال الفنية والزخرفية وترميمها ضمن سياقها التراثي.',
      'exp.3.title': 'الحرف التقليدية',
      'exp.3.text': 'تطبيق ونقل المهارات الحرفية كالنجارة والبناء الحجري والحدادة.',
      'exp.4.title': 'التوثيق المتقدم',
      'exp.4.text': 'المسح بالليزر ثلاثي الأبعاد والتصوير الجوي والمسح التصويري لتوثيق المواقع التراثية وتحليلها.',
      'exp.5.title': 'تقنيات المسح',
      'exp.5.text': 'الأساليب الجيوفيزيائية والأثرية، بما فيها المسح بالمقاومة الكهربائية، لدراسة المواقع وحمايتها.',
      'exp.imageAlt': 'رافعة وفريق عمل بين الجدران الحجرية الأثرية في الموقع',

      'mat.eyebrow': 'المواد والتقنيات',
      'mat.title': 'لكل مادة تخصّصها',
      'mat.lead': 'نعمل بالمواد التقليدية بأساليب متوافقة معها، ويسبق كل تدخل بيان طريقة معتمد وعيّنة موقعية.',
      'mat.delivered': 'منجز',
      'mat.masonry.title': 'البناء الحجري',
      'mat.masonry.text': 'يشكّل صون الحجر جوهر قدراتنا الميدانية. تنفّذ فرقنا أعمال التنظيف والتقوية وإعادة التكحيل بمونة جيرية متوافقة، وتثبيت المنشآت، وإعادة التركيب (الأناستيلوزيس)، وإعادة البناء المحدودة. ويسبق العمل إعداد بيان طريقة معتمد وعيّنة موقعية تُعتمد قبل التنفيذ الكامل.',
      'mat.masonry.delivered': '2,993 م² أعمال حجر وتكحيل في 11 مبنى بمعان؛ و1,500 م² ترميم واجهات حجرية في العقبة؛ وأعمال تقوية وإعادة تركيب في قصر المشتى؛ ومدرجات وجدران ساندة في بيت رأس.',
      'mat.masonry.alt': 'حِرَفي من فريق المركز يتفحّص جداراً تاريخياً من الطوب',
      'mat.mudbrick.title': 'الطوب الطيني',
      'mat.mudbrick.text': 'تتطلب العمارة الطينية تخصصاً مستقلاً. نزيل القشور السطحية والأملاح المتبلورة بأدوات دقيقة وأساليب مضبوطة، ونعالج النموّات الحيوية، ونقوّي النسيج الهشّ، ونعالج الأسباب المائية للتلف لا أعراضه، عبر تقوية الأسقف وتصريف المياه وتثبيت الأساسات.',
      'mat.mudbrick.delivered': 'في قصر المشتى، أكبر منشأة من الطوب الطيني وأكبر قصر أموي في الأردن، ويشمل إزالة الأملاح والقشور، وتقوية أسقف القاعات الرئيسية، وتثبيت الأساسات.',
      'mat.mudbrick.alt': 'القوس الحجري وجدران الطوب في قصر المشتى خلال أعمال الصون',
      'mat.carpentry.title': 'النجارة التقليدية',
      'mat.carpentry.text': 'نحافظ على الأخشاب التاريخية في موقعها كلما أمكن: الهياكل السقفية والإطارات الحاملة للقرميد، والأرضيات، والأبواب، وكشفات النوافذ. وتشمل التدخلات التنظيف والتقوية والمعالجة ضد الآفات الحيوية، واستبدال العناصر التالفة بأخشاب مجفّفة مطابقة للنوع تُشغَّل بأساليب النجارة التقليدية.',
      'mat.carpentry.delivered': 'في مجمّع محطة سكة حديد معان، ويشمل أخشاب الأسقف والهياكل الحاملة للقرميد ومعالجة أخشاب الأرضيات وكشفات الأبواب، وكذلك في ترميم خمسة بيوت تراثية في المعطن بحرفية محلية.',
      'mat.carpentry.alt': 'حِرَفيون يجهّزون سقفاً تقليدياً من الخشب والقصب',

      'method.eyebrow': 'منهجية العمل',
      'method.title': 'منهج علمي ومعايير دولية',
      'method.lead': 'يستند عملنا إلى المنهج العلمي والمعايير الدولية للحفاظ على التراث، بما ينسجم مع إرشادات اليونسكو والإيكوموس والإيكروم.',
      'method.1.title': 'تقييم حالة الحفظ',
      'method.1.text': 'تحليل مواد البناء وتقنياته، وتحديد عوامل التلف، وتقييم الحالة القائمة.',
      'method.2.title': 'خطة التدخل',
      'method.2.text': 'تحديد الأدوات والمواد واستراتيجيات الترميم، وإصدارها كبيان طريقة يُعتمد قبل بدء الأعمال.',
      'method.3.title': 'التوثيق',
      'method.3.text': 'توثيق مصوّر ورسومي وكتابي مستمر عبر جميع مراحل المشروع.',
      'method.4.title': 'المتابعة والتقييم',
      'method.4.text': 'تقييم دوري وتقرير نهائي يتضمن توصيات لاستمرار أعمال الحفاظ.',
      'method.note': 'يسبق كل تدخل إعداد بيان طريقة معتمد وعيّنة موقعية يعتمدها المهندس المشرف قبل التنفيذ الكامل. وتُقدَّم المواد والآليات للاعتماد قبل إدخالها إلى الموقع، ويُصدَر توثيق مصوّر موقّع شهرياً.',
      'method.caption': 'التوثيق الرقمي المتقدم: المسح بالليزر ثلاثي الأبعاد والمسح التصويري',
      'method.scan1Alt': 'سحابة نقاط ملوّنة من المسح بالليزر ثلاثي الأبعاد لموقع أثري',
      'method.scan2Alt': 'نموذج ثلاثي الأبعاد لموقع أثري من المسح التصويري',

      'projects.eyebrow': 'أبرز المشاريع',
      'projects.title': 'مشاريع منجزة وجارية',
      'projects.subtitle': 'ستة مشاريع منجزة وجارية في الأردن وحوض البحر المتوسط، نُفّذت بالشراكة مع الجهات الوطنية وبدعم من تمويل دولي ووطني.',
      'projects.viewDetails': 'تفاصيل المشروع',
      'projects.openDetails': 'عرض تفاصيل مشروع: {title}',
      'projects.ongoing': 'جارٍ',
      'projects.accomplished': 'منجز',
      'projects.all': 'الكل',
      'projects.filterLabel': 'تصفية المشاريع حسب الفئة',
      'projects.emptyFilter': 'لا توجد مشاريع في هذه الفئة حاليًا.',
      'projects.photos': '{count} صور',

      'project.back': 'جميع المشاريع',
      'project.notFound': 'لم يتم العثور على هذا المشروع.',
      'modal.close': 'إغلاق',
      'modal.project': 'مشروع {number}',
      'modal.location': 'الموقع',
      'modal.period': 'الفترة',
      'modal.value': 'قيمة العقد',
      'modal.prev': 'الصورة السابقة',
      'modal.next': 'الصورة التالية',
      'modal.thumbs': 'الصور المصغّرة',
      'modal.counter': 'الصورة {current} من {total}',
      'modal.showImage': 'عرض الصورة {index}',
      'modal.cooperation': 'جهات التعاون',
      'modal.objectives': 'الأهداف',
      'modal.works': 'الأعمال الرئيسية',
      'modal.boq': 'جدول الكميات',
      'modal.boqItem': 'حزمة العمل',
      'modal.boqQty': 'الكمية',
      'modal.achievements': 'الإنجازات',

      'team.eyebrow': 'الكادر الرئيسي',
      'team.title': 'خبرة تقود العمل في الميدان',
      'team.lead': 'فريق يجمع بين الخبرة الأكاديمية والقيادة الميدانية وإدارة التراث على المستويين الوطني والدولي.',
      'team.photoAlt': 'من أعمال الفريق الميدانية: التوثيق وترميم جدران الطوب',
      'team.education': 'المؤهلات العلمية',
      'team.roleAt': 'الدور في ترميم',
      'team.more': 'السيرة الكاملة',

      'partners.eyebrow': 'شركاؤنا',
      'partners.title': 'شراكات وطنية ودولية',
      'partners.international': 'الشركاء والجهات المانحة الدولية',
      'partners.national': 'الشركاء الوطنيون',
      'partners.statement': 'نفّذ مركز ترميم مشاريع لصالح وزارة الأشغال العامة والإسكان، وسلطة منطقة العقبة الاقتصادية الخاصة، ودائرة الآثار العامة، ووزارة السياحة والآثار، وحصل على تمويل من صندوق السفراء الأمريكي للحفاظ على التراث الثقافي وسفارة مملكة هولندا.',

      'contact.eyebrow': 'تواصل معنا',
      'contact.title': 'لنعمل معاً على صون التراث',
      'contact.subtitle': 'يسعدنا تواصلكم للاستفسار أو التعاون أو الشراكة في مشاريع الصون والتوثيق.',
      'contact.email': 'البريد الإلكتروني',
      'contact.phone': 'الهاتف',
      'contact.website': 'الموقع الإلكتروني',
      'contact.registration': 'التسجيل',
      'contact.registrationValue': 'رقم التسجيل 601',
      'contact.address': 'العنوان',
      'contact.addressValue': '91 شارع جبل عرفات، الياسمين، عمّان 11623، الأردن',
      'contact.map': 'افتح في الخرائط',

      'form.note': 'سيؤدي الإرسال إلى فتح تطبيق البريد الإلكتروني لديكم مع رسالة مُعدّة مسبقًا.',
      'form.name': 'الاسم',
      'form.email': 'البريد الإلكتروني',
      'form.message': 'الرسالة',
      'form.submit': 'إرسال الرسالة',
      'form.subject': 'رسالة من موقع مركز ترميم',
      'form.bodyName': 'الاسم',
      'form.bodyEmail': 'البريد الإلكتروني',
      'form.bodyMessage': 'الرسالة',

      'footer.founded': 'تأسس عام 2014 · عمّان، الأردن',
      'footer.navLabel': 'روابط التذييل',
      'footer.rights': 'مركز ترميم للمحافظة على التراث. جميع الحقوق محفوظة.',
      'footer.backToTop': 'العودة إلى الأعلى',

      'nav.opportunities': 'الفرص',
      'nav.jobs': 'الوظائف',
      'nav.calls': 'الدعوات',
      'nav.subToggle': 'عرض الوظائف والدعوات',
      'nav.breadcrumb': 'مسار التنقل',
      'home.exploreEyebrow': 'استكشفوا المركز',
      'home.exploreTitle': 'تعرّفوا على عملنا',
      'home.card.about': 'من نحن، ورؤيتنا ورسالتنا، وأبرز أرقامنا.',
      'home.card.expertise': 'مجالات خبرتنا، والمواد والتقنيات، ومنهجية العمل.',
      'home.card.projects': 'مشاريع منجزة وجارية في مواقع تراثية في أنحاء الأردن.',
      'home.card.team': 'الكادر الرئيسي الذي يقود العمل في الميدان.',
      'home.card.partners': 'شركاؤنا والجهات المانحة الوطنية والدولية.',
      'home.card.opportunities': 'الوظائف الشاغرة ودعوات التقديم المفتوحة.',
      'home.more': 'اقرأ المزيد',

      'about.metaTitle': 'عن المركز | مركز ترميم للمحافظة على التراث',
      'about.metaDescription': 'تعرّفوا على مركز ترميم للمحافظة على التراث: من نحن، ورؤيتنا ورسالتنا، وأبرز أرقامنا منذ تأسيسنا عام 2014.',
      'exp.metaTitle': 'خبراتنا | مركز ترميم للمحافظة على التراث',
      'exp.metaDescription': 'مجالات خبرة مركز ترميم: الصون المعماري، وصون الأعمال الفنية، والحرف التقليدية، والتوثيق المتقدم، وتقنيات المسح، ومنهجية العمل.',
      'projects.metaTitle': 'المشاريع | مركز ترميم للمحافظة على التراث',
      'projects.metaDescription': 'مشاريع مركز ترميم المنجزة والجارية: قصر المشتى، محطة سكة حديد معان، قرية المعطن، مسرح بيت رأس وغيرها.',
      'team.metaTitle': 'الفريق | مركز ترميم للمحافظة على التراث',
      'team.metaDescription': 'الكادر الرئيسي في مركز ترميم للمحافظة على التراث وخبراتهم.',
      'partners.metaTitle': 'الشركاء | مركز ترميم للمحافظة على التراث',
      'partners.metaDescription': 'شركاء مركز ترميم والجهات المانحة الوطنية والدولية.',
      'contact.metaTitle': 'تواصل معنا | مركز ترميم للمحافظة على التراث',
      'contact.metaDescription': 'تواصلوا مع مركز ترميم للمحافظة على التراث في عمّان، الأردن: البريد الإلكتروني والهاتف والعنوان.',


      'opp.metaTitle': 'الفرص | مركز ترميم للمحافظة على التراث',
      'opp.metaDescription': 'الوظائف الشاغرة ودعوات التقديم المفتوحة لدى مركز ترميم للمحافظة على التراث في عمّان، الأردن.',
      'opp.eyebrow': 'انضمّوا إلينا',
      'opp.title': 'الفرص',
      'opp.lead': 'نبحث باستمرار عن مختصين ومتدربين وشركاء يشاركوننا شغف صون التراث في الأردن. تصفّحوا الوظائف الشاغرة ودعوات التقديم المفتوحة.',
      'opp.jobsText': 'الوظائف الشاغرة في الصون والترميم والتوثيق والهندسة وإدارة المشاريع.',
      'opp.callsText': 'دعوات تقديم العروض، وبرامج التدريب، وطلبات المشاركة والتعاون.',
      'opp.openCount': 'متاح حاليًا: {count}',
      'opp.noneOpen': 'لا يوجد ما هو متاح حاليًا',
      'opp.browse': 'تصفّح',
      'opp.cvTitle': 'لم تجدوا ما يناسبكم؟',
      'opp.cvText': 'أرسلوا سيرتكم الذاتية ونبذة عن اهتماماتكم، وسنتواصل معكم عند توفّر فرصة مناسبة.',
      'opp.cvCta': 'أرسلوا سيرتكم الذاتية',
      'opp.cvSubject': 'سيرة ذاتية - موقع مركز ترميم',

      'jobs.metaTitle': 'الوظائف | مركز ترميم للمحافظة على التراث',
      'jobs.metaDescription': 'الوظائف الشاغرة لدى مركز ترميم للمحافظة على التراث في الصون والترميم والتوثيق والهندسة.',
      'jobs.title': 'الوظائف',
      'jobs.lead': 'انضمّوا إلى فريق يعمل في الميدان على صون أهم المواقع التراثية في الأردن.',
      'jobs.empty': 'لا توجد وظائف شاغرة حاليًا',
      'jobs.emptyText': 'تابعوا هذه الصفحة، أو أرسلوا سيرتكم الذاتية لنحتفظ بها ونتواصل معكم عند توفّر فرصة مناسبة.',

      'calls.metaTitle': 'الدعوات | مركز ترميم للمحافظة على التراث',
      'calls.metaDescription': 'دعوات تقديم العروض وبرامج التدريب وطلبات المشاركة المفتوحة لدى مركز ترميم للمحافظة على التراث.',
      'calls.title': 'الدعوات',
      'calls.lead': 'دعوات تقديم العروض وبرامج التدريب وطلبات المشاركة المفتوحة لدى المركز.',
      'calls.empty': 'لا توجد دعوات مفتوحة حاليًا',
      'calls.emptyText': 'تُنشر الدعوات الجديدة هنا فور إطلاقها. للاستفسار، تواصلوا معنا عبر البريد الإلكتروني.',

      'listing.open': 'مفتوح',
      'listing.closed': 'مغلق',
      'listing.deadline': 'آخر موعد للتقديم: {date}',
      'listing.posted': 'نُشر في {date}',
      'listing.details': 'عرض التفاصيل',
      'listing.apply': 'قدّم الآن',
      'listing.download': 'تحميل الإعلان',
      'listing.applySubject': 'طلب تقديم: {title}',
      'listing.contact': 'تواصل معنا'
    },

    /* ----------------------------------------------------------------------- */
    en: {
      'meta.title': 'Tarmeem Center for the Preservation of Heritage',
      'meta.description': 'Tarmeem Center for the Preservation of Heritage is a non-profit founded in Amman in 2014, preserving Jordan’s cultural and natural heritage and empowering local communities. Qasr Al-Mshatta, Ma’an Railway Station, Al Matan, Beit Ras Theatre and more.',

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
      'nav.expertise': 'Expertise',
      'nav.projects': 'Projects',
      'nav.team': 'Team',
      'nav.partners': 'Partners',
      'nav.contact': 'Contact',

      'lang.label': 'Language',

      'hero.eyebrow': 'Est. 2014 · Amman, Jordan',
      'hero.title': 'Tarmeem Center for the Preservation of Heritage',
      'hero.mission': 'Preserving Jordan’s rich cultural and natural heritage, empowering local communities through training and employment, and promoting sustainable cultural development for future generations.',
      'hero.cta': 'View Projects',
      'hero.ctaSecondary': 'About the Center',
      'hero.imageAlt': 'Detail of carved Umayyad stone ornament with vine scrolls and leaves',
      'hero.highlights': 'Selected work',
      'hero.h1': 'Umayyad Qasr Al-Mshatta',
      'hero.h2': 'Ma’an Railway Station',
      'hero.h3': 'Al Matan Heritage Village',
      'hero.h4': 'Beit Ras Roman Theatre',

      'about.eyebrow': 'About us',
      'about.title': 'Preserving Jordan’s heritage, with its communities',
      'about.p1': 'Established in 2014, Tarmeem Center for the Preservation of Heritage is a non-profit Limited Liability Company dedicated to preserving Jordan’s rich cultural and natural heritage.',
      'about.p2': 'We focus on maximising the social and economic benefits of our projects for nearby communities by offering training programmes and job opportunities in heritage documentation, conservation and restoration, tourism development, and engineering and architecture.',
      'about.p3': 'To date we have provided over 150 direct job opportunities, training university students and community members in restoration, conservation and heritage preservation. Many of these individuals have gone on to become professional technicians contributing to our ongoing projects.',
      'about.imageAlt1': 'The Tarmeem team restoring a historic timber structure on site',
      'about.imageAlt2': 'A crane lifting stone blocks during restoration at an archaeological site',
      'about.badge': 'Non-profit company',

      'stats.label': 'Key numbers',
      'stats.founded': 'Established',
      'stats.jobs': 'Direct jobs created',
      'stats.governorates': 'Governorates',
      'stats.buildings': 'Buildings in a single complex',

      'vm.eyebrow': 'Vision & Mission',
      'vm.title': 'What drives us',
      'vm.visionTitle': 'Our Vision',
      'vm.vision': 'To be a leading institution in the preservation of cultural and natural heritage, ensuring that Jordan’s treasures are safeguarded for future generations while fostering social and economic growth through sustainable heritage projects.',
      'vm.missionTitle': 'Our Mission',
      'vm.mission': 'Preserving Jordan’s rich cultural and natural heritage, empowering local communities through training and employment, and promoting sustainable cultural development for future generations.',
      'vm.visionAlt': 'A Tarmeem team member in a branded safety vest working on site',
      'vm.missionAlt': 'A conservator’s hand holding a decorated stucco fragment during treatment',

      'exp.eyebrow': 'Our Expertise',
      'exp.title': 'Five integrated areas of specialisation',
      'exp.lead': 'Tarmeem Center delivers heritage conservation across five integrated areas of specialisation, combining traditional craft knowledge with advanced technical capability.',
      'exp.1.title': 'Architectural Conservation',
      'exp.1.text': 'Preserving and restoring historical structures using traditional materials and compatible techniques.',
      'exp.2.title': 'Conservation of Artworks',
      'exp.2.text': 'Preserving and restoring artistic and decorative works within their heritage contexts.',
      'exp.3.title': 'Traditional Crafts',
      'exp.3.text': 'Applying and transmitting craft skills such as carpentry, masonry and blacksmithing.',
      'exp.4.title': 'Advanced Documentation',
      'exp.4.text': '3D laser scanning, drone survey and photogrammetry to document and analyse heritage sites.',
      'exp.5.title': 'Surveying Techniques',
      'exp.5.text': 'Geophysical and archaeological methods, including resistivity survey, to study and protect sites.',
      'exp.imageAlt': 'A crane and team working among ancient stone walls on site',

      'mat.eyebrow': 'Materials & Techniques',
      'mat.title': 'Every material, its own discipline',
      'mat.lead': 'We work with traditional materials using compatible methods, and every intervention is preceded by an approved method statement and an on-site sample panel.',
      'mat.delivered': 'Delivered',
      'mat.masonry.title': 'Masonry',
      'mat.masonry.text': 'Stone conservation is the core of our field capability. Our teams execute cleaning, consolidation, repointing with compatible lime-based mortars, structural stabilisation, anastylosis and limited reconstruction. Work is preceded by an approved method statement and an on-site sample panel signed off before full execution.',
      'mat.masonry.delivered': '2,993 m² stone and repointing across 11 buildings at Ma’an; 1,500 m² stone façade restoration at Aqaba; consolidation and anastylosis at Qasr Al-Mshatta; stone seating and retaining walls at Beit Ras.',
      'mat.masonry.alt': 'A Tarmeem craftsman inspecting a historic brick wall',
      'mat.mudbrick.title': 'Mudbrick',
      'mat.mudbrick.text': 'Earthen architecture demands a distinct discipline. We remove surface crusts and crystallised salts using fine tools and controlled methods, treat biological growth, consolidate fragile fabric, and resolve the hydrological causes of decay rather than its symptoms — roof consolidation, drainage and foundation stabilisation.',
      'mat.mudbrick.delivered': 'At Qasr Al-Mshatta — the largest mudbrick structure and Umayyad palace in Jordan — including salt and crust removal, roof consolidation across the main halls, and foundation stabilisation.',
      'mat.mudbrick.alt': 'The stone arch and brick walls of Qasr Al-Mshatta during conservation',
      'mat.carpentry.title': 'Traditional Carpentry',
      'mat.carpentry.text': 'We conserve historic timber in situ wherever possible: roof structures and tile-bearing frames, floors, doors and window reveals. Interventions cover cleaning, consolidation, treatment against biological attack, and the replacement of failed members with species-matched, seasoned timber worked by traditional joinery.',
      'mat.carpentry.delivered': 'At the Ma’an Railway complex — roof timber and tile-bearing structures, timber treatment to floors and door reveals — and in the restoration of five heritage houses at Al Matan using local craftsmanship.',
      'mat.carpentry.alt': 'Craftsmen preparing a traditional timber-and-reed roof',

      'method.eyebrow': 'Our Methodology',
      'method.title': 'Scientific method, international standards',
      'method.lead': 'Our work is grounded in scientific method and international standards for heritage preservation, consistent with UNESCO, ICOMOS and ICCROM guidance.',
      'method.1.title': 'State of Conservation',
      'method.1.text': 'Analysing building materials and techniques, identifying deterioration factors, and assessing existing conditions.',
      'method.2.title': 'Intervention Plan',
      'method.2.text': 'Outlining tools, materials and strategies for restoration, issued as a method statement and approved before works begin.',
      'method.3.title': 'Documentation',
      'method.3.text': 'Continuous photographic, sketch-based and written documentation throughout all project stages.',
      'method.4.title': 'Monitoring and Evaluation',
      'method.4.text': 'Regular assessment and final reporting, including recommendations for ongoing preservation.',
      'method.note': 'Every intervention is preceded by an approved method statement and an on-site sample panel, signed off by the supervising engineer before full execution. Materials and plant are submitted for approval before delivery to site, and signed photographic documentation is issued monthly.',
      'method.caption': 'Advanced digital documentation: 3D laser scanning and photogrammetry',
      'method.scan1Alt': 'Colour point cloud from a 3D laser scan of a heritage site',
      'method.scan2Alt': '3D photogrammetric model of a heritage site',

      'projects.eyebrow': 'Key Projects',
      'projects.title': 'Completed and Ongoing Projects',
      'projects.subtitle': 'Six completed and ongoing projects in Jordan and across the Mediterranean, implemented in partnership with national authorities and supported by international and national funding.',
      'projects.viewDetails': 'Project details',
      'projects.openDetails': 'View project details: {title}',
      'projects.ongoing': 'Ongoing',
      'projects.accomplished': 'Accomplished',
      'projects.all': 'All',
      'projects.filterLabel': 'Filter projects by category',
      'projects.emptyFilter': 'There are no projects in this category yet.',
      'projects.photos': '{count} photos',

      'project.back': 'All projects',
      'project.notFound': 'This project could not be found.',
      'modal.close': 'Close',
      'modal.project': 'Project {number}',
      'modal.location': 'Location',
      'modal.period': 'Period',
      'modal.value': 'Contract value',
      'modal.prev': 'Previous image',
      'modal.next': 'Next image',
      'modal.thumbs': 'Thumbnails',
      'modal.counter': 'Image {current} of {total}',
      'modal.showImage': 'Show image {index}',
      'modal.cooperation': 'Cooperation',
      'modal.objectives': 'Objectives',
      'modal.works': 'Main works',
      'modal.boq': 'Bill of quantities',
      'modal.boqItem': 'Work package',
      'modal.boqQty': 'Quantity',
      'modal.achievements': 'Achievements',

      'team.eyebrow': 'Key Personnel',
      'team.title': 'The people behind the work',
      'team.lead': 'A team combining academic expertise, field leadership and heritage management at national and international level.',
      'team.photoAlt': 'Field work by the team: documentation and brick wall restoration',
      'team.education': 'Education',
      'team.roleAt': 'Role at Tarmeem',
      'team.more': 'Full profile',

      'partners.eyebrow': 'Our Partners',
      'partners.title': 'National and international partnerships',
      'partners.international': 'International partners & donors',
      'partners.national': 'National partners',
      'partners.statement': 'Tarmeem Center has delivered projects for the Ministry of Public Works and Housing, the Aqaba Special Economic Zone Authority, the Department of Antiquities and the Ministry of Tourism and Antiquities, and has been funded by the U.S. Ambassadors Fund for Cultural Preservation and the Embassy of the Kingdom of the Netherlands.',

      'contact.eyebrow': 'Contact us',
      'contact.title': 'Let’s preserve heritage together',
      'contact.subtitle': 'We welcome inquiries, collaborations and partnerships in conservation and documentation projects.',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.website': 'Website',
      'contact.registration': 'Registration',
      'contact.registrationValue': 'Registration No. 601',
      'contact.address': 'Address',
      'contact.addressValue': '91 Jabal Arafat St., Yasmeen, Amman 11623, Jordan',
      'contact.map': 'Open in maps',

      'form.note': 'Sending opens your email application with a pre-filled message.',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.message': 'Message',
      'form.submit': 'Send Message',
      'form.subject': 'Message from the Tarmeem Center website',
      'form.bodyName': 'Name',
      'form.bodyEmail': 'Email',
      'form.bodyMessage': 'Message',

      'footer.founded': 'Est. 2014 · Amman, Jordan',
      'footer.navLabel': 'Footer links',
      'footer.rights': 'Tarmeem Center for the Preservation of Heritage. All rights reserved.',
      'footer.backToTop': 'Back to top',

      'nav.opportunities': 'Opportunities',
      'nav.jobs': 'Jobs',
      'nav.calls': 'Calls',
      'nav.subToggle': 'Show Jobs and Calls',
      'nav.breadcrumb': 'Breadcrumb',
      'home.exploreEyebrow': 'Explore the Center',
      'home.exploreTitle': 'Get to know our work',
      'home.card.about': 'Who we are, our vision and mission, and key figures.',
      'home.card.expertise': 'Our fields of expertise, materials and techniques, and methodology.',
      'home.card.projects': 'Completed and ongoing projects at heritage sites across Jordan.',
      'home.card.team': 'The key personnel who lead our work in the field.',
      'home.card.partners': 'Our national and international partners and donors.',
      'home.card.opportunities': 'Job vacancies and open calls.',
      'home.more': 'Read more',

      'about.metaTitle': 'About | Tarmeem Center for the Preservation of Heritage',
      'about.metaDescription': 'About Tarmeem Center for the Preservation of Heritage: who we are, our vision and mission, and key figures since 2014.',
      'exp.metaTitle': 'Expertise | Tarmeem Center for the Preservation of Heritage',
      'exp.metaDescription': 'Tarmeem Center’s expertise: architectural conservation, art conservation, traditional crafts, advanced documentation, survey techniques and methodology.',
      'projects.metaTitle': 'Projects | Tarmeem Center for the Preservation of Heritage',
      'projects.metaDescription': 'Completed and ongoing Tarmeem Center projects: Qasr Al-Mshatta, Ma’an Railway Station, Al Matan, Beit Ras Theatre and more.',
      'team.metaTitle': 'Team | Tarmeem Center for the Preservation of Heritage',
      'team.metaDescription': 'The key personnel of Tarmeem Center for the Preservation of Heritage and their experience.',
      'partners.metaTitle': 'Partners | Tarmeem Center for the Preservation of Heritage',
      'partners.metaDescription': 'Tarmeem Center’s national and international partners and donors.',
      'contact.metaTitle': 'Contact | Tarmeem Center for the Preservation of Heritage',
      'contact.metaDescription': 'Contact Tarmeem Center for the Preservation of Heritage in Amman, Jordan: email, phone and address.',


      'opp.metaTitle': 'Opportunities | Tarmeem Center for the Preservation of Heritage',
      'opp.metaDescription': 'Job vacancies and open calls at Tarmeem Center for the Preservation of Heritage, Amman, Jordan.',
      'opp.eyebrow': 'Join us',
      'opp.title': 'Opportunities',
      'opp.lead': 'We are always looking for specialists, trainees and partners who share our passion for preserving Jordan’s heritage. Browse our job vacancies and open calls.',
      'opp.jobsText': 'Vacancies in conservation, restoration, documentation, engineering and project management.',
      'opp.callsText': 'Calls for proposals, training programmes, and invitations to participate and collaborate.',
      'opp.openCount': 'Open now: {count}',
      'opp.noneOpen': 'Nothing open right now',
      'opp.browse': 'Browse',
      'opp.cvTitle': 'Didn’t find the right fit?',
      'opp.cvText': 'Send us your CV and a short note about your interests, and we will get in touch when a suitable opportunity opens.',
      'opp.cvCta': 'Send your CV',
      'opp.cvSubject': 'CV - Tarmeem Center website',

      'jobs.metaTitle': 'Jobs | Tarmeem Center for the Preservation of Heritage',
      'jobs.metaDescription': 'Job vacancies at Tarmeem Center for the Preservation of Heritage in conservation, restoration, documentation and engineering.',
      'jobs.title': 'Jobs',
      'jobs.lead': 'Join a team working in the field to preserve some of Jordan’s most important heritage sites.',
      'jobs.empty': 'No open positions right now',
      'jobs.emptyText': 'Check back soon, or send us your CV and we will keep it on file and contact you when a suitable role opens.',

      'calls.metaTitle': 'Calls | Tarmeem Center for the Preservation of Heritage',
      'calls.metaDescription': 'Open calls for proposals, training programmes and participation at Tarmeem Center for the Preservation of Heritage.',
      'calls.title': 'Calls',
      'calls.lead': 'Open calls for proposals, training programmes and invitations to participate.',
      'calls.empty': 'No open calls right now',
      'calls.emptyText': 'New calls are published here as soon as they launch. For enquiries, contact us by email.',

      'listing.open': 'Open',
      'listing.closed': 'Closed',
      'listing.deadline': 'Deadline: {date}',
      'listing.posted': 'Posted {date}',
      'listing.details': 'View details',
      'listing.apply': 'Apply now',
      'listing.download': 'Download announcement',
      'listing.applySubject': 'Application: {title}',
      'listing.contact': 'Contact us'
    }
  };

  /* ------------------------------------------------------------------------- */

  function readStoredLang() {
    try {
      var value = sessionStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(value) !== -1 ? value : null;
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      sessionStorage.setItem(STORAGE_KEY, lang);
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
