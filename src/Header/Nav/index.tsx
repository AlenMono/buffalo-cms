'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'

// ---------------- Types (compatible with Payload CMS) ----------------
export type NavItem = {
    label: string
    url?: string | null
    hasDropdown?: boolean | null // accept null from CMS
    dropdownItems?:
    | {
        label: string
        url?: string | null
    }[]
    | null
}

// ---------------- NavLink ----------------
const NavLink = ({
    href,
    children,
    onClick,
    isDropdown
}: {
    href: string
    children: React.ReactNode
    onClick?: () => void
    isDropdown?: boolean
}) => (
    <Link
        href={`/${href}`}
        className={isDropdown ? "relative text-sm text-brand-30 inline-block hover:bg-primary-dark hover:text-invert-darkest w-full px-3 py-2 rounded-md transition-colors duration-200" : "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"}
        onClick={onClick}
    >
        {children}
    </Link>
)

// ---------------- Dropdown ----------------
type DropdownProps = {
    item: NavItem
    isOpen: boolean
    toggle: () => void
    closeDropdown: () => void
}

const Dropdown = ({ item, isOpen, toggle, closeDropdown }: DropdownProps) => {
    // No dropdown → simple link
    if (!item.hasDropdown || !item.dropdownItems || item.dropdownItems.length === 0) {
        return <NavLink href={item.url || '#'}>{item.label}</NavLink>
    }

    return (
        <div className="relative">
            <button
                onClick={toggle}
                className="flex items-center gap-1 hover:text-black focus:outline-none text-nowrap"
            >
                {item.label}
                <svg
                    className={`w-4 h-4 mt-[1px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={`absolute left-0 top-full mt-2 w-[299px] bg-background border border-secondary shadow-lg rounded-md z-50 origin-top transition-all duration-300 ease-out transform
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
            >
                <ul className="p-1">
                    {item.dropdownItems.map((child, idx) => (
                        <li key={idx}>
                            <NavLink href={child.url ?? '#'} onClick={closeDropdown} isDropdown>
                                {child.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const HeaderNav = ({ navItems }: { navItems: NavItem[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openAccordionItems, setOpenAccordionItems] = useState<Set<number>>(new Set())
    const dropdownRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = (index: number) => setOpenIndex(openIndex === index ? null : index)

    const closeDropdown = () => setOpenIndex(null)

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setOpenAccordionItems(new Set())
    }

    const toggleAccordion = (index: number) => {
        const newOpenItems = new Set(openAccordionItems)
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index)
        } else {
            newOpenItems.add(index)
        }
        setOpenAccordionItems(newOpenItems)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown()
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                closeMobileMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileMenuOpen) {
                closeMobileMenu()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isMobileMenuOpen])

    return (
        <>
            {/* Hamburger Menu Button for Mobile */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                aria-label="Toggle mobile menu"
            >
                <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </button>

            {/* Desktop Nav */}
            <nav
                ref={dropdownRef}
                className="gap-6 items-center text-gray-800 text-[16px] font-medium relative hidden lg:flex"
            >
                {navItems?.map((item, i) => (
                    <Dropdown
                        key={i}
                        item={item}
                        isOpen={openIndex === i}
                        toggle={() => toggleDropdown(i)}
                        closeDropdown={closeDropdown}
                    />
                ))}
            </nav>

            {/* Locate a Loved One Button - Desktop */}
            <Link
                href="/locate-a-loved-one"
                className={`${buttonVariants({ size: 'sm', variant: 'outline' })} hidden lg:inline-flex`}
            >
                Locate a Loved One
            </Link>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 bg-background z-50 lg:hidden flex flex-col"
                >
                    <div className="flex justify-between items-center p-4">
                        <Link href="/home">
                            <Logo loading="eager" priority="high" />
                        </Link>
                        <button
                            onClick={closeMobileMenu}
                            className="w-8 h-8 flex items-center justify-center focus:outline-none"
                            aria-label="Close mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="flex flex-col">
                            {navItems?.map((item, i) => (
                                <div key={i}>
                                    {!item.hasDropdown || !item.dropdownItems || item.dropdownItems.length === 0 ? (
                                        <Link href={item.url || '#'} onClick={closeMobileMenu}>
                                            <div className="py-4 px-2 text-lg font-medium">
                                                {item.label}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => toggleAccordion(i)}
                                                className="w-full flex items-center justify-between py-4 px-2 text-lg font-medium transition-colors duration-200"
                                            >
                                                <span>{item.label}</span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-200 ${openAccordionItems.has(i) ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordionItems.has(i) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <ul className="ml-4 space-y-1 pb-2">
                                                    {item.dropdownItems.map((child, idx) => (
                                                        <li key={idx}>
                                                            <NavLink href={child.url ?? '#'} onClick={closeMobileMenu} isDropdown>
                                                                {child.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        <div className="mt-6">
                            <Link
                                href="/locate-a-loved-one"
                                className={buttonVariants({ size: 'sm', variant: 'outline' })}
                                onClick={closeMobileMenu}
                            >
                                Locate a Loved One
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
