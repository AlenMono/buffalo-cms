import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import BackgroundVisual from '@/heros/components/BackgroundVisual'

export default function NotFound() {
  return (
    <div className="container mt-8 lg:mt-16 relative flex-1 flex flex-col items-center text-center min-h-[60vh]">
      <BackgroundVisual heroImpact="high" backgroundVisual={'landing-a'} />

      <div className="prose max-w-none mb-8 pt-40">

        <h1 className="mb-2 font-medium">Coming Soon</h1>
        <p className="text-lg">
          {`We're working hard to bring this page to life.`}
          <br />
          Need immediate assistance? <Link href="/contact" className="underline">Contact us today.</Link>
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/home">Go home</Link>
        </Button>
        <Button asChild variant="default">
          <Link href="/contact">
            <Phone className="mr-2 h-4 w-4" /> Contact Support
          </Link>
        </Button>
      </div>
    </div>
  )
}