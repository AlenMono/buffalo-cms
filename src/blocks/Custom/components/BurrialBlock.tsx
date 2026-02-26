'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import BurialOptionAccordion from './BurialOptionAccordion';
import RichText from '@/components/RichText';

type BadgeType = {
    title: string;
}

interface BurialOption {
    title: string;
    description?: string;
    buttonLink?: string;
    buttonText?: string;
    burialBadges?: BadgeType[];
    burialImage?: {
        url: string
        alt?: string
        width?: number
        height?: number
    }
    burialOptionImage?: {
        url: string
        alt?: string
        width?: number
        height?: number
    }
}

interface BurialBlockProps {
    sectionTitle?: any;
    image?: {
        url: string
        alt?: string
        width?: number
        height?: number
    }
    burialOptions: BurialOption[];
    burialLayout?: 'horizontal' | 'vertical' | 'burial-c';
    burialDescription?: string
    burialNote?: string
}


const BurialBlock: React.FC<BurialBlockProps> = ({ sectionTitle, image, burialOptions, burialLayout, burialDescription, burialNote }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    if (burialLayout === 'horizontal') {
        return (
            <div className="p-5 md:p-9 md:pt-7 bg-secondary border border-gold rounded-lg">
                <div className='flex flex-col justify-between gap-5'>
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 flex-1 flex-wrap mb-4 md:mb-10 lg:mb-28">
                        {sectionTitle && <RichText data={sectionTitle} paragraphClassName="section-title" h1ClassName="section-title" />}

                        <div className='max-w-[490px] text-sm md:text-base'>
                            {burialDescription}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
                        {
                            burialOptions?.map((option, index) => {
                                return <div key={index} className='bg-[#FFF9EE] border border-gold rounded-lg p-4 md:p-5'>
                                    <div className='flex flex-col justify-between items-start h-full gap-7'>
                                        <Image
                                            width={263}
                                            height={180}
                                            src={option?.burialImage?.url || '/img/graveyard.png'}
                                            alt={option?.burialImage?.alt || "Cemetery"}
                                            className='object-cover w-full rounded-lg h-[180px]'
                                        />
                                        <div className='flex flex-col items-start gap-3'>
                                            <h4 className="text-lg md:text-2xl font-semibold">{option.title}</h4>
                                            {option.burialBadges?.map((badge, index) => <p key={index} className='text-xs md:text-sm border border-brand-mid rounded-full px-2 md:px-3 py-1 text-brand-mid'>{badge.title}</p>)}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

                {burialNote &&
                    <div className="text-center pt-8 md:pt-11 text-sm md:text-base text-brand-mid">
                        {burialNote}
                    </div>
                }
            </div>
        )
    }


    if (burialLayout === 'burial-c') {
        return (
            <div className="p-5 md:p-9 md:pt-7 bg-secondary border border-gold rounded-lg">
                <div className='flex flex-col justify-between gap-5'>
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 flex-1 flex-wrap mb-4 md:mb-10 lg:mb-28">
                        {sectionTitle && <RichText data={sectionTitle} paragraphClassName="section-title" h1ClassName="section-title" />}

                        <div className='max-w-[490px] text-sm md:text-base'>
                            {burialDescription}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        {
                            burialOptions?.map((option, index) => {
                                return <div key={index} className='bg-[#FFF9EE] border border-gold rounded-lg p-4 md:p-5'>
                                    <div className='flex flex-col lg:flex-row h-full gap-7'>
                                        <Image
                                            width={198}
                                            height={132}
                                            src={option?.burialImage?.url || '/img/graveyard.png'}
                                            alt={option?.burialImage?.alt || "Cemetery"}
                                            className='object-cover w-full lg:w-[198px] h-[120px] lg:h-auto rounded-lg lg:min-h-[132px]'
                                        />
                                        <div className='flex flex-col items-start justify-between gap-3'>
                                            <h4 className="text-lg md:text-2xl font-semibold">{option.title}</h4>
                                            {option.description && <p className='text-sm md:text-base'>{option.description}</p>}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

                {burialNote &&
                    <div className="text-center pt-8 md:pt-11 text-sm md:text-base text-brand-mid">
                        {burialNote}
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="flex justify-between gap-5 p-3 pl-5 bg-secondary border border-gold rounded-lg">
            <div className="flex flex-col justify-between md:min-w-[360px] md:max-w-[360px] lg:min-w-[415px] lg:max-w-[415px]">
                {sectionTitle && <RichText data={sectionTitle} className='section-title text-center md:text-left mb-10' />}
                <div className="flex mb-6 md:hidden">
                    <div className='p-3 rounded-lg relative bg-surface border border-gold'>
                        <Image
                            width={760}
                            height={214}
                            src={burialOptions[selectedOptionIndex]?.burialOptionImage?.url || image?.url || '/img/graveyard.png'}
                            alt={burialOptions[selectedOptionIndex]?.burialOptionImage?.alt || "Cemetery"}
                            className='h-full object-cover min-h-[215px]'
                        />
                    </div>
                </div>
                <div>
                    <BurialOptionAccordion
                        options={burialOptions}
                        onSelectOption={setSelectedOptionIndex}
                    />
                </div>
            </div>
            <div className="hidden md:flex">
                <div className='p-3 rounded-lg relative bg-surface border border-gold'>
                    <Image
                        width={760}
                        height={660}
                        src={burialOptions[selectedOptionIndex]?.burialOptionImage?.url || image?.url || '/img/graveyard.png'}
                        alt={burialOptions[selectedOptionIndex]?.burialOptionImage?.alt || "Cemetery"}
                        className='h-full object-cover min-h-[442px] lg:min-h-[596px] max-h-[596px]'
                    />
                </div>
            </div>
        </div>
    );
};

export default BurialBlock;