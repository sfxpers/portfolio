import { getResume, identity, positioning, profileHeading } from "@/catalog/portfolio";

export type ExperienceViewItem = {
  title: string;
  /** Pre-formatted "organization / location" line, identical in both views. */
  subtitle: string;
  dates: string;
  bullets: string[];
};

export type ProjectViewItem = {
  title: string;
  summary: string;
  /** Site-relative path — the on-site page routes it; print absolutizes it. */
  href: string;
  /** On-site link text both adapters may surface; print shows the absolute URL instead. */
  linkLabel: string;
};

export type SkillViewGroup = {
  label: string;
  /** Pre-joined items line, identical in both views. */
  line: string;
};

export type EducationViewItem = {
  /** Pre-formatted "degree, institution" line, identical in both views. */
  degreeLine: string;
  dates: string;
  location: string;
};

export type ResumeSection =
  | { kind: "profile"; heading: string; bio: string; location: string }
  | { kind: "experience"; heading: string; items: ExperienceViewItem[] }
  | { kind: "projects"; heading: string; items: ProjectViewItem[] }
  | { kind: "skills"; heading: string; groups: SkillViewGroup[] }
  | { kind: "languages"; heading: string; line: string }
  | { kind: "education"; heading: string; items: EducationViewItem[] };

export type ResumeView = ResumeSection[];

/**
 * The Resume view: the single structural description of the Resume — ordered
 * sections with headings and content strings — that the on-site page and the
 * print/PDF adapter both render. Derived from the Catalog, not a third record.
 */
export function getResumeView(): ResumeView {
  const resume = getResume();

  return [
    { kind: "profile", heading: profileHeading, bio: identity.bio, location: resume.location },
    {
      kind: "experience",
      heading: "Recent experience",
      items: resume.experience.map((item) => ({
        title: item.title,
        subtitle: `${item.organization} / ${item.location}`,
        dates: item.dates,
        bullets: item.bullets,
      })),
    },
    {
      kind: "projects",
      heading: "Selected projects",
      items: resume.projects.map((project) => ({
        title: project.title,
        summary: project.summary,
        href: `/work/${project.slug}`,
        linkLabel: "View case study →",
      })),
    },
    {
      kind: "skills",
      heading: "Skills",
      groups: resume.skills.map((group) => ({
        label: group.label,
        line: group.items.join(", "),
      })),
    },
    {
      kind: "languages",
      heading: "Languages",
      line: resume.languages.map((language) => `${language.name}: ${language.level}`).join(" | "),
    },
    {
      kind: "education",
      heading: "Education",
      items: resume.education.map((item) => ({
        degreeLine: `${item.degree}, ${item.institution}`,
        dates: item.dates,
        location: item.location,
      })),
    },
  ];
}

/** Meta description derived from Resume view headings so the route cannot drift. */
export function resumeMetaDescription(): string {
  const headings = getResumeView()
    .filter((section) => section.kind !== "profile")
    .map((section) => section.heading.toLowerCase());
  const list =
    headings.length <= 1
      ? (headings[0] ?? "")
      : `${headings.slice(0, -1).join(", ")}, and ${headings.at(-1)}`;
  return `${list} for ${identity.name}. ${positioning}`;
}
