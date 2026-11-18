import { clustrPage } from "@/content/clustr";
import { summitPage } from "@/content/summit";
import { vigorPage } from "@/content/vigor";
import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "vigor",
    href: "/vigor/",
    title: "ViGOR: Video-Generated Operative Reporting",
    description: "Drafting operative notes from surgical video instead of the surgeon's memory.",
    meta: "AI Product Design & 0→1, 2026",
    image: "/home/vigor-hero.png",
    alt: "ViGOR wordmark over a da Vinci robotic surgical instrument",
    page: vigorPage,
  },
  {
    slug: "clustr",
    href: "/clustr/",
    title: "Clustr",
    description: "Putting words to the patterns hiding in a messy moodboard.",
    meta: "AI Product Design & UX Prototyping, 2026",
    image: "/home/clustr-hero.png",
    alt: "Clustr image clustering prototype",
    outlined: true,
    page: clustrPage,
  },
  {
    slug: "zipvote",
    href: "/zipvote/",
    title: "ZipVote (WIP)",
    description: "Making local elections less intimidating for first-time voters.",
    meta: "Information & Web Design, 2026",
    image: "/home/zipvote-hero.png",
    alt: "ZipVote voter matching tool",
  },
  {
    slug: "summit",
    href: "/summit/",
    title: "Summit Media Center",
    description: "Reimagining how K-12 students learn, starting from how they create.",
    meta: "Design Thinking & UX Prototyping, 2020",
    image: "/home/summit-hero.png",
    alt: "Summit Media Center project",
    page: summitPage,
  },
];