import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import BackgroundVisual from '../components/BackgroundVisual'

type LowImpactHeroType =
    | {
        children?: React.ReactNode
        richText?: never
        backgroundVisual?: string
    }
    | (Omit<Page['hero'], 'richText'> & {
        children?: never
        richText?: Page['hero']['richText']
        backgroundVisual?: string
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
    children,
    richText,
    backgroundVisual,
}) => {
    return (
        <div className="container mt-16 relative">
            <BackgroundVisual heroImpact="high" backgroundVisual={backgroundVisual || ''} />

            <div className="max-w-[48rem] text-center mx-auto">
                {children ||
                    (richText && (
                        <RichText
                            data={richText}
                            enableGutter={false}
                            paragraphClassName="text-lg font-satoshi leading-[24px] pt-1 text-brand-30"
                            h1ClassName="text-[56px] leading-[68px] font-faustina"
                        />
                    ))}
            </div>
        </div>
    )
}
