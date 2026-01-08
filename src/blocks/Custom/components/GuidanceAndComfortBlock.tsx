import React from 'react'
import RichText from '@/components/RichText'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import floralBG from '/public/img/promo-a.svg'
import Image from 'next/image'
import Link from 'next/link'

interface GuidanceAndComfortBlockProps {
    badgeText?: string
    guideTitle?: any
    guideDescription?: string
    guideButtonText?: string
    guideButtonLink?: string
    backgroundImage?: {
        url: string
        alt?: string
    }
    promoLayot?: 'promo-a' | 'promo-b',
    promoImage?: {
        url: string
        alt?: string
    }
}

const GuidanceAndComfortBlock = ({
    badgeText,
    guideTitle,
    guideDescription,
    guideButtonText = 'Download the Guidebook',
    promoLayot,
    promoImage,
    guideButtonLink
}: GuidanceAndComfortBlockProps) => {
    if (promoLayot === 'promo-b') {
        return (
            <section className='relative overflow-hidden rounded-lg bg-background-light p-5 lg:p-9 flex flex-col justify-between gap-10 md:gap-20 border border-secondary'>
                <Image
                    src={'/img/wreath-full.png'}
                    alt={'Background Image'}
                    width={760}
                    height={548}
                    className="absolute bottom-0 right-0 z-0"
                />

                <div className="flex flex-col lg:flex-row gap-10 z-10">
                    <div className='flex flex-col items-start justify-between gap-10'>
                        <div className='flex flex-col items-start'>
                            {badgeText && (
                                <div className="flex items-center px-3 py-1 rounded-full border border-brand-30 text-brand-30 text-xs font-medium mb-4">
                                    {badgeText}
                                </div>
                            )}
                            {guideTitle && (
                                <RichText
                                    data={guideTitle}
                                    className="text-3xl md:!text-[44px] md:leading-[52px] font-faustina"
                                />
                            )}
                        </div>
                        {guideDescription && (
                            <p className="max-w-[640px] lg:mx-auto text-base md:text-xl">
                                {guideDescription}
                            </p>
                        )}
                    </div>

                    <div className="bg-background-light border border-primary-dark p-2 rounded-lg relative">
                        <Image
                            src={promoImage?.url || '/img/default-promo-image.png'}
                            alt={promoImage?.alt || 'Promo Image'}
                            width={580}
                            height={450}
                            className="object-cover w-full h-auto lg:h-full lg:min-h-[450px]"
                        />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section
            className={cn(
                'relative overflow-hidden rounded-lg bg-background-light p-5 lg:p-9 xl:h-[548px] flex flex-col justify-between gap-10 md:gap-20 border border-secondary'
            )}
        >
            {/* Text Content */}
            <div className="relative flex-1 z-10">
                <div>
                    {badgeText && (
                        <span className="inline-block px-3 py-1 rounded-full border border-brand-30 text-brand-30 text-xs font-medium mb-4">
                            {badgeText}
                        </span>
                    )}

                    {guideTitle && (
                        <RichText
                            data={guideTitle}
                            className="section-title text-brand-30"
                        />
                    )}
                </div>
            </div>

            <div className='flex justify-between flex-wrap items-end  gap-8 z-10'>
                {guideDescription && (
                    <p className="max-w-[640px] text-base md:text-xl text-brand-30">
                        {guideDescription}
                    </p>
                )}

                <Link
                    href={guideButtonLink || '#'}
                    className={cn(buttonVariants({ variant: 'default', size: 'md' }))}
                >
                    {guideButtonText || 'Download the Guidebook'}
                </Link>
            </div>

            <Image
                src={floralBG}
                alt="Floral Background"
                width={760}
                height={548}
                className="absolute top-0 right-0 z-0"
            />
        </section>
    )
}

export default GuidanceAndComfortBlock

