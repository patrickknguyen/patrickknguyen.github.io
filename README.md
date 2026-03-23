# patrickknguyen.github.io

## Style Guide (Draft)

### Color Tokens

| Token                    | Value     | Usage                          |
|--------------------------|-----------|--------------------------------|
| `--color-bg`             | `#f5f4f0` | Page background (warm beige)   |
| `--color-text`           | `#1a1a1a` | Primary text                   |
| `--color-text-secondary` | `#555`    | Captions, labels, meta text    |
| `--color-border`         | `#d4d4d0` | Section dividers, rule lines   |
| `--color-accent`         | `#1a1a1a` | Accent (currently matches text)|
| `--color-link-hover`     | `#666`    | Link hover state               |

### Typography

- **Font stack:** System — SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif (`--font-body`)
- **Base size:** 16px (`html`)
- **Line height:** 1.5 (body & all content), 0.9 (site title only)

### Font Size Tokens

Defined in `:root` in `global.css`. All font sizes across the site reference these tokens — no hardcoded `rem` values in component CSS.

| Token          | Value                            | Usage                                |
|----------------|----------------------------------|--------------------------------------|
| `--font-xs`    | 0.8125rem                        | Meta, captions, link labels, compact subsection body & headings |
| `--font-sm`    | 0.875rem                         | Nav links, TOC, subheadings (h3), section labels |
| `--font-md`    | 1rem                             | Body text, project card titles       |
| `--font-lg`    | 1.25rem                          | Section headings (h2), about text    |
| `--font-xl`    | clamp(2.02rem, 4.3vw, 3.24rem)  | Site title (fluid)                   |

### Global Element Defaults (set in `global.css`)

Base styles for `h2` and `h3` are set once globally. Project-specific CSS should **never** re-declare these — only add overrides where the design intentionally deviates.

| Element | Size        | Weight | Other                  |
|---------|-------------|--------|------------------------|
| `h2`    | `--font-lg` | 500    | —                      |
| `h3`    | `--font-sm` | 500    | `margin-bottom: 0.5rem`|

**Current overrides:**
- `.project__links h3` — `--font-xs`, weight 400, no margin (lighter treatment for sidebar)
- `.section-point--xs h3` — `--font-xs`, `margin-bottom: 0.25rem` (compact subsection headings)

### Spacing Scale

| Token          | Value   |
|----------------|---------|
| `--space-xs`   | 0.5rem  |
| `--space-sm`   | 1rem    |
| `--space-md`   | 2rem    |
| `--space-lg`   | 4rem    |
| `--space-xl`   | 6rem    |
| `--space-2xl`  | 10rem   |

### Layout

- **Grid:** 12-column, `repeat(12, minmax(0, 1fr))`, `--space-md` (2rem) gap
- **Max width:** 1800px (`--max-width`)
- **Container padding:** `clamp(2rem, 8vw, 10rem)` (fluid)
- **Breakpoint:** 768px — grids collapse to single column
- **Grid container:** `.project__layout` provides the 12-column grid with `align-items: start`
- **Grid children:** All direct children of grid containers get `min-width: 0` (prevents blowout)

### Reusable Section Building Blocks (defined in `projects.css`)

Content sections are composed by combining these shared classes in HTML. Project-specific CSS should **only** define non-standard column widths.

| Class                    | Purpose                                              |
|--------------------------|------------------------------------------------------|
| `.section-title`         | Section heading container — grid cols 1–4            |
| `.section-body`          | Prose styling on child `p` (font-md, weight 300, 1.5)|
| `.section-body--stacked` | Adds `margin-bottom: --space-md` between `p` tags    |
| `.section-body--xs`      | Compact prose variant (`--font-xs`, weight 300, 1.5) |
| `.section-point`         | Titled content block (h3 + p), `margin-bottom: 2rem` |
| `.section-point--xs`     | Compact variant of section-point (`margin-bottom: 1rem`, `--font-xs` heading) |
| `.section-col-left`      | Left content column — grid cols 5–8                  |
| `.section-col-right`     | Right content column — grid cols 9–12                |
| `.section-tri-col`       | 3-column subsection grid — full 12 cols, `repeat(3, 1fr)`, `--space-lg` gap |

#### Link States (inside `.project__links`)

| Class             | Behavior                                                |
|-------------------|---------------------------------------------------------|
| (default `a`)     | `--font-sm`, weight 300, `--color-text-secondary`, arrow `↗` via `::after` |
| `.link--disabled`  | `text-decoration: line-through`, `pointer-events: none`, no arrow — for links with no URL yet |

#### Intro Section (one-off, also in `projects.css`)

The project intro uses its own classes (not the shared section blocks):

| Class                | Cols   | Purpose                        |
|----------------------|--------|--------------------------------|
| `.project__title`    | 1–4    | Project name, meta, TOC        |
| `.project__objective`| 5–7    | Objective blurb                |
| `.project__overview` | 8–10   | Overview blurb                 |
| `.project__links`    | 11–12  | External links sidebar         |

### Layout Patterns

All content sections sit inside a `.project__layout` grid. The section title always occupies cols 1–4. Content area varies:

| Pattern              | Content columns                              | Example section          |
|----------------------|----------------------------------------------|--------------------------|
| Title + double       | `.section-col-left` (5–8) + `.section-col-right` (9–12) | Dataset, Architecture |
| Title + wide single  | Custom class for cols 5–12 or 5–10           | VL Architecture (8 cols) |
| Title + tri-col      | `.section-tri-col` (1–12, 3 × 4-col children) | Background, Data Pipeline, User Experience |

**ViGOR-specific column overrides** (in `vigor/vigor.css`):
- `.vigor-architecture__text` — `grid-column: 5 / span 7`

**ZipVote-specific overrides** (in `zipvote/zipvote.css`):
- `.zipvote-section__text` — `grid-column: 5 / span 7`
- `.zipvote-ux-image img` — `aspect-ratio: 16/9`, `object-fit: cover` (auto-crops images)
- `.zipvote-ux-label` — centered label beneath each UX image
- `.section-body--xs` — `--font-xs` body text for compact UX card descriptions
- `.section-point--xs` — compact subsection headings (`--font-xs`, tighter margin)

### Lightbox (shared, `lightbox.js` + styles in `projects.css`)

A click-to-expand overlay for project images. Include `<script src="../lightbox.js"></script>` before `</body>` on any project page.

- Automatically targets all `<img>` inside `.project-section` elements
- Click image → opens in centered overlay with dark backdrop (85% opacity)
- Click anywhere or press `Escape` → closes
- Adds `cursor: zoom-in` on images, `cursor: zoom-out` on overlay
- Fade transition: 0.25s ease

### CSS Architecture

```
global.css            Design tokens (:root), reset, base element styles (h2, h3, a, body),
                      header, footer, section borders, responsive breakpoints
home.css              Homepage: hero portrait, about layout, work grid, project cards
projects.css          Shared project page: intro layout, reusable section building blocks
                      (section-title, section-body, section-col-*, section-tri-col, section-point),
                      link states (link--disabled), lightbox overlay
lightbox.js           Shared click-to-expand image viewer for all project pages
vigor/vigor.css       ViGOR-only overrides — 1 rule for non-standard column width
zipvote/zipvote.css   ZipVote-only overrides — UX card image/label/body styles
```

**Load order** (each project page): `global.css` → `projects.css` → `{project}.css` → `lightbox.js`

**Cache busting:** CSS `<link>` tags use `?v=N` query strings (increment on deploy).

### Naming Conventions

- **BEM-style:** `block__element` for scoped components (e.g. `header__nav`, `project-card__img`, `project__links`)
- **Shared section classes:** Unprefixed, composable across all projects (e.g. `section-title`, `section-body`, `section-point`, `section-tri-col`)
- **Project-specific prefixes:** `vigor-*`, `zipvote-*` — only for column-width overrides that differ from shared defaults
- **Modifier syntax:** `--` suffix for variants (e.g. `section-body--stacked`, `section-body--xs`, `section-point--xs`, `section--bordered`)

### Interactions

- Link hover: `color` transition, 0.2s ease
- Project card hover: `scale(1.03)` + `brightness(0.92)`, 0.4s ease
- Scroll behavior: `smooth`
- Text selection: inverted (`--color-bg` text on `--color-text` background)
- Image lightbox: click to expand, click/Escape to dismiss
