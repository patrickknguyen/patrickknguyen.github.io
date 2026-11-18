import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study-section";
import { ExternalLink } from "@/components/external-link";
import { Lightbox } from "@/components/lightbox";
import { SiteHeader } from "@/components/site-header";
import { caseStudies } from "@/lib/case-studies";
import type { LinkItem } from "@/lib/types";
import { cn } from "cn";

export function generateStaticParams() {
  return caseStudies
    .filter((study) => study.page)
    .map((study) => ({ slug: study.slug }));
}

function LinkList({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div className="desktop:col-span-4">
      <h2 className="mb-2 meta-label">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.label}>{item.href ? <ExternalLink href={item.href}>{item.label}</ExternalLink> : item.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study || !study.page) notFound();
  const page = study.page;

  // Only titled sections get a number and a Contents entry
  const titled = page.sections.filter((section) => section.title);

  return (
    <>
      <SiteHeader />
      <main>
        <div className="relative z-10 bg-background px-8 pt-12 pb-16 shadow-[0_8px_28px_rgb(0_0_0/0.05)] [clip-path:inset(0_0_-4rem)] desktop:px-page desktop:pt-18">
          <div className="flex flex-col gap-8 desktop:grid desktop:grid-cols-12 desktop:items-start desktop:gap-x-gutter">
            <div className="contents desktop:col-span-3 desktop:row-start-1 desktop:flex desktop:flex-col desktop:gap-8">
              <div className="order-1">
                <h1 className="display-title">{page.title}</h1>
                <p className="mt-2 meta-label">{study.meta}</p>
              </div>
              <div className="order-3">
                <h2 className="subhead">Project Objective</h2>
                <div className="mt-2 space-y-4">
                  {page.objective.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="order-4">
                <h2 className="subhead">Project Overview</h2>
                <div className="mt-2 space-y-4">
                  {page.overview.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <figure className="order-2 desktop:col-span-7 desktop:col-start-5 desktop:row-start-1">
              <Image src={page.heroImage ?? study.image} alt={page.heroAlt ?? study.alt} width={1600} height={900} preload className={cn("aspect-video w-full object-cover", study.outlined && "outlined")} />
            </figure>
            <nav aria-label="Contents" className="order-5 desktop:col-span-4 desktop:row-start-2">
              <h2 className="mb-2 meta-label">Contents</h2>
              <ol>
                {titled.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="hover:underline underline-offset-4">
                      {i + 1} / {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="order-6 flex flex-col gap-y-8 desktop:col-span-8 desktop:col-start-5 desktop:row-start-2 desktop:grid desktop:grid-cols-subgrid">
              <LinkList title="Links" items={page.links} />
              {page.recognitions && <LinkList title="Recognitions" items={page.recognitions} />}
            </div>
          </div>
        </div>
        <Lightbox>
          {page.sections.map((section, i) => (
            <CaseStudySection
              key={section.id ?? i}
              section={section}
              number={section.title ? titled.indexOf(section) + 1 : undefined}
              first={i === 0}
            />
          ))}
        </Lightbox>
        {page.footnote && (
          <div className="bg-muted px-8 pb-16 text-center text-muted-foreground desktop:px-page">
            <p className="mx-auto max-w-176">{page.footnote}</p>
          </div>
        )}
      </main>
    </>
  );
}