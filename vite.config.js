import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //   plugins: [react()],
  base: "/gruppeoppgave-mathias-og-erlend/",
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
});
