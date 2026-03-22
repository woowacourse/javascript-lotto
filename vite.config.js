import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@woowacourse/mission-utils": resolve(
        __dirname,
        "./src/web/utils/mission-utils-browser.js"
      ),
    },
  },
});
