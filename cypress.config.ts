import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://sweetshop.netlify.app',
    setupNodeEvents(on, config) {},
  },
})
