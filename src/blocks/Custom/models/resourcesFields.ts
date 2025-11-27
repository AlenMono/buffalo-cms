import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const showOnDefault = (_data: any, _siblingData: any, parentData: any) => {
  return (
    parentData?.blockData.section === 'resources' &&
    parentData?.blockData.resourcesLayot === 'default'
  )
}

const resourcesLinksFieldsArray = {
  title: {
    name: 'resourceTitle',
    type: 'text',
    required: true,
  },
  url: {
    name: 'resourceUrl',
    type: 'text',
    required: true,
  },
  description: {
    name: 'resourceDescription',
    type: 'textarea',
  },
}

export const resourcesFields = {
  resourcesLayot: {
    name: 'resourcesLayot',
    type: 'select',
    defaultValue: 'default',
    label: 'Resources Layout',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Wrapped', value: 'wrapped' },
    ],
    admin: {
      condition: checkSelectedSection('resources'),
    },
  },
  resourceTitle: {
    name: 'resourceTitle',
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
      condition: showOnDefault,
    },
  },
  resourcesLinks: {
    name: 'resourcesLinks',
    type: 'array',
    admin: {
      condition: checkSelectedSection('resources'),
    },
    fields: Object.values(resourcesLinksFieldsArray),
  },
}
