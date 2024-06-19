import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "app/commands/**",
        "app/config/**",
        "app/database/**",
        "app/validations/**",
        "app/dto/**",
        "app/http/handlers",
      ]
    }
  }
})