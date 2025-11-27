import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import Image from 'next/image'

type LowImpactHeroType =
  | {
    children?: React.ReactNode
    richText?: never
  }
  | (Omit<Page['hero'], 'richText'> & {
    children?: never
    richText?: Page['hero']['richText']
  })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16 relative">
      <Image
        src="/img/low-impact/hero-left.svg"
        alt="Floral"
        width={411}
        height={628}
        className="-left-52 scale-75 lg:scale-100 absolute -top-16 lg:-left-20 object-contain z-[-1]"
      />
      <Image
        src="/img/low-impact/hero-right.svg"
        alt="Floral"
        width={411}
        height={628}
        className="-right-52  scale-75 lg:scale-100 absolute -top-16 lg:-right-20 object-contain z-[-1]"
      />
      <div className="max-w-[48rem] text-center mx-auto">
        {children || (richText && <RichText data={richText} enableGutter={false} paragraphClassName="text-sm text-brand-30" />)}
      </div>
    </div>
  )
}
