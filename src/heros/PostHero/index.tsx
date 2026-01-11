import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export const PostHero: React.FC<{
    post: Post
}> = ({ post }) => {
    const { categories, heroImage, publisher, publishedAt, title } = post

    return (
        <section className="pt-28 pb-20">
            <div className="container max-w-4xl text-center">
                {categories && categories.length > 0 && (
                    <p className="mb-6 text-xs tracking-widest uppercase text-neutral-600">
                        {categories.map((category, index) => {
                            if (typeof category === 'object' && category !== null) {
                                const isLast = index === categories.length - 1
                                return (
                                    <React.Fragment key={index}>
                                        {category.title || 'Untitled'}
                                        {!isLast && ' • '}
                                    </React.Fragment>
                                )
                            }
                            return null
                        })}
                    </p>
                )}

                <h1 className="font-faustina mb-6 hero-title text-brand">
                    {title}
                </h1>

                <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-brand font-satoshi">
                    {publishedAt && (
                        <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                    )}

                    {publisher && (
                        <>
                            <span>•</span>
                            <span className='font-bold'>{publisher}</span>
                        </>
                    )}
                </div>
            </div>

            {heroImage && typeof heroImage !== 'string' && (
                <div className="container mt-16">
                    <div className='border border-primary-dark bg-background-light p-3 rounded-lg'>
                        <Media
                            fill
                            priority
                            imgClassName="object-cover h-full max-h-[636px] w-full"
                            resource={heroImage}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
