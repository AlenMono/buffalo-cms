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
  'burial-link'?: string
}

interface BurialOptionAccordionProps {
  options: BurialOption[]
  onSelectOption?: (index: number) => void
}

export const BurialOptionAccordion: React.FC<BurialOptionAccordionProps> = ({ options, onSelectOption }) => {
  const items = options.map((option) => ({
    title: <p className="text-base md:text-xl text-brand-mid">{option.title}</p>,
    content: (
      <>
        {option.description && <p className="text-base text-brand mb-5">{option.description}</p>}
        {option.buttonText && (
          <Link
            href={option['burial-link'] || '#'}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            onClick={(e) => e.stopPropagation()}
          >
            {option.buttonText}
          </Link>
        )}
      </>
    ),
  }))

  return <Accordion items={items} singleOpen defaultOpenIndex={0} onItemOpen={onSelectOption} />
}

export default BurialOptionAccordion
