import type { CaseStudyPage } from "@/lib/types";

export const vigorPage: CaseStudyPage = {
  title: "ViGOR",
  objective:
    "With the adoption of the da Vinci SP, Dr. Holsinger's team at Stanford Medicine recorded every robotic surgery in high definition but still dictated the operative notes from memory. ViGOR, our Harvard capstone project, set out to generate operative note directly from the footage instead.",
  overview:
    "Working closely with the surgeons, I noticed that key steps were defined by cautery activity. Building on this pattern, I built two tools for the surgeons: a segmentation tool that cut three weeks of labeling to four days, and a human-in-the-loop review page. In a blind review, the drafts averaged 85/100, and one in five matched or beat the official note.",
  links: [
    { label: "Holsinger Research Lab", href: "https://med.stanford.edu/ohns/research/labs/holsinger-research-group.html" },
  ],
  recognitions: [
    { label: "Dean's Prize for Outstanding Capstone, Harvard University" },
    { label: "Presenter, Stanford AIMI Symposium 2026", href: "https://aimi.stanford.edu/aimi26" },
  ],
  sections: [
    {
      id: "problem",
      title: "Problem & Role",
      blocks: [
        {
          type: "columns",
          points: [
            {
              heading: "Dictation from Memory",
              body: [
                "The operative note is the official record of a surgery. On Dr. Holsinger's team, it was dictated from memory hours or sometimes days after the operation. The longer the gap, the more room for details to slip. Meanwhile, the da Vinci had recorded every minute of the case, but at an hour or more per case, the footage was impractical to review by hand.",
              ],
            },
            {
              heading: "Working Directly with Stanford Surgeons",
              body: [
                "I worked across the whole pipeline, but I spent much of my time with the surgeons, sitting in while they reviewed footage and notes. What I saw there led to the cautery signal that reframed the project around action segments, and to the architecture I proposed to match. I designed and built the project's three tools: the cautery signal detector, the segmentation tool surgeons labeled with, and the review page that became a final output.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "approach",
      title: "Initial Approach",
      blocks: [
        {
          type: "split",
          points: [
            {
              heading: "The Dataset",
              body: [
                "We started with 62 de-identified robotic surgery videos and their operative notes from Dr. Holsinger's team. Many cases used an older version of the da Vinci interface or were missing key steps, so we narrowed to 36 standardized cases, trading volume for consistency.",
              ],
            },
            {
              heading: "Phase Classification",
              body: [
                "Surgeons labeled each video across nine pre-defined surgical phases. Our first plan was to train a vision model to classify every frame into one of those phases, then pass the resulting timeline to a language model to write the note.",
              ],
            },
            {
              heading: "Label Sparsity and Non-Linearity",
              body: [
                "The data broke that plan quickly. Surgeons had labeled only 35% of frames, and the remaining frames fell outside any phase. Procedures also rarely ran in order, with steps repeated or skipped. A fixed sequence of nine phases couldn't describe what actually happened in the operating room. We needed a different way to find the moments that mattered.",
              ],
            },
          ],
          figure: {
            src: "/vigor/fold0_labels.png",
            alt: "Phase labels across six surgical cases, mostly unlabeled gray with phases repeating out of order",
            width: 1589,
            height: 571,
            caption:
              "Phase labels across six cases. Gray marks unlabeled footage, about 65% of footage overall. Within a single case, phases repeat and jump out of order.",
          },
        },
      ],
    },
    {
      id: "discovery",
      title: "Discovery",
      blocks: [
        {
          type: "split",
          points: [
            {
              heading: "Cautery Activity as Signal",
              body: [
                "Sitting in while surgeons reviewed footage, I noticed that clinical milestones lined up with instrument activity, especially cautery, which cuts and seals tissue. I built a tool that reads the da Vinci's on-screen display to log every time the cut and coagulation pedals were engaged. Of all frames with cautery active, 90% fell inside a labeled phase, so we could set aside most of the unlabeled footage. The signal had gaps. Vascular ligation used no cautery, and margin marking and tumor removal had stretches without it. These steps look visually distinct, though, so surgeons could label them quickly by hand.",
              ],
            },
          ],
          figure: {
            src: "/vigor/cautery_coag.png",
            alt: "Surgical phases for one case above coagulation pedal activity over time",
            width: 1685,
            height: 442,
            caption:
              "One case, SU045. The top row shows the phases surgeons labeled, and the row below shows pedal activity read from the display.",
          },
        },
        {
          type: "split",
          points: [
            {
              heading: "Action Segmentation Tool",
              body: [
                "I grouped cautery activations within 30 seconds of each other into a single action segment, enough to cover tool repositioning and brief pauses. This changed how we framed the problem. Instead of classifying each frame into one of nine phases, we worked with actions.",
                "I built a tool for surgeons to review one segment at a time with keyframes and cautery activity instead of scrubbing through an hour of footage. Labeling that we had planned to take three weeks was done in four days. The surgeons estimated each video review went from 75 to 15 minutes.",
              ],
            },
          ],
          figure: {
            src: "/vigor/segments.png",
            alt: "Two action segments, each shown as a cautery activity bar above six keyframes",
            width: 1679,
            height: 691,
            caption: "Two segments with marked cautery activity and keyframes every 15 seconds.",
          },
        },
      ],
    },
    {
      id: "architecture",
      title: "Vision-Language Architecture",
      blocks: [
        {
          type: "split",
          points: [
            {
              heading: "Pivoting to Action Segments",
              body: [
                "With action segments as the basic unit, I proposed pairing a frozen, pretrained vision encoder with a small temporal model, a far faster and cheaper approach than training a vision-language model end to end. The temporal model learned from the labels surgeons made with the segmentation tool.",
              ],
            },
            {
              heading: "Three Stages",
              body: [
                "A vision model reads each frame. A temporal model groups those frames into action segments. A vision-language model then works in two passes. The first describes each segment on its own: the instruments, the anatomy and the action. The second writes those descriptions into an operative note in Dr. Holsinger's first-person voice.",
              ],
            },
          ],
          figure: {
            src: "/vigor/pipeline.png",
            alt: "Pipeline: video, frames, action segments, a first pass describing each segment, and a second pass writing the draft note",
            width: 4000,
            height: 1112,
          },
        },
      ],
    },
    {
      id: "interface",
      title: "Review Interface",
      blocks: [
        {
          type: "split",
          points: [
            {
              heading: "Building Trust",
              body: [
                "The review interface has two parts. At the top is the draft note, with each sentence citing the action segments it came from. Below, each segment includes: keyframe mosaics sampled from the segment, the phase the model predicted with its confidence next to the surgeon's label, and the instruments, anatomy and observations from the first pass. Clicking a citation jumps from a sentence to its corresponding segment, so a surgeon can check any claim against the source.",
              ],
            },
            {
              heading: "From One Meeting to Final Output",
              body: [
                "I originally built the interface for a single check-in with a surgeon before our final evaluation. In one case, the draft said a suction instrument retracted the base of the tongue. The surgeon found that odd, clicked the citation, and saw it in the footage. The cards also exposed errors the note hid, like misidentified forceps. The surgeon enjoyed using the interface enough that it became a final output alongside the draft note.",
              ],
            },
          ],
          figure: {
            src: "/vigor/walkthrough.png",
            alt: "Review page with a draft operative note citing action segments, above keyframe mosaics and a segment card",
            width: 1696,
            height: 1792,
            narrow: true,
            caption:
              "Case SU038. The draft note sits at the top in Dr. Holsinger's voice. Each citation jumps to its action segment below, showing keyframes and what the model saw.",
          },
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
                "Two surgeons graded ViGOR's drafts on 12 cases in a blind review, using a rubric Dr. Holsinger wrote and scoring each against the video and his official note. The drafts averaged 85/100, and one in five scored as well as the official note or better. The review page I built for one meeting became a final output. After the project, our team was invited to present at the Stanford AIMI Symposium.",
              ],
            },
            {
              heading: "Limitations",
              body: [
                "We naively hoped ViGOR could replace dictation. What we built is a structured first draft that still needs the attending surgeon's edits before it goes into the record. We built it for one team, one procedure and 36 cases, so how it handles other surgeons, techniques and operating rooms is an open question. The evaluation was small, and while the review was blind, the pipeline's writing style was easy to recognize after a few notes.",
              ],
            },
            {
              heading: "Reflection",
              body: [
                "I started this project thinking the hard part would be the model. The bigger lever was the surgeons' time. Building a tool to take labeling off their plate turned them from data sources into collaborators, and I learned more about the anatomy of the throat than I ever expected to. At AIMI, I was moved by a room full of clinicians eager to bring AI into their practice. However, clinicians won't use what they can't trust. The surgeons were able to trust ViGOR because they helped shape it.",
              ],
            },
          ],
        },
      ],
    },
  ],
};