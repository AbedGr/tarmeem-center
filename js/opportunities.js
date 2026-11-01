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
     summary   { ar, en }   one or two sentences
     sections  optional list of detail blocks, shown under "View details":
               [{ title: { ar, en }, items: { ar: ['...'], en: ['...'] } }]
     apply     optional: { email: 'info@tarmeem-center.com' } opens a pre-filled
               e-mail, or { url: 'https://...' } links to an external form
     file      optional link to a PDF announcement, e.g. 'assets/docs/call.pdf'

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
  ]
};
