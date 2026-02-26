import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import { MoveRightIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

type PlanningCard = {
    heading: string
    description: string
    link?: string
    linkLabel?: string
}

type PlanningProcessBlockProps = {
    planningProcessTitle?: any
    planningProcessDescription?: string
    planningProcessCards?: PlanningCard[]
    planningProcessLayout?: 'steps-a' | 'steps-b' | 'steps-c'
}

export const PlanningProcessBlock: React.FC<PlanningProcessBlockProps> = ({
    planningProcessTitle,
    planningProcessDescription,
    planningProcessCards = [],
    planningProcessLayout,
}) => {
    let listClassName,
        cardSpacing = ''

    if (planningProcessLayout === 'steps-a' || planningProcessLayout === 'steps-b') {
        const cardCount = planningProcessCards.length || 4
        const xlGridCols = cardCount <= 2 ? 'xl:grid-cols-2' : cardCount === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'

        listClassName = `grid-cols-1 md:grid-cols-2 ${xlGridCols}`
        cardSpacing = 'gap-8 xl:gap-[132px]'
    }
    if (planningProcessLayout === 'steps-c') {
        listClassName = 'grid-cols-1 md:grid-cols-2'
        cardSpacing = 'gap-8 gap-12'

        if (planningProcessCards.length === 0) {
            return (
                <div className="flex flex-col justify-center items-center gap-3 bg-surface border border-gold-light p-5 lg:px-9 lg:py-7 rounded-lg relative overflow-hidden h-[416px] text-center">
                    <h3 className="section-title font-faustina text-brand-dark">No Current <br /> Openings</h3>
                    <p className="text-base text-brand-mid max-w-[493px] mx-auto">
                        We don’t have any open positions at the moment. Please check back in the future as
                        opportunities may become available.
                    </p>
                </div>
            )
        }
    }

    return (
        <section className="max-w-[1320px] mx-auto">
            <div className="bg-surface border border-gold-light p-5 lg:px-9 lg:py-7 rounded-lg relative overflow-hidden">
                {planningProcessLayout === 'steps-b' && (
                    <>
                        <Image
                            src="/img/wreath-full.svg"
                            width={999}
                            height={958}
                            alt="Wreath"
                            className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -left-[55%] md:transform md:translate-y-[-50%]"
                        />
                        <Image
                            src="/img/wreath-full.svg"
                            width={999}
                            height={958}
                            alt="Wreath"
                            className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -right-[55%] transform md:translate-y-[-50%] scale-x-[-1] "
                        />
                    </>
                )}

                <div className="z-10 relative">
                    {planningProcessTitle && (
                        <div className="mb-6 text-center">
                            <RichText data={planningProcessTitle} className="section-title" h3ClassName="!mb-0" />
                        </div>
                    )}

                    {planningProcessDescription && (
                        <p className="mx-auto text-brand-mid text-center mb-12 max-w-[493px] text-sm md:text-base">
                            {planningProcessDescription}
                        </p>
                    )}

                    {planningProcessCards.length > 0 && (
                        <div className={cn('grid gap-4 flex-1', listClassName)}>
                            {planningProcessCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        'p-5 bg-background border border-gold-light rounded-lg flex flex-col justify-between',
                                        cardSpacing,
                                    )}
                                >
                                    <p className="font-faustina font-semibold text-lg md:text-2xl text-gold">
                                        0{idx + 1}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-lg md:text-2xl font-bold text-brand">{card.heading}</h3>
                                        <p className="text-brand-mid text-sm">{card.description}</p>
                                        {card.link && (
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={card.link || ''}
                                                    className="text-sm font-bold items-center relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                                                >
                                                    {card.linkLabel || 'View all options'}
                                                </Link>
                                                <MoveRightIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
