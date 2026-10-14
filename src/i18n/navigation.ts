import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Versioni di Link, redirect e usePathname che conoscono lingue e slug tradotti.
// Nei componenti usa sempre questi al posto di quelli di "next/link" e "next/navigation".
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
