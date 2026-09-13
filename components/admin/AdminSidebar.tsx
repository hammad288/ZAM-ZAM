'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import NextImage from 'next/image'
import {
  LayoutDashboard, Package, Plane, Hotel, Image, Star, HelpCircle,
  MessageSquare, Settings, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/hajj-packages', label: 'Hajj Packages', icon: Plane },
  { href: '/admin/umrah-packages', label: 'Umrah Packages', icon: Package },
  { href: '/admin/hotels', label: 'Hotels', icon: Hotel },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === '/admin/login') {
    return null
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-emerald-700">
        <Link href="/admin" className="block group">
          <div className="relative w-44 h-12 bg-white/95 rounded-lg overflow-hidden transition-opacity group-hover:opacity-90">
            <NextImage
              src="/images/logo.png"
              alt="ZAM ZAM Admin"
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="inline-block mt-1.5 text-[10px] font-semibold tracking-[0.15em] text-emerald-400 uppercase">Admin Panel</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-600" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-emerald-700 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-emerald-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
        >
          View Website ↗
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-emerald-300 hover:text-red-300 hover:bg-red-500 hover:bg-opacity-20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="admin-sidebar hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-emerald-900 text-white">
        <p className="font-bold" style={{ fontFamily: 'Cinzel, serif' }}>ZAM ZAM Admin</p>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 admin-sidebar flex-col flex" style={{ zIndex: 50 }}>
            <div className="h-14" />
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
