import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist/cdn",
        lib: {
            name: "ilw-card",
            entry: "ilw-card.ts",
            fileName: "ilw-card",
            formats: ["es"],
        },
    },
    server: {
        hmr: false,
    },
});
