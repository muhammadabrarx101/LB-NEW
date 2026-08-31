# Learning Bubble

A two-audience educational website. One codebase, two brands:

| Brand | Page | Who it serves |
|---|---|---|
| **Learning Bubble for Kids** | `kids.html` | Ages 6–18. Creative, project-first, non-examined courses. |
| **Learning Bubble Academics** | `academics.html` | Exam students. IGCSE, IELTS, SAT, English proficiency. |

`index.html` is a neutral hub that lets a visitor pick a side. **Courses never cross between the two** — a kids course cannot appear in Academics and vice versa.

No prices appear anywhere on the site. Fees are quoted personally over WhatsApp after an enquiry.

---

## Stack

Vanilla HTML5 / CSS3 / JavaScript. No build step, no framework, no `package.json`.

- **Fonts** — Inter (body), Playfair Display (hub + Academics display), Fredoka (Kids display), via Google Fonts
- **Icons** — Font Awesome 6.5.2 (CDN)
- **Email** — Resend, called from a serverless function (`/api/send-email`)

---

## File map

```
index.html            Hub landing — brand chooser + shared sections
kids.html             Kids branch home
academics.html        Academics branch home
courses.html          Catalogue (branch/category/age/level filters + search)
course-detail.html    Single course shell, populated from ?id=N
demo.html             Book a free demo class (primary conversion page)
enrollment.html       Multi-course enquiry list + form
about.html            Story, values, timeline, teachers
contact.html          Contact methods + message form + FAQ
resources.html        Free guides + category browser

courses-data.js       Single source of truth: branches, categories, courses
script.js             Core shell (theme, nav, search, footer, WhatsApp, animations)
courses.js            Catalogue page logic
demo.js               Demo booking form; programme choice retints the page
course-detail.js      Detail page rendering
enrollment.js         Enquiry cart + form submission
styles.css            Whole design system

api/send-email.js       Vercel Edge Function
functions/api/send-email.js   Cloudflare Pages Function (same contract)
vercel.json           Vercel config (headers, caching)
```

---

## How the two brands work

The `<html>` element carries `data-branch="hub" | "kids" | "academics"`. That one attribute swaps the accent colour, gradient, corner radius and display typeface, so the same components read as two genuinely different products.

Each page sets it synchronously in an inline `<head>` script (before first paint, so there's no flash):

```html
<script>
  (function () {
    var d = document.documentElement;
    d.setAttribute('data-branch', 'kids');
    try { if (localStorage.getItem('lb-theme') === 'dark') d.classList.add('dark-theme'); } catch (e) {}
  })();
</script>
```

`courses.html` and `course-detail.html` resolve the branch from the URL (`?branch=`, or the course's own `branch` field) instead of hard-coding it.

Dark mode is a `dark-theme` class on `<html>`, remembered in `localStorage` under `lb-theme`. The last branch a visitor used is remembered under `lb-branch`.

### Adding a course

Add one object to `coursesData` in [`courses-data.js`](courses-data.js). Nothing else needs touching — the catalogue, search, carousels, footer counts and enquiry picker all read from it.

```js
{
  id: 34,
  branch: 'kids',                    // 'kids' | 'academics'  ← decides which site it appears on
  name: 'Course name',
  category: 'Technology & Coding',   // must match a name in categoriesData
  duration: '6 sessions · 1 month',
  ages: '10–14',
  level: 'Beginner',
  format: 'Live online · small group',
  image: 'assets/images/courses/course-34.jpg',  // or null for a gradient placeholder
  icon: 'fa-code',                   // Font Awesome *solid* icon
  tagline: 'One line that sells it.',
  about: 'Full paragraph…',
  highlights: ['…', '…'],
  subjects: ['…']                    // optional, mainly for Academics
}
```

`id` values must stay unique and stable — they are the permalink (`course-detail.html?id=34`).

### Adding a category

Add to `categoriesData` with a `branch`. Category images live in `assets/images/categories/`. A category with `image: null` renders a branded gradient panel with its icon instead.

---


---

## The demo funnel

"Book a demo class" is the primary conversion action across the whole site. It appears as:

- the header button on every page
- the hero's primary button on the hub
- a full section on the homepage (`#demo`) with a Kids / Academics chooser
- a compact strip on both branch homepages
- the top button in each course's sidebar, prefilled with that course
- the first button in every closing CTA band
- a link in the footer and in the mobile drawer

[`demo.html`](demo.html) is the landing point. Picking a programme there retints the whole page, swaps the liquid palette, updates the brand strapline and repopulates the course dropdown with that branch's courses only.

It accepts two URL parameters:

| Parameter | Example | Effect |
|---|---|---|
| `branch` | `demo.html?branch=kids` | Preselects the programme |
| `course` | `demo.html?course=25` | Preselects the course *and* infers its branch |

The form posts to the same `/api/send-email` endpoint as the other two forms, and the resulting email carries a WhatsApp button prefilled to reply to the person with slot options.

---

## Liquid backgrounds

Any element with `data-liquid="kids" | "academics" | "blend"` and a `<div class="liquid"></div>` child gets an animated background: five drifting, morphing colour fields plus faint education motifs. `script.js` injects the blobs, so the markup stays two lines.

The attribute drives palette *and* tempo:

| Branch | Palette | Tempo |
|---|---|---|
| `kids` | coral → amber → mint | `--lq-speed: .78` (quicker, bouncier) |
| `academics` | navy → indigo → teal → gold | `--lq-speed: 1.55` (slower, composed) |
| `blend` | both, mixed | `1` |

On the homepage chooser the attribute is live. With a mouse, hovering either card floods the section with that brand's palette and dims the other card. On touch, an IntersectionObserver does the same for whichever card is centred in the viewport.

Phones drop two of the five blobs and reduce the blur radius, and `prefers-reduced-motion` stops the animation entirely.

## Section tints

`data-tint="kids" | "academics" | "teal" | "violet"` on a section overrides `--accent`, `--accent-wash` and `--grad` for everything inside it. Because every component already reads those tokens, eyebrows, icons, step numbers and buttons all retint with no extra CSS. The hub homepage alternates through all four so both brand identities are present without either dominating.

Cards additionally track the pointer: `--mx` / `--my` feed a radial highlight that follows the cursor.

## Features

- **Search** — magnifier in the header, or `Ctrl`/`⌘ + K`, or `/`. Scoped to the current branch by default, with tabs to widen it.
- **Catalogue filters** — search, category chips, age bucket (Kids only), level and sort. Every combination is reflected in the URL, so filtered views are shareable.
- **WhatsApp** — a floating button on every page plus contextual CTAs. The prefilled message adapts to the branch, and course pages prefill the course name.
- **Enquiry cart** — add courses from cards, detail pages or the picker modal. Persisted in `localStorage` (`lb-enquiry-cart`).
- **Light / dark mode** — toggle in the header, remembered across pages and sessions.
- **Accessibility** — visible focus rings, ARIA on nav/modals/toasts, and `prefers-reduced-motion` respected.

---

## Running locally

Any static server works. The site is plain files — but you need HTTP (not `file://`) for the fetch calls to behave.

With Node installed:

```bash
npx serve .
```

With Python installed:

```bash
python -m http.server 5599
```

VS Code Live Server also works (`.vscode/settings.json` pins port 5501).

Then open `http://localhost:5599`. Everything works offline except the two forms, which need `/api/send-email` — see below.

---

## Deploying to Vercel

The repo is already configured (`vercel.json` + `api/send-email.js`). It is a static site with one Edge Function, so there is nothing to build.

### Option A — dashboard

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. When asked for settings: **Framework Preset = Other**, and leave Build Command and Output Directory **empty**. Vercel serves the root as static files and picks up `api/` automatically.
4. Before deploying, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | your key from [resend.com](https://resend.com) |
   | `MAIL_FROM` | *(optional)* `Learning Bubble <info@learningbubble.org>` |
   | `MAIL_TO` | *(optional)* `learningbubblepk@gmail.com` |

5. Click **Deploy**. You get a `*.vercel.app` URL in about a minute.

### Option B — CLI

```bash
npm i -g vercel
```

```bash
vercel
```

Then set the key and promote to production:

```bash
vercel env add RESEND_API_KEY production
```

```bash
vercel --prod
```

### Custom domain

In the Vercel project: **Settings → Domains → Add**, enter `learningbubble.org`, and point the DNS records Vercel shows you at your registrar. HTTPS is issued automatically.

### Sender domain

Resend will only send from a domain you have verified. Verify `learningbubble.org` in the Resend dashboard, or temporarily set `MAIL_FROM` to `onboarding@resend.dev` for testing.

---

## Deploying to Cloudflare Pages

Still supported and unchanged. `functions/api/send-email.js` implements the same `/api/send-email` contract. Set `RESEND_API_KEY` under **Settings → Environment variables**, with build command empty and output directory `/`.

Both hosts can run from the same repository — the front end only ever calls `/api/send-email`.

---

## The email endpoint

Both forms POST the same JSON shape:

```json
{ "subject": "…", "replyTo": "sender@example.com", "html": "<html>…</html>" }
```

The function adds the `from` and `to` addresses server-side and forwards to Resend. The API key is never exposed to the browser.

---

## Notes

- `COPILOT_INSTRUCTIONS.md`, `ENROLLMENT_SETUP.md` and the `COURSE_*` / `*_IMAGE_*` notes predate this rewrite and describe a PHP backend that no longer exists. Treat this README as the current reference.
- Course artwork lives in `assets/images/courses/` as `course-{id}.jpg`, sized around 1200×700.
