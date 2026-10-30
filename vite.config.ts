// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Self-hosting target: the Lovable sandbox/publish always forces cloudflare-module and
// ignores this. Outside Lovable, pick the nitro preset for the host:
//   - NITRO_PRESET env var wins if set (any nitro preset name)
//   - Netlify CI (NETLIFY=true) -> "netlify" (serverless functions)
//   - everything else (Render, a VPS, local) -> "node-server" (node .output/server/index.mjs)
const nitroPreset =
  process.env.NITRO_PRESET || (process.env.NETLIFY ? "netlify" : "node-server");

export default defineConfig({
  nitro: { preset: nitroPreset },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
