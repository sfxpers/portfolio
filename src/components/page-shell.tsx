import type { ReactNode } from "react";

import { SiteChrome } from "@/components/site-chrome";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-svh max-w-5xl px-5 pt-12 pb-28">
      <SiteChrome />
      {children}
    </main>
  );
}
