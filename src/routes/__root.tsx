import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { identity, positioning } from "@/catalog/portfolio";
import { CloudflareWebAnalytics } from "@/components/cloudflare-web-analytics";
import { NotFoundPanel } from "@/components/not-found-panel";
import { SystemColorScheme } from "@/components/system-color-scheme";

import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${identity.name} - ${identity.role}` },
      { name: "description", content: positioning },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: RootNotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <SystemColorScheme />
        {children}
        <CloudflareWebAnalytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <NotFoundPanel
      title="Page not found"
      description="Nothing lives at this URL. The home page lists the published case studies."
    />
  );
}
