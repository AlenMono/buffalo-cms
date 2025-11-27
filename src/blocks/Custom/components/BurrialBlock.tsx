import Image from 'next/image';
import React from 'react'
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
    burialImage: {
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
    burialLayout?: 'horizontal' | 'vertical';
    burialDescription?: string
}


const BurialBlock: React.FC<BurialBlockProps> = ({ sectionTitle, image, burialOptions, burialLayout, burialDescription }) => {
    if (burialLayout === 'horizontal') {
        return (
            <div className="p-3 pl-5 bg-secondary border border-primary-dark rounded-lg">
                <div className='flex flex-col justify-between gap-5'>
                    <div className="flex justify-between items-end flex-1 mb-28">
                        {sectionTitle && <RichText data={sectionTitle} className='text-left !text-5xl font-faustina mb-14 md:mb-0' />}

                        <div className='max-w-[490px] text-base'>
                            {burialDescription}
                        </div>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 flex-1">
                        {
                            burialOptions?.map((option, index) => {
                                return <div key={index} className='bg-background border border-primary-dark rounded-lg p-5'>
                                    <div className='flex flex-col justify-between items-start h-full gap-7'>
                                        <Image
                                            width={263}
                                            height={180}
                                            src={option?.burialImage?.url}
                                            alt="Cemetery"
                                            className='object-cover w-full rounded-lg'
                                        />
                                        <div className='flex flex-col items-start gap-3'>
                                            <h4 className="text-2xl font-semibold">{option.title}</h4>
                                            {option.burialBadges?.map((badge, index) => <p key={index} className='text-sm border rounded-full px-3 py-1 text-brand-30'>{badge.title}</p>)}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="flex justify-between gap-5 p-3 pl-5 bg-secondary border border-primary-dark rounded-lg md:h-[660px] my-10">
            <div className="flex flex-col justify-between md:min-w-[360px] md:max-w-[360px] lg:min-w-[415px] lg:max-w-[415px]">
                {sectionTitle && <RichText data={sectionTitle} className='text-left !text-5xl font-faustina mb-14 md:mb-0' />}

                <div>
                    <BurialOptionAccordion
                        options={burialOptions}
                    />
                </div>
            </div>
            <div className="hidden md:flex">
                {image && <Image width={760} height={660} src={image?.url} alt="Cemetery" className='h-full object-cover' />}
            </div>
        </div>
    );
};

export default BurialBlock;