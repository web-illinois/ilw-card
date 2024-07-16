import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        lib: {
            name: "ilw-card",
            entry: "ilw-card.js",
            fileName: "ilw-card",
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") return "ilw-card.css";
                },
            },
        },
    },
    server: {
        hmr: false,
    },
});
