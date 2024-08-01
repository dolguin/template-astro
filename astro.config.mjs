import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'

export default defineConfig({
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles: false
  }), vue()],
  security: {
    checkOrigin: true
  },
  server: {
    port: 3003
  }
})
