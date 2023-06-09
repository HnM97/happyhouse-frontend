import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        /** If you set esmExternals to true, this plugins assumes that 
      all external dependencies are ES modules */

        commonjsOptions: {
            esmExternals: true,
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
