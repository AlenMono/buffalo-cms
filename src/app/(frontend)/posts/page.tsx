import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import BackgroundVisual from '@/heros/components/BackgroundVisual'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: true,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publisher: true,
      publishedAt: true,
      id: true,
    },
  })

  return (
    <div className="container mt-8 lg:mt-16 relative pb-16">
      <BackgroundVisual heroImpact="high" backgroundVisual={'landing-d'} />

      <PageClient />
      <div className="container mb-16 md:mb-24 text-center">
        <h1 className='hero-title'><strong>News</strong> and Announcements</h1>
        <p className='hero-paragraph'>Updates, reflections, and community news from Buffalo Catholic Cemeteries.</p>
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Buffalo Catholic Cemeteries Posts`,
  }
}
