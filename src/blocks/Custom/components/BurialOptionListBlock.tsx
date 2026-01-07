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
                <div className="grid gap-6 lg:gap-12">
                    {burialOptionsList.map((option, index) => {
                        const isOdd = index % 2 === 0
                        return (
                            <div
                                key={index}
                                className="grid grid-cols-1 lg:grid-cols-2 bg-background-light border border-primary-dark overflow-hidden rounded-lg p-5 lg:p-9 relative"
                            >
                                <div className='flex flex-col lg:hidden items-start mb-6 z-[1]'>
                                    <h3 className="text-2xl lg:text-4xl lg:font-semibold mb-3 text-brand-10 font-faustina">{option.title}</h3>
                                    {option.category && (
                                        <span className="text-xs lg:text-sm border rounded-full px-3 py-1 text-brand-30">
                                            {option.category}
                                        </span>
                                    )}
                                </div>

                                <Image
                                    src={'/img/wreath-full.png'}
                                    alt={'Background Image'}
                                    width={760}
                                    height={760}
                                    className={cn("absolute bottom-0 z-0 -top-1/2 -right-1/2 lg:-translate-x-1/2", isOdd ? '-right-1/2 lg:-translate-x-1/2' : 'lg:-left-1/2 lg:translate-x-1/2')}
                                />
                                <div
                                    className={cn(
                                        'p-3 border border-primary-dark bg-background-light rounded-lg z-[1]',
                                        isOdd ? 'lg:order-2' : 'lg:order-1',
                                    )}
                                >
                                    {option.image && (
                                        <Image
                                            src={option.image.url}
                                            alt={option.image.alt || option.title}
                                            width={580}
                                            height={450}
                                            className="object-cover w-full h-[200px] md:h-[360px] lg:h-[450px]"
                                        />
                                    )}
                                </div>

                                <div
                                    className={cn(
                                        'lg:p-6 flex flex-col justify-between z-[1]',
                                        isOdd ? 'lg:order-1' : 'lg:order-2',
                                    )}
                                >
                                    <div className='hidden lg:flex lg:flex-col items-start'>
                                        <h3 className="text-2xl lg:text-4xl lg:font-semibold mb-3 text-brand-10 font-faustina">{option.title}</h3>
                                        {option.category && (
                                            <span className="text-xs lg:text-sm border rounded-full px-3 py-1 text-brand-30">
                                                {option.category}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        {option.description && (
                                            <p className="text-brand-30 text-sm lg:text-xl mb-4 mt-10">{option.description}</p>
                                        )}
                                        {option.buttonLink && (
                                            <Link
                                                href={option.buttonLink}
                                                className={buttonVariants({ variant: 'outline', className: 'px-11 w-full lg:w-auto' })}
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
