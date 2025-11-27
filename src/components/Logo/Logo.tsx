import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import logoSrc from './logo.svg'
import logoGreyScale from './logo-grayscale.svg'
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  isGrayScale?: boolean
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      src={props.isGrayScale ? logoGreyScale : logoSrc}
      height={52}
      alt="logo"
      loading={loading}
      priority={priority === 'high'}
      className={clsx('w-auto h-[52px]', className)}
    />
  )
}
