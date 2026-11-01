# Tarmeem Center for the Preservation of Heritage — Website

Bilingual (Arabic / English) portfolio website for **مركز ترميم للمحافظة على التراث**.
Plain HTML, CSS and vanilla JavaScript — no build step, no frameworks.

**Live site:** https://abedgr.github.io/tarmeem-center/

## Structure

```
index.html          Home: hero, links to every page, contact band
about.html          About, key numbers, vision & mission
expertise.html      Expertise, materials & techniques, methodology
projects.html       Projects (cards + details window), rendered from js/projects.js
team.html           Key personnel, rendered from js/content.js
partners.html       Partner logos, rendered from js/content.js
contact.html        Contact details and form
opportunities.html  Opportunities hub (links to Jobs and Calls)
jobs.html           Job vacancies, rendered from js/opportunities.js
calls.html          Open calls, rendered from js/opportunities.js
404.html            Bilingual "page not found" page
css/style.css       All styles (mobile-first, RTL/LTR via logical properties)
js/i18n.js          All Arabic / English text for the fixed sections
js/projects.js      The five key projects (text, figures, quantities, photos)
js/content.js       Key personnel (TEAM) and partner logos (PARTNERS)
js/opportunities.js Job vacancies and open calls (OPPORTUNITIES.jobs / .calls)
js/main.js          Behaviour: language toggle, menu, project cards & modal, team, partners, form
assets/images/
  hero.webp, og-image.jpg, logos, favicons
  site/             Section photos (about, vision, expertise, materials, methodology, team)
  projects/         Project photos (<project>-1.webp, -2.webp, ...)
  partners/         Partner logos
```

All content and photographs come from the *Tarmeem Center Portfolio 2026* PDF.

## Adding or editing a project

Everything about a project lives in **`js/projects.js`** - the comment at the top of the file
documents every field. Each text field is bilingual (`{ ar: '...', en: '...' }`) and list fields
(cooperation, objectives, works, achievements) are `{ ar: [...], en: [...] }`.
`boq` (bill of quantities) and `figures` (key numbers) are optional.

Photos: WebP, lowercase names, no spaces, ideally under ~300 KB, in `assets/images/projects/`.
The first gallery image is usually the same as the cover.

## Posting a job or a call

Add an entry to `jobs` or `calls` in **`js/opportunities.js`** - the comment at the top of the file
has a ready-to-copy example. Entries past their `deadline` are shown as *Closed* below the open ones;
delete an entry to remove it. With an empty list the page shows a "nothing open right now" note.
The Opportunities page shows how many of each are open.

## Header and footer

The header (menu) and footer are repeated on every page (`index.html`, `about.html`, `expertise.html`,
`projects.html`, `team.html`, `partners.html`, `contact.html`, `opportunities.html`, `jobs.html`,
`calls.html`). To change a menu item, change it in all of them. The current page's menu link carries
`aria-current="page"`. Old one-page links such as `index.html#projects` redirect to the new pages.

## Editing other text

- Section text (hero, about, vision & mission, expertise, materials, methodology, contact, footer):
  `js/i18n.js` - every key exists under `ar:` and `en:`; change both.
- Team members and partners: `js/content.js`.
- Contact e-mail, phone, website and map link: `contact.html` (and the footer on every page).
- Key numbers: `about.html`, the `data-stat-value` attributes
  (`data-stat-static` stops a value - such as a year - from counting up).

## Redeploying

The site is hosted on **GitHub Pages** from the `main` branch (root folder).
Every push to `main` republishes the site automatically (usually within 1–2 minutes).

```bash
git add -A
git commit -m "Describe the change"
git push
```

Hard-refresh the browser (Ctrl+F5) if you still see the old version.

Every page loads its CSS and JavaScript with a version number, e.g. `css/style.css?v=20261101`.
After changing `css/style.css` or a file in `js/`, change that number on every page (any new value,
such as today's date) so phones and browsers download the new files instead of a cached copy.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

## Checklist before publishing new content

- [ ] File names are lowercase with no spaces (GitHub Pages is case-sensitive).
- [ ] All paths are relative (`assets/images/...`, never `/assets/...`).
- [ ] Every image has Arabic and English `alt` text.
- [ ] Partner logos go in `assets/images/partners/` and are listed in `js/content.js`.
- [ ] Images are WebP and under ~300 KB; share image `assets/images/og-image.jpg` is 1200×630.

## Site editor (no code needed)

Open **`/admin/`** on the live site (https://abedgr.github.io/tarmeem-center/admin/) to edit content in the browser:

- **Projects** - text, cover photo and gallery; drag & drop photos to add or replace them, drag ⋮⋮ to reorder.
- **Page photos** - replace any section photo by dropping a new one on it.
- **Page text** - every Arabic / English string from `js/i18n.js`, with search.
- **Team** and **Partners** - edit people, drop partner logos.

Photos are resized and converted to WebP in the browser. **Publish** commits all changes to `main`
in one commit (the site updates in 1–2 minutes); photos no longer used are removed.

Sign-in uses a GitHub *fine-grained personal access token* limited to this repository with
**Contents: Read and write**. The token stays in your browser only.
