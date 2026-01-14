import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isCemeteryListSection = checkSelectedSection('cemetery-list')

const cemetery = {
  cemeteryName: {
    name: 'cemeteryName',
    label: 'Cemetery Name',
    type: 'text',
    required: false,
  },
  cemeteryAdress: {
    name: 'cemeteryAdress',
    label: 'Cemetery Adress',
    type: 'text',
    required: false,
  },
  cemeteryLink: {
    name: 'cemeteryLink',
    label: 'Cemetery Link',
    type: 'text',
    required: false,
  },
}

export const cemeteryListFields = {
  title: {
    name: 'cemeteryListTitle',
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
    admin: { condition: isCemeteryListSection },
  },
  description: {
    name: 'cemeteryListDescription',
    type: 'textarea',
    required: false,
    admin: { condition: isCemeteryListSection },
  },
  cemeteryList: {
    name: 'cemeteryList',
    label: 'Cemetery List',
    type: 'array',
    fields: Object.values(cemetery),
    admin: { condition: isCemeteryListSection },
  },
}
