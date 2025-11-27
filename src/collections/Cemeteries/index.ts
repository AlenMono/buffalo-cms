import { CollectionConfig } from 'payload'

export const Cemeteries: CollectionConfig = {
  slug: 'cemeteries',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'detailsLink',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'workingHours',
      type: 'group',
      fields: [
        { name: 'weekday', type: 'text' },
        { name: 'weekend', type: 'text' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
