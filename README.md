# Tarmeem Center for the Preservation of Heritage — Website

Bilingual (Arabic / English) portfolio website for **مركز ترميم للمحافظة على التراث**.
Plain HTML, CSS and vanilla JavaScript — no build step, no frameworks.

**Live site:** https://abedgr.github.io/tarmeem-center/

## Structure

```
index.html          Page markup: hero, about, vision & mission, expertise, materials,
                    methodology, projects, team, partners, contact
404.html            Bilingual "page not found" page
css/style.css       All styles (mobile-first, RTL/LTR via logical properties)
js/i18n.js          All Arabic / English text for the fixed sections
js/projects.js      The five key projects (text, figures, quantities, photos)
js/content.js       Key personnel (TEAM) and partner logos (PARTNERS)
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

## Editing other text

- Section text (hero, about, vision & mission, expertise, materials, methodology, contact, footer):
  `js/i18n.js` - every key exists under `ar:` and `en:`; change both.
- Team members and partners: `js/content.js`.
- Contact e-mail, phone, website and map link: `index.html`, section `<!-- CONTACT -->` (and the footer).
- Key numbers: `index.html`, the `data-stat-value` attributes in the About section
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
