import ImageSwiper from '@/components/ui/ImageSwiper.client';
import React from 'react'

type Item = {
    image?: { url?: string; alt?: string } | number | null
    alt?: string
}

export default function ImageGalleryBlock({ imageGalleries }: { imageGalleries?: Item[] }) {
    if (!imageGalleries || imageGalleries.length === 0) return null

    return (
        <div className="max-w-[1320px] mx-auto relative">
            <ImageSwiper items={imageGalleries} />
        </div>
    )
}
