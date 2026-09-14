/**
 * Injects Cloudflare Web Analytics when a site token is configured.
 * Token is a public beacon token (not a server secret); set via
 * VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN in Workers Builds / local env.
 */
export function CloudflareWebAnalytics() {
  const token = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
  if (typeof token !== "string" || token.length === 0) {
    return null;
  }

  return (
    <script
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
