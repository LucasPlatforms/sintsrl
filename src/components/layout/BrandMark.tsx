import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LogoSint } from "./LogoSint";

type BrandMarkProps = {
  label: string;
  /** Logo chiaro, per i fondi scuri come il footer. */
  inverse?: boolean;
  onClick?: () => void;
};

export function BrandMark({ label, inverse = false, onClick }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex items-center",
        inverse ? "text-white" : "text-ink",
      )}
    >
      <LogoSint className="h-9 w-auto md:h-10" />
    </Link>
  );
}
