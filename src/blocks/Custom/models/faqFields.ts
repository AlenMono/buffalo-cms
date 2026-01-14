import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isFAQSection = checkSelectedSection('faq')

const faqField = {
  faqQuestion: {
    name: 'faqQuestion',
    label: 'Question',
    type: 'text',
    required: false,
  },
  faqAnswer: {
    name: 'faqAnswer',
    label: 'Answer',
    type: 'textarea',
    required: false,
  },
  faqType: {
    name: 'faqType',
    label: 'Type',
    type: 'select',
    options: [
      { label: 'Services', value: 'services' },
      { label: 'Burial', value: 'burial' },
      { label: 'Grief', value: 'grief' },
    ],
    admin: {
      condition: (_data: any, siblingData: any) =>
        siblingData?.section === 'faq' && siblingData?.faqFilters,
    },
  },
}

export const faqFields = {
  faqRichTitle: {
    name: 'faqRichTitle',
    label: 'Title',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    admin: { condition: isFAQSection },
  },
  faqFilters: {
    name: 'faqFilters',
    type: 'checkbox',
    required: false,
    admin: { condition: isFAQSection },
  },
  faqLayout: {
    name: 'faqLayout',
    type: 'select',
    defaultValue: 'block',
    options: [
      { label: 'Block', value: 'block' },
      { label: 'FullPage', value: 'full-page' },
    ],
    required: false,
    admin: { condition: isFAQSection },
  },
  faqs: {
    name: 'faqs',
    label: 'FAQs',
    type: 'array',
    fields: Object.values(faqField),
    admin: { condition: isFAQSection },
  },
}
