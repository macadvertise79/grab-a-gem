import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function getPlugins(mode: string) {
  const list = [react()];
  if (mode === "development") {
    try {
      list.push(componentTagger());
    } catch {
      // optional; dev server still runs if tagger fails
    }
  }
  return list;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (mode === "production") {
    const missingVars = [
      "VITE_SHOPIFY_STORE_DOMAIN",
      "VITE_SHOPIFY_STOREFRONT_TOKEN",
    ].filter((key) => !env[key]?.trim());

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required Shopify env vars for production build: ${missingVars.join(", ")}`
      );
    }
  }

  return {
    base: env.VITE_BASE_PATH ?? "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: getPlugins(mode),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
