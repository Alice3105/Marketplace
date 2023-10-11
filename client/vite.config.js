//Import defineConfig function which is used to defined the configuration for a Vite project
import { defineConfig } from "vite";
//Import react plugin 
//This plugin is designed to enable React support in Vite using the SWC compiler
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
//Export default configuration for the Vite project
export default defineConfig({
  //Configure to use react plugin for Vite
  plugins: [react()],
  build: {
    //Generate manifest file during the build
    manifest: true,
    //Configure Rollup which is the underlying bundler used by Vite
    rollupOptions: {
      //Specifies the entry point for the application
      input: "./src/main.jsx",
    },
  },
})
