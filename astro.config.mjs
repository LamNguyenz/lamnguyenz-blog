// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import addIdToH1Heading from "./src/utils/addIdToH1Heading";

// https://astro.build/config
export default defineConfig({
  site: "https://lamnguyenz.github.io",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [addIdToH1Heading],
  },
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      remarkPlugins: [addIdToH1Heading],
    }),
    sitemap(),
  ],
  scopedStyleStrategy: "where",
  prefetch: true,
});
