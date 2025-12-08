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
}

export const Accordion: React.FC<AccordionProps> = ({
    items,
    singleOpen = true,
    variant,
    wrapperClassName,
}) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([])
    const contentRefs = useRef<(HTMLDivElement | null)[]>([])

    const toggleItem = (index: number) => {
        if (singleOpen) {
            setOpenIndexes((prev) => (prev[0] === index ? [] : [index]))
        } else {
            setOpenIndexes((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
            )
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
                        onClick={() => toggleItem(index)}
                        className={cn(
                            'cursor-pointer',
                            variant === 'outline'
                                ? 'p-4 bg-background-light border border-primary-dark rounded-lg hover:bg-background'
                                : 'py-4 border-b border-b-brand-30',
                            isOpen && variant === 'outline' ? 'bg-background opacity-100' : 'opacity-100',
                            items.length - 1 === index && 'border-b-0',
                            !isOpen && 'opacity-70',
                        )}
                    >
                        <div className="flex justify-between items-center transition-all duration-200">
                            <div className={cn("text-xl font-bold text-brand")}>{item.title}</div>
                            <X
                                className={cn(
                                    'transition-transform duration-300',
                                    isOpen ? 'rotate-90 text-brand' : 'rotate-45 text-brand-30',
                                )}
                                size={20}
                            />
                        </div>

                        <div
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
