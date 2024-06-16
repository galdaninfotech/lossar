import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});