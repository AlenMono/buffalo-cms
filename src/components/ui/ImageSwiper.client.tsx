"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './button'

type Item = {
    image?: { url?: string; alt?: string } | number | null
    alt?: string
}

export default function ImageSwiper({ items }: { items: Item[] }) {
    const prevRef = useRef<HTMLButtonElement | null>(null)
    const nextRef = useRef<HTMLButtonElement | null>(null)
    const swiperRef = useRef<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const swiper = swiperRef.current
        if (!swiper) return

        // @ts-expect-error - wiring refs for Swiper navigation
        swiper.params.navigation.prevEl = prevRef.current
        // @ts-expect-error - wiring refs for Swiper navigation
        swiper.params.navigation.nextEl = nextRef.current
        swiper.navigation.destroy()
        swiper.navigation.init()
        swiper.navigation.update()
    }, [])

    if (!items || items.length === 0) return null

    return (
        <div className="relative">
            <div className="bg-background-light border border-primary-dark p-2 rounded-lg relative">
                <Swiper
                    modules={[Navigation]}
                    navigation={{ prevEl: null, nextEl: null }}
                    onSwiper={(swiper) => { swiperRef.current = swiper }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="w-full h-full"
                >
                    {items.map((item, idx) => {
                        const src = typeof item.image === 'object' && item.image?.url ? item.image.url : typeof item.image === 'string' ? item.image : ''
                        const alt = item.alt ?? (typeof item.image === 'object' ? item.image?.alt ?? '' : '')

                        return (
                            <SwiperSlide key={idx}>
                                {src ? (
                                    <div className="relative w-full h-[205px] md:h-[590px]">
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

                <div className="flex gap-2 items-center">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => swiperRef.current?.slideTo(i)}
                            className={`swiper-pagination-bullet${i === activeIndex ? ' swiper-pagination-bullet-active' : ''}`}
                        />
                    ))}
                </div>

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
