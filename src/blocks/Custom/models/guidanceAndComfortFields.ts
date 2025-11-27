import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isGuideSection = checkSelectedSection('guidance-and-comfort')

const isPromoB = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'guidance-and-comfort' &&
    parentData?.blockData.promoLayot === 'promo-b'
  )
}

export const guidanceAndComfortFields = {
  guideBadgeText: {
    name: 'badgeText',
    type: 'text',
    required: false,
    admin: { condition: isGuideSection },
  },
  promoLayot: {
    name: 'promoLayot',
    type: 'select',
    label: 'Promo Layout',
    defaultValue: 'promo-a',
    options: [
      { label: 'Promo A', value: 'promo-a' },
      { label: 'Promo B', value: 'promo-b' },
    ],
    admin: { condition: isGuideSection },
  },
  guideTitle: {
    name: 'guideTitle',
    type: 'richText',
    label: 'Section Title',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    required: false,
    admin: { condition: isGuideSection },
  },
  guideDescription: {
    name: 'guideDescription',
    type: 'text',
    required: false,
    admin: { condition: isGuideSection },
  },
  promoImage: {
    name: 'promoImage',
    label: 'Promo Image',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: { condition: isPromoB },
  },
}
