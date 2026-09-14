# Portfolio

Personal developer portfolio for Shayan: projects presented as Case
Studies on a showcase-heavy Craft Logbook site, with a Resume credentials
surface for hiring skim and a PDF download.

## Language

**Case Study**: A project page built from a Capsule and a body of short
narrative blocks with Showcase sections. Proof lives in the artifacts; text
explains problem, constraints, and outcome, not chapters. _Avoid_: Essay,
article, long-form writeup, blog post, showcase-only gallery, rigid
multi-section template without visual proof

**Capsule**: The scannable Case Study summary (problem, role, and outcome) so a
hiring-first reader can skim the point. Technical depth follows for peers
without being required to get it. _Avoid_: Manifesto intro, long abstract,
pull-quote opener, peer-only jargon in the first screen, Capsule as a long
top-of-page essay block

**Showcase**: Visual or interactive proof of the work (product UI, recordings,
diagrams, live demos, code diffs) used as a first-class part of a Case Study,
not decoration around a wall of text. Default is artifact-first; interactive
demos are optional and reserved for flagship cases that need them. _Avoid_: Hero
illustration, stock photography, abstract gradient mesh as the main visual,
demo-obligatory portfolio

**Craft Logbook**: The site’s overall product direction: a personal index of
work that opens into Case Studies, signaling developer-built craft through
restraint and systems thinking, not agency marketing or editorial branding.
_Avoid_: Editorial, magazine layout, designer-for-hire folio, SaaS marketing
landing page, dark-as-identity / purple-glow “dev cosplay”, display serif
heroes, gradient brand themes, terracotta-on-cream, parallax/scroll-hijack
heroes

**Voice**: The single register every user-facing string is written in: plain and
concrete, the author as the actor, naming what a product is before how it was
built (see ADR-0003). _Avoid_: systems-analyst abstraction, agentless passive,
boundary / surface / product system as house words, Decision–Constraint–Trade-off
scaffolding, Title Case in UI labels, a different positioning claim per page, a
domain generalised from whichever Case Studies happen to be published

**Identity**: The shared person record: name, “Product Engineer” role, bio, and
chrome contact (Email, GitHub, Threads, X). Location is Resume-only and not part
of Identity. _Avoid_: About, author byline, personal brand blurb, “design
engineer” as the primary role label

**Catalog**: The single source of portfolio facts (Identity, Case Studies,
Resume sections). On-site pages and the PDF download are views of it, not
separate records. _Avoid_: CMS, content database, duplicated page-local copy,
hand-maintained download distinct from the site

**Profile**: The on-page section that presents Identity (and location when shown
on Resume). _Avoid_: About, bio essay, dedicated /about page

**Home**: The landing surface: Identity plus the work index of Case Studies.
Contact stays in chrome; Writing is out of scope. _Avoid_: Work-only home,
manifesto hero, cryptic craft-only landing, tall about-me first screen,
card-grid project gallery, blog/writing index, contact-form page

**Resume**: The credentials surface for hiring skim: Profile, Experience,
Projects, Skills grouped into a few labelled bands, Languages, degree-only
Education, and a PDF download
of the same Catalog facts. _Avoid_: About, CV as the site word, thin bio-only
page, career timeline as the product, ATS download, second PDF narrative, Craft
Logbook styling in the PDF, multi-page PDF, outcome bullets or Showcases on
Resume, full school history below degree, skills laundry list, /about redirect

**Resume view**: The single structural description of the Resume — ordered
sections with headings and content strings — that the on-site Resume page and
the print/PDF adapter both render. Derived from the Catalog on every call; not
a third record. _Avoid_: section order or headings encoded in a view, Resume
structure duplicated per adapter

**Experience**: A paid or engaged position on the Resume: title, organization,
location, date range, and short ownership bullets. Describes what was owned in
that engagement; not a Case Study and not Capsule role. _Avoid_: Role (as the
Resume noun), job card, employment essay, collapsing Experience into Projects

**Projects**: Resume entries projected from Case Studies: title, index summary,
and link — no outcome bullets or Showcases. _Avoid_: Second Case Study body,
portfolio gallery cards, outcome bullets on Resume
