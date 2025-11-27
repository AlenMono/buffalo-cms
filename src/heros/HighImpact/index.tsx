'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center flex-col overflow-hidden p-4">
      <Image
        src="/img/left-rose-icon.png"
        alt="Floral"
        width={411}
        height={628}
        className="-left-52 rotate-[30deg] scale-75 lg:scale-100 lg:rotate-0 absolute top-1/2 -translate-y-1/2 lg:-left-11 object-contain z-0"
      />
      <Image
        src="/img/right-rose-icon.png"
        alt="Floral"
        width={411}
        height={628}
        className="-right-52 -rotate-[30deg] scale-75 lg:scale-100 lg:rotate-0 absolute top-1/2 -translate-y-1/2 lg:-right-11 object-contain z-0"
      />
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[746px] md:text-center space-y-7">
          {richText && <RichText data={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-col sm:flex-row md:justify-center gap-4 max-w-[398px] m-auto">
              {links.map(({ link }, i) => {
                const { url, label, appearance } = link

                return (
                  <Link
                    href={url || ''}
                    className={buttonVariants({ variant: appearance, className: 'w-full' })}
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
          <Media fill imgClassName="" priority resource={media} />
        </div>
      )}
    </div>
  )
}
