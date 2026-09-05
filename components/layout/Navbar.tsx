'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Hajj',
    href: '/hajj',
    children: [
      { href: '/hajj', label: 'All Hajj Packages' },
      { href: '/visa', label: 'Visa Assistance' },
    ],
  },
  {
    label: 'Umrah',
    href: '/umrah',
    children: [
      { href: '/umrah', label: 'All Umrah Packages' },
      { href: '/umrah?type=ramzan', label: 'Ramzan Umrah' },
      { href: '/umrah?type=family', label: 'Family Umrah' },
    ],
  },
  { href: '/hotels', label: 'Hotels' },
  { href: '/visa', label: 'Visa' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  phone?: string
  whatsapp?: string
}

export function Navbar({ phone = '+91 97124 57888', whatsapp = '919712457888' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const targetWa = whatsapp || '919712457888'
  const whatsappUrl = `https://wa.me/${targetWa.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20enquire%20about%20Hajj%2FUmrah%20packages.`

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b-2 border-emerald-800">
      {/* Top bar */}
      <div
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
        className="hidden md:block py-1.5 px-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-emerald-100">
          <span style={{ fontFamily: 'Amiri, serif', color: '#fbbf24' }} className="text-gold-400">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ — Bismillah
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="tel:+919712057888" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-gold-400" style={{ color: '#fbbf24' }} />
                <span>+91 97120 57888</span>
              </a>
              <span className="text-emerald-400">/</span>
              <a href="tel:+919712457888" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>+91 97124 57888</span>
              </a>
            </div>
            {whatsapp && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: '88px' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group mr-4 lg:mr-8" aria-label="ZAM ZAM Tours & Travels - Home">
          <div className="logo-3d-wrapper relative w-[160px] h-[65px] sm:w-[210px] sm:h-[72px] md:w-[240px] md:h-[76px] lg:w-[260px] lg:h-[80px]">
            <div className="logo-3d relative w-full h-full">
              <Image
                src="/images/logo.png"
                alt="ZAM ZAM Tours & Travels"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 210px, 260px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors',
                    pathname.startsWith(link.href)
                      ? 'text-emerald-800 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-800 hover:bg-emerald-50'
                  )}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-1 w-48 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-gray-700 hover:text-emerald-800 hover:bg-emerald-50'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-primary text-sm py-2 px-4"
            style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded text-emerald-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full text-left px-3 py-2.5 font-semibold text-emerald-800 flex justify-between items-center"
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-4 h-4 transition-transform', openDropdown === link.label && 'rotate-180')} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-4 space-y-1 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-emerald-800"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2.5 rounded font-medium transition-colors',
                    pathname === link.href
                      ? 'text-emerald-800 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-800'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/contact"
                className="btn-primary w-full justify-center"
                style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
                onClick={() => setIsOpen(false)}
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
