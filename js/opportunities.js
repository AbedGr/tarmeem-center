/* =============================================================================
   opportunities.js - job vacancies (jobs.html) and open calls (calls.html).

   Add an entry to `jobs` or `calls` to publish it; delete it to take it down.
   When a list is empty the page shows a friendly "nothing open right now" note.

   Fields (text fields are bilingual { ar: '...', en: '...' }):
     id        unique, lowercase, no spaces            'site-conservator-2026'
     title     { ar, en }                              required
     type      { ar, en }   short label, optional      { ar: 'دوام كامل', en: 'Full-time' }
     location  { ar, en }   optional
     posted    'YYYY-MM-DD' optional
     deadline  'YYYY-MM-DD' optional - after this day the entry is shown as
                            "Closed" and moved below the open ones
     status    optional 'open' or 'closed' - overrides the deadline
               (leave it out to open/close automatically by deadline)
     summary   { ar, en }   one or two sentences
     sections  optional list of detail blocks, shown under "View details":
               [{ title: { ar, en }, items: { ar: ['...'], en: ['...'] } }]
     apply     optional: { email: 'info@tarmeem-center.com' } opens a pre-filled
               e-mail, or { url: 'https://...' } links to an external form
     file      optional link to a PDF announcement, e.g. 'assets/docs/call.pdf'
               (or any URL, such as a Google Drive folder)
     fileLabel optional { ar, en } text for the file button
               (default: "Download announcement")

   Example (copy into the list below and edit):

     {
       id: 'site-conservator-2026',
       title: { ar: 'مرمّم موقع', en: 'Site Conservator' },
       type: { ar: 'دوام كامل', en: 'Full-time' },
       location: { ar: 'عمّان، الأردن', en: 'Amman, Jordan' },
       posted: '2026-11-01',
       deadline: '2026-12-15',
       summary: { ar: '...', en: '...' },
       sections: [
         { title: { ar: 'المهام', en: 'Responsibilities' },
           items: { ar: ['...', '...'], en: ['...', '...'] } },
         { title: { ar: 'المتطلبات', en: 'Requirements' },
           items: { ar: ['...'], en: ['...'] } }
       ],
       apply: { email: 'info@tarmeem-center.com' }
     },
   ============================================================================ */
window.OPPORTUNITIES = {
  jobs: [
  ],

  calls: [
    /* ---------------------------------------------------------------- 4 */
    {
      id: 'diem-heritage-experts-2026',
      title: {
        ar: 'مشروع DIEM: دعوة دولية لاختيار أربعة خبراء في التراث الثقافي',
        en: 'DIEM: International Call for Four Cultural Heritage Experts'
      },
      type: { ar: 'دعوة خبراء · DIEM', en: 'Call for experts · DIEM' },
      location: { ar: 'تدريب عن بُعد + ورشة حضورية في الأردن', en: 'Online training + in-person workshop in Jordan' },
      deadline: '2026-11-17',
      summary: {
        ar: 'تبحث مؤسسة MeNO، بالشراكة مع شركاء مشروع DIEM (تطوير التعليم الشامل في حوض البحر المتوسط، بتمويل مشترك من الاتحاد الأوروبي عبر برنامج إنترريغ نِكست ميد)، عن أربعة خبراء في إدارة التراث الثقافي والتواصل لدعم المراحل التالية من برنامج تدريب المدرّبين، الموجّه إلى مديري مواقع التراث وأساتذة الجامعات والمختصين في التراث الثقافي من إيطاليا وإسبانيا والأردن وتونس ومصر وفلسطين.',
        en: 'Fondazione MeNO, together with the partners of the DIEM project (Developing Inclusive Education in the Mediterranean, co-funded by the European Union through the Interreg NEXT MED Programme), is seeking four experts in cultural heritage management and communication to support the next stages of the DIEM Training of Trainers programme for heritage managers, university professors and cultural heritage professionals from Italy, Spain, Jordan, Tunisia, Egypt and Palestine.'
      },
      sections: [
        {
          title: { ar: 'مجالات الخبرة المطلوبة', en: 'Expert profiles' },
          items: {
            ar: [
              'M1 – قيم التراث وتخطيط الإدارة: تحليل أصحاب العلاقة، وأهمية التراث، والحوكمة واستراتيجيات الإدارة.',
              'M2 – التوثيق وإدارة المعلومات الرقمية: أساليب التوثيق، ومسارات العمل الرقمية، والحفظ طويل الأمد للمعلومات.',
              'M3 – الصون الوقائي وإدارة المخاطر: تقييم المخاطر، والصون الوقائي، واستراتيجيات الاستجابة للطوارئ.',
              'C1 – تخطيط التواصل في التراث الثقافي: إشراك الجمهور، وتفسير التراث، واستراتيجيات التواصل، ومشاركة أصحاب العلاقة.'
            ],
            en: [
              'M1 – Heritage Values and Management Planning: stakeholder analysis, heritage significance, governance and management strategies.',
              'M2 – Documentation and Digital Information Management: documentation methods, digital workflows and long-term information preservation.',
              'M3 – Preventive Conservation and Risk Management: risk assessment, preventive conservation and emergency-response strategies.',
              'C1 – Cultural Heritage Communication Planning: audience engagement, heritage interpretation, communication strategies and stakeholder participation.'
            ]
          }
        },
        {
          title: { ar: 'الدور والمهام', en: 'Role' },
          items: {
            ar: [
              'مساعدة المشاركين على تحويل المعرفة إلى استراتيجيات عملية لحماية التراث الثقافي وإدارته والتواصل بشأنه.',
              'الإسهام في إعداد خطط الإدارة والتواصل للمواقع التجريبية العشرة للمشروع في حوض البحر المتوسط.',
              'يقدّم كل خبير 5 ساعات من التدريب عن بُعد ابتداءً من كانون الثاني 2027، تليها 24 ساعة من تنسيق ورشة دولية حضورية في الأردن مقرّرة في أيار 2027.'
            ],
            en: [
              'Help participants translate knowledge into practical strategies for the protection, management and communication of cultural heritage.',
              'Contribute to the development of Management and Communication Plans for the project’s ten pilot sites across the Mediterranean.',
              'Each expert delivers 5 hours of online training starting in January 2027, followed by 24 hours of workshop coordination during an international in-person workshop in Jordan in May 2027.'
            ]
          }
        },
        {
          title: { ar: 'جهة التعاقد', en: 'Contracting' },
          items: {
            ar: [
              'تتولى مؤسسة MeNO اختيار خبير التواصل (C1) والتعاقد معه.',
              'يتولى مركز ترميم في الأردن اختيار خبراء الإدارة الثلاثة (M1 وM2 وM3) والتعاقد معهم.'
            ],
            en: [
              'Fondazione MeNO ETS selects and contracts the Communication Expert (C1).',
              'Tarmeem Center in Jordan selects and contracts the three Heritage Management Experts (M1, M2 and M3).'
            ]
          }
        },
        {
          title: { ar: 'طريقة التقديم', en: 'How to apply' },
          items: {
            ar: [
              'تُقدَّم الطلبات باللغة الإنجليزية، وتشمل نموذج الطلب المعبّأ، والسيرة الذاتية، وما يثبت الخبرة المهنية ذات الصلة، ومقترحاً فنياً يصف أسلوب التدريس والأنشطة العملية المقترحة.',
              'خبير التواصل (C1): info@fondazionemeno.org',
              'خبراء الإدارة (M1 وM2 وM3): info@tarmeem-center.org',
              'آخر موعد للتقديم: 17 تشرين الثاني 2026، الساعة 5:00 مساءً بتوقيت وسط أوروبا (روما).'
            ],
            en: [
              'Applications must be submitted in English and include the completed application form, a CV, evidence of relevant professional experience and a technical proposal describing the proposed teaching approach and practical activities.',
              'Communication Expert (C1): info@fondazionemeno.org',
              'Management Experts (M1, M2, M3): info@tarmeem-center.org',
              'Deadline: 17 November 2026, 5:00 PM CET (Rome time).'
            ]
          }
        }
      ],
      apply: { email: 'info@tarmeem-center.org' },
      file: 'https://drive.google.com/file/d/1jAbNX4Hxar8UY5M_96YdrcB9VTmjLC_h/view',
      fileLabel: { ar: 'نموذج الطلب', en: 'Application form' }
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'diem-wp4-experts-extended',
      title: {
        ar: 'تمديد دعوة الخبراء | مشروع DIEM – حزمة العمل الرابعة',
        en: 'Extended Call for Experts | DIEM Project – WP4'
      },
      type: { ar: 'دعوة خبراء · DIEM', en: 'Call for experts · DIEM' },
      deadline: '2026-09-19',
      summary: {
        ar: 'نظراً للإقبال الكبير، مُدّد موعد التقديم للدعوة الأولى للخبراء ضمن مشروع DIEM حتى يوم السبت 19 أيلول 2026، الساعة 23:59 بتوقيت عمّان. يبحث مركز ترميم عن خمسة خبراء للإسهام في تطوير برنامج تدريب المدرّبين وأدواته في مجال التراث الثقافي.',
        en: 'Due to the high level of interest, the deadline for the First Call for Experts under the DIEM project was extended until Saturday, 19 September 2026, 23:59 (Amman time). Tarmeem Center is looking for five experts to contribute to the development of a Training of Trainers Programme and Toolkits in the field of cultural heritage.'
      },
      sections: [
        {
          title: { ar: 'مجالات الخبرة', en: 'Areas of expertise' },
          items: {
            ar: ['إدارة التراث العالمي', 'مشاريع إدارة التراث', 'استراتيجيات التراث وحوكمته', 'تنمية القدرات في مشاريع التراث', 'التعليم التراثي وتطوير المناهج'],
            en: ['World Heritage Management', 'Heritage Management Projects', 'Heritage Strategies & Governance', 'Capacity Development in Heritage Projects', 'Heritage Education & Curriculum Development']
          }
        },
        {
          title: { ar: 'طريقة التقديم', en: 'How to apply' },
          items: {
            ar: ['تُرسل الطلبات إلى: info@tarmeem-center.org', 'الموعد الجديد: السبت 19 أيلول 2026، الساعة 23:59 بتوقيت عمّان.'],
            en: ['Send applications to: info@tarmeem-center.org', 'New deadline: Saturday, 19 September 2026, 23:59 (Amman time).']
          }
        }
      ],
      apply: { email: 'info@tarmeem-center.org' },
      file: 'https://drive.google.com/drive/folders/14DGCSmsfn73sGQ7RF84JezMH0NkRp-ZW',
      fileLabel: { ar: 'الدعوة الكاملة ووثائق التقديم', en: 'Full call & application materials' }
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'diem-wp4-experts',
      title: {
        ar: 'دعوة خبراء | مشروع DIEM – حزمة العمل الرابعة',
        en: 'Call for Experts | DIEM Project – WP4'
      },
      type: { ar: 'دعوة خبراء · DIEM', en: 'Call for experts · DIEM' },
      deadline: '2026-09-15',
      summary: {
        ar: 'يعلن مركز ترميم عن الدعوة الأولى للخبراء ضمن مشروع DIEM – تطوير التعليم الشامل في حوض البحر المتوسط، الممول من برنامج إنترريغ نِكست ميد. نبحث عن خمسة خبراء للإسهام في تطوير برنامج تدريب المدرّبين وأدواته في مجال التراث الثقافي.',
        en: 'Tarmeem Center announces the First Call for Experts under the DIEM project – Developing Inclusive Education in the Mediterranean, funded by the Interreg NEXT MED Programme. We are looking for five experts to contribute to the development of a Training of Trainers Programme and Toolkits in the field of cultural heritage.'
      },
      sections: [
        {
          title: { ar: 'مجالات الخبرة', en: 'Areas of expertise' },
          items: {
            ar: ['إدارة التراث العالمي', 'مشاريع إدارة التراث', 'استراتيجيات التراث وحوكمته', 'تنمية القدرات في مشاريع التراث', 'التعليم التراثي وتطوير المناهج'],
            en: ['World Heritage Management', 'Heritage Management Projects', 'Heritage Strategies & Governance', 'Capacity Development in Heritage Projects', 'Heritage Education & Curriculum Development']
          }
        },
        {
          title: { ar: 'طريقة التقديم', en: 'How to apply' },
          items: {
            ar: ['تُرسل الطلبات إلى: info@tarmeem-center.org', 'آخر موعد للتقديم: 15 أيلول 2026، الساعة 23:59 بتوقيت عمّان.'],
            en: ['Send applications to: info@tarmeem-center.org', 'Deadline: 15 September 2026, 23:59 (Amman time).']
          }
        }
      ],
      apply: { email: 'info@tarmeem-center.org' },
      file: 'https://drive.google.com/drive/folders/14DGCSmsfn73sGQ7RF84JezMH0NkRp-ZW',
      fileLabel: { ar: 'الدعوة الكاملة ووثائق التقديم', en: 'Full call & application materials' }
    },

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'diem-external-controller-jordan',
      title: {
        ar: 'مشروع DIEM: دعوة لاختيار مدقق/مراقب خارجي في الأردن',
        en: 'DIEM: Open Call for an External Controller/Auditor in Jordan'
      },
      type: { ar: 'دعوة لتقديم العروض · DIEM', en: 'Call for proposals · DIEM' },
      location: { ar: 'الأردن', en: 'Jordan' },
      deadline: '2026-03-02',
      summary: {
        ar: 'يدعو مركز ترميم شركات التدقيق المؤهلة إلى تقديم عروضها لخدمات الرقابة الخارجية والتحقق من النفقات. يتحقق المراقب المختار من دقة نفقات المشروع التي يصرّح بها مركز ترميم (الشريك PP2 – الأردن) وأهليتها وامتثالها، بما يضمن الشفافية والإدارة المالية السليمة لمبادرات التعاون الممولة من الاتحاد الأوروبي.',
        en: 'Tarmeem Center invites qualified auditing firms to submit proposals for external control and expenditure verification services. The selected Controller will verify the accuracy, eligibility and compliance of project expenditures declared by Tarmeem Center (PP2 – Jordan), ensuring transparency and sound financial management of EU-funded cooperation initiatives.'
      },
      sections: [
        {
          title: { ar: 'طريقة التقديم', en: 'How to apply' },
          items: {
            ar: [
              'تُرسل العروض إلى: info@tarmeem-center.org',
              'آخر موعد للتقديم: 2 آذار 2026.',
              'تُرسل الدعوة الكاملة والشروط المرجعية عند الطلب عبر البريد الإلكتروني نفسه.',
              'يخضع التعيين لمصادقة نقطة الاتصال الوطنية المختصة بالرقابة في الأردن.'
            ],
            en: [
              'Submit proposals to: info@tarmeem-center.org',
              'Deadline: 2 March 2026.',
              'The full Call and Terms of Reference are shared on request at the same address.',
              'The appointment is subject to validation by the competent national Control Contact Point in Jordan.'
            ]
          }
        }
      ],
      apply: { email: 'info@tarmeem-center.org' }
    }
  ]
};
