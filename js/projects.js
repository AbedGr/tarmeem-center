/* =============================================================================
   projects.js - the single place where projects are defined.

   HOW TO ADD A PROJECT
   1. Put the images in assets/images/projects/ (WebP recommended).
      - "<name>-cover.webp"  3:2 crop, shown on the card (e.g. 1200x800)
      - "<name>-1.webp", "<name>-2.webp" ... full photos for the gallery
   2. Copy one of the objects below, paste it into the array and edit it:

      {
        id: 'unique-id',                 // letters, numbers and dashes only
        category: 'restoration',         // restoration | documentation | education | exhibitions
        year: '2024',                    // shown as text; use '2019-2021' for a range
        title:       { ar: '...', en: '...' },
        location:    { ar: '...', en: '...' },
        description: { ar: '...', en: '...' },   // blank line (\n\n) = new paragraph
        cover: {
          src: 'assets/images/projects/my-project-cover.webp',
          alt: { ar: '...', en: '...' }
        },
        gallery: [
          { src: 'assets/images/projects/my-project-1.webp', alt: { ar: '...', en: '...' } },
          { src: 'assets/images/projects/my-project-2.webp', alt: { ar: '...', en: '...' } }
        ]
      }

   3. Projects appear in the order they are listed here.

   Text in [square brackets] is a PLACEHOLDER and must be replaced with real
   content. The photographs are real site photographs; the titles, years,
   categories and descriptions below still need the Center's actual details.
   ============================================================================ */
window.PROJECTS = [
  {
    id: 'jerash',
    category: 'restoration',          // TODO: confirm the category
    year: '[YEAR]',
    title: {
      ar: 'جرش: [عنوان المشروع]',
      en: 'Jerash: [Project Title]'
    },
    location: {
      ar: 'جرش، الأردن',
      en: 'Jerash, Jordan'
    },
    description: {
      ar: '[وصف المشروع - يُستبدل بالمحتوى الفعلي.] يُعرض هنا ما قام به المركز في موقع جرش الأثري: حالة العناصر المعمارية قبل التدخل، والدراسات والتوثيق، ومنهجية العمل المعتمدة على المواد والتقنيات التقليدية.\n\nويمكن في فقرة ثانية بيان مراحل العمل، والجهات المشاركة، وأثر المشروع على الموقع والمجتمع المحلي.',
      en: '[PROJECT DESCRIPTION - replace with real content.] This section presents the Center\u2019s work at the archaeological site of Jerash: the condition of the architectural elements before intervention, the studies and documentation carried out, and the methodology based on traditional materials and techniques.\n\nA second paragraph can describe the phases of work, partner organisations and the project\u2019s impact on the site and the local community.'
    },
    cover: {
      src: 'assets/images/projects/jerash-cover.webp',
      alt: {
        ar: 'أعمدة كورنثية في الشارع المعمّد بمدينة جرش الأثرية عند الغروب',
        en: 'Corinthian columns along the colonnaded street of ancient Jerash at sunset'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/jerash-1.webp',
        alt: {
          ar: 'تاج عمود كورنثي منقوش في المقدمة وصفّ من الأعمدة الأثرية خلفه في جرش',
          en: 'A carved Corinthian capital in the foreground with a row of ancient columns behind it, Jerash'
        }
      }
    ]
  },

  {
    id: 'petra',
    category: 'documentation',        // TODO: confirm the category
    year: '[YEAR]',
    title: {
      ar: 'البتراء: [عنوان المشروع]',
      en: 'Petra: [Project Title]'
    },
    location: {
      ar: 'البتراء، الأردن',
      en: 'Petra, Jordan'
    },
    description: {
      ar: '[وصف المشروع - يُستبدل بالمحتوى الفعلي.] يتناول هذا القسم عمل المركز في البتراء: أعمال المسح والرفع المعماري، والتصوير، وإعداد الرسومات التي توثّق العناصر المعمارية والزخرفية المنحوتة في الصخر.\n\nكما يمكن الإشارة إلى المنهجية المعتمدة في التوثيق، وطريقة أرشفة النتائج وإتاحتها للباحثين.',
      en: '[PROJECT DESCRIPTION - replace with real content.] This section covers the Center\u2019s work at Petra: survey and measured drawings, photographic recording, and the preparation of drawings documenting the rock-cut architectural and decorative elements.\n\nIt may also describe the documentation methodology and how the results are archived and made available to researchers.'
    },
    cover: {
      src: 'assets/images/projects/petra-cover.webp',
      alt: {
        ar: 'تفاصيل واجهة الخزنة المنحوتة في الصخر الوردي في البتراء',
        en: 'Details of the rock-cut facade of the Treasury (Al-Khazneh) in Petra'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/petra-1.webp',
        alt: {
          ar: 'أعمدة وواجهة الخزنة في البتراء بضوء خافت بين جدران السيق',
          en: 'Columns and pediment of the Treasury at Petra in soft light between the Siq walls'
        }
      }
    ]
  },

  {
    id: 'umm-qais',
    category: 'restoration',          // TODO: confirm the category
    year: '[YEAR]',
    title: {
      ar: 'أم قيس: [عنوان المشروع]',
      en: 'Umm Qais: [Project Title]'
    },
    location: {
      ar: 'أم قيس، إربد، الأردن',
      en: 'Umm Qais, Irbid, Jordan'
    },
    description: {
      ar: '[وصف المشروع - يُستبدل بالمحتوى الفعلي.] يعرض هذا القسم عمل المركز في موقع أم قيس (جدارا): أعمال التدعيم والمعالجة للعناصر البازلتية، وإعادة توظيف الموقع بما يحفظ قيمته التاريخية.\n\nويمكن إضافة تفاصيل عن الحرفيين المشاركين والمواد المستخدمة.',
      en: '[PROJECT DESCRIPTION - replace with real content.] This section presents the Center\u2019s work at Umm Qais (Gadara): consolidation and conservation of the basalt structures and the adaptive reuse of the site in a way that preserves its historic value.\n\nDetails about the craftspeople involved and the materials used can be added here.'
    },
    cover: {
      src: 'assets/images/projects/ummqais-cover.webp',
      alt: {
        ar: 'أطلال أم قيس البازلتية وعمود قائم يطلّ على الوادي والتلال',
        en: 'Basalt ruins of Umm Qais with a standing column overlooking the valley and hills'
      }
    },
    gallery: [
      {
        src: 'assets/images/projects/ummqais-1.webp',
        alt: {
          ar: 'منظر عام لأطلال أم قيس (جدارا) تحت سماء ملبدة بالغيوم',
          en: 'General view of the ruins of Umm Qais (Gadara) under an overcast sky'
        }
      }
    ]
  }
];
