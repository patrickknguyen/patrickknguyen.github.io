import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { resume, type ResumeEntry } from "@/content/resume";

export const metadata: Metadata = { title: "Resume" };

// Sizes are in points, like the master, so the page prints as the same one-page PDF

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-2.5 border-b border-muted-foreground pt-2.5 pb-1 meta-label">{children}</h2>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-[square] space-y-[3px] pl-3">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Entry({ entry, small = false }: { entry: ResumeEntry; small?: boolean }) {
  return (
    <div>
      <h3 className={small ? "font-semibold" : "text-[12pt] font-semibold"}>{entry.title}</h3>
      {entry.subtitle && <p>{entry.subtitle}</p>}
      <p className="mb-1.5">{entry.date}</p>
      <List items={entry.bullets} />
      {entry.project && (
        <div className="mt-2.5">
          <p className="text-[12pt] font-semibold">{entry.project.label}</p>
          <p className="mb-1">{entry.project.name}</p>
          <List items={entry.project.bullets} />
        </div>
      )}
    </div>
  );
}

const row = "grid gap-y-5 sheet:grid-cols-[58%_38%] sheet:justify-between";

export default function ResumePage() {
  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>
      <main className="mt-12 px-4 py-12 desktop:px-page print:m-0 print:p-0">
        <article className="mx-auto max-w-[8.5in] bg-background p-8 text-[10pt] leading-[1.3] shadow-[0_8px_28px_rgb(0_0_0/0.05)] sheet:p-[0.75in] print:max-w-none print:shadow-none">
          <header className={`${row} mb-5`}>
            <div>
              <h1 className="mb-1 text-[26pt] leading-none lowercase">{resume.name}</h1>
              <p className="mt-2 max-w-[75%]">{resume.tagline}</p>
            </div>
            <div className="space-y-[1.3em]">
              {resume.contact.map((group) => (
                <div key={group[0].label}>
                  {group.map((item) => (
                    <a key={item.href} href={item.href} className="block underline-offset-4 hover:underline">
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </header>

          <Heading>Education</Heading>
          <section className={`${row} mb-3.5`}>
            <div className="space-y-4">
              {resume.education.primary.map((entry) => (
                <Entry key={entry.title} entry={entry} />
              ))}
            </div>
            <div className="space-y-2.5">
              {resume.education.secondary.map((entry) => (
                <Entry key={entry.title} entry={entry} small />
              ))}
            </div>
          </section>

          <section className={row}>
            <div>
              <Heading>Experience</Heading>
              <div className="space-y-4">
                {resume.experience.map((entry) => (
                  <Entry key={entry.title} entry={entry} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <Heading>Skills</Heading>
                <div className="space-y-2">
                  {resume.skills.map((skill) => (
                    <div key={skill.label}>
                      <p className="mb-0.5 font-semibold">{skill.label}:</p>
                      <p>{skill.items}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Heading>Honors & Awards</Heading>
                {resume.honors.map((honor) => (
                  <p key={honor}>{honor}</p>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
