import React from 'react'
import RichText from '@/components/RichText'

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
    <section className="max-w-[1320px] mx-auto py-20">
      <div className="bg-background-light border border-primary-dark px-9 py-7 rounded-lg">
        {planningProcessTitle && (
          <div className="mb-6  text-center">
            <RichText data={planningProcessTitle} className="!text-4xl font-faustina" />
          </div>
        )}

        {planningProcessDescription && (
          <p className="mx-auto text-gray-700 text-center mb-12 max-w-[493px]">
            {planningProcessDescription}
          </p>
        )}

        {planningProcessCards.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 flex-1">
            {planningProcessCards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 bg-background rounded-lg flex flex-col justify-between gap-8 xl:gap-[132px]"
              >
                <p className="font-faustina font-semibold text-2xl text-gold">{idx + 1}</p>

                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-bold text-brand">{card.heading}</h3>
                  <p className="text-brand-30 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
