import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        caption ? (
          <figure>
            <Media
              imgClassName={cn('border border-gold-light bg-surface rounded-lg', imgClassName)}
              resource={media}
              src={staticImage}
            />
            <figcaption
              className={cn(
                'mt-6',
                {
                  container: !disableInnerContainer,
                },
                captionClassName,
              )}
            >
              <RichText data={caption} enableGutter={false} />
            </figcaption>
          </figure>
        ) : (
          <Media
            imgClassName={cn('border border-gold-light bg-surface rounded-lg', imgClassName)}
            resource={media}
            src={staticImage}
          />
        )
      )}
    </div>
  )
}
