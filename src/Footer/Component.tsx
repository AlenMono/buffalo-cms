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
    const socialLinks = footerData?.socialLinks?.map((item) => item?.link).filter(isFooterNavLink) ?? []

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
                            {socialLinks.length > 0 ? (
                                <div className="mt-4 space-y-2 flex items-center gap-4">
                                    {socialLinks.map((link) => (
                                        <SocialFooterLink
                                            key={`social-${link.label}-${link.url || ''}`}
                                            link={link}
                                        />
                                    ))}
                                </div>
                            ) : null}
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
    socialLinks?: Array<{ link?: FooterNavLink | null }> | null
    navItems?: Array<{ link: FooterNavLink }>
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

const mapLegacyNavItems = (navItems: NonNullable<FooterData['navItems']>) => {
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
                .map((item: { link: FooterNavLink }) => item.link)
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

const SocialFooterLink = ({ link }: { link: FooterNavLink }) => {
    const icon = getSocialIcon(link)
    const openInNewTab = link.newTab ?? isExternalUrl(link.url)

    return (
        <CMSLink
            appearance="inline"
            className="text-sm text-bran font-satoshi hover:opacity-70 transition-all duration-200 inline-flex items-center gap-2 flex-row-reverse"
            {...link}
            label=""
            newTab={openInNewTab}
        >
            {icon}
        </CMSLink>
    )
}

const getSocialIcon = (link: FooterNavLink) => {
    const searchable = `${link.label ?? ''} ${link.url ?? ''}`.toLowerCase()

    if (searchable.includes('facebook')) {
        return <FacebookIcon width={16} height={16} aria-hidden="true" />
    }

    if (searchable.includes('instagram')) {
        return <InstagramIcon width={16} height={16} aria-hidden="true" />
    }

    if (searchable.includes('x.com') || searchable.includes('twitter') || /\bx\b/.test(searchable)) {
        return <TwitterXIcon aria-hidden="true" width={16} height={16} />
    }

    return null
}

const isExternalUrl = (url: string | null | undefined) => {
    if (!url) return false

    return /^https?:\/\//i.test(url)
}


const TwitterXIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Logo-Twitter-X-Fill--Streamline-Outlined-Fill-Material-Pro" height="24" width="24" {...props}>
        <desc>
            Logo Twitter X Fill Streamline Icon: https://streamlinehq.com
        </desc>
        <path fill="#000000" d="M8.97803 2.43848 13.396 8.95703 19.6548 2h2.6904l-7.7939 8.6621 6.6269 9.7774 1.0576 1.5615h-6.916l-0.2978 -0.4395 -4.417 -6.5166L4.34521 22H1.65479l7.79394 -8.6602 -6.62695 -9.77828L1.76416 2h6.91602zM16.3813 20.001h2.0831L7.61865 4H5.53662z" stroke-width="1"></path>
    </svg>
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Facebook-Logo-2--Streamline-Flex-Remix" height="14" width="14" {...props}>
        <desc>
            Facebook Logo 2 Streamline Icon: https://streamlinehq.com
        </desc>
        <g id="facebook-logo-2--media-facebook-social">
            <path id="Union" fill="#000000" fill-rule="evenodd" d="M8.44875 0C6.48931 0 4.91198 1.6033 4.91198 3.56731v1.36878c-0.52183 0.02842 -1.04457 0.06747 -1.56895 0.11714 -0.43966 0.04165 -0.83799 0.34956 -0.95205 0.81449 -0.18797 0.76621 -0.18797 1.49835 0 2.26456 0.11406 0.46493 0.5124 0.77284 0.95205 0.81449 0.52438 0.04967 1.04712 0.08872 1.56895 0.11715v3.82068c0 0.6099 0.49096 1.1154 1.1103 1.1154h1.85576c0.61933 0 1.1103 -0.5055 1.1103 -1.1154V9.06921c0.55494 -0.02878 1.11086 -0.0696 1.66866 -0.12244 0.4396 -0.04165 0.838 -0.34956 0.952 -0.81449 0.188 -0.76621 0.188 -1.49835 0 -2.26456l-0.5785 0.14192 0.5785 -0.14192c-0.114 -0.46493 -0.5124 -0.77284 -0.952 -0.81449 -0.5578 -0.05284 -1.11372 -0.09366 -1.66866 -0.12244v-0.41074c0 -0.20265 0.16085 -0.35576 0.34558 -0.35576h0.80518c0.6194 0 1.1103 -0.50554 1.1103 -1.11539V1.60577C11.2494 0.725091 10.5412 0 9.65383 0H8.44875ZM6.16198 3.56731c0 -1.28598 1.02996 -2.31731 2.28677 -2.31731h1.20508c0.18473 0 0.34559 0.15312 0.34559 0.35577v1.30852h-0.6655c-0.88735 0 -1.59558 0.72509 -1.59558 1.60576v1.00879c0 0.33637 0.26622 0.61241 0.60237 0.62459 0.69198 0.02506 1.38536 0.06952 2.08209 0.13339 0.1029 0.48444 0.1029 0.94191 0 1.42636 -0.69673 0.06387 -1.39011 0.10833 -2.08209 0.13339 -0.33615 0.01218 -0.60237 0.28822 -0.60237 0.62459V12.75H6.16198V8.46742c0 -0.33574 -0.26525 -0.61149 -0.60073 -0.62453 -0.65943 -0.02562 -1.32022 -0.06885 -1.98404 -0.12971 -0.10295 -0.48445 -0.10294 -0.94191 0 -1.42636 0.66382 -0.06086 1.32461 -0.10409 1.98404 -0.12971 0.33548 -0.01304 0.60073 -0.28879 0.60073 -0.62453V3.56731Z" clip-rule="evenodd" stroke-width="1"></path>
        </g>
    </svg>
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Instagram--Streamline-Core" height="14" width="14" {...props}>
        <desc>
            Instagram Streamline Icon: https://streamlinehq.com
        </desc>
        <g id="instagram">
            <g id="Group 4546">
                <path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M10.3332 3.64404c-0.1381 0 -0.25 -0.11193 -0.25 -0.25s0.1119 -0.25 0.25 -0.25" stroke-width="1"></path>
                <path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M10.3332 3.64404c0.1381 0 0.25 -0.11193 0.25 -0.25s-0.1119 -0.25 -0.25 -0.25" stroke-width="1"></path>
            </g>
            <path id="Rectangle 2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.858276 3.43141c0 -1.42103 1.151974 -2.573012 2.573014 -2.573012h6.86141c1.421 0 2.573 1.151982 2.573 2.573012v6.86139c0 1.421 -1.152 2.573 -2.573 2.573H3.43129c-1.42104 0 -2.573014 -1.152 -2.573014 -2.573V3.43141Z" stroke-width="1"></path>
            <path id="Ellipse 11" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.312 6.862a2.55 2.55 0 1 0 5.1 0 2.55 2.55 0 1 0 -5.1 0" stroke-width="1"></path>
        </g>
    </svg>
}