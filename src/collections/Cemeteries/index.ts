import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'
import { CollectionConfig } from 'payload'

export const Cemeteries: CollectionConfig<'cemeteries'> = {
  slug: 'cemeteries',
  access: {
    // Anyone logged in can create
    create: authenticated,
    // Only admins or editors with site access can update
    update: authenticated,
    read: anyone,
    // Only admins can delete
    delete: isAdmin,
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
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      required: false,
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
