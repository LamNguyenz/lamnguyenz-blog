// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://lamnguyenz.github.io",
  integrations: [mdx(), sitemap()],
  scopedStyleStrategy: "where",
});
