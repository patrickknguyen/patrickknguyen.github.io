// Mirrors lock-in/Resume/Resume_PNguyen_2026.html. Edit the master first, then copy changes here.

export type ResumeEntry = {
  title: string;
  subtitle?: string;
  date: string;
  bullets: string[];
  project?: { label: string; name: string; bullets: string[] };
};

export const resume = {
  name: "patrick k. nguyen",
  tagline: "AI Product Designer & Engineer",
  // Each group prints as its own block of lines
  contact: [
    [
      { label: "patrickknguyen@gmail.com", href: "mailto:patrickknguyen@gmail.com" },
      { label: "patrickknguyen.github.io", href: "https://patrickknguyen.github.io/" },
    ],
    [
      { label: "linkedin.com/in/patrickknguyen", href: "https://www.linkedin.com/in/patrickknguyen/" },
      { label: "github.com/patrickknguyen", href: "https://github.com/patrickknguyen/" },
    ],
  ],
  education: {
    primary: [
      {
        title: "Harvard University",
        subtitle: "Master of Liberal Arts in Extension Studies, Data Science",
        date: "Sep 2023 – May 2026",
        bullets: ["GPA: 3.8", "Honors: Dean's Prize for Outstanding Thesis"],
        project: {
          label: "Thesis Work",
          name: "ViGOR: Video-Generated Operative Reporting",
          bullets: [
            "Partnered with a Stanford surgical team on a vision-language prototype that drafts operative notes from robotic surgery video. In blind review, drafts averaged 85/100 and 21% matched or beat official notes.",
            "Built a video segmentation tool that cut surgeon labeling time by 80%, and defined the final action-segment architecture.",
            "Designed and built a human-in-the-loop review interface that grounds each claim in the draft to its source.",
          ],
        },
      },
    ] as ResumeEntry[],
    secondary: [
      {
        title: "ArtCenter College of Design",
        subtitle: "Bachelor of Fine Arts, Graphic Design",
        date: "Jun 2017 – May 2020",
        bullets: [
          "Served as Student Body President",
          "Taught Advanced Visual Interaction Studio as TA, covering interaction design and prototyping",
        ],
      },
      {
        title: "University of California, Berkeley",
        date: "Jan 2014 – May 2015",
        bullets: ["Completed coursework in calculus, linear algebra, and statistics"],
      },
    ] as ResumeEntry[],
  },
  experience: [
    {
      title: "Research Assistant",
      subtitle: "Harvard Kennedy School",
      date: "Jan 2025 – May 2026 | Cambridge, MA",
      bullets: [
        "Built OCR and data-cleaning pipelines that structured 50,000 Vietnam War documents, helping researchers identify 1,600 unaccounted-for fallen soldiers.",
        "Designed and developed a searchable archive to make the records easily accessible to historians and the public.",
      ],
    },
    {
      title: "Product Marketing Lead",
      subtitle: "Timeless Labs",
      date: "Aug 2021 – May 2022 | Palo Alto, CA",
      bullets: [
        "Launched the startup's visual identity and carried it across the website, pitch decks and community channels, giving a small team one consistent public face.",
      ],
    },
    {
      title: "UI/UX Designer",
      subtitle: "Hummingbirdsday Design",
      date: "May 2020 – May 2021 | Santa Monica, CA",
      bullets: ["Designed interactive prototypes for mobile and web apps, and built client websites with HTML, CSS, and JavaScript."],
    },
  ] as ResumeEntry[],
  skills: [
    {
      label: "Design & Engineering",
      items: "front-end development, prototyping, UX design, user research, usability testing",
    },
    {
      label: "Data Science & ML",
      items:
        "vision-language models, computer vision, NLP, data pipelines, model training, model evaluation, statistical analysis",
    },
    {
      label: "Tools",
      items: "Figma, Adobe Creative Suite, HTML/CSS, JavaScript, React, Git, Python, PyTorch, SQL, R",
    },
  ],
  honors: [
    "Dean's Prize for Outstanding Thesis, 2026",
    "Siras Greiner Memorial Scholarship, 2018",
    "ArtCenter Department Scholarship, 2017",
    "International Baccalaureate Diploma, 2013",
    "Eagle Scout, Boy Scouts of America, 2013",
  ],
};
