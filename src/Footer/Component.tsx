import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { aboutUsList, burialList, paymentsList, planningList, remembranceList } from './footerLinks'

export async function Footer() {
    const currentYear = new Date().getFullYear()
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
                            <FooterLinks links={aboutUsList} title="About Us" />
                            <FooterLinks links={planningList} title="Planning" />
                            <FooterLinks links={burialList} title="Burial Options" />
                            <FooterLinks links={remembranceList} title="Remembrance" />
                            <FooterLinks links={paymentsList} title="Payments" />
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

type Link = {
    href: string
    label: string
}

const FooterLinks = ({ title, links }: { title: string; links: Link[] }) => {
    return (
        <div className="space-y-3 min-w-[171px] lg:max-w-[171px] flex-1">
            <p className="text-base font-semibold font-faustina">{title}</p>
            {links?.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
        </div>
    )
}

const FooterLink = ({ href, label }: { href: string; label: string }) => {
    return (
        <div>
            <Link
                href={href}
                className="text-sm text-bran font-satoshi hover:opacity-70 transition-all duration-200"
            >
                {label}
            </Link>
        </div>
    )
}
