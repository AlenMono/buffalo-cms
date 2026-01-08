import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import BackgroundVisual from '../components/BackgroundVisual'

type LowImpactHeroType =
    | {
        children?: React.ReactNode
        richText?: never
        backgroundVisual?: "landing-a" | "landing-b" | "landing-c" | "landing-d" | "landing-e" | null | undefined
    }
    | (Omit<Page['hero'], 'richText'> & {
        children?: never
        richText?: Page['hero']['richText']
        backgroundVisual?: "landing-a" | "landing-b" | "landing-c" | "landing-d" | "landing-e" | null | undefined
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
    children,
    richText,
    backgroundVisual,
}) => {
    return (
        <div className="container mt-16 relative">
            <BackgroundVisual heroImpact="high" backgroundVisual={backgroundVisual || null} />

            <div className="max-w-[48rem] text-center mx-auto">
                {children ||
                    (richText && (
                        <RichText
                            data={richText}
                            enableGutter={false}
                            paragraphClassName="hero-paragraph"
                            h1ClassName="hero-title"
                        />
                    ))}
            </div>
        </div>
    )
}
