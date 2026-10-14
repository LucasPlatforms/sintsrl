/** Unisce classi CSS ignorando valori vuoti o falsi. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
