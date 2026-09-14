import { identity, siteOrigin } from "@/catalog/portfolio";
import { getResumeView, type ResumeSection } from "@/catalog/resume-view";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function displayHref(href: string): string {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "");
}

function contactLine(location: string): string {
  const links = identity.contact.map(
    (link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(displayHref(link.href))}</a>`,
  );
  return [...links, escapeHtml(location)].join(" | ");
}

function sectionHtml(section: ResumeSection): string {
  switch (section.kind) {
    case "profile":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
        <p>
          ${escapeHtml(section.bio)}
        </p>
      </section>`;
    case "experience":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
${section.items
  .map(
    (item) => `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(item.title)}</span>
            <span>${escapeHtml(item.dates)}</span>
          </div>
          <div class="item-subtitle">${escapeHtml(item.subtitle)}</div>
          <ul>
            ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("\n            ")}
          </ul>
        </article>`,
  )
  .join("\n")}
      </section>`;
    case "projects":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
${section.items
  .map((project) => {
    const href = `${siteOrigin}${project.href}`;
    return `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(project.title)}</span>
            <span><a href="${escapeHtml(href)}">${escapeHtml(href)}</a></span>
          </div>
          <div class="item-subtitle">${escapeHtml(project.summary)}</div>
        </article>`;
  })
  .join("\n")}
      </section>`;
    case "skills":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
${section.groups
  .map(
    (group) =>
      `        <div class="skill-group"><span class="skill-label">${escapeHtml(group.label)}:</span> ${escapeHtml(group.line)}</div>`,
  )
  .join("\n")}
      </section>`;
    case "languages":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
        <p>${escapeHtml(section.line)}</p>
      </section>`;
    case "education":
      return `
      <section class="section">
        <div class="section-title">${escapeHtml(section.heading)}</div>
${section.items
  .map(
    (item) => `
        <article class="item">
          <div class="item-head">
            <span>${escapeHtml(item.degreeLine)}</span>
            <span>${escapeHtml(item.dates)}</span>
          </div>
          <div>${escapeHtml(item.location)}</div>
        </article>`,
  )
  .join("\n")}
      </section>`;
  }
}

/** Plain print-ready HTML of the Resume view; generator input for the PDF download. */
export function renderResumePrintHtml(): string {
  const view = getResumeView();
  const profile = view.find((section) => section.kind === "profile");
  if (profile?.kind !== "profile") {
    throw new Error("Resume view must include a profile section");
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(identity.name)} - ${escapeHtml(identity.role)}</title>
    <style>
      @page {
        size: A4;
        margin: 14mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #111;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10.5px;
        line-height: 1.35;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .page {
        max-width: 190mm;
        margin: 0 auto;
        padding: 0;
      }

      .header {
        margin-bottom: 12px;
      }

      .name {
        font-size: 28px;
        line-height: 1;
        font-weight: 800;
      }

      .title {
        margin-top: 5px;
        font-size: 13px;
        font-weight: 700;
      }

      .contact {
        margin-top: 7px;
        font-size: 10px;
      }

      .section {
        margin-top: 11px;
      }

      .section-title {
        border-bottom: 1px solid #111;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        padding-bottom: 2px;
        margin-bottom: 6px;
      }

      .item {
        margin-bottom: 8px;
      }

      .item-head {
        font-weight: 700;
      }

      .item-head span {
        display: block;
      }

      .item-subtitle {
        font-weight: 700;
        margin-top: 1px;
      }

      .skill-group {
        margin-bottom: 2px;
      }

      .skill-label {
        font-weight: 700;
      }

      ul {
        margin: 3px 0 0;
        padding-left: 16px;
      }

      li {
        margin-bottom: 2px;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="header">
        <div class="name">${escapeHtml(identity.name)}</div>
        <div class="title">${escapeHtml(identity.role)}</div>
        <div class="contact">
          ${contactLine(profile.location)}
        </div>
      </header>
${view.map((section) => sectionHtml(section)).join("\n")}
    </main>
  </body>
</html>
`;
}
