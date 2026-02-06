'use client'
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Accordion } from '@/components/ui/accordion'

interface BurialOption {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

interface BurialOptionAccordionProps {
  options: BurialOption[]
  onSelectOption?: (index: number) => void
}

export const BurialOptionAccordion: React.FC<BurialOptionAccordionProps> = ({ options, onSelectOption }) => {
  const items = options.map((option) => ({
    title: <p className="text-base md:text-xl text-brand-30">{option.title}</p>,
    content: (
      <>
        {option.description && <p className="text-base text-brand mb-5">{option.description}</p>}
        {option.buttonText && (
          <Link
            href={option.buttonLink || '#'}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            {option.buttonText}
          </Link>
        )}
      </>
    ),
  }))

  return <Accordion items={items} singleOpen onItemOpen={onSelectOption} />
}

export default BurialOptionAccordion
