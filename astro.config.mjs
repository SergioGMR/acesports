import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  build: {
    outDir: './dist',
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
});