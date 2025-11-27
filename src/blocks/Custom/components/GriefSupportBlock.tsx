import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

interface SupportCard {
    id?: string | number
    supportTitle: any
    supportDescription: string
    supportButtonText?: string
    supportLink?: string
}

interface GriefSupportBlockProps {
    griefTitle?: any
    griefSubtitle?: string
    backgroundImage?: {
        url: string
        alt?: string
    }
    supportCards?: SupportCard[]
}

const GriefSupportBlock = ({
    griefTitle,
    griefSubtitle,
    backgroundImage,
    supportCards = [],
}: GriefSupportBlockProps) => {
    return (
        <section
            className={cn(
                'relative overflow-hidden py-20 px-8 rounded-lg bg-cover bg-center bg-no-repeat',
            )}
            style={{ backgroundImage: "url('/img/support-bg.png')" }}
        >
            {/* Background image overlay */}
            {backgroundImage?.url && (
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage.url}
                        alt={backgroundImage.alt || 'Background'}
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
            )}

            <div className="relative z-10 mx-auto px-4 md:px-6 text-center space-y-6">
                {griefTitle && (
                    <RichText
                        data={griefTitle}
                        className="text-3xl md:!text-[44px] lg:leading-[52px] font-faustina"
                    />
                )}
                {griefSubtitle && (
                    <p className="max-w-[640px] mx-auto text-sm md:text-base">
                        {griefSubtitle}
                    </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-10">
                    {supportCards.map((card, index) => (
                        <div
                            key={`grief_support_card_${index}`}
                            className="text-white rounded-lg p-5 flex flex-col justify-between min-h-[440px] bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: index % 2 === 0 ? `url('/img/support-flower-secondary-bg.png')` : `url('/img/support-flower-bg.png')` }}

                        >
                            <div className="flex flex-col justify-between items-start flex-1">
                                <RichText
                                    data={card.supportTitle}
                                    className="!text-[28px] leading-[36px] font-normal font-faustina !text-background text-left"
                                />
                                <p className="text-lg leading-[24px] mt-4 text-left text-background">
                                    {card.supportDescription}
                                </p>
                            </div>

                            {card.supportButtonText && (
                                <div className="mt-6">
                                    {card.supportLink ? (
                                        <Link
                                            href={card.supportLink}
                                            className="inline-block w-full border border-white text-white text-sm py-2 rounded-md hover:bg-white hover:text-[#1d2420] transition-all duration-200"
                                        >
                                            {card.supportButtonText}
                                        </Link>
                                    ) : (
                                        <Button
                                            variant="outline-white"
                                            className='w-full rounded-lg'
                                        >
                                            {card.supportButtonText}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GriefSupportBlock
