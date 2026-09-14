import type { ShowcaseBlock } from "@/catalog/portfolio";

export function ShowcaseArtifact({ showcase }: { showcase: ShowcaseBlock }) {
  return (
    <figure className="w-full">
      <a
        href={showcase.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size ${showcase.label} image`}
        className="block overflow-hidden border border-border bg-muted/40 transition-opacity hover:opacity-95 focus-visible:opacity-95"
      >
        <img
          src={showcase.src}
          alt={showcase.alt}
          width={showcase.width}
          height={showcase.height}
          sizes="(min-width: 768px) 40rem, 100vw"
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover"
        />
      </a>
      <figcaption className="mt-2 flex flex-col gap-0.5">
        <span className="meta">{showcase.label}</span>
        <span className="text-sm text-muted-foreground">{showcase.caption}</span>
      </figcaption>
    </figure>
  );
}
