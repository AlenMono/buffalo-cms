import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="max-w-[1128px] mx-auto mb-8 p-4">
        {richText && (
          <RichText
            data={richText}
            enableGutter={false}
            paragraphClassName="font-faustina-italic text-xl xl:text-[44px] xl:leading-[52px] text-brand-30 my-4 xl:my-16"
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <Image
        src={'/img/header-b.png'}
        alt={'Rose'}
        width={540}
        height={855}
        className="absolute top-[160px] right-0 z-[-1] max-h-[855px] max-w-[540px] w-full object-contain"
      />
      {/* 
      <Image
        src="/img/medium-impact/hero-right.svg"
        alt="Floral"
        width={411}
        height={628}
        className="-right-52  scale-75 lg:scale-100 absolute -top-16 lg:-right-20 object-contain z-[-1]"
      /> */}

      <div className="container flex flex-col items-center">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
