// sanity.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@sanity/client@6.10.0/+esm'

export const client = createClient({
  projectId: 'pfcxsvqp', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})