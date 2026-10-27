import type { MDXComponents } from "mdx/types";

/**
 * Aspetto degli elementi scritti in Markdown (pagine privacy):
 * titoli, paragrafi, elenchi, link e tabelle con lo stile del sito.
 */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 mb-4 text-[clamp(24px,2.6vw,30px)] leading-[1.15] tracking-[-0.045em] text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-lg leading-snug font-bold tracking-[-0.02em] text-ink"
      {...props}
    />
  ),
  p: (props) => (
    <p className="my-4 text-[15px] leading-[1.75] text-muted" {...props} />
  ),
  ul: (props) => (
    <ul
      className="my-4 flex flex-col gap-2 pl-5 text-[15px] leading-[1.7] text-muted marker:text-brand [list-style:disc]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 flex flex-col gap-2 pl-5 text-[15px] leading-[1.7] text-muted marker:font-bold marker:text-brand [list-style:decimal]"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold text-ink" {...props} />,
  a: (props) => (
    <a
      className="font-semibold text-brand-dark underline underline-offset-3 hover:text-brand"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm text-muted"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b-2 border-brand px-3 py-2 font-bold text-ink"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-line px-3 py-2 align-top" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
