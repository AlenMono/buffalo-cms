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

const showIfBurialVerticalOrC = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'burial-options' &&
    (parentData?.blockData.burialLayout === 'vertical' ||
      parentData?.blockData.burialLayout === 'burial-c')
  )
}

const showIfBurialHorizontalOrC = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'burial-options' &&
    (parentData?.blockData.burialLayout === 'horizontal' ||
      parentData?.blockData.burialLayout === 'burial-c')
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
    required: false,
    admin: { condition: showIfBurialVerticalOrC },
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
    admin: { condition: showIfBurialHorizontalOrC },
  },
  burialBadges: {
    name: 'burialBadges',
    type: 'array',
    labels: { singular: 'Badge', plural: 'Badges' },
    fields: [{ name: 'title', type: 'text', required: true }],
    required: false,
    admin: { condition: showIfBurialHorizontalOrC },
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
      { label: 'Burial A', value: 'vertical' },
      { label: 'Burial B', value: 'horizontal' },
      { label: 'Burial C', value: 'burial-c' },
    ],
    required: false,
    admin: { condition: isBurialSection },
  },
  burialDescription: {
    name: 'burialDescription',
    type: 'text',
    required: false,
    admin: { condition: showIfBurialHorizontalOrC },
  },
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: { condition: showIfBurialVertical },
  },
  burialOptions: {
    name: 'burialOptions',
    type: 'array',
    label: 'Burial Options',
    fields: Object.values(burialOptionFields),
    admin: { condition: isBurialSection },
  },
}
