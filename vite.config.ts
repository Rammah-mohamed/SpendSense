import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	// vite.config.ts
	build: { rollupOptions: { output: { manualChunks: {} } } },
	plugins: [
		react(),
		tailwindcss(),
		visualizer({ filename: "dist/bundle-analysis.html", open: false }),
	],
	base: "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
