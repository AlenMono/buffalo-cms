"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './button'

type Item = {
    image?: { url?: string; alt?: string } | number | null
    alt?: string
}

export default function ImageSwiper({ items }: { items: Item[] }) {
    // hooks must be at top-level and always called
    const prevRef = useRef<HTMLButtonElement | null>(null)
    const nextRef = useRef<HTMLButtonElement | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)

    if (!items || items.length === 0) return null

    return (
        <div className="relative">
            <div className="bg-background-light border border-primary-dark p-2 rounded-lg relative">

                <Swiper
                    modules={[Pagination, Navigation]}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    pagination={{ clickable: true, el: paginationRef.current as unknown as string, dynamicBullets: true, dynamicMainBullets: 5 }}
                    onBeforeInit={(swiper) => {
                        // ensure navigation elements are wired (refs set)
                        // @ts-expect-error - wiring refs for Swiper navigation
                        swiper.params.navigation.prevEl = prevRef.current
                        // @ts-expect-error - wiring refs for Swiper navigation
                        swiper.params.navigation.nextEl = nextRef.current
                        // wire pagination container into swiper params
                        // @ts-expect-error - wiring ref for Swiper pagination element
                        swiper.params.pagination.el = paginationRef.current
                    }}
                    className="w-full h-full"
                >
                    {items.map((item, idx) => {
                        const src = typeof item.image === 'object' && item.image?.url ? item.image.url : typeof item.image === 'string' ? item.image : ''
                        const alt = item.alt ?? (typeof item.image === 'object' ? item.image?.alt ?? '' : '')

                        return (
                            <SwiperSlide key={idx}>
                                {src ? (
                                    <div className="relative w-full h-[590px]">
                                        <Image src={src} alt={alt || 'gallery image'} fill className="object-cover" />
                                    </div>
                                ) : null}
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className='flex items-center justify-center gap-4 mt-4 relative'>
                <Button
                    ref={prevRef}
                    aria-label="Previous"
                    variant="ghost"
                    size="sm"
                    className="swiper-custom-prev"
                >
                    <ArrowLeft className='w-5 h-5' />
                </Button>
                <div
                    ref={paginationRef}
                    className="swiper-pagination-custom flex gap-2 !w-auto"
                />
                <Button
                    ref={nextRef}
                    aria-label="Next"
                    variant="ghost"
                    size="sm"
                    className="swiper-custom-next"
                >
                    <ArrowRight className='w-5 h-5' />
                </Button>
            </div>
        </div>
    )
}
