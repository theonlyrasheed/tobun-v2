import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemas} from './schemas'
import {deskStructure} from './desk-structure'

export default defineConfig({
  name: 'default',
  title: 'Olubukola Art',

  projectId: process.env.VITE_SANITY_PROJECT_ID || 'qjs5xtv7',
  dataset: process.env.VITE_SANITY_DATASET || 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemas,
  },
})
