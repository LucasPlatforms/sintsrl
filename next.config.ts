import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Testi lunghi (privacy) scritti in Markdown: vedi src/content/legal/.
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // remark-gfm: tabelle, elenchi di spunte e link automatici nei file Markdown.
  options: { remarkPlugins: ["remark-gfm"] },
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // 404 unica per gli URL che non corrispondono a nessuna rotta
    // (vedi src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(withMDX(nextConfig));
