# patrickknguyen.github.io

Portfolio of Patrick K. Nguyen. Plain HTML, CSS and a little JavaScript, served by GitHub Pages. No build step.

## Run Locally

```
node server.js
```

Open http://localhost:8000. The server only exists for local preview; GitHub Pages serves the files directly.

## Files

```
index.html            Home page
global.css            Tokens, base styles, page grid, site header. Every page.
home.css              Home page only
case-studies.css      Shared case study layout, figures, lightbox styles
lightbox.js           Click-to-expand images in case studies
server.js             Local preview server
{case-study}/index.html  One folder per case study: vigor, clustr, summit, zipvote
{case-study}/{name}.css  That case study's one-offs
resume/               Résumé page, separate stylesheet, outside this system
assets/               Images, one folder per page
```

Load order on a case study: `global.css`, `case-studies.css`, `{case-study}.css`, then `lightbox.js` before `</body>`.

## Principles

1. **Tokens first.** Colors, type sizes, spacing and grid values live in `:root` in `global.css`. Page stylesheets use `var(--token)` and never hardcode their own values.
2. **One grid.** Every page sits on the same 12-column grid with the same gutter, so columns line up across pages.
3. **Two start lines.** Content starts at column 1 or column 5. Nothing else.
4. **Shared before specific.** Layout comes from shared classes in `case-studies.css`. A case study stylesheet holds only things no other page needs.
5. **Top edges align.** Headings beside images are trimmed so their visible top meets the image's top edge.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#f5f4f0` | Page background |
| `--color-text` | `#1a1a1a` | Body text, headings |
| `--color-text-secondary` | `#555` | Meta, captions, link lists |
| `--color-border` | `#d4d4d0` | Dividers |
| `--color-link-hover` | `#666` | Link hover |

### Type

Font: system stack (`--font-body`). Base size 16px. Body line height 1.5.

| Token | Size | Use |
|---|---|---|
| `--font-xs` | 0.8125rem | Meta lines, link list headings |
| `--font-sm` | 0.875rem | h3, nav links, captions, contents list |
| `--font-md` | 1rem | Body text |
| `--font-lg` | 1.25rem | h2 section titles, case study card titles |
| `--font-xl` | 1.5rem | Case study title |
| `--font-2xl` | 2rem | Site name |

Weights: 300 for body text, 400 for the site name, 500 for headings.

### Spacing

| Token | Size |
|---|---|
| `--space-2xs` | 0.25rem |
| `--space-xs` | 0.5rem |
| `--space-sm` | 1rem |
| `--space-md` | 2rem |
| `--space-lg` | 4rem |

### Grid and Page

| Token | Value | Use |
|---|---|---|
| `--grid-columns` | 12, or 1 below 900px | Column count |
| `--grid-gutter` | 2rem to 4rem, fluid | Space between columns |
| `--grid-row-gap` | 2rem | Space between grid rows |
| `--page-margin` | 4rem, or 2rem below 900px | Left, right and bottom page edge |
| `--max-width` | 1800px | Content max width |
| `--header-height` | 1.5rem | Height of the header row |
| `--content-offset` | 3rem | Header to first content, every page |

**Breakpoint:** 900px everywhere. Media queries can't read variables, so the number is repeated in each stylesheet. Below it, `--grid-columns` becomes 1 and every block spans the full width.

## Layout

### Columns

```
| 1  2  3 | 4 | 5  6  7  8 | 9  10  11  12 |
| sidebar |   |      media or prose         |
| title   |   |                             |
| side text  |                             |
```

| Class | Columns | Use |
|---|---|---|
| `.section-title` | 1 to 4 | Section heading |
| `.col-text` | 1 to 4 | Text beside media |
| `.col-media` | 5 to 12 | Full width media |
| `.col-prose` | 5 to 11 | Long-form text |
| `.col-media--inset` | 5 to 11 | Slightly narrower media |
| `.col-media--narrow` | 5 to 9 | Tall media, like a long screenshot |
| `.section-col-left` | 5 to 8 | Paired text, left |
| `.section-col-right` | 9 to 12 | Paired text, right |
| `.section-tri-col` | 1 to 12 | Three 4-column blocks |
| `.section-duo-col` | 5 to 12 | Two 4-column blocks |

`.section-tri-col` and `.section-duo-col` use CSS subgrid, so their columns are the page's own columns.

### Site Header

On every page. Name in columns 1 to 4, links starting at columns 9, 10, 11 and 12. Not sticky. On the home page the name sits in the sticky sidebar instead, and the links sit in the grid's first row.

### Home Page

- Sidebar, columns 1 to 3: name, bio, portrait. Sticky when it fits the window, and the portrait sits on the bottom page margin. When it doesn't fit, the script in `index.html` lets it scroll.
- Work, columns 5 to 12: case study cards with 16:9 images.
- The bio and the first case study image start `--content-offset` below the header, the same line as a case study's title and hero.

### Case Study Intro

| Element | Columns | Row |
|---|---|---|
| `.case-study__title`: title, meta, contents | 1 to 3 | 1 |
| `.case-study__hero`: 16:9 image | 5 to 12 | 1 |
| `.case-study__links`: links, recognitions | 1 to 3 | 2 |
| `.case-study__objective` | 5 to 8 | 2 |
| `.case-study__overview` | 9 to 12 | 2 |

The hero is always 16:9 and matches the image on the home page card.

### Case Study Sections

Each section is `<section class="section--bordered case-study-section">` with a `.container` and a `.case-study__layout` grid inside. The title takes columns 1 to 4. Content uses a column class from the table above.

Text blocks:

| Class | Use |
|---|---|
| `.section-body` | Body text styling for its paragraphs |
| `.section-body--stacked` | Space between several paragraphs |
| `.section-point` | A titled block: h3 and a paragraph |

### Figures

```html
<figure class="figure col-media">
    <img src="..." alt="What the image shows">
    <figcaption class="figure__caption">What the reader should notice.</figcaption>
</figure>
```

- `.figure--stack` stacks several images in one figure.
- `.figure__caption--center` centers a caption.
- Every image in a `.case-study-section` opens in the lightbox automatically.
- Captions say what to notice, not what the image is.

## Writing CSS

### Naming

- **Components** use BEM: `block__element--modifier`, like `case-study-card__img` or `figure__caption--center`.
- **Shared layout classes** have no prefix: `col-media`, `section-title`.
- **Case study one-offs** are prefixed with the case study name: `clustr-demo`, `zipvote-ux-label`.

### Comments

Every file follows the same three rules.

**1. A file header** naming the file and what it's for:

```css
/* ==========================================
   case-studies.css
   Shared layout for every case study.
   ========================================== */
```

**2. Section dividers** in Title Case, with a blank line after:

```css
/* --- Figures --- */
```

**3. Inline comments explain why, never what.** If the code already says it, there's no comment.

```css
/* The flex gap already spaces the caption; pull it up to match */
.figure--stack .figure__caption {
    margin-top: calc(var(--space-sm) - var(--space-md));
}
```

In JavaScript, headers and dividers use `/* */` and inline comments use `//`. In HTML, the only comments are section markers that match the section's h2:

```html
<!-- ====== Discovery ====== -->
```

### Before Adding a Rule

1. Is there a token for this value? Use it.
2. Does a shared class already do this? Use it.
3. Will a second case study need it? Put it in `case-studies.css`.
4. Only then add it to that case study's stylesheet.

## Adding a Case Study

1. Copy an existing case study folder and rename it.
2. Replace the intro: title, meta, contents list, 16:9 hero, objective, overview, links.
3. Build sections with `.section-title` and the column classes.
4. Add a case study card to `index.html` using the same hero image.
5. Keep the case study stylesheet for one-offs only.

## Cache Busting

Stylesheet links end in `?v=N`. Increase N when a stylesheet changes, so browsers load the new version instead of a cached one.

## Interactions

- Links fade color on hover over 0.2s.
- Case study cards zoom to 102% and dim slightly on hover over 0.4s.
- The lightbox fades in over 0.25s. Click or press Escape to close, and use the arrow keys to step through images.
- Selected text inverts: background color on text color.
