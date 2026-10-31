/* =============================================================================
   projects.js - the single place where projects are defined.
   Source: "Tarmeem Center Portfolio 2026".

   HOW TO ADD A PROJECT
   1. Put the photos in assets/images/projects/ (WebP, lowercase, no spaces).
   2. Copy one of the objects below and edit it. Every text field is
      bilingual: { ar: '...', en: '...' }. List fields are { ar: [...], en: [...] }.

      {
        id: 'unique-id',
        number: '06',                              // shown on the card
        years: '2025',                             // short label on the card
        ongoing: false,                            // true shows an "Ongoing" badge
        site:        { ar: '...', en: '...' },     // short site name (card kicker)
        title:       { ar: '...', en: '...' },
        location:    { ar: '...', en: '...' },
        period:      { ar: '...', en: '...' },
        value:       { ar: '...', en: '...' },     // optional (contract value)
        summary:     { ar: '...', en: '...' },
        figures: [ { value: '150+', label: { ar: '...', en: '...' } } ],   // optional
        cooperation:  { ar: [...], en: [...] },
        objectives:   { ar: [...], en: [...] },
        works:        { ar: [...], en: [...] },
        boq: [ { item: { ar: '...', en: '...' }, qty: { ar: '...', en: '...' } } ],  // optional
        achievements: { ar: [...], en: [...] },
        cover:   { src: 'assets/images/projects/x-1.webp', alt: { ar: '...', en: '...' } },
        gallery: [ { src: '...', alt: { ar: '...', en: '...' } } ]
      }

   3. Projects appear in the order they are listed here.
   ============================================================================ */
window.PROJECTS = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'al-matan',
    number: '01',
    years: '2017–2020',
    ongoing: false,
    site: { ar: 'قرية المعطن التراثية', en: 'Al Matan Heritage Village' },
    title: {
      ar: 'قيمة التراث محرّكاً للنمو الاقتصادي عبر السياحة المجتمعية التشاركية',
      en: 'Heritage Value as a Driver for Economic Growth through Participatory Community-Based Tourism'
    },
    location: {
      ar: 'قرية المعطن التراثية، محافظة الطفيلة',
      en: 'Al Matan Heritage Village, Tafileh Governorate'
    },
    period: {
      ar: '1 تشرين الثاني 2017 – 30 حزيران 2020',
      en: '1 November 2017 – 30 June 2020'
    },
    value: { ar: '196,000 دينار أردني', en: '196,000 JOD' },
    summary: {
      ar: 'هُجرت قرية المعطن في ثمانينيات القرن الماضي حين انتقل سكانها إلى قرية عين البيضا المجاورة. وقد سكنها الأدوميون منذ القرن الحادي عشر قبل الميلاد ثم الأنباط، وعانت عقوداً من التدهور.',
      en: 'Al Matan was abandoned in the 1980s when its residents relocated to nearby Ain Al Bayda. Inhabited by the Edomites since the 11th century BC and later by the Nabataeans, the village had suffered decades of deterioration.'
    },
    figures: [
      { value: '150+', label: { ar: 'فرداً من المجتمع المحلي شاركوا في التنفيذ', en: 'community members engaged' } },
      { value: '50+', label: { ar: 'متدرباً في ورش موقعية', en: 'trained on site' } },
      { value: '~500 m²', label: { ar: 'خمسة بيوت تراثية مرمّمة', en: 'five heritage houses restored' } }
    ],
    cooperation: {
      ar: [
        'بتمويل من سفارة مملكة هولندا (عقد وزارة الخارجية رقم 4000000869).',
        'شركاء محليون: جمعية البقيعة التعاونية للسياحة، وجمعية همتنا غير.',
        'بمتابعة وزارة الصناعة والتجارة، ووزارة السياحة والآثار، ووزارة الثقافة.'
      ],
      en: [
        'Funded by the Embassy of the Kingdom of the Netherlands (MFA contract 4000000869).',
        'Local partners: Al-Baqee’a Cooperative Society for Tourism; Himmitna Ghair NGO.',
        'Monitored by the Ministry of Industry and Trade, the Ministry of Tourism and Antiquities, and the Ministry of Culture.'
      ]
    },
    objectives: {
      ar: [
        'توظيف التراث محرّكاً للنمو الاقتصادي المستدام في قرية مهجورة.',
        'تفعيل دور المجتمع المحلي في تنمية السياحة وإدارتها.',
        'ترميم النسيج التراثي بمواد وحرفية محلية وفق أفضل الممارسات الدولية.',
        'تطوير نزل بيئية ومسارات سياحية ونموذج تبادل ثقافي تفاعلي.'
      ],
      en: [
        'Use heritage as a driver of sustainable economic growth in an abandoned village.',
        'Activate the role of the local community in tourism development and management.',
        'Restore the heritage fabric using local materials and craftsmanship to international best practice.',
        'Develop eco-lodges, tourism routes and an interactive cultural exchange model.'
      ]
    },
    works: {
      ar: [
        'ترميم وإعادة تأهيل كاملة لمجموعة نموذجية من خمسة بيوت تراثية (نحو 500 م²) تشمل الفراغات الداخلية والخارجية والزقاق المؤدي إليها.',
        'تطبيق ممارسات البناء الأخضر لتوفير التبريد والإضاءة الطبيعيين وخفض كلف التشغيل.',
        'بنية تحتية جديدة تشمل شبكة منفصلة للمياه السوداء والرمادية لجميع البيوت.',
        'إعداد دليل باللغة العربية للترميم وإعادة التأهيل مورداً للمجتمع المحلي.',
        'برنامج توثيق بمشاركة طلبة الجامعات، وتوسيع الطريق المؤدي للموقع وتنظيفه.',
        'ورش تدريب موقعية لأكثر من 50 فرداً من المجتمع المحلي في الترميم وصيانة الموقع والتشغيل والسياحة التجريبية والإشراف الفندقي والإرشاد السياحي.',
        'تطوير نموذج السياحة المجتمعية مع جمعية همتنا غير، وتثبيته بعقد تشغيل موقّع بين الجمعيتين المحليتين.',
        'خطة تشغيلية متكاملة، وهوية للوجهة السياحية، وموقع إلكتروني وتطبيق للهواتف.'
      ],
      en: [
        'Full restoration and rehabilitation of a model cluster of five heritage houses (~500 m²), including indoor and outdoor spaces and the main alley leading to the cluster.',
        'Green building practices delivering natural cooling and lighting to reduce operational costs.',
        'New site infrastructure including a separate network for black and grey water across all houses.',
        'Development of an Arabic-language manual for restoration and rehabilitation as a community resource.',
        'Documentation programme engaging university students; access route widened and cleared.',
        'On-site training workshops for more than 50 community members in restoration, site maintenance, operations, experiential tourism, housekeeping and tour guiding.',
        'Community-Based Tourism model developed with Himmitna Ghair, formalised in a signed operating contract between the two local NGOs.',
        'Full operational plan, destination branding, website and mobile application.'
      ]
    },
    achievements: {
      ar: [
        'ترشّح ضمن القائمة القصيرة لجائزة إيكروم–الشارقة للممارسات الجيدة في صون التراث الثقافي.',
        'أول مشروع من نوعه في الأردن ينفّذ الترميم وإعادة التأهيل عبر إشراك المجتمع المحلي.',
        'إشراك أكثر من 150 فرداً من المجتمع المحلي في التنفيذ، واستشارة 100 فرد في تصميم الوجهة، وتشغيل أكثر من 40 عاملاً محلياً.',
        'الحصول على رخصة تشغيل كاملة من وزارة السياحة، وتسجيل 24 موظفاً في الضمان الاجتماعي لدى الجمعية المشغّلة.',
        'إدراج المشروع في خطة العمل الوطنية للنمو الأخضر 2021–2025، والتوصية باعتماده نموذجاً قابلاً للتوسع في قرى تراثية أخرى.',
        'تأمين منحة أوروبية لاحقة بقيمة 30,000 يورو للجمعية المشغّلة، ودعم إضافي من مؤسسة ولي العهد والديوان الملكي.',
        'اختيار الموقع من الهيئة الملكية للأفلام موقعاً للتصوير، بعائد تجاوز 12,000 دينار للمجتمع المحلي وتشغيل 25 شخصاً و9 نساء من القرية.',
        'زيارة رفيعة المستوى من الديوان الملكي ووزارة السياحة والآثار بتاريخ 22 شباط 2020.',
        'إدراج القرية على درب الأردن السياحي، وثلاث منشورات علمية منها مقال في مجلة علم الآثار في الأردن الصادرة عن أكور.'
      ],
      en: [
        'Shortlisted for the ICCROM-Sharjah Award for Good Practices in Cultural Heritage Conservation.',
        'First project of its kind in Jordan to deliver restoration and rehabilitation through community engagement.',
        'More than 150 community members engaged in delivery; 100 consulted in destination design; over 40 local labourers employed.',
        'Full operating licence secured from the Ministry of Tourism; 24 employees registered with Social Security under the operating NGO.',
        'Featured in the Jordan Green Growth National Action Plan 2021–2025 and recommended as an upscaling model for other heritage villages.',
        '€30,000 EU follow-on grant secured for the operating NGO; further support from the Crown Prince Foundation and the Royal Court.',
        'Selected by the Royal Film Commission as a shooting location, generating over 12,000 JOD for the community and hiring 25 local people and 9 local women.',
        'High-level visit by the Royal Court and the Ministry of Tourism and Antiquities, 22 February 2020.',
        'Listed on the Jordan Tourism Trail; three academic publications including an article in Archaeology in Jordan (ACOR).'
      ]
    },
    cover: {
      src: 'assets/images/projects/almatan-3.webp',
      alt: {
        ar: 'عمّال يرمّمون قوساً حجرياً داخل أحد بيوت قرية المعطن التراثية',
        en: 'Workers restoring a stone arch inside one of the heritage houses at Al Matan'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/almatan-3.webp',
        alt: { ar: 'عمّال يرمّمون قوساً حجرياً داخل أحد بيوت قرية المعطن التراثية', en: 'Workers restoring a stone arch inside one of the heritage houses at Al Matan' }
      },
      {
        src: 'assets/images/projects/almatan-1.webp',
        alt: { ar: 'بيوت قرية المعطن الحجرية على سفح الجبل بين الأشجار', en: 'The stone houses of Al Matan on the hillside among the trees' }
      },
      {
        src: 'assets/images/projects/almatan-2.webp',
        alt: { ar: 'أربع صور مرقّمة لمجموعة البيوت التراثية في المعطن خلال مراحل الترميم', en: 'Four numbered views of the Al Matan house cluster through the stages of restoration' }
      }
    ]
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'qasr-al-mshatta',
    number: '02',
    years: '2019–2026',
    ongoing: true,
    site: { ar: 'قصر المشتى', en: 'Qasr Al-Mshatta' },
    title: {
      ar: 'صون قصر المشتى الأموي من القرن الثامن الميلادي',
      en: 'Conservation of the 8th-Century Umayyad Qasr Al-Mshatta (Mshatta Palace)'
    },
    location: {
      ar: 'قصر المشتى، على بعد نحو 30 كم جنوب عمّان',
      en: 'Qasr Al-Mshatta, approximately 30 km south of Amman'
    },
    period: {
      ar: 'المرحلة الأولى: 26 أيلول 2019 – 31 آب 2022 · المرحلة الثانية: 2023 – 31 كانون الأول 2026',
      en: 'Phase I: 26 September 2019 – 31 August 2022 · Phase II: 2023 – 31 December 2026'
    },
    value: {
      ar: '150,000 دولار (المرحلة الأولى) · 249,700 دولار (المرحلة الثانية)',
      en: 'USD 150,000 (Phase I) · USD 249,700 (Phase II)'
    },
    summary: {
      ar: 'قصر المشتى من أكبر وأهم القصور الأموية في الأردن، شيّده الوليد الثاني وبقي غير مكتمل بعد وفاته عام 744م. ويُرجَّح أن زلزالاً دمّره قبل عام 800م. وفي عام 1903 أهدى السلطان عبد الحميد الثاني ثلثي الواجهة الرئيسية المزخرفة إلى الإمبراطور فيلهلم الثاني، ولا تزال معلماً في متحف الفن الإسلامي ببرلين. والموقع مدرج على القائمة التمهيدية للتراث العالمي لليونسكو.',
      en: 'Qasr Al-Mshatta is one of the largest and most important Umayyad palaces in Jordan, constructed by Walid II and left unfinished after his death in 744 AD. An earthquake is believed to have destroyed the palace before 800 AD. In 1903 Sultan Abdul Hamid II donated two-thirds of the richly decorated main gate to Emperor Wilhelm II; it remains a landmark of the Museum of Islamic Art in Berlin. The site is inscribed on the UNESCO World Heritage Tentative List.'
    },
    figures: [
      { value: '7+', label: { ar: 'سنوات من الإشراف المتواصل على الموقع', en: 'years of continuous custody' } },
      { value: '40', label: { ar: 'عاملاً، منهم 30 من القرى المجاورة', en: 'workers, 30 from nearby villages' } },
      { value: '3D', label: { ar: 'أرشيف توثيق رقمي متكامل', en: 'complete digital archive' } }
    ],
    cooperation: {
      ar: [
        'بتمويل من صندوق السفراء الأمريكي للحفاظ على التراث الثقافي، السفارة الأمريكية في عمّان.',
        'بالتعاون مع دائرة الآثار العامة ووزارة السياحة والآثار.',
        'الترويج بالتعاون مع هيئة تنشيط السياحة، والتدريب مع الجامعة الهاشمية وجامعة البترا.'
      ],
      en: [
        'Funded by the U.S. Ambassadors Fund for Cultural Preservation (AFCP), U.S. Embassy in Amman.',
        'In cooperation with the Department of Antiquities and the Ministry of Tourism and Antiquities.',
        'Promotion with the Jordan Tourism Board; training with the Hashemite University and the University of Petra.'
      ]
    },
    objectives: {
      ar: [
        'الإسهام في صون وترميم وإدارة أحد أهم القصور الأموية في الأردن.',
        'معالجة الحالة الحرجة للواجهة وقاعة العرش والقاعات والغرف الرئيسية.',
        'تعزيز دور الموقع في التنمية الاجتماعية والاقتصادية عبر السياحة المستدامة.',
        'إعداد ملفي ترشيح لقائمة التراث العالمي وقائمة التراث الإسلامي (المرحلة الثانية).'
      ],
      en: [
        'Contribute to the preservation, restoration and management of one of Jordan’s most important Umayyad palaces.',
        'Resolve the critical state of conservation at the façade, Throne Hall and principal halls and rooms.',
        'Enhance the site’s role in socio-economic development through sustainable tourism.',
        'Prepare nomination files for the World Heritage List and the Islamic Heritage List (Phase II).'
      ]
    },
    works: {
      ar: [
        'أعمال صون وترميم وتقوية وإعادة تركيب وإعادة بناء محدودة في الواجهة وقاعة العرش والقاعات الرئيسية.',
        'معالجة تسرّب المياه والتشققات، وتقوية أسقف القاعات الرئيسية لحلّ المشكلات المائية.',
        'تقوية الأساسات ومعالجة الانفصال عالي الخطورة في قاعة العرش والقاعات الرئيسية والغرف المجاورة والمدخل ثلاثي الأقواس.',
        'تنظيف شامل للموقع، وإزالة القشور والأملاح المتبلورة والنباتات والفطريات عن أسطح الطوب بأدوات دقيقة.',
        'تقوية البناء الحجري عبر ملء الفواصل بمونة متوافقة.',
        'إزالة الكتابات الجدارية بتقنيات غير متلفة ومواد معتمدة وماء منخفض الضغط.',
        'توثيق متقدم يشمل المسح بالليزر ثلاثي الأبعاد والتصوير الجوي والمسح الجيوفيزيائي بالمقاومة، ورسومات معمارية ثنائية وثلاثية الأبعاد للموقع كاملاً.',
        'ترقيم الشظايا المعمارية وتصويرها ورسمها، ثم توظيفها في ترميم الواجهة.',
        'تفسير الموقع: نموذج ثلاثي الأبعاد مع محاكاة، وواقع معزّز مدمج باللوحات الإرشادية، وتطوير المسارات وأفلام تفسيرية.',
        'دليل تشغيلي لمتابعة الموقع وتقييمه لصالح دائرة الآثار العامة، وتصميم مفاهيمي لمركز زوّار مقترح.'
      ],
      en: [
        'Conservation, restoration, consolidation, anastylosis and limited reconstruction at the façade, Throne Hall and main halls.',
        'Mitigation of water leakage and cracking; roof consolidation across the main halls to resolve hydrological problems.',
        'Foundation consolidation addressing high-risk detachment at the Throne Hall, main halls, adjacent rooms and tri-arched entrance.',
        'Comprehensive site cleaning; removal of crusts and crystallised salts, plants and fungi from brick surfaces using fine tools.',
        'Consolidation by filling joints in stone masonry with compatible mortar.',
        'Graffiti removal using non-destructive techniques, approved materials and low-pressure water.',
        'Advanced documentation: 3D laser scanning, drone survey, geophysical resistivity survey, and 2D and 3D architectural drawings of the whole site.',
        'Architectural fragments across the site numbered, photographed and drawn, then applied to façade restoration.',
        'Site interpretation: 3D model with animation, augmented reality embedded with signage, trail development and interpretation films.',
        'Operational manual for site monitoring and evaluation for the Department of Antiquities; concept design for a proposed Visitor Centre.'
      ]
    },
    achievements: {
      ar: [
        'معالجة الحالة الحرجة لواجهة القصر وقاعة العرش والقاعات الرئيسية.',
        'تشغيل 40 عاملاً، منهم 30 من أبناء 6 قرى مجاورة.',
        'توفير فرص تدريب ميداني عملي لطلبة الجامعات في الصون وإدارة الموارد الثقافية وإدارة السياحة والعمارة والتخطيط العمراني.',
        'إنشاء أرشيف توثيق رقمي متقدم متكامل يشكّل مرجعاً لإدارة الموقع على المدى الطويل.',
        'تطوير نموذج تجريبي للواقع المعزّز لقاعة العرش والواجهة.',
        'حلّ مشكلات إدارية مزمنة بالتنسيق مع الجهات المختصة: الصرف الصحي عند مدخل الموقع، ووقوف المركبات الثقيلة، والتخريب والكتابات الجدارية.',
        'فتح الموقع للزيارة واستقباله زوّاراً أفراداً ومجموعات، بدعم من الترويج مع هيئة تنشيط السياحة.',
        'تأمين المرحلة الثانية واستمرارها حتى كانون الأول 2026، بما يمدّ إشراف ترميم على الموقع إلى أكثر من سبع سنوات متصلة.'
      ],
      en: [
        'Critical state of conservation resolved at the palace façade, Throne Hall and principal halls.',
        '40 workers engaged, including 30 community members drawn from 6 nearby villages.',
        'On-the-job field training placements delivered for university students in conservation, cultural resource management, tourism management, architecture and urban planning.',
        'Complete advanced digital documentation archive created, establishing a baseline for long-term site management.',
        'Augmented reality pilot developed for the Throne Hall and the façade.',
        'Long-standing site management problems resolved with the responsible authorities: wastewater at the site entrance, heavy vehicle parking, vandalism and graffiti.',
        'Site opened for visitation and now receiving individual and group travellers, supported by promotion with the Jordan Tourism Board.',
        'Phase II secured and running to December 2026, extending Tarmeem’s custody of the site to over seven continuous years.'
      ]
    },
    cover: {
      src: 'assets/images/projects/mshatta-1.webp',
      alt: {
        ar: 'القوس الحجري في قصر المشتى تحيط به جدران الطوب، مع سقالة وعمّال في أثناء الترميم',
        en: 'The stone arch of Qasr Al-Mshatta framed by brick walls, with scaffolding and workers during restoration'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/mshatta-1.webp',
        alt: { ar: 'القوس الحجري في قصر المشتى تحيط به جدران الطوب، مع سقالة وعمّال في أثناء الترميم', en: 'The stone arch of Qasr Al-Mshatta framed by brick walls, with scaffolding and workers during restoration' }
      },
      {
        src: 'assets/images/projects/mshatta-2.webp',
        alt: { ar: 'فريق ترميم بسترات السلامة يعمل على فرز الحجارة وتقويتها في الموقع', en: 'Conservation team in safety vests sorting and consolidating stones on site' }
      },
      {
        src: 'assets/images/projects/mshatta-3.webp',
        alt: { ar: 'مرمّم يعمل على حجارة الواجهة المنحوتة في قصر المشتى', en: 'A conservator working on the carved façade stones of Qasr Al-Mshatta' }
      },
      {
        src: 'assets/images/projects/mshatta-4.webp',
        alt: { ar: 'الشظايا المعمارية مرقّمة ومصفوفة في الموقع قبل إعادة تركيبها', en: 'Numbered architectural fragments laid out on site before reassembly' }
      },
      {
        src: 'assets/images/projects/mshatta-5.webp',
        alt: { ar: 'أعضاء الفريق يوثّقون حجارة الواجهة المنحوتة', en: 'Team members documenting the carved façade stones' }
      }
    ]
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'maan-railway',
    number: '03',
    years: '2020–2023',
    ongoing: false,
    site: { ar: 'محطة سكة حديد معان', en: 'Ma’an Railway Station' },
    title: {
      ar: 'ترميم وإعادة تأهيل قصر الملك المؤسس عبدالله الأول ومحطة سكة حديد معان',
      en: 'Restoration and Rehabilitation of the Founder King Abdullah I Palace and Ma’an Railway Station'
    },
    location: { ar: 'محافظة معان', en: 'Ma’an Governorate' },
    period: {
      ar: 'وُقّعت الاتفاقية في 15 آب 2020 · أُنجزت الأعمال عام 2023',
      en: 'Agreement signed 15 August 2020 · Works completed 2023'
    },
    value: { ar: '143,922 دينار أردني', en: '143,922 JOD' },
    summary: {
      ar: 'يشكّل القصر ومباني المحطة المرتبطة به جزءاً من تراث سكة حديد الحجاز، وهو مجمّع وطني مهم يضم أحد عشر مبنى تاريخياً.',
      en: 'The palace and the associated station buildings form part of the Hijaz Railway heritage, a nationally significant complex of eleven historic structures.'
    },
    figures: [
      { value: '11', label: { ar: 'مبنى تاريخياً مرمّماً', en: 'historic buildings restored' } },
      { value: '7', label: { ar: 'حزم عمل منجزة بالكامل', en: 'work packages delivered' } },
      { value: '4,481 m²', label: { ar: 'أعمال دهان وفق المواصفات', en: 'painting to specification' } }
    ],
    cooperation: {
      ar: [
        'صاحب المشروع: وزارة الأشغال العامة والإسكان.',
        'المقاول الرئيسي: المؤسسة المركزية للمقاولات.',
        'مركز ترميم متعاقد فرعي متخصص بأعمال الترميم.'
      ],
      en: [
        'Project Owner: Ministry of Public Works and Housing.',
        'Main Contractor: Central Contracting Establishment.',
        'Tarmeem Center appointed as specialist restoration subcontractor.'
      ]
    },
    objectives: {
      ar: [
        'ترميم وإعادة تأهيل قصر الملك المؤسس عبدالله الأول ومجمّع محطة السكة المرتبط به.',
        'الحفاظ على الطابع التراثي العام والسلامة الإنشائية للمباني.',
        'تنفيذ جميع الأعمال وفق بيانات الطريقة المعتمدة ومواصفات صون التراث.',
        'تهيئة المجمّع للافتتاح العام والسياحة الثقافية.'
      ],
      en: [
        'Rehabilitate and restore the Founder King Abdullah I Palace and the associated railway station complex.',
        'Preserve the general heritage character and structural integrity of the buildings.',
        'Execute all works to approved method statements and heritage conservation specifications.',
        'Prepare the complex for public opening and cultural tourism.'
      ]
    },
    works: {
      ar: [
        'تنفيذ الترميم في مجمّع من أحد عشر مبنى: معرض الموقع، والثورة العربية الكبرى، والدفاع الوطني، والعنبر، والمحطة، والموظفين، والناظر، وميسنر، ودورات المياه القديمة، والمرجل، والمقهى.',
        'الإشراف على تدخلات في البناء الحجري والقرميد والعناصر الخشبية والقصارة والمكوّنات المعدنية والتشطيبات الزخرفية.',
        'أساليب تنظيف تشمل المعالجات القلوية والتفريش المضبوط واستخدام الماء عالي الضغط عند الاقتضاء.',
        'إعداد بيان طريقة معتمد وتنفيذ عيّنة موقعية واعتمادها قبل مباشرة الأعمال.',
        'تقديم جميع المواد والآليات للاعتماد قبل إدخالها إلى الموقع، وتسليم توثيق مصوّر موقّع شهرياً.'
      ],
      en: [
        'Restoration executed across an eleven-building complex: Site Exhibition, Great Arab Revolt, National Defense, Al Anbar, Station, Staff, Al-Nazer, Missner, Old WC, Boiler and Café buildings.',
        'Supervised interventions on stone masonry, roof tiles, wooden elements, plaster, metal components and decorative finishes.',
        'Cleaning techniques including alkaline treatments, controlled brushing and high-pressure water application where appropriate.',
        'Approved method statement prepared, with sample work executed on site and signed off before commencing.',
        'All materials and plant submitted for approval before delivery to site; periodic signed photographic documentation delivered monthly.'
      ]
    },
    boq: [
      { item: { ar: 'أعمال ترميم القصارة — 8 مبانٍ', en: 'Plaster (qasara) restoration — 8 buildings' }, qty: { ar: '3,459 م²', en: '3,459 m²' } },
      { item: { ar: 'أعمال الحجر والكحلة — 11 مبنى', en: 'Stone and repointing (kahla) — 11 buildings' }, qty: { ar: '2,993 م²', en: '2,993 m²' } },
      { item: { ar: 'أعمال ترميم القرميد — 6 مبانٍ', en: 'Roof tile (qarmeed) restoration — 6 buildings' }, qty: { ar: '1,584 م²', en: '1,584 m²' } },
      { item: { ar: 'تصريف مياه الأمطار — 7 مبانٍ', en: 'Rainwater drainage / gutter system — 7 buildings' }, qty: { ar: '312 م.ط', en: '312 lin. m' } },
      { item: { ar: 'أعمال الدهان — 9 مبانٍ', en: 'Painting to specification — 9 buildings' }, qty: { ar: '4,481 م²', en: '4,481 m²' } },
      { item: { ar: 'صيانة حديد الحمايات — 9 مبانٍ', en: 'Protective ironwork maintenance — 9 buildings' }, qty: { ar: '89 وحدة', en: '89 units' } },
      { item: { ar: 'ترميم المداخن — 6 مبانٍ', en: 'Chimney restoration — 6 buildings' }, qty: { ar: '20 وحدة', en: '20 units' } }
    ],
    achievements: {
      ar: [
        'افتتاح الموقع بالكامل متحفاً وطنياً للزوّار.',
        'إعادة تأهيل ناجحة لمجمّع تراثي ذي أهمية وطنية يشكّل جزءاً من تراث سكة حديد الحجاز.',
        'تحسين السلامة الإنشائية والديمومة طويلة الأمد في المباني التاريخية الأحد عشر جميعها.',
        'رفع جاهزية الموقع للسياحة الثقافية والتفسير.',
        'إنجاز كامل نطاق العقد عبر سبع حزم عمل تشمل القصارة والحجر والقرميد وتصريف المياه والدهان وحديد الحمايات والمداخن.'
      ],
      en: [
        'Site fully opened as a national Museum for visitors.',
        'Successful rehabilitation of a nationally significant heritage complex forming part of the Hijaz Railway heritage.',
        'Improved structural safety and long-term durability across all eleven historic buildings.',
        'Enhanced readiness of the site for cultural tourism and interpretation.',
        'Full contracted scope delivered across seven work packages covering plaster, stone, roof tile, drainage, painting, ironwork and chimneys.'
      ]
    },
    cover: {
      src: 'assets/images/projects/maan-1.webp',
      alt: {
        ar: 'مبنى المحطة الحجري المكوّن من طابقين بسقف القرميد الأحمر بعد الترميم في معان',
        en: 'The two-storey stone station building with its red tile roof after restoration, Ma’an'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/maan-1.webp',
        alt: { ar: 'مبنى المحطة الحجري المكوّن من طابقين بسقف القرميد الأحمر بعد الترميم في معان', en: 'The two-storey stone station building with its red tile roof after restoration, Ma’an' }
      },
      {
        src: 'assets/images/projects/maan-4.webp',
        alt: { ar: 'منظر علوي لمجمّع المحطة خلال أعمال ترميم السقف', en: 'Elevated view of the station complex during roof restoration' }
      },
      {
        src: 'assets/images/projects/maan-2.webp',
        alt: { ar: 'مبنى المحطة تحيط به السقالات في أثناء الترميم', en: 'The station building wrapped in scaffolding during restoration' }
      },
      {
        src: 'assets/images/projects/maan-3.webp',
        alt: { ar: 'أحد مباني المجمّع بسقف قرميد جديد وساحات مرصوفة', en: 'One of the complex buildings with a new tile roof and paved surroundings' }
      },
      {
        src: 'assets/images/projects/maan-5.webp',
        alt: { ar: 'واجهة مبنى المحطة الحجرية بعد اكتمال الأعمال', en: 'The stone façade of the station building after completion' }
      },
      {
        src: 'assets/images/projects/maan-6.webp',
        alt: { ar: 'مبنى المحطة خلال أعمال الترميم والسقالات', en: 'The station building during restoration works and scaffolding' }
      }
    ]
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'sharif-hussein-house',
    number: '04',
    years: '2021–2022',
    ongoing: false,
    site: { ar: 'بيت الشريف حسين بن علي، العقبة', en: 'House of Al-Sharif Hussein bin Ali, Aqaba' },
    title: {
      ar: 'إعادة تأهيل بيت الشريف حسين بن علي',
      en: 'Rehabilitation of the House of Al-Sharif Hussein bin Ali'
    },
    location: { ar: 'محافظة العقبة', en: 'Aqaba Governorate' },
    period: {
      ar: 'وُقّعت الاتفاقية في 22 أيار 2021 · الأعمال 2021 – 2022',
      en: 'Agreement signed 22 May 2021 · Works 2021 – 2022'
    },
    value: { ar: '27,105 دينار أردني', en: '27,105 JOD' },
    summary: {
      ar: 'يُعد بيت الشريف حسين بن علي معلماً تراثياً بارزاً في العقبة ومحوراً للسياحة التراثية والتجديد الحضري في المدينة.',
      en: 'The house of Al-Sharif Hussein bin Ali is a landmark heritage property in Aqaba and a focal point of the city’s heritage-led tourism and urban revitalisation.'
    },
    figures: [
      { value: '1,500 m²', label: { ar: 'واجهات حجرية مرمّمة', en: 'stone façades restored' } },
      { value: '3', label: { ar: 'حزم عمل منجزة بالكامل', en: 'work packages delivered' } }
    ],
    cooperation: {
      ar: [
        'صاحب المشروع: سلطة منطقة العقبة الاقتصادية الخاصة.',
        'المقاول الرئيسي: المؤسسة المركزية للمقاولات.',
        'مركز ترميم متعاقد فرعي متخصص بأعمال الترميم.'
      ],
      en: [
        'Project Owner: Aqaba Special Economic Zone Authority (ASEZA).',
        'Main Contractor: Central Contracting Establishment.',
        'Tarmeem Center appointed as specialist restoration subcontractor.'
      ]
    },
    objectives: {
      ar: [
        'إعادة تأهيل بيت الشريف حسين بن علي التاريخي في العقبة.',
        'الحفاظ على الطابع التراثي العام والسلامة الإنشائية للمبنى.',
        'تنفيذ جميع أعمال الترميم وفق بيانات الطريقة المعتمدة ومواصفات العقد.',
        'دعم إعادة التوظيف المتوافق مع التنشيط السياحي والثقافي.'
      ],
      en: [
        'Rehabilitate the historic house of Al-Sharif Hussein bin Ali in Aqaba.',
        'Preserve the general heritage character and structural safety of the building.',
        'Deliver all restoration to approved method statements and contract specifications.',
        'Support adaptive reuse aligned with tourism and cultural activation.'
      ]
    },
    works: {
      ar: [
        'صيانة وترميم وإعادة تأهيل الواجهات الحجرية مع التكحيل في الواجهات الداخلية والخارجية، شاملة التوريد والتركيب والمعالجة.',
        'توريد وتركيب حجارة غشيمة (جرانيت) مطابقة للحجر القائم نوعاً وشكلاً، مع خرسانة خلفية ومداميك بارتفاع الطوب.',
        'ترميم الواجهات الخرسانية الخارجية بإعادة القصارة، ومعالجة الواجهات الداخلية المطلوبة.',
        'تقديم بيان طريقة معتمد لكل بند، مع عيّنة موقعية معتمدة قبل مباشرة الأعمال.',
        'إشراف فني على منهجية الصون وتوافق المواد وتسلسل التدخلات.',
        'التوثيق وتقييم الحالة واعتبارات إعادة التوظيف، والتنسيق مع الجهات المحلية والمهندسين وفرق الصون.'
      ],
      en: [
        'Maintenance, restoration and rehabilitation of stone façades with repointing across internal and external elevations, including supply, installation and treatment.',
        'Supply and installation of rough-dressed granite matching the existing stone in type and form, with concrete backing and mud-brick-height coursing.',
        'Restoration of external concrete façades by re-plastering, and treatment of required internal façades.',
        'Method statement submitted and approved for each item, with an on-site sample panel approved before works commenced.',
        'Technical oversight of conservation methodology, material compatibility and intervention sequencing.',
        'Documentation, condition assessment and adaptive reuse considerations; coordination with local authorities, engineers and conservation teams.'
      ]
    },
    boq: [
      { item: { ar: 'ترميم الواجهات الحجرية والتكحيل، داخلياً وخارجياً', en: 'Stone façade restoration and repointing, internal and external' }, qty: { ar: '1,500 م²', en: '1,500 m²' } },
      { item: { ar: 'توريد وتركيب حجارة غشيمة (جرانيت) مطابقة للقائم', en: 'Supply and installation of rough-dressed granite matching existing' }, qty: { ar: '40 م²', en: '40 m²' } },
      { item: { ar: 'ترميم الواجهات الخرسانية الخارجية (إعادة القصارة) والواجهات الداخلية', en: 'External concrete façade restoration (re-plastering) and internal façades' }, qty: { ar: '185 م²', en: '185 m²' } }
    ],
    achievements: {
      ar: [
        'افتتاح الموقع بالكامل متحفاً للزوّار.',
        'الحفاظ على القيم المعمارية والتاريخية لأحد أهم الأصول التراثية في العقبة.',
        'الإسهام في جهود السياحة التراثية والتجديد الحضري في المدينة.',
        'إنجاز كامل نطاق العقد عبر ثلاث حزم عمل تشمل الواجهات الحجرية وتوريد وتركيب الجرانيت وإعادة قصارة الواجهات الخرسانية.'
      ],
      en: [
        'Site fully opened as a museum for visitors.',
        'Preservation of the architectural and historical values of a key heritage asset in Aqaba.',
        'Contribution to the city’s heritage-led tourism and urban revitalisation efforts.',
        'Full contracted scope delivered across three work packages covering stone façades, granite supply and installation, and concrete façade re-plastering.'
      ]
    },
    cover: {
      src: 'assets/images/projects/aqaba-1.webp',
      alt: {
        ar: 'واجهة بيت الشريف حسين بن علي الحجرية بنوافذها المقوّسة مضاءة ليلاً',
        en: 'The stone façade of the House of Al-Sharif Hussein bin Ali with its arched windows, lit at night'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/aqaba-1.webp',
        alt: { ar: 'واجهة بيت الشريف حسين بن علي الحجرية بنوافذها المقوّسة مضاءة ليلاً', en: 'The stone façade of the House of Al-Sharif Hussein bin Ali with its arched windows, lit at night' }
      },
      {
        src: 'assets/images/projects/aqaba-2.webp',
        alt: { ar: 'قاعة العرض المتحفية داخل البيت بعد إعادة التأهيل', en: 'The museum display hall inside the house after rehabilitation' }
      },
      {
        src: 'assets/images/projects/aqaba-3.webp',
        alt: { ar: 'مدخل البيت بسقفه الخشبي وجدرانه الحجرية ودرجاته ليلاً', en: 'The entrance with its timber ceiling, stone walls and steps at night' }
      }
    ]
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'beit-ras-theatre',
    number: '05',
    years: '2024',
    ongoing: false,
    site: { ar: 'المسرح الروماني في بيت رأس', en: 'Roman Theatre of Beit Ras' },
    title: { ar: 'مشروع صون مسرح بيت رأس', en: 'Beit Ras Theatre Conservation Project' },
    location: {
      ar: 'المسرح الروماني في بيت رأس، محافظة إربد',
      en: 'Roman Theatre of Beit Ras, Irbid Governorate'
    },
    period: { ar: '16 نيسان – 17 أيلول 2024', en: '16 April – 17 September 2024' },
    summary: {
      ar: 'يُعد المسرح الروماني في بيت رأس، مدينة كابيتولياس القديمة، من المعالم الكلاسيكية المهمة في شمال الأردن.',
      en: 'The Roman theatre at Beit Ras, ancient Capitolias, is among the significant classical monuments of northern Jordan.'
    },
    cooperation: {
      ar: [
        'بالتعاون مع المركز الأمريكي للأبحاث (أكور).',
        'ودائرة الآثار العامة.'
      ],
      en: [
        'In cooperation with the American Center of Research (ACOR).',
        'And the Department of Antiquities (DoA).'
      ]
    },
    objectives: {
      ar: [
        'الحفاظ على التراث الثقافي: صون السلامة التاريخية والإنشائية للموقع للحفاظ على أهميته الثقافية للأجيال القادمة.',
        'تحسين تجربة الزائر: رفع مستوى السلامة وسهولة الوصول وتفسير الموقع لتقديم تجربة ثرية وتعليمية.',
        'الصون المستدام: اعتماد أساليب تقلل الأثر البيئي وتضمن استدامة المواد والتدخلات على المدى الطويل.'
      ],
      en: [
        'Preserve cultural heritage — safeguard the historical and structural integrity of the site to maintain its cultural significance for future generations.',
        'Enhance visitor experience — improve safety, accessibility and site interpretation to provide an engaging and educational experience.',
        'Sustainable conservation — implement methods that minimise environmental impact and ensure the long-term sustainability of materials and interventions.'
      ]
    },
    works: {
      ar: [
        'إدارة جميع أعمال الترميم الميدانية في الموقع والإشراف عليها بما يضمن الالتزام بمنهجيات الصون المعتمدة وأفضل الممارسات الدولية.',
        'تقييم الحالة وتحديد أولويات التدخل للمدرجات الحجرية والجدران الساندة وعناصر الحركة والملامح المعمارية المكشوفة.',
        'تدخلات صون مباشرة تشمل تنظيف الحجر وتقويته وإعادة التكحيل وتثبيت العناصر المفكوكة وإجراءات الحماية الوقائية.',
        'تنفيذ جميع أعمال الصون في الموقع بما فيها التفاصيل الهندسية والمعمارية.',
        'تنسيق يومي بين المستشارين الفنيين في أكور وممثلي دائرة الآثار ومهندسي الموقع والمرمّمين وفرق العمل المهرة.',
        'التزام صارم بإجراءات ضبط الجودة وتوكيدها ومعايير توافق المواد ومتطلبات التوثيق.',
        'متابعة سلامة الموقع وتسلسل الأعمال والتنسيق اللوجستي لتقليل المخاطر على النسيج الأثري أثناء الترميم.'
      ],
      en: [
        'Directed and supervised all on-site field restoration works, ensuring compliance with approved conservation methodologies and international best practice.',
        'Condition assessments and verification of intervention priorities for stone seating, retaining walls, circulation elements and exposed architectural features.',
        'Hands-on conservation interventions: stone cleaning, consolidation, re-pointing, stabilisation of loose elements and preventive protection measures.',
        'Implementation of all on-site conservation works including engineering and architectural details.',
        'Daily coordination between ACOR technical advisors, Department of Antiquities representatives, site engineers, conservators and skilled labour teams.',
        'Strict adherence to QA/QC procedures, material compatibility standards and documentation requirements.',
        'Monitoring of site safety, sequencing of works and logistical coordination to minimise risk to archaeological fabric during active restoration.'
      ]
    },
    achievements: {
      ar: [
        'إنجاز بحث تاريخي شامل وتقييم للحالة وتوثيق كامل، بما يوفّر أساساً متيناً لأعمال الصون اللاحقة.',
        'إزالة كميات كبيرة من الرمال والأنقاض من محيط الموقع، مما حسّن مظهره وقلّل مخاطر التدهور الإنشائي.',
        'مباشرة تثبيت إنشائي في المناطق الحرجة، شمل ردم الفراغات المحفورة وتقوية العناصر الإنشائية الرئيسية.',
        'تحسين سهولة الوصول عبر تطوير الممرات ونقاط الدخول بما يسهّل حركة الزوّار بأمان.',
        'بدء معالجات صون موجّهة للمواد الرئيسية لمعالجة تدهور الحجر وغيره من المسائل المهمة.',
        'تثبيت وصون ناجحان للعناصر المعمارية ذات الأولوية، مما عزّز السلامة الإنشائية والتكامل المادي للمسرح.',
        'تحسين وضوح المعلم وعرضه بما يدعم الزيارة المنظمة والأنشطة الثقافية مستقبلاً.',
        'مستوى عالٍ من الالتزام بأنظمة دائرة الآثار العامة ومعايير الصون في أكور.',
        'تعزيز القدرات الفنية المحلية عبر التوجيه والإشراف الموقعي، بما يسهم في ممارسة صون مستدامة في شمال الأردن.'
      ],
      en: [
        'Comprehensive historical research, condition assessment and documentation completed, providing a solid foundation for further conservation.',
        'Significant sand and debris cleared from the site perimeter, improving appearance and reducing risks of further structural deterioration.',
        'Structural stabilisation initiated on critical areas, including backfilling of excavated spaces and consolidation of key structural elements.',
        'Accessibility enhanced through improved pathways and access points, facilitating safer visitor circulation.',
        'Targeted conservation treatments begun on key materials, addressing stone degradation and other significant issues.',
        'Successful stabilisation and conservation of priority architectural elements, enhancing the structural safety and physical integrity of the theatre.',
        'Improved legibility and presentation of the monument, supporting future controlled visitation and cultural activities.',
        'High level of compliance with Department of Antiquities regulations and ACOR conservation standards.',
        'Strengthened local technical capacity through on-site guidance and supervision, contributing to sustainable conservation practice in northern Jordan.'
      ]
    },
    cover: {
      src: 'assets/images/projects/beitras-1.webp',
      alt: {
        ar: 'منظر عام للمسرح الروماني في بيت رأس خلال أعمال الصون، وتظهر البلدة في الخلفية',
        en: 'Overview of the Roman theatre at Beit Ras during conservation works, with the town behind'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/beitras-1.webp',
        alt: { ar: 'منظر عام للمسرح الروماني في بيت رأس خلال أعمال الصون، وتظهر البلدة في الخلفية', en: 'Overview of the Roman theatre at Beit Ras during conservation works, with the town behind' }
      },
      {
        src: 'assets/images/projects/beitras-5.webp',
        alt: { ar: 'زوّار يستخدمون الدرج المعدني الجديد المؤدي إلى مدرجات المسرح', en: 'Visitors using the new steel staircase leading to the theatre seating' }
      },
      {
        src: 'assets/images/projects/beitras-2.webp',
        alt: { ar: 'ممر معدني جديد بمحاذاة المدرجات الحجرية', en: 'A new steel walkway alongside the stone seating' }
      },
      {
        src: 'assets/images/projects/beitras-3.webp',
        alt: { ar: 'درجات حجرية مرمّمة ولوحة تفسيرية في الموقع', en: 'Restored stone steps and an interpretation panel on site' }
      },
      {
        src: 'assets/images/projects/beitras-4.webp',
        alt: { ar: 'المسرح من الأعلى خلال الأعمال مع رافعة في الموقع', en: 'The theatre from above during works, with a crane on site' }
      }
    ]
  }
];
