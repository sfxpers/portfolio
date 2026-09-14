# Testing

Seam-first: Vitest covers public module seams; Playwright covers pages after a real build.

## Vitest owns

- Catalog **product rules** (shape, bands, degree-only education, technical depth, body alternation) — not biography or URL literals
- `COLOR_SCHEME_SCRIPT` behavior
- Resume print-HTML smoke (headings, absolute project links, escapes, degree-only forbids)
- Committed Resume PDF byte-lock (`nub run resume:pdf` / `nub run check` drift)

## Playwright owns

- Journeys, titles, 404s, primary chrome
- Home mobile fit; Home Profile must not surface Karachi
- axe on Home, Case Study, and Resume
- PDF HTTP serve + removal of `/resume/ats.html`
- `prefers-reduced-motion` transition collapse

## Do not add

- RTL tests that re-read Catalog strings from the DOM
- Intermediate Resume view-model tests that duplicate print-HTML or page e2e
- Hover/focus color idiom locks
- Exact copy locks that only fail on intentional Catalog edits
