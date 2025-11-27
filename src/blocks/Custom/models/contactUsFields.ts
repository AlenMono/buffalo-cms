import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const contactUsFields = {
  contactMainTitle: {
    name: 'contactTitle',
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
      condition: checkSelectedSection('contact'),
    },
  },
  contactDescription: {
    name: 'contactDescription',
    type: 'textarea',
    admin: {
      condition: checkSelectedSection('contact'),
    },
  },
  contactLinks: {
    name: 'contactLinks',
    type: 'array',
    labels: {
      singular: 'Link',
      plural: 'Links',
    },
    fields: [
      {
        name: 'linkTitle',
        type: 'text',
      },
      {
        name: 'linkUrl',
        type: 'text',
      },
      {
        name: 'linkVariant',
        type: 'select',
        options: [
          {
            label: 'Primary',
            value: 'default',
          },
          {
            label: 'Outline',
            value: 'outline',
          },
        ],
      },
    ],
    admin: {
      condition: checkSelectedSection('contact'),
    },
  },
}
