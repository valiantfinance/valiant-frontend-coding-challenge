import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents (on) {
      on('file:preprocessor', vitePreprocessor())
    },
    specPattern: 'tests/e2e/specs/**',
    supportFile: 'tests/e2e/support/e2e.js',
  },
})
