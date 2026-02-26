import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Cemetery } from '@/payload-types'

export async function getCemeteries() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'cemeteries',
    limit: 100,
    sort: 'order',
    pagination: false,
    depth: 1,
  })

  const docs: Cemetery[] = result.docs || []

  // Normalize shape so consumers can rely on consistent fields
  return docs.map((cAny) => {
    const imageObj =
      cAny.image && typeof cAny.image === 'object' && cAny.image.url
        ? { url: cAny.image.url, alt: cAny.image.alt ?? null }
        : undefined

    return {
      // keep both shapes so existing consumers continue to work
      id: cAny.id,

      // Payload collection fields (original shape)
      name: cAny.name,
      address: cAny.address ?? undefined,
      phone: cAny.phone ?? undefined,
      order: cAny.order ?? 0,
      subtitle: cAny.subtitle ?? undefined,
      workingHours: cAny.workingHours
        ? {
            weekday: cAny.workingHours.weekday ?? undefined,
            weekend: cAny.workingHours.weekend ?? undefined,
          }
        : undefined,
      detailsLink: cAny.detailsLink || '#',
      image: imageObj,

      // Block-compatible fields (cemeteryItemFields)
      cemeteryTitle: cAny.name,
      cemeteryAddress: cAny.address ?? undefined,
      cemeteryPhone: cAny.phone ?? undefined,
      hoursWeekdays: cAny.workingHours?.weekday ?? undefined,
      hoursSaturday: cAny.workingHours?.weekend ?? undefined,
    }
  })
}
