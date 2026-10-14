import { cn } from "@/lib/cn";

type AccentHeadingProps = {
  as?: "h1" | "h2" | "h3";
  /** Prima riga in colore testo, righe successive in colore d'accento. */
  lines: readonly string[];
  className?: string;
  accentClassName?: string;
};

export function AccentHeading({
  as: Tag = "h2",
  lines,
  className,
  accentClassName = "text-brand",
}: AccentHeadingProps) {
  const [first, ...rest] = lines;

  return (
    <Tag className={className}>
      {first}
      {rest.length > 0 && (
        <span className={cn("block", accentClassName)}>{rest.join(" ")}</span>
      )}
    </Tag>
  );
}
