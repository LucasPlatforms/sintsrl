import Image from "next/image";
import { Link } from "@/i18n/navigation";
import logo from "@/assets/logo-sint.jpg";

type BrandMarkProps = {
  label: string;
  /** Versione chiara del logo, per i fondi scuri (footer). */
  inverse?: boolean;
  onClick?: () => void;
};

export function BrandMark({ label, inverse = false, onClick }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      onClick={onClick}
      className="inline-flex items-center"
    >
      <Image src={logo} alt="" className="h-9 w-auto md:h-10" sizes="80px" />
    </Link>
  );
}
