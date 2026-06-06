import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'f5jgmo2u',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  },
  deployment: {
    appId: 'n4maqy081c8lquop40kvmn8k',
    autoUpdates: true,
  },
  /**
   * Configure Sanity TypeGen to emit types into the frontend app.
   * See: https://www.sanity.io/docs/help/configuring-typegen-in-sanity-cli-config
   */
  typegen: {
    path: '../src/**/*.{ts,tsx,js,jsx}',
    // generates: '../src/builders/sanity.types.ts',
  },
})
