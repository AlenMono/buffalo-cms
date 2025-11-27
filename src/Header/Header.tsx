import { HeaderClient } from './Component.client'
import type { NavItem } from './Nav'

function normalizeNavItems(payloadItems: any[] = []): NavItem[] {
  return payloadItems.map((item) => ({
    label: item.label,
    url: item.url ?? null,
    children: item.dropdownItems
      ? item.dropdownItems.map((child: any) => ({
          label: child.label,
          url: child.url ?? null,
        }))
      : null,
  }))
}

export default async function Header() {
  const header = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/header`, {
    next: { revalidate: 60 },
  }).then((res) => res.json())

  const navItems = normalizeNavItems(header.navItems)

  const data = {
    id: header.id,
    navItems,
  }

  return <HeaderClient data={data} />
}
