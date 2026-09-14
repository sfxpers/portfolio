import { Link } from "@tanstack/react-router";

import { identity, listCaseStudies, profileHeading } from "@/catalog/portfolio";
import { IdentityHeader } from "@/components/identity-header";
import { PageShell } from "@/components/page-shell";
import { ProfileSection } from "@/components/profile-section";

export function HomePage() {
  const caseStudies = listCaseStudies();

  return (
    <PageShell>
      <IdentityHeader label="Home" />
      <ProfileSection heading={profileHeading} bio={identity.bio} />

      <section aria-label="Selected work" className="mt-10">
        <h2 className="section-heading">Selected work</h2>
        <ol>
          {caseStudies.map((study, index) => (
            <li key={study.slug} className="border-b border-border">
              <Link
                to="/work/$slug"
                params={{ slug: study.slug }}
                className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-3 py-2.5 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[2rem_minmax(0,12rem)_1fr_auto] sm:gap-y-0 sm:px-4 sm:py-4"
              >
                <span className="meta">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base font-medium text-foreground transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                  {study.title}
                </span>
                <span className="meta sm:hidden">{study.year}</span>
                <span className="col-span-2 col-start-2 text-sm text-muted-foreground sm:col-span-1 sm:col-start-auto">
                  {study.indexSummary}
                </span>
                <span className="hidden meta sm:col-start-auto sm:block sm:pt-0.5">
                  {study.year}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
