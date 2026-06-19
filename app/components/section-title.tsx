type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionTitleProps) {
  const descriptionClasses = centered
    ? "mt-4 mx-auto max-w-2xl text-base leading-7 text-muted md:text-lg"
    : "mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg";

  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-dark">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem] md:leading-tight">
        {title}
      </h2>
      {description ? (
        <p className={descriptionClasses}>{description}</p>
      ) : null}
    </div>
  );
}
