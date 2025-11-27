import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isBurialOptionsSection = checkSelectedSection('burial-options-list')

const burialOptionField = {
  title: {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  category: {
    name: 'category',
    label: 'Category / Tag',
    type: 'text',
  },
  image: {
    name: 'image',
    label: 'Image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  description: {
    name: 'description',
    label: 'Description',
    type: 'textarea',
  },
  buttonLabel: {
    name: 'buttonLabel',
    label: 'Button Label',
    type: 'text',
    defaultValue: 'Learn More',
  },
  buttonLink: {
    name: 'buttonLink',
    label: 'Button URL',
    type: 'text',
  },
}

export const burialOptionsListFields = {
  burialOptionsList: {
    name: 'burialOptionsList',
    label: 'Burial Options',
    type: 'array',
    fields: Object.values(burialOptionField),
    admin: { condition: isBurialOptionsSection },
    minRows: 1,
  },
}
