import { Equation } from "@/components/equation";
import { FigureBlock, MediaElement } from "@/components/figure";
import type { Block, Card, Point, Section } from "@/lib/types";

function PointText({ point }: { point: Point }) {
  return (
    <div>
      {point.heading && <h3 className="mb-2 subhead">{point.heading}</h3>}
      <div className="space-y-4">
        {point.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {point.equation && <Equation {...point.equation} />}
    </div>
  );
}

function CardItem({ card, crop }: { card: Card; crop: boolean }) {
  return (
    <div className={card.wide ? "desktop:col-span-7" : "desktop:col-span-4"}>
      <MediaElement media={card.image} className={crop ? "aspect-video object-cover" : undefined} />
      <h3 className="mt-4 mb-2 text-center font-medium">{card.label}</h3>
      {card.body && <p>{card.body}</p>}
    </div>
  );
}

// Full rows are subgrids so they inherit the gutter; set only gap-y on them, since a plain gap
// would override it. Prose and besideTitle cards skip the row so they share the title's row.
function BlockRow({ block }: { block: Block }) {
  switch (block.type) {
    case "columns":
      return (
        <div className="flex flex-col gap-y-8 desktop:col-span-12 desktop:grid desktop:grid-cols-subgrid">
          {block.points.map((point, i) => (
            <div key={i} className="desktop:col-span-4">
              <PointText point={point} />
            </div>
          ))}
        </div>
      );
    case "split":
      return (
        <div className="flex flex-col gap-y-8 desktop:col-span-12 desktop:grid desktop:grid-cols-subgrid desktop:items-start">
          <div className="space-y-8 desktop:col-span-4">
            {block.points.map((point, i) => (
              <PointText key={i} point={point} />
            ))}
          </div>
          <FigureBlock
            figure={block.figure}
            className={block.figure.narrow ? "desktop:col-span-5 desktop:col-start-5" : "desktop:col-span-7 desktop:col-start-5"}
          />
        </div>
      );
    case "prose":
      return (
        <div className="space-y-4 desktop:col-span-7 desktop:col-start-5">
          {block.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    case "cards":
      return (
        <div
          className={
            block.besideTitle
              ? "flex flex-col gap-y-8 desktop:col-span-8 desktop:col-start-5 desktop:grid desktop:grid-cols-subgrid"
              : "flex flex-col gap-y-8 desktop:col-span-12 desktop:grid desktop:grid-cols-subgrid"
          }
        >
          {block.cards.map((card) => (
            <CardItem key={card.label} card={card} crop={block.crop ?? false} />
          ))}
        </div>
      );
    case "feature":
      return <FigureBlock figure={block.figure} centered className="desktop:col-span-10 desktop:col-start-2" />;
  }
}

export function CaseStudySection({ section, number, first }: { section: Section; number?: number; first: boolean }) {
  return (
    <section id={section.id} className="bg-muted px-8 pt-3 desktop:px-page">
      <div className={first ? "pt-5 pb-16" : "border-t border-muted-foreground/50 pt-5 pb-16"}>
        <div className="flex flex-col gap-8 desktop:grid desktop:grid-cols-12 desktop:gap-x-gutter">
          {section.title && (
            <h2 className="section-title desktop:col-span-4">
              {number} / {section.title}
            </h2>
          )}
          {section.blocks.map((block, i) => (
            <BlockRow key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
