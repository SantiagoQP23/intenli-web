// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static site. Spanish is the default language at the plain URLs
// (/money/privacy); English lives under /en (/en/money/privacy).
export default defineConfig({
  site: "https://intenli.com",
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
