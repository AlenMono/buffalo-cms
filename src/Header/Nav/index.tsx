'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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
        href={href}
        className={isDropdown ? "relative text-sm text-brand-30 inline-block hover:bg-gold w-full px-3 py-2 rounded-md transition-colors duration-200" : "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"}
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
                className={`absolute left-0 top-full mt-2 w-48 bg-background border border-secondary shadow-lg rounded-md z-50 origin-top transition-all duration-300 ease-out transform
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
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = (index: number) => setOpenIndex(openIndex === index ? null : index)

    const closeDropdown = () => setOpenIndex(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
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
    )
}
