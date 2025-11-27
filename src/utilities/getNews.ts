import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getNews() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-date',
    pagination: false,
    depth: 1,
  })

  return result.docs || []
}
