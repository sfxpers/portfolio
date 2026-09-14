import { describe, expect, it } from "vitest";

import { getCaseStudyBySlug, getResume, identity, listCaseStudies } from "@/catalog/portfolio";

describe("portfolio catalog", () => {
  it("exposes identity with name, role, bio, and Email/GitHub/Threads/X contact shape", () => {
    expect(identity.name.length).toBeGreaterThan(0);
    expect(identity.role.length).toBeGreaterThan(0);
    expect(identity.bio.length).toBeGreaterThan(0);
    expect(identity.contact.map((link) => link.kind)).toEqual(["email", "github", "threads", "x"]);
    for (const link of identity.contact) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href.length).toBeGreaterThan(0);
    }
  });

  it("exposes a Resume record with location, Experience, Skills, Languages, and degree-only Education", () => {
    const resume = getResume();

    expect(resume.location.length).toBeGreaterThan(0);
    expect(resume.experience.length).toBeGreaterThan(0);
    for (const item of resume.experience) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.organization.length).toBeGreaterThan(0);
      expect(item.location.length).toBeGreaterThan(0);
      expect(item.dates.length).toBeGreaterThan(0);
      expect(item.bullets.length).toBeGreaterThan(0);
    }

    expect(resume.skills.length).toBeGreaterThan(0);
    expect(resume.skills.length).toBeLessThanOrEqual(6);
    for (const group of resume.skills) {
      expect(group.label.length).toBeGreaterThan(0);
      expect(group.items.length).toBeGreaterThan(0);
    }
    // Grouping buys breadth, not licence for a laundry list. See CONTEXT.md.
    const skillCount = resume.skills.reduce((total, group) => total + group.items.length, 0);
    expect(skillCount).toBeLessThanOrEqual(24);

    expect(resume.languages.length).toBeGreaterThan(0);
    for (const language of resume.languages) {
      expect(language.name.length).toBeGreaterThan(0);
      expect(language.level.length).toBeGreaterThan(0);
    }

    expect(resume.education.length).toBeGreaterThan(0);
    for (const item of resume.education) {
      expect(item.degree.length).toBeGreaterThan(0);
      expect(item.institution.length).toBeGreaterThan(0);
      expect(item.dates.length).toBeGreaterThan(0);
      expect(item.location.length).toBeGreaterThan(0);
      expect(item.degree).not.toMatch(/Intermediate|Matriculation/i);
      expect(item.institution).not.toMatch(/Intermediate|Matriculation/i);
    }
  });

  it("projects Resume Projects from Case Studies without outcome bullets", () => {
    const resume = getResume();
    const caseStudies = listCaseStudies();

    expect(resume.projects).toEqual(
      caseStudies.map((study) => ({
        title: study.title,
        summary: study.indexSummary,
        slug: study.slug,
      })),
    );
    for (const project of resume.projects) {
      expect("bullets" in project).toBe(false);
    }
  });

  it("lists two to three Case Studies", () => {
    const caseStudies = listCaseStudies();
    expect(caseStudies.length).toBeGreaterThanOrEqual(2);
    expect(caseStudies.length).toBeLessThanOrEqual(3);
  });

  it("gives each Case Study a slug, Capsule fields, and at least one Showcase", () => {
    for (const study of listCaseStudies()) {
      expect(study.slug.length).toBeGreaterThan(0);
      expect(study.indexSummary.length).toBeGreaterThan(0);
      expect(study.capsule.problem.length).toBeGreaterThan(0);
      expect(study.capsule.role.length).toBeGreaterThan(0);
      expect(study.capsule.outcome.length).toBeGreaterThan(0);
      expect(study.body.some((block) => block.type === "showcase")).toBe(true);
      for (const block of study.body) {
        if (block.type !== "showcase") continue;
        expect(block.showcase.src.startsWith("/evidence/")).toBe(true);
        expect(block.showcase.alt.length).toBeGreaterThan(0);
        expect(block.showcase.width).toBeGreaterThan(0);
        expect(block.showcase.height).toBeGreaterThan(0);
      }
    }
  });

  it("includes peer-depth technical text in every Case Study body", () => {
    for (const study of listCaseStudies()) {
      const technicalBlocks = study.body.filter(
        (block) => block.type === "text" && block.depth === "technical",
      );
      expect(technicalBlocks.length).toBeGreaterThan(0);
      for (const block of technicalBlocks) {
        if (block.type !== "text") continue;
        expect(block.heading.length).toBeGreaterThan(0);
        // A technical block explains a choice and its cost. Depth is not
        // assertable, so this floor only rules out a one-line restatement of
        // the heading.
        expect(block.body.length).toBeGreaterThan(200);
      }
    }
  });

  it("alternates text and Showcase blocks in every Case Study body", () => {
    for (const study of listCaseStudies()) {
      expect(study.body.length).toBeGreaterThan(0);
      expect(study.body[0]?.type).toBe("text");
      expect(study.body.at(-1)?.type).toBe("showcase");
      expect(study.body.some((block) => block.type === "text")).toBe(true);
      expect(study.body.some((block) => block.type === "showcase")).toBe(true);

      for (let index = 1; index < study.body.length; index += 1) {
        expect(study.body[index]?.type).not.toBe(study.body[index - 1]?.type);
      }
    }
  });

  it("returns a Case Study for a known slug and nothing for an unknown slug", () => {
    const [first] = listCaseStudies();
    expect(first).toBeDefined();
    expect(getCaseStudyBySlug(first!.slug)).toEqual(first);
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });
});
