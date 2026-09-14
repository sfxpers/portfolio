import { Link } from "@tanstack/react-router";

import type { CaseStudy } from "@/catalog/portfolio";
import { PageShell } from "@/components/page-shell";
import { ShowcaseArtifact } from "@/components/showcase-artifact";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <PageShell>
      <Link to="/" className="mt-14 microcopy-link nav-link">
        ← Home
      </Link>

      <div className="mt-5 md:grid md:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <aside aria-label="Summary" className="md:sticky md:top-8 md:self-start">
          <h1 className="text-2xl font-medium tracking-tight text-foreground">{study.title}</h1>
          <dl className="mt-8 space-y-6 border-t border-foreground pt-6">
            <CapsuleField label="Problem" value={study.capsule.problem} />
            <CapsuleField label="Role" value={study.capsule.role} />
            <CapsuleField label="Outcome" value={study.capsule.outcome} />
          </dl>
        </aside>

        <div className="mt-14 space-y-14 border-t border-foreground pt-8 md:mt-0 md:border-t-0 md:pt-0">
          {study.body.map((block, index) =>
            block.type === "text" ? (
              <section key={`text-${index}`} className="max-w-xl">
                <h2 className="label text-muted-foreground">{block.heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-foreground/80">{block.body}</p>
              </section>
            ) : (
              <ShowcaseArtifact key={`showcase-${index}`} showcase={block.showcase} />
            ),
          )}
        </div>
      </div>
    </PageShell>
  );
}

function CapsuleField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-foreground/80">{value}</dd>
    </div>
  );
}
