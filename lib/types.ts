export type Media = {
  kind?: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
  poster?: string;
};

export type Figure = Media & {
  caption?: string;
  captionHref?: string;
  narrow?: boolean;
};

export type Equation = { tex: string; caption: string };

export type Point = { heading?: string; body: string[]; equation?: Equation };

export type Card = { label: string; body?: string; image: Media; wide?: boolean };

// Layouts are described in README.md
export type Block =
  | { type: "columns"; points: Point[] }
  | { type: "split"; points: Point[]; figure: Figure }
  | { type: "prose"; body: string[] }
  | { type: "cards"; cards: Card[]; crop?: boolean; besideTitle?: boolean }
  | { type: "feature"; figure: Figure };

// Untitled sections are unnumbered and left out of Contents
export type Section = { id?: string; title?: string; blocks: Block[] };

export type LinkItem = { label: string; href?: string };

export type CaseStudyPage = {
  title: string;
  objective: string;
  overview: string;
  heroImage?: string;
  heroAlt?: string;
  sections: Section[];
  links: LinkItem[];
  recognitions?: LinkItem[];
  footnote?: string;
};

export type CaseStudy = {
  slug: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  alt: string;
  outlined?: boolean;
  page?: CaseStudyPage;
};
