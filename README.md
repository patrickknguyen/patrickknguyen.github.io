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

- **Font stack:** System — SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif
- **Base size:** 16px
- **Line height:** 1.6 (body), 1.1 (headings), 1.5 (project body text)

| Role              | Size         | Weight | Notes                                |
|-------------------|--------------|--------|--------------------------------------|
| Site title        | clamp(2.02rem, 4.3vw, 3.24rem) | 300 | Lowercase, tight letter-spacing |
| Section heading   | 1.25rem      | 500    | Used for project titles, section h2s |
| Subheading / label| 0.875rem     | 500    | Section labels, h3s in content       |
| Body text         | 1rem         | 300    | Line-height 1.6                      |
| Meta / caption    | 0.8125rem    | —      | Secondary color                      |
| Stat number       | 3.5rem       | 300    | Tight line-height (1), -0.02em tracking |

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

- **Grid:** 12-column with `--space-md` (2rem) gap
- **Max width:** 1800px
- **Container padding:** `clamp(2rem, 8vw, 10rem)` (fluid)
- **Breakpoint:** 768px — grid collapses to single column

### Grid Column Conventions (Project Pages)

All project sections use a 12-column grid with a consistent title region in columns 1–4.

| Layout pattern    | Title cols | Content cols         | Example                    |
|-------------------|------------|----------------------|----------------------------|
| Title + single    | 1–4        | 5–12 (8 cols)        | Pipeline section           |
| Title + double    | 1–4        | 5–8, 9–12 (4+4)     | Dataset, Model sections    |
| Title + text + stat| 1–4       | 5–10 (6 cols), 11–12 | Background & Motivation    |
| Intro layout      | 1–4        | 5–7, 8–10, 11–12    | Project intro (obj/overview/links) |

### CSS Architecture

```
global.css          Shared design tokens, reset, header, footer, section base
home.css            Homepage: hero, about, work grid, project cards
projects.css        Shared project page: intro layout, title, toc, objective, overview, links
vigor/vigor.css     ViGOR-specific section layouts
zipvote/zipvote.css ZipVote-specific section layouts
```

### Naming Conventions

- **BEM-style:** `block__element` (e.g. `header__nav`, `project-card__img`)
- **Project-specific prefixes:** `vigor-*`, `zipvote-*` for per-project layouts
- **Layout suffix:** `-layout` for grid containers (e.g. `vigor-pipeline-layout`)
- **Content items:** Descriptive suffixes like `-point` (e.g. `pipeline-point`, `problem-point`)

### Interactions

- Link hover: `color` transition, 0.2s ease
- Project card hover: `scale(1.03)` + `brightness(0.92)`, 0.4s ease
- Scroll behavior: `smooth`
- Text selection: inverted (light text on dark background)
