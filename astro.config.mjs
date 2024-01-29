import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { SITE_URL, SITE_REPO } from "./src/data/config";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), sitemap(), robotsTxt()],
    site: SITE_URL,
    base: SITE_REPO,
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "nord",
            wrap: false,
        },
    },
});
