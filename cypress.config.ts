import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },

  env: {
    API_URL: "https://growtwitter-api-r4bi.onrender.com/api",
  },
});
