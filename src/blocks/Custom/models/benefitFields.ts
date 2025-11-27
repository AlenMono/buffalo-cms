import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isBenefitSection = checkSelectedSection('benefit')

const benefitCardFields = {
  heading: {
    name: 'heading',
    type: 'text',
    required: true,
  },
  subheading: {
    name: 'subheading',
    type: 'textarea',
    required: true,
  },
}

export const benefitFields = {
  title: {
    name: 'benefitTitle',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    required: false,
    admin: { condition: isBenefitSection },
  },
  benefitLayout: {
    name: 'benefitLayout',
    type: 'select',
    defaultValue: 'vertical',
    options: [
      { label: 'Vertical', value: 'vertical' },
      { label: 'Horizontal', value: 'horizontal' },
    ],
    required: false,
    admin: { condition: isBenefitSection },
  },
  benefitDescription: {
    name: 'benefitDescription',
    type: 'text',
    required: false,
    admin: {
      condition: (_data: any, _siblingData: any, parentData: any) => {
        return (
          parentData?.blockData.section === 'benefit' &&
          parentData?.blockData.benefitLayout === 'vertical'
        )
      },
    },
  },
  benefits: {
    name: 'benefits',
    type: 'array',
    fields: Object.values(benefitCardFields),
    admin: { condition: isBenefitSection },
  },
}
