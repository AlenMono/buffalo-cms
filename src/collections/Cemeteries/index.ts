import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrHasSiteAccess } from '@/access/isAdminOrHasSiteAccess'
import { CollectionConfig } from 'payload'

export const Cemeteries: CollectionConfig = {
  slug: 'cemeteries',
  access: {
    // Anyone logged in can create
    create: authenticated,
    // Only admins or editors with site access can update
    update: isAdminOrHasSiteAccess(),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: authenticated,
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
