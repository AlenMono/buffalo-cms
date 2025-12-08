'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { buttonVariants } from '@/components/ui/button'

interface HeaderClientProps {
  data?: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`z-20 sticky top-0 transition-all duration-300 ${isScrolled ? 'bg-background' : ''}`}
    >
      <div className="container p-6 flex justify-between items-center">
        <Link href="/home">
          <Logo loading="eager" priority="high" />
        </Link>

        <HeaderNav navItems={data?.navItems || []} />

        <Link
          href="/locate-a-loved-one"
          className={buttonVariants({ size: 'sm', variant: 'outline' })}
        >
          Locate a Loved One
        </Link>
      </div>
    </header>
  )
}
