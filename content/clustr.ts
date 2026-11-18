import type { CaseStudyPage } from "@/lib/types";

export const clustrPage: CaseStudyPage = {
  title: "Clustr",
  objective:
    "My moodboards get messy quickly. Often I can feel a direction forming but find it hard to verbalize it. I wanted to use computer vision to bring these patterns to the surface, while keeping the experience playful.",
  overview:
    "Clustr is a prototype that sorts a collection of images into labeled groups. It pairs two different vision models, CLIP and DINO, letting the user blend grouping by subject with grouping by look to suit their boards.",
  links: [
    { label: "Demo", href: "https://patrickknguyen.github.io/clustr-app/" },
    { label: "GitHub Repo", href: "https://github.com/patrickknguyen/clustr-app" },
    { label: "Unsplash Dataset", href: "https://github.com/unsplash/datasets" },
  ],
  sections: [
    {
      blocks: [
        {
          type: "feature",
          figure: {
            kind: "video",
            src: "/clustr/clustr-demo.mp4",
            poster: "/clustr/clustr-demo-poster.jpg",
            width: 1600,
            height: 852,
            alt: "Screen recording of Clustr embedding a set of reference images and re-clustering the layout as the semantic–aesthetic slider is dragged.",
            caption: "Try the Clustr demo",
            captionHref: "https://patrickknguyen.github.io/clustr-app/",
          },
        },
      ],
    },
    {
      id: "problem",
      title: "Problem & Approach",
      blocks: [
        {
          type: "columns",
          points: [
            {
              heading: "Reading Messy Boards",
              body: [
                "A moodboard is meant to point toward a direction. Reading it means grouping the images that belong together and finding words for what they share, work that usually happens in the designer's head. I wanted to build something that helps designers see and name the patterns in their boards without taking the decision away from them.",
              ],
            },
            {
              heading: "Suggestive, Not Definitive",
              body: [
                "Computer vision is often pictured in high-stakes settings like surveillance, where it is judged on accuracy. I wanted to use it as part of my creative process instead. So I designed for suggestion rather than certainty: even when a grouping isn't perfect, it gives me something to react to, and the final call stays with the user.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "practice",
      title: "In Practice",
      blocks: [
        {
          type: "prose",
          body: [
            `To test Clustr, I loaded a sample board: Unsplash's "Architecture" collection, 40 images that say little beyond architecture when unsorted. Sliding from subject to look kept the same two groups but changed how they were described. Together, the two views told me the board was mostly Mid-Century Modern interiors and Brutalist exteriors, something I wouldn't have put into words from the unsorted collection.`,
          ],
        },
        {
          type: "cards",
          crop: true,
          cards: [
            {
              label: "Library",
              body: `Unsorted, the 40 images read as a wall of buildings and rooms with no clear direction. Clustr names the whole board from the words every image shares: "Indoors, Condo."`,
              image: {
                src: "/clustr/inpractice-1.jpg",
                alt: "Uploaded photo library of mixed interior and exterior architecture images, before clustering",
                width: 1800,
                height: 1012,
              },
            },
            {
              label: "By Subject",
              body: `At α = 0, using only CLIP, the board splits into interiors and exteriors, labeled "furniture, home decor, flooring" and "building, metropolis, high rise."`,
              image: {
                src: "/clustr/inpractice-2-crop.png",
                alt: "Clustr map at alpha 0.00, semantic, split into an exterior cluster and an interior cluster",
                width: 1864,
                height: 969,
              },
            },
            {
              label: "By Look",
              body: `At α = 1, using only DINO, the groups barely change, but their positions and labels do: "warm, rustic" on one side and "concrete, symmetrical, geometric" on the other.`,
              image: {
                src: "/clustr/inpractice-3-crop.png",
                alt: "Clustr map at alpha 1.00, aesthetic, relabeling the exterior cluster concrete symmetrical geometric and the interior cluster warm rustic",
                width: 1864,
                height: 969,
              },
            },
          ],
        },
      ],
    },
    {
      id: "decisions",
      title: "Key Design Decisions",
      blocks: [
        {
          type: "columns",
          points: [
            {
              heading: "Watching It Sort",
              body: [
                "I started from one image in my head: a pile of references rearranging itself into groups. Everything else was worked backward from that moment. Clustr shows its grouping as motion, with images moving across the map into their clusters and moving again as the slider is dragged. Watching images travel makes the result feel like a suggestion to question, not a verdict.",
              ],
            },
            {
              heading: "Putting the User in Control",
              body: [
                "There is no single right way to read a moodboard, so instead of picking one, I gave the user a slider. One end groups by subject with CLIP, the other groups by look with DINO, and anywhere between blends the two. The goal isn't the best clustering. It's letting someone explore until a grouping is useful. Making the slider feel even took one fix: the two models measure distance on different scales, so each board is rescaled before blending.",
              ],
              equation: {
                tex: String.raw`\begin{aligned} &d_{\alpha} = \sqrt{(1 - \alpha)\, d_{\text{CLIP}}^{2} + \alpha\, \lambda^{2} d_{\text{DINO}}^{2}} \\[6pt] &\text{where } \lambda = \frac{\sigma(d_{\text{CLIP}})}{\sigma(d_{\text{DINO}})} \end{aligned}`,
                caption:
                  "d is the distance between two images and σ is the standard deviation of those distances. λ rescales DINO's distances to match CLIP's spread, so the slider α blends the two evenly.",
              },
            },
            {
              heading: "Finding the Right Words",
              body: [
                "Labels come from Unsplash's public image tags. I kept the top 400, the point where they stayed useful before getting noisy, and generated 66 adjectives to go with them, since the tags are almost all nouns and the look end of the slider needed words too. The words that fit every image name the board itself. Each group then favors words that describe it but not the others, like TF-IDF. Left alone, that can invent differences that aren't there, so a word must also clear a minimum match to its group.",
              ],
              equation: {
                tex: String.raw`\begin{aligned} &\mathrm{score}(w, c) = s(w, c) - \frac{1}{K}\sum_{k=1}^{K} s(w, k) \\ &\text{where } s(w, c) \geq 0.9 \cdot \max_{w'} s(w', c) \end{aligned}`,
                caption:
                  "s is the cosine similarity between a word and the cluster's center. A word scores higher the more it beats its average fit across all K clusters, within 90% of the cluster's best match.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "outcomes",
      title: "Outcomes & Learnings",
      blocks: [
        {
          type: "columns",
          points: [
            {
              heading: "Results",
              body: [
                "Clustr is a working prototype I designed and built end to end, from the scoring math to the interface. It blends two vision models on a single slider, names a board and each of its groups, and re-sorts them as you watch. It showed how much room moodboard tools have for playful interactions built using computer vision.",
              ],
            },
            {
              heading: "Limitations",
              body: [
                "Vocabulary is the biggest limit. Unsplash's tags were the most accessible source, not the most useful, and a richer vocabulary would make the labels far more meaningful. So far I've only tested Clustr on my own boards and sample collections. The next step is putting it in front of other designers.",
              ],
            },
            {
              heading: "Reflection",
              body: [
                "Clustr is meant to feel simple to use, but getting it there took many small decisions, from how the two models blend to which words a group earns. The hardest part was designing for a person rather than a metric. A grouping that moves smoothly and invites a second look is far more enjoyable than a precise one that feels final.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
