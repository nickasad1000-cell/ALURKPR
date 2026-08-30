import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      // "server-only" package throws saat diimpor di luar konteks RSC (vitest).
      "server-only": fileURLToPath(
        new URL("./tests/stubs/server-only.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["lib/**/*.test.ts", "content/**/*.test.ts"],
    environment: "node",
  },
});
