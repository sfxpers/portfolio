export function ProfileSection({
  heading,
  bio,
  location,
}: {
  heading: string;
  bio: string;
  location?: string;
}) {
  return (
    <section aria-label={heading} className="mt-8 border-t border-foreground pt-8">
      <h2 className="label text-muted-foreground">{heading}</h2>
      <p className="mt-3 text-base leading-relaxed text-foreground/80">{bio}</p>
      {location ? <p className="mt-3 meta">{location}</p> : null}
    </section>
  );
}
