import { describe, expect, it } from "vitest";

import { getResume, identity, siteOrigin } from "@/catalog/portfolio";
import { renderResumePrintHtml } from "@/catalog/resume-print-html";

describe("Resume print adapter", () => {
  it("renders identity, contact, and the Resume section headings", () => {
    const html = renderResumePrintHtml();

    expect(html).toContain(identity.name);
    expect(html).toContain(identity.role);
    for (const link of identity.contact) {
      const hrefBody = link.href.replace(/^mailto:/, "");
      expect(html).toContain(hrefBody);
    }

    for (const heading of [
      "Profile",
      "Recent experience",
      "Selected projects",
      "Skills",
      "Languages",
      "Education",
    ]) {
      expect(html).toContain(heading);
    }

    expect(html).not.toContain("View case study");
  });

  it("absolutizes project links for print and keeps projects bullet-free", () => {
    const html = renderResumePrintHtml();
    const [project] = getResume().projects;
    expect(project).toBeDefined();
    const absoluteHref = `${siteOrigin}/work/${project!.slug}`;

    expect(html).toContain(`href="${absoluteHref}"`);
    expect(html).toContain(`>${absoluteHref}</a>`);
    expect(html).not.toMatch(new RegExp(`${project!.title}[\\s\\S]{0,200}<ul>`));
  });

  it("stays degree-only and escapes HTML in catalog strings", () => {
    const html = renderResumePrintHtml();
    const [edu] = getResume().education;
    expect(edu).toBeDefined();
    expect(html).toContain(edu!.institution.replaceAll("&", "&amp;"));
    expect(html).not.toContain("Intermediate");
    expect(html).not.toContain("Matriculation");
  });
});
