# patrick k. nguyen

Portfolio of Patrick K. Nguyen. Next.js, React, Tailwind CSS and TypeScript, built to static pages. Type is Geist and Geist Mono.

## Run Locally

```
npm install
npm run dev
```

Open http://localhost:3000. Restart the dev server after changing tokens or utilities in `globals.css`; it doesn't always pick them up.

| Command | Use |
|---|---|
| `npm run build` | Production build |
| `npm run start` | Serves the build. Judge motion here, since dev adds loading time to every page transition. |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Files

```
app/globals.css           The design system: tokens, type styles, transitions, print rules. Every page.
app/layout.tsx            Fonts, metadata, page transitions. Every page.
app/page.tsx              Home page, including the About copy
app/[slug]/page.tsx       Case study template, one static page per case study
app/resume/page.tsx       Resume
app/not-found.tsx         404
app/icon.svg              Favicon
components/               Shared components
content/{slug}.ts         One file per case study: vigor, clustr, summit
content/resume.ts         Resume copy, mirrored from the master
lib/case-studies.ts       Home page cards, and which case studies have pages
lib/links.ts              Links in the header and home page
lib/types.ts              The shape of every content file
public/{page}/            Images and video, one folder per page
```

## Principles

1. **Tokens first.** Every color, the type size, the page margin, the gutter and the breakpoint are tokens in `@theme` in `globals.css`, and Tailwind turns each into classes like `text-muted-foreground` and `px-page`. Other values come from Tailwind's default scale. Bracketed values like `max-w-[8.5in]` are for one-offs. When one repeats, it becomes a token.
2. **Type in one place.** Every text style is a utility in `globals.css`. Components apply it rather than combining size, weight and tracking classes themselves. The resume is the one exception, since it matches the master's point sizes.
3. **One grid, read in thirds.** Every page sits on the same 12-column grid with the same gutter, so columns line up across pages. The 12 columns are used as three groups of four, so content starts at column 1, 5 or 9. The deliberate exceptions: links start at column 8, heroes, media and prose stop at column 11, and the home bio and case study abstract take only columns 1 to 3, so they don't crowd what's beside them.
4. **Copy apart from layout.** Copy lives in `content/` and `lib/`. Components hold layout and fixed labels only, like "Project Objective." The home page About is the exception, since it's written once.
5. **Top edges align.** Titles and the site name are trimmed to their capitals, so their visible top meets the top of the image beside them, and the first content on every page starts the same distance below the top margin.
6. **Mobile first.** Unprefixed classes are the phone layout, and `desktop:` adds the grid at 900px and up.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `background` | `#fff` | Page, case study intro, resume sheet |
| `foreground` | `#0a0a0a` | Body text, headings, links |
| `muted` | `#f5f5f5` | Case study sections below the intro |
| `muted-foreground` | `#737373` | Labels, captions, footnotes, resume rules, image outlines. At 50% for section dividers. |
| `border` | `#e5e5e5` | Video placeholder |

Values are written in oklch in `:root`; the hex here is for reference. Contrast: `muted-foreground` is 4.7:1 on white and 4.3:1 on `muted`, so captions on the grey sections fall just under WCAG AA for body-size text.

### Type

Fonts: Geist (`font-sans`) for everything, Geist Mono (`font-mono`) for labels. Both load through `next/font`, so there's no flash of a fallback.

| Token | Value | Use |
|---|---|---|
| `text-body` | 15px on a 24px line | All text except labels. Set on `body`, so most text inherits it. |
| `text-xs` | 12px, Tailwind default | Labels |

| Weight | Value | Use |
|---|---|---|
| `font-normal` | 400 | Body text and titles |
| `font-medium` | 500 | Labels, card labels in sections |
| `font-semibold` | 600 | Subheads |

### Type Styles

Defined as utilities in `globals.css`. To restyle a kind of text, change it there.

| Style | Spec | Where |
|---|---|---|
| `site-name` | body, regular, lowercase, wide tracking, trimmed | "patrick k. nguyen" |
| `display-title` | body, regular, wide tracking, trimmed | Case study titles, 404 |
| `section-title` | body, regular, wide tracking | Numbered section titles |
| `subhead` | body, semibold | Home card titles, abstract headings, points within sections |
| `meta-label` | xs mono, medium, uppercase, wider tracking, grey | Tags, "Contents", "Links", "Recognitions", resume headings |
| Body | body, regular | Everything else |
| Caption | body, `text-muted-foreground` | Figure and equation captions |

### Spacing

Tailwind's 0.25rem scale. The steps that recur:

| Class | Size | Use |
|---|---|---|
| `gap-8` | 2rem | Between stacked blocks, and the mobile page margin as `px-8` |
| `gap-12` | 3rem | Between home page cards |
| `pb-16` | 4rem | Bottom of each case study section |
| `mt-2`, `mb-2` | 0.5rem | Heading to its text |
| `mt-4` | 1rem | Media to its caption |

### Grid and Page

| Token | Value | Use |
|---|---|---|
| Columns | 12, or one stack below 900px | `grid-cols-12` |
| `gutter` | 3rem | Space between columns, `gap-x-gutter` |
| `page` | 3rem, or 2rem below 900px | Page edges, `px-page`, `pt-page`, and the sticky offset `top-page` |
| Header row | 1.5rem | `min-h-6` in the header, `grid-rows-[1.5rem_auto]` on the home page |
| Content offset | 6rem | Top margin to the first content, every page |

The gutter matches the page margin, so change both together. Making the gutter much larger than 3rem squeezes the 12 columns below what the narrow blocks need.

**Breakpoint:** `desktop`, 56.25rem or 900px. Below it, every page is one column with `gap-8` between blocks.

### Motion and Depth

| Value | Use |
|---|---|
| `cubic-bezier(0.16, 1, 0.3, 1)`, 0.45s | Lightbox morph |
| `ease-out`, 0.5s | Card hover |
| `shadow-xl` | Card hover |
| `0 8px 28px rgb(0 0 0 / 0.05)` | The case study intro over the grey below it, and the resume sheet |

Page transitions keep their own curves and timings in `globals.css`, since nothing else uses them.

## Layout

### Columns

```
| 1   2   3   4 | 5   6   7   8 | 9   10  11 | 12 |
| title, side   | media or prose             |    |
| point         | point         | point           |
```

Three groups of four. Titles and side text take the first group. Media and prose span the second and third, stopping at column 11. A `columns` block puts one point in each group.

| Area | Columns |
|---|---|
| Section title, text beside media, Contents | 1 to 4 |
| Home bio, case study abstract | 1 to 3 |
| Hero, home cards, wide media, prose | 5 to 11 |
| Narrow media | 5 to 9 |
| Feature media | 2 to 11 |
| Links and Recognitions, cards beside a title | 5 to 12, one group every 4 columns |
| Header and home links | 8 to 11, one per column |

Rows that place children on the page's columns use `grid-cols-subgrid`. Set only `gap-y-*` on a subgrid: a plain `gap-*` overrides the gutter it would inherit.

### Site Header

On every page but the home page. Name in columns 1 to 4, links starting at columns 8, 9, 10 and 11. Not sticky. Its row is held at 1.5rem so content below it lines up with the home page.

### Home Page

- Sidebar, columns 1 to 3: name, bio, portrait. Sticky, and at least the window's height, so the portrait sits on the bottom page margin.
- Links, columns 8 to 11, in the first row.
- Work, columns 5 to 11: case study cards with 16:9 images. Each card is title, tags, then description. Cards are spaced, not divided.
- The bio and the first image start 6rem below the top margin, the same line as a case study's title and hero.

### Case Study Intro

| Element | Columns | Row |
|---|---|---|
| Abstract: title, tags, objective, overview | 1 to 3 | 1 |
| Hero, 16:9 | 5 to 11 | 1 |
| Contents | 1 to 4 | 2 |
| Links, then Recognitions | 5 to 12 | 2 |

The hero matches the home page card unless the page sets `heroImage`. Contents and links share a row, so their tops line up.

### Case Study Sections

Each section is a list of blocks on the `muted` background, and the white intro casts its shadow onto it. A divider separates each section from the next, except the first, where the change from white to grey already does that job. Sections without a title are left unnumbered and out of Contents. Every image and video in the sections opens in the lightbox.

| Block | Layout |
|---|---|
| `columns` | Points with subheads, one per group of four |
| `split` | Points in columns 1 to 4, a figure in 5 to 11, or 5 to 9 with `narrow` |
| `prose` | Paragraphs in 5 to 11, beside the title when it comes first |
| `cards` | Images with centered labels, 4 columns each or 7 with `wide`. `crop` trims images to 16:9. `besideTitle` sets them in columns 5 to 12 of the title's row. |
| `feature` | One wide figure in 2 to 11 with a centered caption |

A point's subhead and a card's text are optional, and a point can end with an equation.

### Example Cards

A summary beside the section title, then three examples beneath it. Used in Summit's Background and Clustr's In Practice.

```ts
{ type: "prose", body: ["Summary of what the examples show."] },
{
  type: "cards",
  cards: [
    { label: "Label", body: "One specific example.", image: { src: "...", alt: "...", width: 1600, height: 900 } },
    // two more cards
  ],
},
```

Each card's text is a direct example of the summary, not a repeat of it.

### Figures

```ts
{
  src: "/clustr/clustr-demo.mp4",
  kind: "video",
  poster: "/clustr/clustr-demo-poster.jpg",
  alt: "What the video shows",
  width: 1600,
  height: 852,
  caption: "What the reader should notice.",
}
```

- Videos play like GIFs: muted, looping and without controls. The lightbox adds controls.
- `captionHref` turns a caption into an external link.
- Set `width` and `height` to the file's real size, so the page doesn't jump as media loads.
- Captions say what to notice, not what the image is.

### Shared Helpers

| Name | Use |
|---|---|
| `outlined` | Thin grey edge for images with white backgrounds. Set `outlined` on a case study to apply it to its card and hero. |
| `ExternalLink` | Opens in a new tab and ends with an arrow. Set `external` on an entry in `lib/links.ts` to use it there. |
| `Equation` | TeX rendered to HTML at build time, with a caption |

## Writing Code

### Naming

- **Files** are kebab-case and named for their component: `case-study-card.tsx` exports `CaseStudyCard`.
- **Type styles** are named for the kind of text, not how it looks: `meta-label`, not `small-grey-mono`.
- **Content files** are named for the slug and export `{slug}Page`, like `clustrPage`.
- **Images** go in `public/{page}/` with kebab-case names.

### Classes

- Write every class in full. Tailwind finds classes by reading files as plain text, so a class built from pieces, like `` `col-span-${n}` ``, is never generated. Choose between complete strings instead.
- Use `cn` to add a class conditionally.
- Links underline on hover with a 4px offset. They don't fade.

### Comments

**1. No file headers or section dividers.** The file name and the component name already say what a file is.

**2. Comments explain why, never what.** If the code already says it, there's no comment.

```ts
// An icon rather than the ↗ character, which rises above Geist's capitals
export function ExternalLink(...)
```

**3. A comment sits on the line above what it explains.** Use `//` in TypeScript and `/* */` in CSS.

### Copy

- Straight quotes and apostrophes: `don't`, not `don’t`. In JSX, write them as `&apos;` and `&quot;`.
- Case study names keep their capitals everywhere, including alt text: Clustr, ViGOR, ZipVote.
- No em dashes and no middle dots. Tags use a comma: `AI Product Design & UX Prototyping, 2026`.

### Before Adding a Class

1. Is there a token for this value? Use its class.
2. Is it text? Use or extend a type style in `globals.css`.
3. Does a component or block already do this? Use it.
4. Will a second page need it? Make it a component, or a block type in `lib/types.ts`.
5. Only then write it inline.

## Adding a Case Study

1. Add its images and video to `public/{slug}/`, only the files the page uses.
2. Write `content/{slug}.ts` exporting a `CaseStudyPage`: title, objective, overview, links, sections. Separate paragraphs in the objective and overview with a blank line, `\n\n`. Wrap TeX in `String.raw`.
3. Build sections from the blocks above.
4. Add an entry to `lib/case-studies.ts` with its slug, card copy and 16:9 image, and set `page`.
5. Set `outlined` if the hero has a white background.
6. Run `npx tsc --noEmit` and `npm run lint`, then check the page at desktop and phone widths.

A case study without `page` still shows on the home page, but its card leads to the 404.

## Resume

`content/resume.ts` mirrors the master at `lock-in/Resume/Resume_PNguyen_2026.html`. Edit the master first, then copy the changes here. The page is a letter-size sheet in point sizes, so printing it gives the same one-page PDF as the master. The `sheet:` variant applies to desktop screens and to print.

## Caching

Next.js fingerprints CSS and JavaScript on every build, so there's no version number to bump. Files in `public/` keep their names, so give a replaced image a new name.

## Interactions

- Links underline on hover.
- Case study cards lift on hover: the image grows to 101.5% and gains a shadow over 0.5s, and the title underlines.
- Moving between pages, the old page fades and lifts 12px over 0.35s, then the new one rises 48px into place over 0.55s. Links that open a new tab skip it, and browsers without view transitions load normally.
- The lightbox grows the clicked image from its place on the page to the center over 0.45s, over a light blur. The arrows and arrow keys step through images instantly. Click outside or press Escape to close, and the image shrinks back into place.
- Contents links scroll smoothly. Moving between pages doesn't.
- With Reduce Motion on, the page transition, lightbox morph and smooth scrolling are off.
- Selected text inverts: background color on text color.
- The scrollbar is hidden. A visible track can't match both the white and grey bands, and hiding it keeps the page from shifting when the lightbox locks scrolling.
- The custom 404 replaces Next's default, which injects global styles that turn the page black in dark mode.
