import { cn } from "@/lib/cn";

type KickerProps = {
  children: React.ReactNode;
  /** "dark" per le sezioni su fondo scuro. */
  tone?: "light" | "dark";
  className?: string;
};

/** Etichetta piccola sopra i titoli di sezione. */
export function Kicker({ children, tone = "light", className }: KickerProps) {
  return (
    <p
      className={cn(
        "text-sm font-extrabold tracking-[0.16em] uppercase",
        tone === "dark" ? "text-mint" : "text-brand",
        className,
      )}
    >
      {children}
    </p>
  );
}
