import { Link } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";

export function SiteChrome() {
  return (
    <div className="flex flex-col gap-2 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-x-6">
      <Link to="/" className="shrink-0 label text-foreground nav-link">
        {identity.name}
      </Link>
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 meta sm:gap-x-5">
        <nav aria-label="Primary" className="flex gap-x-3 sm:gap-x-5">
          <Link to="/resume" className="nav-link">
            Resume
          </Link>
        </nav>
        <nav aria-label="Contact" className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-5">
          {identity.contact.map((link) => {
            const opensInNewTab = link.kind !== "email";
            return (
              <a
                key={link.kind}
                href={link.href}
                className="nav-link"
                {...(opensInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
