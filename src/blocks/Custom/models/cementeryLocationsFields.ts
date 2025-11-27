import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isCemeteryLocationsSection = checkSelectedSection('cemetery-locations')

export const cemeteryLocationsFields = {
  cemeteryLayout: {
    name: 'cemeteryLayout',
    type: 'select',
    defaultValue: 'list',
    label: 'Layout',
    options: [
      { label: 'List', value: 'list' },
      { label: 'Preview', value: 'preview' },
    ],
    admin: { condition: isCemeteryLocationsSection },
  },
}
