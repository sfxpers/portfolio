# Cloudflare Workers is the production host

The portfolio deploys to **Cloudflare Workers** via TanStack Start’s official path (`@cloudflare/vite-plugin` + Wrangler), not Nitro and not Vercel. Production serves the custom domain `https://shayanameen.work`; CI is Workers Builds (`main` → production, other branches → preview versions). Visitor metrics use Cloudflare Web Analytics (build env `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN`); Workers Observability covers runtime logs/metrics. Vercel Analytics/Speed Insights and the Node/`nitro()` server output are removed with this host choice.

**Why Workers over keeping Nitro:** TanStack and Cloudflare document the Vite plugin path for Start; this app was not using Nitro as a multi-host layer. **Why not stay on the free `workers.dev` subdomain:** the custom domain presents a personal hostname while hosting cost and architecture are unchanged.
