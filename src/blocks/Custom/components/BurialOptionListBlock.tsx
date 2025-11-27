import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'

export type BurialOption = {
  title: string
  category?: string
  image: {
    url: string
    alt?: string
  }
  description?: string
  buttonLabel?: string
  buttonLink?: string
}

export type BurialOptionListBlockProps = {
  burialOptionsList: BurialOption[]
}

const BurialOptionListBlock: React.FC<BurialOptionListBlockProps> = ({ burialOptionsList }) => {
  if (!burialOptionsList?.length) return null

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12">
          {burialOptionsList.map((option, index) => {
            const isOdd = index % 2 === 0
            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 bg-background-light border border-primary-dark overflow-hidden rounded-lg p-9"
              >
                <div
                  className={cn(
                    'p-3 border border-primary-dark bg-background-light rounded-lg',
                    isOdd ? 'lg:order-2' : 'lg:order-1',
                  )}
                >
                  {option.image && (
                    <Image
                      src={option.image.url}
                      alt={option.image.alt || option.title}
                      width={580}
                      height={450}
                      className="object-cover h-full w-full"
                    />
                  )}
                </div>

                <div
                  className={cn(
                    'p-6 flex flex-col justify-between',
                    isOdd ? 'lg:order-1' : 'lg:order-2',
                  )}
                >
                  <div>
                    <h3 className="text-4xl font-semibold mb-3 text-brand-10">{option.title}</h3>
                    {option.category && (
                      <span className="text-sm border rounded-full px-3 py-1 text-brand-30">
                        {option.category}
                      </span>
                    )}
                  </div>

                  <div>
                    {option.description && (
                      <p className="text-brand-30 text-xl mb-4 mt-10">{option.description}</p>
                    )}
                    {option.buttonLink && (
                      <Link
                        href={option.buttonLink}
                        className={buttonVariants({ variant: 'outline', className: 'px-11' })}
                      >
                        {option.buttonLabel || 'Learn More'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BurialOptionListBlock
