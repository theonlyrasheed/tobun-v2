import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'qjs5xtv7',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  },
  deployment: {
    autoUpdates: true,
    appId: process.env.VITE_SANITY_APP_ID || 'h5yd89jt8u5qfuajq3is2ngs',
  },
  /**
   * Configure Sanity TypeGen to emit types into the frontend app.
   * See: https://www.sanity.io/docs/help/configuring-typegen-in-sanity-cli-config
   */
  typegen: {
    path: '../src/**/*.{ts,tsx,js,jsx}',
  },
})
