// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// https://astro.build/config
export default defineConfig({
  site: "https://lamnguyenz.github.io",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {},
  integrations: [
    expressiveCode({
      themes: ["dracula"],
      styleOverrides: {
        frames: {
          shadowColor: "transparent",
        },
      },
      plugins: [pluginCollapsibleSections()],
    }),
    mdx(),
    sitemap(),
    svelte(),
  ],
  scopedStyleStrategy: "where",
  prefetch: true,
});
