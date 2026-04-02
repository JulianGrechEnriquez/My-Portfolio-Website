// sanity.js
import { createClient } from 'https://cdn.skypack.dev/@sanity/client'

export const client = createClient({
  projectId: 'pfcxsvqp', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})