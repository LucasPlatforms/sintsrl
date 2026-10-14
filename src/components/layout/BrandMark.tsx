import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  label: string;
  inverse?: boolean;
  onClick?: () => void;
};

// TODO: sostituire con il logo vettoriale ufficiale (SVG) quando disponibile.
export function BrandMark({ label, inverse = false, onClick }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex items-center font-display text-[28px] leading-none font-extrabold tracking-[-0.08em] lowercase",
        inverse ? "text-white" : "text-[#0a0c0b]",
      )}
    >
      sint
    </Link>
  );
}
