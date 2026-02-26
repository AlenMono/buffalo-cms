'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/utilities/ui'
import { X } from 'lucide-react'

export interface AccordionItem {
    title: React.ReactNode
    content: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
    singleOpen?: boolean
    variant?: 'outline'
    wrapperClassName?: string
    onItemOpen?: (index: number) => void
    defaultOpenIndex?: number
}

export const Accordion: React.FC<AccordionProps> = ({
    items,
    singleOpen = true,
    variant,
    wrapperClassName,
    onItemOpen,
    defaultOpenIndex,
}) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndex !== undefined ? [defaultOpenIndex] : [])
    const contentRefs = useRef<(HTMLDivElement | null)[]>([])

    const toggleItem = (index: number) => {
        if (singleOpen) {
            setOpenIndexes((prev) => (prev[0] === index ? [] : [index]))
            if (openIndexes[0] !== index) {
                onItemOpen?.(index)
            }
        } else {
            setOpenIndexes((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
            )
            if (!openIndexes.includes(index)) {
                onItemOpen?.(index)
            }
        }
    }

    const updateHeights = useCallback(() => {
        contentRefs.current.forEach((el, index) => {
            if (el) {
                el.style.maxHeight = openIndexes.includes(index) ? `${el.scrollHeight}px` : '0px'
            }
        })
    }, [openIndexes])

    useEffect(() => {
        updateHeights()
        window.addEventListener('resize', updateHeights)
        return () => window.removeEventListener('resize', updateHeights)
    }, [updateHeights])

    return (
        <div className={cn(wrapperClassName)}>
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index)
                return (
                    <div
                        key={index}
                        className={cn(
                            variant === 'outline'
                                ? 'p-4 bg-surface border border-gold-light rounded-lg hover:bg-background'
                                : cn('py-4', index !== items.length - 1 && 'border-b border-b-brand-mid'),
                            isOpen && variant === 'outline' ? 'bg-background opacity-100' : 'opacity-100',
                            !isOpen && 'opacity-60',
                        )}
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            aria-expanded={isOpen}
                            aria-controls={`accordion-panel-${index}`}
                            id={`accordion-trigger-${index}`}
                            className="flex justify-between items-center w-full text-left transition-all duration-200 gap-4 cursor-pointer"
                        >
                            <div className={cn("text-xl font-bold text-brand")}>{item.title}</div>
                            <X
                                aria-hidden="true"
                                className={cn(
                                    'transition-transform duration-300 min-w-5',
                                    isOpen ? 'rotate-90 text-brand' : 'rotate-45 text-brand-mid',
                                )}
                                size={20}
                            />
                        </button>

                        <div
                            id={`accordion-panel-${index}`}
                            role="region"
                            aria-labelledby={`accordion-trigger-${index}`}
                            ref={(el) => {
                                contentRefs.current[index] = el
                            }}
                            className={cn(
                                'overflow-hidden transition-all duration-500 ease-in-out',
                                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]',
                            )}
                            style={{
                                maxHeight: isOpen ? `${contentRefs.current[index]?.scrollHeight || 0}px` : '0px',
                            }}
                        >
                            <div className="mt-3">{item.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
