// components/blocks/CustomBlock.tsx
import React from 'react';
import { BaseBlockProps, BlockSection } from './models/blockTypes';
import SignatureBlock from './components/SignatureBlock';
import { PlanningBlock } from './components/PlanningBlock';
import BurialBlock from './components/BurrialBlock';
import StatsBlock from './components/StatsBlock';
import GriefSupportBlock from './components/GriefSupportBlock';
import GuidanceAndComfortBlock from './components/GuidanceAndComfortBlock';
import NewsBlock from './components/NewsBlock';
import ResourcesBlock from './components/ResourcesBlock';
import ContactBlock from './components/ContactBlock';
import { BenefitBlock } from './components/BenefitBlock';
import TestimonialBlock from './components/TestimonialBlock';
import { PlanningProcessBlock } from './components/PlanningProccessBlock';
import FAQBlock from './components/FAQBlock';
import BurialOptionListBlock from './components/BurialOptionListBlock';
import IframeBlock from './components/IframeBlock';
import CemeteryLocationsBlock from './components/CemeteryLocationsBlock '
import ImageGalleryBlock from './components/ImageGalleryBlock'
import VideoBlock from './components/VideoBlock'


const blockComponentMap: Record<BlockSection, React.ComponentType<any>> = {
    signature: SignatureBlock,
    planning: PlanningBlock,
    'burial-options': BurialBlock,
    stats: StatsBlock,
    'guidance-and-comfort': GuidanceAndComfortBlock,
    "grief-support": GriefSupportBlock,
    'resources': ResourcesBlock,
    news: NewsBlock,
    contact: ContactBlock,
    benefit: BenefitBlock,
    testimonial: TestimonialBlock,
    'planning-process': PlanningProcessBlock,
    faq: FAQBlock,
    'burial-options-list': BurialOptionListBlock,
    iframe: IframeBlock,
    'cemetery-locations': CemeteryLocationsBlock,
    'image-galleries': ImageGalleryBlock,
    video: VideoBlock,
};

export const CustomBlock = (props: BaseBlockProps) => {
    const { section } = props;

    const Component = blockComponentMap[section];
    return Component ? <Component {...props} /> : null;
};

export default CustomBlock;
