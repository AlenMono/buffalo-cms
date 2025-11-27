import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const statsFieldsArray = {
  statsValue: {
    name: 'statsValue',
    type: 'text',
    required: true,
  },
  statsLabel: {
    name: 'statsLabel',
    type: 'text',
    required: true,
  },
}

const badgesFieldsArray = {
  badgeLabel: {
    name: 'badgeLabel',
    type: 'text',
  },
  badgeLink: {
    name: 'badgeLink',
    type: 'text',
  },
}

export const statsFields = {
  statsTitle: {
    name: 'statsTitle',
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
    admin: {
      condition: checkSelectedSection('stats'),
    },
  },
  statsDescription: {
    name: 'statsDescription',
    type: 'text',
    admin: {
      condition: checkSelectedSection('stats'),
    },
  },
  statsColumn: {
    name: 'statsColumn',
    type: 'array',
    admin: {
      condition: checkSelectedSection('stats'),
    },
    fields: Object.values(statsFieldsArray),
  },
  badges: {
    name: 'badges',
    type: 'array',
    admin: {
      condition: checkSelectedSection('stats'),
    },
    fields: Object.values(badgesFieldsArray),
  },
}
