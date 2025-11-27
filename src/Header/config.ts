import { GlobalConfig } from 'payload'

export type NavItem = {
  label: string
  url?: string | null
  hasDropdown?: boolean | null
  dropdownItems?: { label: string; url?: string | null }[] | null
}

export const Header: GlobalConfig = {
  slug: 'header',
  hooks: {
    beforeChange: [
      ({ data }: { data: { navItems?: NavItem[] } }) => {
        data.navItems?.forEach((item: NavItem) => {
          if (!item.label) item.label = 'Untitled'
          if (!item.hasDropdown) item.dropdownItems = []
        })

        return data
      },
    ],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      required: true, // ensures at least one item
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true, // <-- must always exist
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          required: false,
          defaultValue: [],
          admin: {
            condition: (_, siblingData) => siblingData.hasDropdown,
          },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}

export default Header
