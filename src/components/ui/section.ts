/**
 * Spaziatura verticale delle sezioni.
 * `asPage`: la sezione è il contenuto principale di una pagina interna,
 * quindi lascia spazio all'header sovrapposto in alto.
 */
export function sectionPadding(asPage = false) {
  return asPage
    ? "pt-[150px] pb-[85px] md:pt-[190px] md:pb-[126px]"
    : "py-[85px] md:py-[126px]";
}
