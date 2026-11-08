# patrickknguyen.github.io

Portfolio of Patrick K. Nguyen. Plain HTML, CSS and a little JavaScript, served by GitHub Pages. No build step.

## Run Locally

```
node server.js
```

Open http://localhost:8000. The server only exists for local preview; GitHub Pages serves the files directly.

## Files

```
index.html               Home page
global.css               The design system: tokens, base styles, type styles, page grid,
                         site header, page transitions. Every page.
home.css                 Home page layout
case-studies.css         Shared case study layout, figures, lightbox
lightbox.js              Click-to-expand images in case studies
server.js                Local preview server
{case-study}/index.html  One folder per case study: vigor, clustr, summit, zipvote
{case-study}/{name}.css  That case study's one-offs, only if it has any (Clustr, ZipVote)
resume/                  Résumé page, separate stylesheet, outside this system
assets/                  Images, one folder per page
```

Load order on a case study: `global.css`, `case-studies.css`, `{case-study}.css` if there is one, then `lightbox.js` before `</body>`.

## Principles

1. **Tokens first.** Every color, size, weight, space, easing and shadow is a token in `:root` in `global.css`. Other stylesheets use `var(--token)` and don't hardcode values.
2. **Type in one place.** Every text style is defined once, in the Type Styles section of `global.css`. Page stylesheets handle layout and spacing, never type.
3. **One grid, read in thirds.** Every page sits on the same 12-column grid with the same gutter, so columns line up across pages. The 12 columns are used as three groups of four, so content starts at column 1, 5 or 9. Two deliberate exceptions: the nav starts at column 8, and heroes, media and prose stop at column 11, leaving column 12 as breathing room on the right.
4. **Shared before specific.** Layout comes from shared classes in `case-studies.css`. A case study stylesheet holds only things no other page needs.
5. **Top edges align.** Headings beside images are trimmed so their visible top meets the image's top edge, and the first content on every page starts at the same height.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#fff` | Page background |
| `--color-bg-subtle` | `#f9f9f9` | Case study sections below the intro |
| `--color-text` | `#1a1a1a` | Body text, headings, links |
| `--color-text-secondary` | `#949494` | Tags, captions, labels, thank-you notes |
| `--color-text-faint` | `#e6e6e6` | "About" and "Case Studies" on the home page |
| `--color-link-hover` | `--color-text-secondary` | Link hover |
| `--color-border` | `--color-text-secondary` | Image outlines, video placeholder |
| `--color-divider` | `--color-faint` | Lines between case study sections |

Contrast on white: `--color-text-secondary` is 3:1, which passes WCAG AA only for large text (24px and up). It's lighter than AA asks for at small sizes, on purpose. `--color-text-faint` is 1.25:1 and decorative.

### Type

Font: system stack (`--font-body`). Base size 16px.

| Token | Size | Use |
|---|---|---|
| `--font-xs` | 0.75rem (12px) | Tags, captions, thank-you notes |
| `--font-sm` | 0.875rem (14px) | Section text, nav, labels, link lists, h3 |
| `--font-md` | 1rem (16px) | Abstract, bio, card descriptions |
| `--font-lg` | 1.25rem (20px) | Site name, section titles (h2) |
| `--font-xl` | 1.5rem (24px) | Card titles on the home page |
| `--font-2xl` | 2.5rem (40px) | Case study titles, home section labels |

| Token | Value | Use |
|---|---|---|
| `--weight-light` | 300 | Body text |
| `--weight-regular` | 400 | Labels |
| `--weight-medium` | 500 | Site name, labels under example images |
| `--weight-semibold` | 600 | Titles and headings |
| `--leading-tight` | 1.15 | Display text and the site name |
| `--leading-normal` | 1.5 | Everything else |
| `--tracking-tight` | -0.03em | Display text, card titles, site name |

### Type Styles

Defined in `global.css`. To restyle a kind of text, change it there.

| Style | Spec | Where |
|---|---|---|
| Display | 2xl, semibold, tight | Case study titles, "About", "Case Studies" |
| Title | xl, semibold, tight | Card titles on the home page |
| Name | lg, medium, tight, lowercase | "patrick k. nguyen" |
| Heading (h2) | lg, semibold | Section titles |
| Subheading (h3) | sm, semibold | Points within sections, abstract labels |
| Body | md, light | Abstract, bio, card descriptions |
| Small body | sm, light | Section text, link lists |
| Label | sm, regular, secondary | "Contents", "Links", "Recognitions" |
| Meta | xs, secondary | Tags, captions, thank-you notes |

### Spacing

| Token | Size |
|---|---|
| `--space-2xs` | 0.25rem |
| `--space-xs` | 0.5rem |
| `--space-sm` | 1rem |
| `--space-md` | 2rem |
| `--space-lg` | 4rem |
| `--space-xl` | 8rem |

### Grid and Page

| Token | Value | Use |
|---|---|---|
| `--grid-columns` | 12, or 1 below 900px | Column count |
| `--grid-gutter` | 5vw, between 2rem and 8rem | Space between columns |
| `--grid-row-gap` | 2rem | Space between grid rows |
| `--page-margin` | 1.5rem, or 1rem below 900px | Page edges |
| `--max-width` | 1800px | Content max width |
| `--header-height` | 1.5rem | Height of the header row |
| `--content-offset` | 6rem, or 3rem below 900px | Header to first content, every page |

**Breakpoint:** 900px everywhere. Media queries can't read variables, so the number is repeated in each stylesheet. Below it, `--grid-columns` becomes 1 and every block spans the full width.

### Motion and Depth

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Card hover, lightbox |
| `--duration-fast` | 0.2s | Link color |
| `--duration-base` | 0.3s | Lightbox fade |
| `--duration-slow` | 0.5s | Card hover, lightbox scale |
| `--shadow-lift` | `0 8px 28px rgba(0, 0, 0, 0.1)` | Card hover |
| `--shadow-soft` | `0 8px 28px rgba(0, 0, 0, 0.05)` | The case study intro over the grey below it |

Page transitions keep their own curves and timings in `global.css`, since nothing else uses them.

## Layout

### Columns

```
| 1   2   3   4 | 5   6   7   8 | 9   10  11 | 12 |
| title, side   | media or prose             |    |
| point         | point         | point           |
```

Three groups of four. Titles and side text take the first group. Media and prose span the second and third, stopping at column 11. `.section-tri-col` puts one block in each group.

| Class | Columns | Use |
|---|---|---|
| `.section-title` | 1 to 4 | Section heading |
| `.col-text` | 1 to 4 | Text beside media |
| `.col-media` | 5 to 11 | Full width media |
| `.col-prose` | 5 to 11 | Long-form text |
| `.col-media--inset` | 5 to 11 | Media matched to prose width |
| `.col-media--narrow` | 5 to 9 | Tall media, like a long screenshot |
| `.section-col-left` | 5 to 8 | Paired text, left |
| `.section-col-right` | 9 to 12 | Paired text, right |
| `.section-tri-col` | 1 to 12 | Three 4-column blocks |
| `.section-duo-col` | 5 to 12 | Two 4-column blocks |

`.section-tri-col`, `.section-duo-col`, the site header links and the case study links use CSS subgrid, so their columns are the page's own columns.

### Site Header

On every page. Name in columns 1 to 4, links starting at columns 8, 9, 10 and 11. Not sticky. On the home page the name sits in the sticky sidebar instead, and the links sit in the grid's first row.

### Home Page

- Sidebar, columns 1 to 3: name, "About", bio, portrait. Sticky when it fits the window, and the portrait sits on the bottom page margin. When it doesn't fit, the script in `index.html` lets it scroll.
- Work, columns 5 to 11: "Case Studies", then case study cards with 16:9 images. Each card is title, description, then tags. Cards are spaced, not divided.
- "About" and "Case Studies" take no height, so the bio and the first image start `--content-offset` below the header, the same line as a case study's title and hero.

### Case Study Intro

| Element | Columns | Row |
|---|---|---|
| `.case-study__aside`: title, tags, objective, overview | 1 to 4 | 1 |
| `.case-study__hero`: 16:9 image | 5 to 11 | 1 |
| `.case-study__contents`: contents list | 1 to 4 | 2 |
| `.case-study__links`: links, then recognitions | 5 to 12, one group every 4 columns | 2 |

The hero is always 16:9 and matches the image on the home page card. Contents and links share a row, so their tops line up.

### Case Study Sections

Each section is `<section class="section--bordered case-study-section">` with a `.container` and a `.case-study__layout` grid inside. The title takes columns 1 to 4. Content uses a column class from the table above.

Everything below the intro sits on `--color-bg-subtle`, and the white intro casts `--shadow-soft` onto it. A divider separates each section from the next, except the first, where the change from white to grey already does that job.

Text blocks:

| Class | Use |
|---|---|
| `.section-body` | Body text styling for its paragraphs |
| `.section-body--stacked` | Space between several paragraphs |
| `.section-point` | A titled block: h3 and a paragraph |

### Example Cards

A summary up top, then three examples beneath it. Used in Summit's Background and Clustr's In Practice.

```html
<div class="col-prose section-body"><p>Summary of what the examples show.</p></div>

<div class="section-tri-col example-cards">
    <div class="section-body">
        <div class="example-card__image"><img src="..." alt="..."></div>
        <h3 class="example-card__label">Label</h3>
        <p>One specific example.</p>
    </div>
    <!-- two more cards -->
</div>
```

The summary sits beside the section title. Each card's text is a direct example of the summary, not a repeat of it.

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

### Shared Helpers

| Class | Use |
|---|---|
| `.img--outlined` | Thin grey edge for images with white backgrounds |
| `.link-external` | Adds a ↗ arrow. Links under a case study hero get it automatically |
| `.link--disabled` | Struck through and unclickable, for links that aren't live yet |

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

### Copy

- Straight apostrophes: `don't`, not `don’t`.
- Case study names keep their capitals everywhere, including page titles and alt text: Clustr, ViGOR, ZipVote.
- No em dashes and no middle dots. Tags use a comma: `Computer Vision & UX Prototyping, 2026`. Page titles use a pipe: `Clustr | Patrick K. Nguyen`.

### Before Adding a Rule

1. Is there a token for this value? Use it.
2. Is it text? Use or extend a type style in `global.css`.
3. Does a shared class already do this? Use it.
4. Will a second case study need it? Put it in `case-studies.css`.
5. Only then add it to that case study's stylesheet.

## Adding a Case Study

1. Copy an existing case study folder and rename it.
2. Replace the intro: title, tags, objective, overview, 16:9 hero, contents list, links.
3. Build sections with `.section-title` and the column classes.
4. Add a case study card to `index.html` using the same hero image.
5. Add `.img--outlined` to any image with a white background.
6. Only add a case study stylesheet if it needs one-offs.

## Cache Busting

Stylesheet links end in `?v=N`. Increase N when a stylesheet changes, so browsers load the new version instead of a cached one.

## Interactions

- Links fade color on hover over 0.2s.
- Case study cards lift on hover: the image grows to 101.5% and gains a soft shadow over 0.5s.
- Moving between pages, the old page lifts and wipes away over 0.4s, then the new one rises in over 0.6s. Browsers without cross-page view transitions load normally.
- The lightbox fades in over 0.3s while the image grows from 94% into place. Transparent images get a white backing so dark text stays readable. Click or press Escape to close, and use the arrow keys to step through images.
- With Reduce Motion on, the page transition and lightbox scale are off.
- Selected text inverts: background color on text color.
