/**
 * Spaziatura verticale delle sezioni.
 * `standalone`: la sezione apre una pagina separata (privacy, cookie),
 * quindi lascia spazio in alto per l'header fisso.
 */
export function sectionPadding(standalone = false) {
  return standalone
    ? "pt-[150px] pb-[85px] md:pt-[190px] md:pb-[126px]"
    : "py-[85px] md:py-[126px]";
}
