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
    let listClassName = ""

    if (planningProcessLayout === "steps-a") {
        listClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
    }
    if (planningProcessLayout === "steps-c") {
        listClassName = "grid-cols-1 md:grid-cols-2"
    }
    return (
        <section className="max-w-[1320px] mx-auto">
            <div className="bg-background-light border border-primary-dark p-5 lg:px-9 lg:py-7 rounded-lg relative overflow-hidden">
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
                        /></>
                )}

                <div className='z-10 relative'>
                    {planningProcessTitle && (
                        <div className="mb-6  text-center">
                            <RichText data={planningProcessTitle} className="section-title" />
                        </div>
                    )}

                    {planningProcessDescription && (
                        <p className="mx-auto text-brand-30 text-center mb-12 max-w-[493px] text-sm md:text-base">
                            {planningProcessDescription}
                        </p>
                    )}

                    {planningProcessCards.length > 0 && (
                        <div className={cn("grid gap-4 flex-1", listClassName)}>
                            {planningProcessCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 bg-background border border-primary-dark rounded-lg flex flex-col justify-between gap-8 xl:gap-[132px]"
                                >
                                    <p className="font-faustina font-semibold text-lg md:text-2xl text-gold">0{idx + 1}</p>

                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-lg md:text-2xl font-bold text-brand">{card.heading}</h3>
                                        <p className="text-brand-30 text-sm">{card.description}</p>
                                        {card.link &&
                                            <div className='flex items-center gap-2'>
                                                <Link href={card.link || ''} className="text-sm font-bold items-center relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                                                    {card.linkLabel || 'View all options'}
                                                </Link>
                                                <MoveRightIcon />
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}</div>
            </div>
        </section>
    )
}
