import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isBurialSection = checkSelectedSection('burial-options')

// Helper functions for admin conditions
const showIfBurialVertical = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'burial-options' &&
    parentData?.blockData.burialLayout === 'vertical'
  )
}

const showIfBurialHorizontal = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'burial-options' &&
    parentData?.blockData.burialLayout === 'horizontal'
  )
}

const burialOptionFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: { condition: showIfBurialVertical },
  },
  buttonText: {
    name: 'buttonText',
    type: 'text',
    required: false,
    admin: { condition: showIfBurialVertical },
  },
  link: {
    name: 'burial-link',
    type: 'text',
    required: false,
    admin: { condition: showIfBurialVertical },
  },
  burialImage: {
    name: 'burialImage',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: { condition: showIfBurialHorizontal },
  },
  burialBadges: {
    name: 'burialBadges',
    type: 'array',
    labels: { singular: 'Badge', plural: 'Badges' },
    fields: [{ name: 'title', type: 'text', required: true }],
    required: false,
    admin: { condition: showIfBurialHorizontal },
  },
}

export const burialFields = {
  sectionTitle: {
    name: 'sectionTitle',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    label: 'Section Title',
    required: false,
    admin: { condition: isBurialSection },
  },
  burialLayout: {
    name: 'burialLayout',
    type: 'select',
    defaultValue: 'vertical',
    options: [
      { label: 'Vertical', value: 'vertical' },
      { label: 'Horizontal', value: 'horizontal' },
    ],
    required: false,
    admin: { condition: isBurialSection },
  },
  burialDescription: {
    name: 'burialDescription',
    type: 'text',
    required: false,
    admin: { condition: showIfBurialHorizontal },
  },
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: { condition: isBurialSection },
  },
  burialOptions: {
    name: 'burialOptions',
    type: 'array',
    label: 'Burial Options',
    fields: Object.values(burialOptionFields),
    admin: { condition: isBurialSection },
  },
}
