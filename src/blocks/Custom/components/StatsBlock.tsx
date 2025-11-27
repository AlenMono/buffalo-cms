import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type statsType = {
    id: string | number,
    statsValue: string,
    statsLabel: string
}

type badgeType = {
    badgeLabel: string
    badgeLink: string
}
interface StatsBlockProps {
    statsColumn: statsType[]
    badges?: badgeType[]
    statsDescription?: string;
    statsTitle?: any
}

const StatsBlock = ({ statsColumn, statsTitle, statsDescription, badges }: StatsBlockProps) => {


    return (

        <div className="max-w-[1128px] mx-auto space-y-8">
            <div className={cn('flex flex-col lg:flex-row', statsDescription ? 'justify-between' : 'justify-center')}>
                {statsTitle && <RichText data={statsTitle} className='text-left !text-5xl font-faustina mb-14 md:mb-0' />}
                <p className='max-w-[460px]'>{statsDescription}</p>
            </div>

            {statsColumn && statsColumn?.length > 0 && (
                <div className={cn('grid gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] pt-6 pb-10')}>
                    {statsColumn?.map(data => {
                        return (
                            <div key={data.statsValue} className='flex flex-col items-start'>
                                <p className='text-[44px] leading-[52px] xl:text-[88px] xl:leading-[88px] font-semibold font-faustina text-gold'>{data.statsValue}</p>
                                <p className='font-faustina italic font-normal'>{data.statsLabel}</p>
                            </div>
                        )
                    })}
                </div>
            )}

            {badges && (
                <div className='flex -mx-4 px-4 pb-1.5 lg:mx-0 lg:px-0 lg:pb-0 overflow-auto lg:flex-wrap lg:justify-center gap-3'>
                    {badges?.map((badge, index) => {
                        if (!badge.badgeLink && !badge.badgeLabel) return null;

                        return (
                            <Link href={badge.badgeLink || ''} key={`${index}_badge`} className='flex items-center gap-2 text-nowrap rounded-full border border-foreground text-lg leading-[24px] font-bold py-2 px-4 hover:bg-foreground hover:text-white transition-all duration-200'>
                                {badge.badgeLabel}
                                <ArrowUpRight />
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default StatsBlock