import RichText from '@/components/RichText'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PreNeedIcon from '/public/img/planning/pre-need.svg'
import AtNeedIcon from '/public/img/planning/at-need.svg'
import NearNeedIcon from '/public/img/planning/near-need.svg'

type PlanningCard = {
    heading: string
    subheading: string
    description: string
    link?: string // button label or text
    buttonLabel?: string // ✅ new field for button target (URL or route)
    badges?: { badge: string }[] // ✅ new field for badge list
    cardBackground?: 'default' | 'floral'
    buttonVariant: 'default' | 'outline' | 'primary' | 'primary-outline'
}

type PlanningBlockProps = {
    planningCards: PlanningCard[]
    planningTitle?: any
    description?: string
}

export const PlanningBlock: React.FC<PlanningBlockProps> = ({
    planningTitle,
    description,
    planningCards,
}) => {
    return (
        <section>
            <div
                className={cn(
                    'mx-auto space-y-8',
                    planningCards[0]?.badges && planningCards[0]?.badges?.length > 0
                        ? 'max-w-[1320px]'
                        : 'max-w-[1128px]',
                )}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 mb-10 gap-5">
                    {planningTitle && (
                        <RichText
                            data={planningTitle}
                            paragraphClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
                            h1ClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
                        />
                    )}
                    {description && (
                        <div className="flex md:justify-end">
                            <p className="max-w-[460px] text-lg text-brand-30">{description}</p>
                        </div>
                    )}
                </div>

                <div className="flex -mx-4 px-4 overflow-auto lg:overflow-visible lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-center gap-6">
                    {planningCards.map((card, idx) => {
                        let backgroundIcon = PreNeedIcon;

                        switch (idx) {
                            case 0:
                                backgroundIcon = PreNeedIcon;
                                break;
                            case 1:
                                backgroundIcon = AtNeedIcon;
                                break;
                            case 2:
                                backgroundIcon = NearNeedIcon;
                                break;
                        }

                        const isCardWithBadges = card.badges && card.badges.length > 0;

                        return (
                            <Link
                                href={card.link || ''}
                                key={idx}
                                className='card-hovered flex py-4 pt-3 px-4 lg:px-6 pb-5 rounded-lg relative min-h-[188px] min-w-[300px] border border-primary-dark cursor-pointer bg-background-light overflow-hidden'
                            >
                                <div className="flex flex-col z-10">
                                    <div className="flex-1">
                                        <h3 className={cn("font-semibold mb-1 font-faustina italic", isCardWithBadges ? "text-[24px] leading-[32px] lg:text-4xl" : "text-xl font-semibold mb-1")}>
                                            {card.heading}
                                        </h3>
                                        <p className={cn("text-brand-30 mb-4", isCardWithBadges ? 'text-xs lg:text-base' : 'text-xs md:text-sm')}>{card.subheading}</p>

                                        {isCardWithBadges && (
                                            <div className="flex flex-wrap gap-1 gap-y-2 mb-4 mt-44">
                                                {card.badges?.map((b, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-sm border rounded-full px-3 py-1 text-brand-30"
                                                    >
                                                        {b.badge}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center gap-4">
                                        <p
                                            className={cn(
                                                'text-brand-30',
                                                isCardWithBadges ? 'text-sm lg:text-lg' : 'text-sm lg:text-base',
                                            )}
                                        >
                                            {card.description}
                                        </p>

                                        {card.link && !card.buttonLabel && (
                                            <Button
                                                className={buttonVariants({
                                                    variant: 'outline',
                                                    className: 'min-w-10 min-h-10 !p-0',
                                                })}
                                            >
                                                <ArrowRight className="h-6 w-6" />
                                            </Button>
                                        )}
                                    </div>
                                    {card.buttonLabel && (
                                        <Button
                                            className={buttonVariants({
                                                variant: card.buttonVariant,
                                                className: 'mt-6',
                                            })}
                                        >
                                            {card.buttonLabel}
                                        </Button>
                                    )}
                                </div>
                                <Image
                                    src={backgroundIcon}
                                    alt={card.heading}
                                    className={cn('absolute right-0 z-0', idx === 0 ? "top-0" : "top-6")}
                                    width={170}
                                    height={420}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section >
    )
}
