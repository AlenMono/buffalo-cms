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
            <div className={cn('flex flex-col gap-4 lg:flex-row md:gap-10', statsDescription ? 'justify-between' : 'justify-center')}>
                {statsTitle && <RichText data={statsTitle} className={cn('section-title', statsDescription ? 'text-left' : 'text-center')} />}
                {statsDescription && <p className='max-w-[460px] text-sm md:text-lg'>{statsDescription}</p>}
            </div>

            {statsColumn && statsColumn?.length > 0 && (
                <div className={cn('grid gap-4 grid-cols-2 md:grid-cols-4 pt-6 pb-10')}>
                    {statsColumn?.map(data => {
                        return (
                            <div key={data.statsValue} className='flex flex-col items-start'>
                                <p className='text-[44px] leading-[52px] xl:text-[88px] xl:leading-[88px] font-semibold font-faustina text-gold'>{data.statsValue}</p>
                                <p className='font-faustina italic font-normal text-brand-30'>{data.statsLabel}</p>
                            </div>
                        )
                    })}
                </div>
            )}

            {badges && (
                <div className='flex flex-wrap justify-center gap-2 xl:gap-3'>
                    {badges?.map((badge, index) => {
                        if (!badge.badgeLink && !badge.badgeLabel) return null;

                        return (
                            <Link href={badge.badgeLink || badge.badgeLabel.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')} key={`${index}_badge`} className='flex items-center gap-1 text-nowrap rounded-full border border-foreground text-sm xl:text-lg xl:leading-[24px] font-bold py-1.5 px-3 hover:bg-foreground hover:text-white transition-all duration-200'>
                                {badge.badgeLabel}
                                <ArrowUpRight size={20} />
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default StatsBlock