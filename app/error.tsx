'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error)
  }, [error])

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
    >
      <div className="text-center text-white max-w-lg mx-auto">
        <div className="text-7xl mb-6">🕌</div>
        <h1
          className="text-4xl sm:text-5xl font-bold mb-3"
          style={{ fontFamily: 'Cinzel, serif', color: '#fbbf24' }}
        >
          Something Went Wrong
        </h1>
        <p className="text-emerald-200 mb-6 text-sm sm:text-base leading-relaxed">
          We encountered an unexpected error while loading this page. Please try again or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn-gold px-6 py-2.5 flex items-center gap-2 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline-green px-6 py-2.5 flex items-center gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
