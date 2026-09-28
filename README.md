# Tarmeem Center for the Preservation of Heritage — Website

Bilingual (Arabic / English) portfolio website for **مركز ترميم للمحافظة على التراث**.
Plain HTML, CSS and vanilla JavaScript — no build step, no frameworks.

**Live site:** https://abedgr.github.io/tarmeem-center/

## Structure

```
index.html          Page markup (one page, sections: hero, about, projects, contact)
404.html            Bilingual "page not found" page
css/style.css       All styles (mobile-first, RTL/LTR via logical properties)
js/i18n.js          All Arabic / English text
js/projects.js      The project list (edit this to add or change projects)
js/main.js          Behaviour: language toggle, menu, filters, modal, form
assets/images/      Logo, favicons, hero, share image, project photos
```

## Adding a project

Everything about a project lives in **one file: `js/projects.js`**.

1. Prepare the photos and put them in `assets/images/projects/`:
   - `my-project-cover.webp` — 3:2 crop for the card (e.g. 1200×800 px)
   - `my-project-1.webp`, `my-project-2.webp`, … — full photos for the gallery
   - Use **WebP**, lowercase file names, no spaces. Keep each image under ~300 KB.
     Free converters: [Squoosh](https://squoosh.app) (in the browser) or any image editor's "Export as WebP".
2. Open `js/projects.js`, copy one of the existing `{ … }` blocks and paste it into the list
   (order in the file = order on the site).
3. Fill in the fields:

```js
{
  id: 'my-project',                   // unique, letters/numbers/dashes only
  category: 'restoration',            // restoration | documentation | education | exhibitions
  year: '2024',                       // text, e.g. '2019-2021'
  title:       { ar: 'العنوان بالعربية', en: 'English title' },
  location:    { ar: 'المدينة، الدولة', en: 'City, Country' },
  description: { ar: 'الفقرة الأولى.\n\nالفقرة الثانية.', en: 'First paragraph.\n\nSecond paragraph.' },
  cover: {
    src: 'assets/images/projects/my-project-cover.webp',
    alt: { ar: 'وصف الصورة', en: 'Description of the photo' }
  },
  gallery: [
    { src: 'assets/images/projects/my-project-1.webp', alt: { ar: '…', en: '…' } },
    { src: 'assets/images/projects/my-project-2.webp', alt: { ar: '…', en: '…' } }
  ]
}
```

4. Save, then redeploy (below). To remove a project, delete its block (and its images).

## Editing text

- Site text (navigation, headings, contact labels, mission/vision, footer): `js/i18n.js`.
  Every key exists twice, once under `ar:` and once under `en:` — change both.
- Contact e-mail, phone and social links: `index.html`, section `<!-- CONTACT -->`.
- Key numbers (projects, years, sites): `index.html`, the `data-stat-value` attributes in the About section.

Text in `[square brackets]` is a placeholder that still needs real content.

## Redeploying

The site is hosted on **GitHub Pages** from the `main` branch (root folder).
Every push to `main` republishes the site automatically (usually within 1–2 minutes).

```bash
git add -A
git commit -m "Describe the change"
git push
```

Hard-refresh the browser (Ctrl+F5) if you still see the old version.

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
- [ ] Images are WebP and under ~300 KB; share image `assets/images/og-image.jpg` is 1200×630.
