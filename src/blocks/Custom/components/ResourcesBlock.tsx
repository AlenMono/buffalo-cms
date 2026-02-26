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
            <div className=' max-w-[1128px] mx-auto'>
                <div className='bg-surface rounded-lg border border-gold-light px-9 py-8 relative overflow-hidden'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 '>
                        {resourcesLinks?.map((link, index) => (
                            <Link href={link.resourceUrl} target='_blank' key={index} className='flex flex-col gap-2 group'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-start gap-2 transition-all duration-300 group-hover:text-gold-deep'>
                                        <p className='text-lg md:text-xl font-semibold'>{link.resourceTitle}</p>

                                        <ArrowUpRight className='mt-1 min-w-5' size={20} />
                                    </div>
                                </div>
                                <p className='text-sm md:text-base'>{link.resourceDescription}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-8 max-w-[1128px] mx-auto'>
            <RichText data={resourceTitle} className='text-left section-title' />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {resourcesLinks?.map((link, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <p className='text-lg md:text-xl font-semibold'>{link.resourceTitle}</p>
                            {link.resourceUrl && <Link href={link.resourceUrl}>
                                <ArrowUpRight />
                            </Link>}
                        </div>
                        <p className='text-sm md:text-base'>{link.resourceDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResourcesBlock