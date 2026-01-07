'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import BackgroundVisual from '../components/BackgroundVisual'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, backgroundVisual }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="container mt-16 relative">
      <BackgroundVisual heroImpact="high" backgroundVisual={backgroundVisual || null} />

      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[746px] md:text-center space-y-7">
          {richText && (
            <RichText
              data={richText}
              enableGutter={false}
              paragraphClassName="text-lg font-satoshi leading-[24px] pt-1 text-brand-30"
              h1ClassName="text-[56px] leading-[64px] font-faustina"
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-col sm:flex-row md:justify-center gap-4 max-w-[398px] m-auto">
              {links.map(({ link }, i) => {
                const { url, label, appearance } = link

                return (
                  <Link
                    href={url || ''}
                    className={buttonVariants({
                      variant: appearance,
                      size: 'lg',
                      className: links.length > 1 ? 'w-full' : '',
                    })}
                    key={i}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {media && typeof media === 'object' && (
        <div className="max-h-[660px] max-w-[1320px] select-none mt-10 p-10">
          <div className='border border-primary-dark bg-background-light p-3 rounded-lg'>
            <Media fill imgClassName="h-full" priority resource={media} />
          </div>
        </div>
      )}
    </div>
  )
}
