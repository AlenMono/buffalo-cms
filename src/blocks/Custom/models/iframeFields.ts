import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isIframeSection = checkSelectedSection('iframe')

export const iframeFields = {
  iframeTitle: {
    name: 'iframeTitle',
    label: 'Title',
    type: 'text',
    required: false,
    admin: { condition: isIframeSection },
  },
  iframeUrl: {
    name: 'iframeUrl',
    label: 'Embed URL',
    type: 'text',
    required: false,
    admin: {
      description: 'Paste the URL to embed (e.g., YouTube or Google Maps)',
      condition: isIframeSection,
    },
  },
  iframeWidth: {
    name: 'iframeWidth',
    label: 'Width',
    type: 'text',
    required: false,
    defaultValue: '560',
    admin: { condition: isIframeSection },
  },
  iframeHeight: {
    name: 'iframeHeight',
    label: 'Height',
    type: 'text',
    required: false,
    defaultValue: '315',
    admin: { condition: isIframeSection },
  },
}
