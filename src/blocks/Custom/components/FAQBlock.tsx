'use client'

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import { Accordion } from '@/components/ui/accordion'
import Image from 'next/image'
import Link from 'next/link'

type FAQ = {
    faqQuestion: string
    faqAnswer?: string
    faqRichAnswer?: any
    faqType?: string
}

type FAQBlockProps = {
    faqRichTitle?: any
    faqs: FAQ[]
    faqLayout?: 'block' | 'full-page'
    faqFilters?: boolean
}

type FilterSectionType = {
    label: string
    value: string
}

const filterSections: FilterSectionType[] = [
    { label: 'All questions', value: 'all' },
    { label: 'Services', value: 'services' },
    { label: 'Burial', value: 'burial' },
    { label: 'Grief', value: 'grief' }
]

export const FAQBlock: React.FC<FAQBlockProps> = ({ faqRichTitle, faqs, faqLayout, faqFilters }) => {
    const [selectedFilter, setSelectedFilter] = useState('all')

    // Filter FAQs based on selected type
    const filteredFaqs = selectedFilter === 'all'
        ? faqs
        : faqs.filter(faq => faq.faqType === selectedFilter)

    // Convert your FAQ data to Accordion-compatible items
    const items = filteredFaqs.map(faq => ({
        title: <span className="text-lg md:text-2xl font-medium text-brand">{faq.faqQuestion}</span>,
        content: (
            <div className="mt-3 text-sm md:text-base text-brand-mid">
                {faq.faqAnswer ? <p>{faq.faqAnswer}</p> : <RichText data={faq.faqRichAnswer} />}
            </div>
        ),
    }))

    const renderFilterButtons = () => (
        <div className="flex gap-2 mb-8 md:mb-16 flex-wrap justify-center">
            {filterSections.map(item => (
                <button
                    key={item.value}
                    onClick={() => setSelectedFilter(item.value)}
                    aria-pressed={selectedFilter === item.value}
                    className={`text-sm border-2 rounded-full px-3 py-1 ${selectedFilter === item.value
                        ? 'bg-foreground text-white'
                        : 'text-brand-mid border-foreground'
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )

    if (faqLayout === "full-page") {
        return (
            <div className='bg-surface border border-gold-light px-5 md:px-9 py-7 rounded-lg max-w-[938px] mx-auto'>
                {faqFilters && renderFilterButtons()}
                <Accordion
                    items={items}
                    singleOpen
                    variant="outline"
                    wrapperClassName="flex flex-col gap-3 z-[1]"
                />
            </div>
        )
    }

    return (
        <section className="max-w-[1320px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-10 bg-surface rounded-lg border border-gold-light p-5 lg:px-9 lg:py-7 relative overflow-hidden">
                <div className="flex flex-col justify-between gap-10 z-[1]">
                    {faqRichTitle && (
                        <RichText data={faqRichTitle} className="text-left section-title" />
                    )}

                    <div className="text-base">
                        <p>Have more questions?</p>
                        <Link href="/faq" className="font-bold">
                            Visit our full FAQ section →
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col lg:max-w-[727px] w-full">
                    <Accordion
                        items={items}
                        singleOpen
                        variant="outline"
                        wrapperClassName="flex flex-col gap-3 z-[1]"
                    />
                </div>
                <Image
                    src="/img/wreath.svg"
                    width={360}
                    height={200}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-0 left-0"
                />
            </div>
        </section>
    )
}

export default FAQBlock
