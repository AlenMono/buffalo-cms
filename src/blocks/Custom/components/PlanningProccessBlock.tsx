import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'

type PlanningCard = {
    heading: string
    description: string
}

type PlanningProcessBlockProps = {
    planningProcessTitle?: any
    planningProcessDescription?: string
    planningProcessCards?: PlanningCard[]
}

export const PlanningProcessBlock: React.FC<PlanningProcessBlockProps> = ({
    planningProcessTitle,
    planningProcessDescription,
    planningProcessCards = [],
}) => {
    return (
        <section className="max-w-[1320px] mx-auto">
            <div className="bg-background-light border border-primary-dark px-9 py-7 rounded-lg relative overflow-hidden">
                <Image
                    src="/img/wreath-full.svg"
                    width={999}
                    height={958}
                    alt="Wreath"
                    className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -left-[55%] md:-left-1/2 md:transform md:translate-y-[-50%]"
                />
                <Image
                    src="/img/wreath-full.svg"
                    width={999}
                    height={958}
                    alt="Wreath"
                    className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -right-[55%] md:-right-1/2 transform md:translate-y-[-50%] scale-x-[-1] "
                />

                <div className='z-10 relative'>
                    {planningProcessTitle && (
                        <div className="mb-6  text-center">
                            <RichText data={planningProcessTitle} className="!text-4xl font-faustina" />
                        </div>
                    )}

                    {planningProcessDescription && (
                        <p className="mx-auto text-brand-30 text-center mb-12 max-w-[493px]">
                            {planningProcessDescription}
                        </p>
                    )}

                    {planningProcessCards.length > 0 && (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 flex-1">
                            {planningProcessCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 bg-background border border-primary-dark rounded-lg flex flex-col justify-between gap-8 xl:gap-[132px]"
                                >
                                    <p className="font-faustina font-semibold text-2xl text-gold">0{idx + 1}</p>

                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-2xl font-bold text-brand">{card.heading}</h3>
                                        <p className="text-brand-30 text-sm">{card.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}</div>
            </div>
        </section>
    )
}
