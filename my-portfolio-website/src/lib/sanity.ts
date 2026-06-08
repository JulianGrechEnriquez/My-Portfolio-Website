import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'pfcxsvqp'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-08',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: unknown) => builder.image(source)
export default client
