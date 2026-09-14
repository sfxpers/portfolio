import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { RESUME_PDF_HREF, resumePdfDownloadName } from "@/catalog/resume-download";
import { getResumeView } from "@/catalog/resume-view";
import { IdentityHeader } from "@/components/identity-header";
import { PageShell } from "@/components/page-shell";
import { ProfileSection } from "@/components/profile-section";

export function ResumePage() {
  const view = getResumeView();

  return (
    <PageShell>
      <IdentityHeader
        label="Resume"
        aside={
          <a href={RESUME_PDF_HREF} download={resumePdfDownloadName()} className="accent-link">
            Download PDF
          </a>
        }
      />

      {view.map((section) => {
        switch (section.kind) {
          case "profile":
            return (
              <ProfileSection
                key={section.kind}
                heading={section.heading}
                bio={section.bio}
                location={section.location}
              />
            );
          case "experience":
            return (
              <ResumeSection key={section.kind} heading={section.heading}>
                <ul className="mt-5 space-y-8">
                  {section.items.map((item) => (
                    <li key={`${item.title}-${item.dates}`}>
                      <ItemHead title={item.title} aside={<p className="meta">{item.dates}</p>} />
                      <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            );
          case "projects":
            return (
              <ResumeSection key={section.kind} heading={section.heading}>
                <ul className="mt-5 space-y-8">
                  {section.items.map((project) => (
                    <li key={project.href}>
                      <ItemHead
                        title={project.title}
                        aside={
                          <Link
                            to="/work/$slug"
                            params={{ slug: project.href.slice("/work/".length) }}
                            aria-label={`View case study for ${project.title}`}
                            className="accent-link"
                          >
                            {project.linkLabel}
                          </Link>
                        }
                      />
                      <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            );
          case "skills":
            return (
              <ResumeSection key={section.kind} heading={section.heading}>
                <dl className="mt-5 space-y-5">
                  {section.groups.map((group) => (
                    <div key={group.label}>
                      <dt className="label text-muted-foreground">{group.label}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                        {group.line}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeSection>
            );
          case "languages":
            return (
              <ResumeSection key={section.kind} heading={section.heading}>
                <p className="mt-4 text-sm text-foreground/80">{section.line}</p>
              </ResumeSection>
            );
          case "education":
            return (
              <ResumeSection key={section.kind} heading={section.heading}>
                <ul className="mt-5 space-y-4">
                  {section.items.map((item) => (
                    <li key={item.degreeLine}>
                      <ItemHead
                        title={item.degreeLine}
                        aside={<p className="meta">{item.dates}</p>}
                      />
                      <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            );
        }
      })}
    </PageShell>
  );
}

function ResumeSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section aria-label={heading} className="mt-10">
      <h2 className="section-heading">{heading}</h2>
      {children}
    </section>
  );
}

function ItemHead({ title, aside }: { title: string; aside: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
      <p className="text-base font-medium text-foreground">{title}</p>
      {aside}
    </div>
  );
}
