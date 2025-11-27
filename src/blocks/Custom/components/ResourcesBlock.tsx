import RichText from '@/components/RichText'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface resourcesLink {
    resourceTitle: string,
    resourceUrl: string
    resourceDescription: string
}

interface ResourcesBlockProps {
    resourceTitle: any,
    resourcesLinks: resourcesLink[]
    resourcesLayot?: 'default' | 'wrapped'
}

const ResourcesBlock = ({ resourceTitle, resourcesLinks, resourcesLayot }: ResourcesBlockProps) => {
    if (resourcesLayot === 'wrapped') {
        return (
            <div className=' max-w-[1128px] mx-auto py-16'>
                <div className='bg-background-light rounded-lg border border-primary-dark px-9 py-8 relative overflow-hidden'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 '>
                        {resourcesLinks?.map((link, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <Link href={link.resourceUrl} target='_blank' className='group flex items-center gap-2 hover:text-gold transition-all duration-300'>
                                        <p className='text-xl font-semibold'>{link.resourceTitle}</p>

                                        <ArrowUpRight />
                                    </Link>
                                </div>
                                <p className='text-lg'>{link.resourceDescription}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-8 xl:gap-16 bg-background py-10 lg:py-16 px-12 xl:px-[156px]'>
            <RichText data={resourceTitle} className='text-left !text-4xl font-faustina' />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {resourcesLinks?.map((link, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <p className='text-xl font-semibold'>{link.resourceTitle}</p>
                            {link.resourceUrl && <Link href={link.resourceUrl}>
                                <ArrowUpRight />
                            </Link>}
                        </div>
                        <p className='text-lg'>{link.resourceDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResourcesBlock