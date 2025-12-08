import RichText from '@/components/RichText'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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
            <RichText data={planningTitle} paragraphClassName="text-left !text-4xl" />
          )}
          {description && (
            <div className="flex md:justify-end">
              <p className="max-w-[460px] text-lg text-brand-30">{description}</p>
            </div>
          )}
        </div>

        <div className="flex -mx-4 px-4 overflow-auto xl:overflow-visible xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-center gap-6">
          {planningCards.map((card, idx) => (
            <Link
              href={card.link || ''}
              key={idx}
              className={cn(
                'card-hovered flex py-4 px-6 pb-5 rounded-lg relative min-h-[188px] min-w-[277px] border border-primary-dark cursor-pointer',
                card.cardBackground === 'floral' ? 'bg-floral-pattern' : 'bg-white',
                idx % 2 !== 0 && 'bg-floral-pattern-2',
              )}
            >
              <div className="relative flex flex-col z-10">
                <div className="flex-1">
                  <h3 className="text-[28px] leading-[36px] font-semibold mb-1 font-faustina italic">
                    {card.heading}
                  </h3>
                  <p className="text-sm text-brand-30 mb-4">{card.subheading}</p>

                  {/* ✅ New: Badges list */}
                  {card.badges && card.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 gap-y-2 mb-4 mt-44">
                      {card.badges.map((b, i) => (
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
                      card.badges && card.badges.length > 0 ? 'text-lg' : 'text-base',
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
