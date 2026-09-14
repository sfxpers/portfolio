# Research: Nub (nubjs) for this portfolio

## Summary

Nub is a Rust CLI that runs TypeScript and `package.json` scripts on **stock Node**, and can also install dependencies. It is not a React, Vite, or Workers replacement. The original research below recommended a local-only adoption, but this repository now intentionally takes the hard migration path: Nub owns the lockfile, package scripts, installs, and local tool pin. Cloudflare Workers + Wrangler remain the production host and deploy tooling.

## Decision: hard migration

The repository has adopted Nub 0.7.5 as its package manager and script runner:

- `mise.toml` pins the exact `nub = "0.7.5"` binary.
- `nub.lock` replaces `pnpm-lock.yaml`; `pnpm-workspace.yaml` is removed.
- `packageManager` is pinned to `nub@0.7.5`, and native dependency approvals live in `package.json#allowBuilds`.
- `package.json` scripts use `nub run`, `nubx`, or the direct Nub TypeScript runner. `jiti` is no longer a direct dependency.
- Workers Builds must skip automatic dependency detection and run `nub ci` explicitly before `nub run deploy`.
- No project-level release-age exclusions are retained; Nub’s default 24-hour cooling window applies.
- The Resume PDF byte-lock and full `nub run check` suite pass after migration.

The compatibility and risk notes below remain useful background, but the earlier “keep pnpm” recommendations are superseded by this decision.

## What Nub is / is not

**Is:** an all-in-one Node _toolchain_ written in Rust. One binary covers a TypeScript file runner, a pnpm-shaped package manager, a `package.json` script runner, a bin runner (`nubx`), a Node version manager, a watcher, and a GitHub Action. Every augmentation rides on Node’s public surfaces (`module.registerHooks()`, `--import`, `NODE_OPTIONS`, N-API). There is no Nub JS engine. ([Introduction](https://nubjs.com/docs), [FAQ](https://nubjs.com/docs/faq), [Introducing Nub](https://nubjs.com/blog/introducing-nub))

**Is not:**

- A UI framework or TanStack/React alternative. Application code stays on Node’s public surface; there is no `nub:*` module namespace and no `"nub"` field in `package.json`. ([FAQ](https://nubjs.com/docs/faq))
- The production runtime for this site. Deployed Workers execute on Cloudflare’s runtime, not Node-with-Nub. ([Cloudflare](https://nubjs.com/docs/deployment/cloudflare), [ADR-0004](../adr/0004-cloudflare-workers-hosting.md))
- A Vite, Playwright, Vitest, Wrangler, or oxlint replacement. `nub run dev` still runs whatever the `dev` script already is. ([FAQ](https://nubjs.com/docs/faq))
- Required as the installer. Official docs say keep npm/pnpm/yarn/bun and use Nub only for files, scripts, and bins. ([Package manager](https://nubjs.com/docs/install))

Install locally with `npm install -g @nubjs/nub`, `brew install nubjs/tap/nub`, or `mise use -g nub`. Current stable on GitHub is **v0.7.5**; canary is a rolling `main` build and is not the channel to pin this repo to. ([Introduction](https://nubjs.com/docs), [Releases](https://github.com/nubjs/nub/releases))

## Repo surfaces it could replace

| This repo today                                                                                   | Nub equivalent                                  | Fit                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jiti scripts/generate-resume-pdf.ts` plus `JITI_TSCONFIG_PATHS=1` in `package.json` `resume:pdf` | `nub scripts/generate-resume-pdf.ts`            | **Best first slice.** The script is ESM TypeScript that imports `@/catalog/...`. Nub applies `tsconfig.json` `paths` at runtime. ([Runtime](https://nubjs.com/docs/runtime), [FAQ](https://nubjs.com/docs/faq))                                                                                                                                                                               |
| `pnpm <script>` / nested `pnpm typecheck && …` in `package.json`                                  | `nub run <script>`                              | **Local-only, low risk.** Docs claim a drop-in for `pnpm run` (same flags, lifecycle hooks, workspace topology). Bare `nub dev` does _not_ fall through to scripts. ([Script runner](https://nubjs.com/docs/runner/run))                                                                                                                                                                      |
| `pnpm exec playwright …` in `mise.toml` `setup`                                                   | `nubx playwright …`                             | **Optional local alias.** `nubx` is local-first, then registry. ([FAQ](https://nubjs.com/docs/faq), [Runner](https://nubjs.com/docs/runner))                                                                                                                                                                                                                                                  |
| `mise.toml` `[tools] node = "24.19.0"`                                                            | `nub node` / `.node-version` / `engines.node`   | **Partial.** Nub reads `.tool-versions` (`node` / `nodejs`) and `package.json#engines.node` (`>=24 <25` here). It does **not** list `mise.toml` in the pin walk. With mise on `PATH`, Nub will use that Node if it satisfies the pin. ([Node manager](https://nubjs.com/docs/node))                                                                                                           |
| `mise.toml` `[tools] pnpm = "11.21.0"` and `packageManager: "pnpm@11.21.0"`                       | `nub pm` (Corepack-shaped) or keep pnpm         | **Keep the pin.** `nub pm` provisions the exact `packageManager` version. Do not rewrite the field to `nub@…`. ([Package meta-manager](https://nubjs.com/docs/pm))                                                                                                                                                                                                                            |
| `pnpm install --frozen-lockfile` / `nub ci`                                                       | `nub install --frozen-lockfile` / `nub ci`      | **Needs proof.** This lockfile is pnpm v9 (`lockfileVersion: '9.0'`), which Nub round-trips when pnpm is incumbent. Workspace keys in `pnpm-workspace.yaml` (`allowBuilds`, `minimumReleaseAgeExclude`) are claimed as honored. Layout keys are not. ([pnpm incumbent](https://nubjs.com/docs/install/pnpm), [lockfile compatibility](https://nubjs.com/docs/install#lockfile-compatibility)) |
| Workers Builds deploy: `pnpm deploy` / `pnpm deploy:preview`                                      | `nub run deploy` if Nub is on the image `PATH`  | **Needs proof.** Nub’s Cloudflare page says Workers Builds has preinstalled Nub since 2026-07-30. Cloudflare’s own [build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) page does **not** list Nub. This repo has no GitHub Actions, so `nubjs/setup-nub` is unused.                                                                                            |
| Playwright `webServer.command: "pnpm preview --host 127.0.0.1"`                                   | could become `nub run preview --host 127.0.0.1` | Cosmetic. The preview process is still Vite.                                                                                                                                                                                                                                                                                                                                                  |

`scripts/generate-resume-pdf.ts` is the only jiti consumer. It writes the committed Resume PDF that `check` byte-locks ([ADR-0002](../adr/0002-resume-pdf-download.md), [testing.md](../testing.md)). Playwright Chromium still has to launch; Nub only replaces the TS loader.

## What must stay

- **Cloudflare Workers + Wrangler + `@cloudflare/vite-plugin`.** ADR-0004 is the host decision. Nub itself says Workers use Cloudflare’s `fetch` handler, not a Node HTTP server. ([ADR-0004](../adr/0004-cloudflare-workers-hosting.md), [Cloudflare](https://nubjs.com/docs/deployment/cloudflare), [TanStack Start on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/))
- **TanStack Start, React 19, Vite 8, Tailwind, oxlint/oxfmt, Vitest, Playwright.** Nub does not own bundling, lint, or tests. ([FAQ](https://nubjs.com/docs/faq))
- **`pnpm-lock.yaml` as the committed lockfile.** Workers Builds picks the package manager from the lockfile it finds and does **not** recognize `nub.lock`. A Nub-owned project would need `SKIP_DEPENDENCY_INSTALL=true` plus a custom install command, then the next `nub install` errors if Cloudflare wrote a second lockfile. Keeping pnpm-owned is the path Nub documents as “unaffected.” ([Cloudflare](https://nubjs.com/docs/deployment/cloudflare))
- **`packageManager: "pnpm@11.21.0"`** and the `engines` range. README still documents `PNPM_VERSION` because Cloudflare’s image default is pnpm 10.x (currently listed as 10.11.1). ([README](../../README.md), [Workers build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/))
- **`pnpm-workspace.yaml` `allowBuilds`** for `esbuild`, `lightningcss`, `sharp`, `workerd`. Those native/build steps still have to run whoever installs. Under a pnpm incumbent, Nub says it honors `pnpm.allowBuilds` / `onlyBuiltDependencies`. ([pnpm incumbent](https://nubjs.com/docs/install/pnpm))
- **Catalog → Resume PDF contract.** Only the process that _runs_ `scripts/generate-resume-pdf.ts` can change; the committed PDF and check drift stay. ([ADR-0002](../adr/0002-resume-pdf-download.md))

## Incremental migration slices

Ordered, reversible, for _this_ repo.

1. **Safe — local binary only.** Install Nub with Homebrew or `mise use -g nub`. Do not commit `nub.jsonc`, do not change `package.json`. Confirm `nub --version` is 0.7.5 (stable), not canary. ([Introduction](https://nubjs.com/docs))
2. **Safe — prove the file runner.** From the repo root, run `nub scripts/generate-resume-pdf.ts` and compare bytes to the committed PDF. This is the jiti/`tsconfig` paths proof. If it fails, stop; jiti stays. No repo edit required.
3. **Needs proof — swap jiti in `resume:pdf`.** If slice 2 matches, change the script to `nub scripts/generate-resume-pdf.ts` and drop the `jiti` devDependency if nothing else imports it. Keep `pnpm resume:pdf` as the documented command. Revert is one line.
4. **Safe — optional local `nub run`.** Use `nub run dev` / `nub run check` locally. Leave `package.json` script bodies on `pnpm`/`vite`/`wrangler`. `nub run` is documented as independent of who installed `node_modules`. ([Script runner](https://nubjs.com/docs/runner/run), [Package manager](https://nubjs.com/docs/install))
5. **Needs proof — `nub install` vs this lockfile.** On a throwaway clone: `nub ci`, then `pnpm install --frozen-lockfile` must still say the lockfile is up to date. Check that `esbuild` / `lightningcss` / `sharp` / `workerd` actually built (`allowBuilds`). Check `minimumReleaseAgeExclude` still lets the pinned TanStack/Cloudflare versions resolve. Do **not** commit a rewritten lockfile unless `pnpm install --frozen-lockfile` is a no-op. ([pnpm incumbent](https://nubjs.com/docs/install/pnpm))
6. **Needs proof — Workers Builds `nub` binary.** Before changing deploy commands, confirm the Builds image actually has `nub` on `PATH` (Nub’s page vs Cloudflare’s image page disagree; see Gaps). Until then, keep `pnpm deploy` / `pnpm deploy:preview`.
7. **Do not — `nub pm use nub` / write `nub.lock`.** That makes Nub the owner, stops reading `pnpm-workspace.yaml` under Nub identity, and breaks Workers Builds auto-install. ([lockfile compatibility](https://nubjs.com/docs/install#lockfile-compatibility), [Cloudflare](https://nubjs.com/docs/deployment/cloudflare))
8. **Do not — move hosting off Workers, replace Vite, or run the site with `nub watch`.** Production is Workers; local `dev` is Vite. ([ADR-0004](../adr/0004-cloudflare-workers-hosting.md), [FAQ](https://nubjs.com/docs/faq))
9. **Do not — add `nubjs/setup-nub` or a GitHub Actions workflow** just to adopt Nub. This repo deploys via Workers Builds, not GHA. ([README](../../README.md), [GitHub Action](https://nubjs.com/docs/deployment/github-action))
10. **Maybe later — pin Node in a file Nub _and_ Cloudflare both read.** Nub’s Cloudflare page recommends `.node-version` / `.nvmrc` / `.tool-versions`. This repo currently pins Node only in `mise.toml` + `engines.node`. Adding `.node-version` (`24.19.0` or `24`) is optional and independent of Nub. Nub will not start reading `mise.toml`. ([Node manager](https://nubjs.com/docs/node), [Cloudflare](https://nubjs.com/docs/deployment/cloudflare))

## Risks and maturity

- **0.7.x, moving fast.** v0.7.0–0.7.5 landed config files, cooling-window behavior, Windows `nub run` breakage (0.7.0–0.7.2, fixed in 0.7.3), Homebrew `nubx` breakage (0.7.0, fixed in 0.7.1), and memory-retention fixes (0.7.5). Pin stable, not canary. ([Releases](https://github.com/nubjs/nub/releases))
- **Installer is the risky half.** Script/file running does not require Nub to own the lockfile. Installer bugs would touch `pnpm-lock.yaml` and native builds (`workerd`). Stay pnpm-owned until slice 5 is proven. ([Package manager](https://nubjs.com/docs/install))
- **`nub.jsonc` `install.minimumReleaseAge*` is ignored under a pnpm incumbent.** This repo’s cooling-window exclude list lives in `pnpm-workspace.yaml`; do not “migrate” it into `nub.jsonc` unless the project becomes Nub-owned (slice 7: do not). ([Config](https://nubjs.com/docs/config))
- **Nub does not implement `pnpm deploy`.** Irrelevant to this app’s `pnpm deploy` (that script is `vite build && wrangler deploy`, not `pnpm deploy` the packing command). ([pnpm incumbent](https://nubjs.com/docs/install/pnpm))
- **Node pin split-brain.** mise pins `24.19.0`; Workers Builds defaults to Node `24.18.0` unless overridden; Nub ignores `mise.toml`. Local `nub` will usually pick mise’s Node from `PATH` or the `engines.node` range, which may not be 24.19.0 exactly. ([Node manager](https://nubjs.com/docs/node), [Workers build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/))
- **Playwright / jiti still need a real Node.** Nub spawns stock Node; Chromium download (`mise` setup) is unchanged.

## Findings

1. **Nub is a Node toolchain, not a new runtime.** `nub <file>` transpiles with oxc and executes on the stock `node` binary. ([FAQ](https://nubjs.com/docs/faq), [Introducing Nub](https://nubjs.com/blog/introducing-nub))
2. **This site’s production host is out of scope.** ADR-0004 plus TanStack’s official Workers plugin path stay. Nub only participates in the _build_ on Cloudflare; the Worker itself is Cloudflare’s runtime. ([ADR-0004](../adr/0004-cloudflare-workers-hosting.md), [Cloudflare](https://nubjs.com/docs/deployment/cloudflare))
3. **The only first-party TS runner in-repo is `resume:pdf` via jiti.** `generate-resume-pdf.ts` imports `@/catalog/resume-download`. Nub documents `tsconfig.json#paths` resolution, which is exactly why `JITI_TSCONFIG_PATHS=1` exists. ([Runtime](https://nubjs.com/docs/runtime))
4. **`nub run` can wrap existing scripts without changing the installer.** Docs say package management stays with whatever already installed the tree, and `nub run` is claimed ~24× faster than `pnpm run` on the cold path. Speed is not a reason to migrate this small repo; compatibility is. ([Script runner](https://nubjs.com/docs/runner/run))
5. **pnpm is already the incumbent Nub prefers.** `packageManager: "pnpm@11.21.0"` + `pnpm-lock.yaml` v9. Inference walks `packageManager` → `devEngines.packageManager` → lockfile. pnpm lockfiles round-trip; yarn is read-only. ([lockfile compatibility](https://nubjs.com/docs/install#lockfile-compatibility), [pnpm incumbent](https://nubjs.com/docs/install/pnpm))
6. **`pnpm-workspace.yaml` is read only while pnpm owns the project.** Nub documents `allowBuilds` / `onlyBuiltDependencies` and “pnpm 11 resolution settings.” After `nub pm use nub`, a leftover `pnpm-workspace.yaml` is _not_ read. ([pnpm incumbent](https://nubjs.com/docs/install/pnpm), [lockfile compatibility](https://nubjs.com/docs/install#lockfile-compatibility))
7. **Workers Builds + `nub.lock` is a known footgun.** Cloudflare does not recognize `nub.lock`, may write a second lockfile, then `nub install` raises `ERR_NUB_LOCKFILE_AMBIGUOUS`. Workaround is `SKIP_DEPENDENCY_INSTALL=true`. Unnecessary if we keep `pnpm-lock.yaml`. ([Cloudflare](https://nubjs.com/docs/deployment/cloudflare), [Workers SKIP_DEPENDENCY_INSTALL](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/))
8. **Nub’s “preinstalled on Workers Builds” claim is first-party Nub, not first-party Cloudflare.** Cloudflare’s build-image table lists Node, pnpm, npm, yarn, Bun — not Nub. Treat image presence as unproven. ([Nub Cloudflare](https://nubjs.com/docs/deployment/cloudflare), [Workers build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/))
9. **Nub will not replace mise for this repo’s actual pin file.** Pin order is `NODE_EXECUTABLE` → `devEngines.runtime` → `.node-version` → `.nvmrc` → `.tool-versions` → `engines.node` → `PATH`. `mise.toml` is missing. mise can still _install_ the `nub` binary (`mise use -g nub`). ([Node manager](https://nubjs.com/docs/node), [Introduction](https://nubjs.com/docs))
10. **`nub pm` is the Corepack analog, separate from `nub install`.** Useful if we want `nub pm which` to fetch pnpm 11.21.0 without Corepack. Opt-in shims (`nub pm shim`) are unnecessary. ([Package meta-manager](https://nubjs.com/docs/pm))

## Sources

**Kept**

- [Nub introduction](https://nubjs.com/docs) — product surface, installers (npm/brew/mise), optional installer.
- [FAQ](https://nubjs.com/docs/faq) — not a runtime; TS/paths/JSX; keep Node replace toolchain; lockfile matrix; platforms.
- [Introducing Nub](https://nubjs.com/blog/introducing-nub) — design intent, oxc-on-stock-Node, claimed speed numbers.
- [Package manager](https://nubjs.com/docs/install) / [lockfile compatibility](https://nubjs.com/docs/install#lockfile-compatibility) — incumbent inference, `nub.lock` vs foreign lockfiles.
- [pnpm incumbent](https://nubjs.com/docs/install/pnpm) — v9 only, workspace YAML, `allowBuilds`, no `pnpm deploy`.
- [Script runner](https://nubjs.com/docs/runner/run) — `nub run` vs `pnpm run`.
- [Runtime](https://nubjs.com/docs/runtime) — `tsconfig` paths, JSX, `--node` escape hatch.
- [Node manager](https://nubjs.com/docs/node) — pin order; no `mise.toml`.
- [Deployment](https://nubjs.com/docs/deployment) / [Cloudflare](https://nubjs.com/docs/deployment/cloudflare) / [GitHub Action](https://nubjs.com/docs/deployment/github-action) — where Nub runs vs where the app runs.
- [Package meta-manager](https://nubjs.com/docs/pm) — `packageManager` pin, `nub pm use nub` consequences.
- [Config](https://nubjs.com/docs/config) — `minimumReleaseAge` ignored under pnpm identity.
- [Nub releases](https://github.com/nubjs/nub/releases) — v0.7.5 latest stable; canary exists.
- [Cloudflare Workers build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) — Node/pnpm defaults; no Nub listed; `SKIP_DEPENDENCY_INSTALL`.
- [TanStack Start · Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) — official host path this repo already follows.
- Repo: `package.json`, `mise.toml`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `scripts/generate-resume-pdf.ts`, `playwright.config.ts`, `docs/adr/0004-cloudflare-workers-hosting.md`, `docs/adr/0002-resume-pdf-download.md`.

**Dropped**

- Secondary recaps / Reddit / SEO pages — not owning sources.
- [nub init](https://nubjs.com/docs/init) — scaffolds a new app; this repo already exists and `init` refuses to overwrite.
- Vercel / Railway / Docker Nub guides — this app is Workers, not a Node container.
- Yarn PnP notes — this repo is not PnP.

## Gaps

- **Does the current Workers Builds image actually ship `nub`?** Nub says yes (since 2026-07-30); Cloudflare’s published image table does not mention it. Next step: a no-op preview build that prints `command -v nub || true` without changing deploy commands.
- **Does Nub honor this exact `pnpm-workspace.yaml`?** Docs mention `allowBuilds` and “pnpm 11 resolution settings,” but there is no first-party fixture named for `minimumReleaseAgeExclude` _and_ a long TanStack/Cloudflare exclude list. Next step: slice 5 on a throwaway clone.
- **`mise.toml` interop is undocumented.** Nub never claims to parse it. Whether `mise use -g nub` is in the public registry as a first-class plugin was not verified beyond Nub’s intro one-liner.
- **Byte-identity of `nub` vs `jiti` for the Resume PDF** is untested here. Playwright PDF bytes are stabilized in-repo, so this is cheap to prove.
- **Nub + Wrangler / `@cloudflare/vite-plugin` / `workerd` allowBuilds** — no official interop note. Expected to work because Nub is not in the bundle path, but native `workerd` install is the failure mode to watch.
- **Claimed 24× `nub run` / 2.9× vs tsx** come from Nub’s own benches. Not independently verified; irrelevant to a portfolio-sized script graph.

Migration outcome: Nub 0.7.5 is pinned locally, the lockfile and scripts are migrated, the Resume PDF remains byte-identical, and `nub run check` passes.
