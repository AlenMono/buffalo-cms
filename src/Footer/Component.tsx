import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
    const currentYear = new Date().getFullYear()
    const footerData = (await getCachedGlobal('footer', 1)()) as FooterData

    const payloadColumns = footerData?.columns ?? []

    const columns: FooterColumn[] = payloadColumns.length
        ? payloadColumns.map((column) => ({
            title: column?.title || 'Untitled',
            links: column?.links?.map((item) => item?.link).filter(isFooterNavLink) ?? [],
        }))
        : mapLegacyNavItems(footerData?.navItems ?? [])

    return (
        <footer className='bg-background-light'>
            <div className="container py-8 gap-8 mt-autotext-brand">
                <div className="flex flex-col lg:flex-row md:justify-between gap-8">
                    <div className="max-w-[266px] flex flex-col justify-between gap-4">
                        <div className="lg:mb-16">
                            <Link className="flex items-center mb-5" href="/">
                                <Logo isGrayScale />
                            </Link>
                            <p className="text-sm">Mount Olivet 4000 Elmwood Ave Kenmore</p>
                            <p className="text-sm">New York 14217</p>
                            <p className="text-sm underline">(716) 873-6500</p>
                        </div>
                    </div>

                    <div>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:flex lg:justify-end gap-7">
                            {columns.map((column) => (
                                <FooterLinks key={column.title} title={column.title} links={column.links} />
                            ))}
                        </div>
                        <div className="flex mt-8 lg:hidden">
                            <p className="text-xs">
                                ©{currentYear} Buffalo Catholic Cemeteries. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex mt-10">
                    <p className="text-xs">
                        ©{currentYear} Buffalo Catholic Cemeteries. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

type FooterNavLink = React.ComponentProps<typeof CMSLink>
type FooterColumn = { title: string; links: FooterNavLink[] }
type FooterData = FooterType & {
    columns?: Array<{
        title?: string | null
        links?: Array<{ link?: FooterNavLink | null }> | null
    }> | null
}

const isFooterNavLink = (link: FooterNavLink | null | undefined): link is FooterNavLink => Boolean(link)

const FooterLinks = ({ title, links }: { title: string; links: FooterNavLink[] }) => {
    return (
        <div className="space-y-3 min-w-[171px] lg:max-w-[171px]">
            <p className="text-base font-semibold font-faustina">{title}</p>
            {links?.map((link) => (
                <FooterLink key={`${link.label}-${link.url || ''}`} link={link} />
            ))}
        </div>
    )
}

const mapLegacyNavItems = (navItems: NonNullable<FooterType['navItems']>) => {
    const sectionMap = [
        { title: 'About Us', count: 6 },
        { title: 'Planning', count: 4 },
        { title: 'Burial Options', count: 4 },
        { title: 'Remembrance', count: 2 },
        { title: 'Payments', count: 2 },
    ]

    let index = 0

    return sectionMap
        .map((section) => {
            const links = navItems
                ?.slice(index, index + section.count)
                .map((item) => item.link)
                .filter(Boolean) as FooterNavLink[]

            index += section.count

            return {
                title: section.title,
                links,
            }
        })
        .filter((section) => section.links.length > 0)
}

const FooterLink = ({ link }: { link: FooterNavLink }) => {
    return (
        <div>
            <CMSLink
                appearance="inline"
                className="text-sm text-bran font-satoshi hover:opacity-70 transition-all duration-200"
                {...link}
            />
        </div>
    )
}
