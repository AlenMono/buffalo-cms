import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

const isPlanningSection = checkSelectedSection('planning-process')

const planningCardsFields = {
  heading: {
    name: 'heading',
    type: 'text',
    required: true,
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
  },
}

export const planningProcessFields = {
  planningProcessTitle: {
    name: 'planningProcessTitle',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    required: false,
    admin: { condition: isPlanningSection },
  },
  planningProcessDescription: {
    name: 'planningProcessDescription',
    type: 'textarea',
    required: false,
    admin: { condition: isPlanningSection },
  },
  planningProcessCards: {
    name: 'planningProcessCards',
    type: 'array',
    fields: Object.values(planningCardsFields),
    admin: { condition: isPlanningSection },
  },
}
