# Craft Logbook

Personal product-engineer portfolio for Shayan: Home (work index), Case Studies, and Resume.

## Setup

```bash
mise install
mise run setup
nub run dev
```

The project uses Node 24 LTS and Nub 0.7.5. The committed `nub.lock` makes installs reproducible.

## Commands

- `nub run dev` starts the development server.
- `nub run build` creates a Cloudflare Workers production build.
- `nub run preview` previews the production build locally (Vite).
- `nub run deploy` builds and deploys with Wrangler (`wrangler login` first).
- `nub run test` runs unit and end-to-end tests.
- `nub run check` runs type checking, linting, formatting checks, and unit and end-to-end tests (the e2e run builds the app, so a broken production build fails `check`).
- `nub run resume:pdf` regenerates the committed Resume PDF after Catalog changes; `nub run check` fails if it drifts.

Testing policy (seam-first layers, what not to add): [`docs/testing.md`](docs/testing.md).

## Deploy

Production runs on Cloudflare Workers at [shayanameen.work](https://shayanameen.work) (see `docs/adr/0004-cloudflare-workers-hosting.md`).

Git pushes to `main` deploy via Cloudflare **Workers Builds**; other branches upload preview versions. Local one-shot: `nub run deploy` (after `wrangler login`).

Workers Builds is configured in the Cloudflare dashboard under the Worker's **Settings → Build**:

| Setting                              | Value                    |
| ------------------------------------ | ------------------------ |
| Production branch                    | `main`                   |
| Build command                        | `nub ci`                 |
| Deploy command                       | `nub run deploy`         |
| Non-production branch builds         | Enabled                  |
| Non-production branch deploy command | `nub run deploy:preview` |
| Root directory                       | _(repository root)_      |

Workers Builds installs the committed lockfile with Nub before running the package scripts. The package scripts own the Vite build so production and preview uploads use the same build path. Run `nub run deploy:preview` to upload a preview version manually.

Workers Builds should define:

| Variable                              | Purpose                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| `VITE_SITE_ORIGIN`                    | Canonical origin (`https://shayanameen.work`) — keep in sync with Catalog `siteOrigin` |
| `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon token                                                  |
| `SKIP_DEPENDENCY_INSTALL`             | `true` (the Build command runs the pinned Nub install)                                 |

After changing `siteOrigin` or Catalog facts that appear in the PDF, run `nub run resume:pdf` and commit the result.

## Stack

- TanStack Start with file-based routing on Cloudflare Workers (`@cloudflare/vite-plugin` + Wrangler)
- Tailwind CSS with locally defined semantic tokens
- Oxlint, Oxfmt, Vitest, Playwright, and axe

Domain language: `CONTEXT.md`. Product contract: `docs/adr/0001-craft-logbook-visual-direction.md`. Copy voice: `docs/adr/0003-plain-concrete-copy-voice.md`.
