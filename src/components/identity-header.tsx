import type { ReactNode } from "react";

import { identity } from "@/catalog/portfolio";

export function IdentityHeader({ label, aside }: { label: string; aside?: ReactNode }) {
  return (
    <header className="mt-14 grid gap-2 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
      <div>
        <p className="label text-muted-foreground">{label}</p>
        <h1 className="mt-1 text-xl font-medium tracking-tight text-foreground">{identity.name}</h1>
      </div>
      <div className="flex flex-col gap-1 sm:items-end">
        <p className="meta">{identity.role}</p>
        {aside}
      </div>
    </header>
  );
}
