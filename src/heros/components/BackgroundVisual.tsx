import Image from 'next/image'
import React from 'react'
import HeroALeft from '/public/img/hero/hero-A-left.svg'
import HeroARightHigh from '/public/img/hero/hero-A-right.svg'
import HeroBLeftHigh from '/public/img/hero/hero-B-left.svg'
import HeroBRightHigh from '/public/img/hero/hero-B-right.svg'
import HeroCLeftHigh from '/public/img/hero/hero-C-left.svg'
import HeroCRightHigh from '/public/img/hero/hero-C-right.svg'
import HeroDLeftHigh from '/public/img/hero/hero-D-left.svg'
import HeroDRightHigh from '/public/img/hero/hero-D-right.svg'
import HeroELeftHigh from '/public/img/hero/hero-E-left.svg'
import HeroERightHigh from '/public/img/hero/hero-E-right.svg'
import { cn } from '@/utilities/ui'


const BackgroundVisual = ({ heroImpact, backgroundVisual }: { heroImpact: string, backgroundVisual?: ('landing-a' | 'landing-b' | 'landing-c' | 'landing-d' | 'landing-e') | null }) => {
    const image = backgroundVisual?.split('landing-')[1]?.toUpperCase() || 'A';

    // Map hero left icons
    const heroLeftIcons: Record<string, string> = {
        'A': HeroALeft,
        'B': HeroBLeftHigh,
        'C': HeroCLeftHigh,
        'D': HeroDLeftHigh,
        'E': HeroELeftHigh,
    };

    // Map hero right icons
    const heroRightIcons: Record<string, string> = {
        'A': HeroARightHigh,
        'B': HeroBRightHigh,
        'C': HeroCRightHigh,
        'D': HeroDRightHigh,
        'E': HeroERightHigh,
    };

    const getLeftIcon = () => {
        if (heroImpact !== 'medium') {
            return heroLeftIcons[image] || HeroALeft;
        }
        return null;
    };

    const getRightIcon = () => {
        return heroRightIcons[image] || HeroARightHigh;
    };

    return (
        <>
            {heroImpact !== 'medium' && <Image
                src={getLeftIcon()}
                alt="Floral"
                width={567}
                height={628}
                className="-left-56 scale-75 lg:scale-100 absolute -top-16 object-contain z-[-1]"
            />}
            <Image
                src={getRightIcon()}
                alt="Floral"
                width={heroImpact !== 'medium' ? 567 : 772}
                height={heroImpact !== 'medium' ? 628 : 837}
                className={cn("scale-75 lg:scale-100 absolute -top-16 object-contain max-h-[837px] z-[-1]", heroImpact === 'medium' ? '-right-96' : '-right-56')}
            />
        </>
    )
}

export default BackgroundVisual