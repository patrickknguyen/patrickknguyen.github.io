import Image from "next/image";
import { CaseStudyCard } from "@/components/case-study-card";
import { ExternalLink } from "@/components/external-link";
import { NavLinks } from "@/components/nav-links";
import { caseStudies } from "@/lib/case-studies";

export default function Home() {
  return (
    <main className="p-8 desktop:p-page">
      <div className="flex flex-col gap-8 desktop:grid desktop:grid-cols-12 desktop:grid-rows-[1.5rem_auto] desktop:items-start desktop:gap-x-gutter">
        <nav
          aria-label="Links"
          className="order-2 flex flex-wrap gap-x-8 gap-y-2 desktop:gap-x-gutter desktop:col-span-4 desktop:col-start-8 desktop:row-start-1 desktop:grid desktop:grid-cols-subgrid"
        >
          <NavLinks />
        </nav>
        <aside className="contents desktop:sticky desktop:top-page desktop:col-span-3 desktop:row-span-2 desktop:row-start-1 desktop:flex desktop:min-h-[calc(100svh-6rem)] desktop:flex-col desktop:gap-8">
          <h1 className="order-1 site-name">patrick k. nguyen</h1>
          <div className="order-3 space-y-6 desktop:mt-10">
            <p>
              In his <ExternalLink href="https://designintech.report/wp-content/uploads/2019/01/dit2018as_pdf.pdf">2018 Design in Tech Report</ExternalLink>,
              John Maeda divides design into three categories: classical, design thinking, and computational. One focused on craft, one on empathy, and one on scale. As he put it,
              &quot;execution has outpaced innovation.&quot; With building being faster than ever, the question I care most about is what to build and why.
            </p>
            <p>
              I studied graphic design at ArtCenter, where we learned print down to the grain of the paper stock.
              Once I started working, I didn&apos;t print a single thing. My work lived on screens, shaped by data
              and algorithms. To understand that medium, I went to Harvard for a master&apos;s in data science.
            </p>
            <p>
              Today I work where all three kinds of design meet: learning from the people I design for, and building
              thoughtful, live products that users can immediately experience.
            </p>
          </div>
          <Image
            src="/home/profile-bw.jpg"
            alt="Patrick K. Nguyen portrait"
            width={320}
            height={400}
            className="order-4 aspect-[4/5] w-40 object-cover grayscale-[20%] desktop:mt-auto"
          />
        </aside>
        <section aria-label="Selected work" className="order-5 flex flex-col gap-12 desktop:col-span-7 desktop:col-start-5 desktop:row-start-2 desktop:pt-10">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.href} {...study} />
          ))}
        </section>
      </div>
    </main>
  );
}