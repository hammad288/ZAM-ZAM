import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plane, Package, Hotel, Image, Star, HelpCircle, MessageSquare, Settings, TrendingUp, Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Dashboard | ZAM ZAM Tours' }

export default async function AdminDashboard() {
  let stats = {
    hajjPackages: 0, umrahPackages: 0, hotels: 0,
    gallery: 0, testimonials: 0, faqs: 0,
    newEnquiries: 0, totalEnquiries: 0,
  }

  try {
    const [hajj, umrah, hotels, gallery, testimonials, faqs, newEnquiries, totalEnquiries] = await Promise.all([
      prisma.hajjPackage.count(),
      prisma.umrahPackage.count(),
      prisma.hotel.count(),
      prisma.galleryImage.count(),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.enquiry.count(),
    ])
    stats = { hajjPackages: hajj, umrahPackages: umrah, hotels, gallery, testimonials, faqs, newEnquiries, totalEnquiries }
  } catch {}

  let recentEnquiries: { id: string; name: string; mobile: string; serviceType: string; status: string; createdAt: Date }[] = []
  try {
    recentEnquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, mobile: true, serviceType: true, status: true, createdAt: true },
    })
  } catch {}

  const statCards = [
    { label: 'Hajj Packages', value: stats.hajjPackages, icon: Plane, href: '/admin/hajj-packages', color: '#065f46' },
    { label: 'Umrah Packages', value: stats.umrahPackages, icon: Package, href: '/admin/umrah-packages', color: '#047857' },
    { label: 'Hotels', value: stats.hotels, icon: Hotel, href: '/admin/hotels', color: '#059669' },
    { label: 'Gallery Images', value: stats.gallery, icon: Image, href: '/admin/gallery', color: '#10b981' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, href: '/admin/testimonials', color: '#d97706' },
    { label: 'FAQs', value: stats.faqs, icon: HelpCircle, href: '/admin/faqs', color: '#b45309' },
    {
      label: 'New Enquiries',
      value: stats.newEnquiries,
      icon: MessageSquare,
      href: '/admin/enquiries',
      color: stats.newEnquiries > 0 ? '#dc2626' : '#6b7280',
      highlight: stats.newEnquiries > 0,
    },
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: TrendingUp, href: '/admin/enquiries', color: '#7c3aed' },
  ]

  const statusColors: Record<string, string> = {
    NEW: 'bg-red-100 text-red-700',
    CONTACTED: 'bg-blue-100 text-blue-700',
    FOLLOW_UP: 'bg-amber-100 text-amber-700',
    CONFIRMED: 'bg-green-100 text-green-700',
    CLOSED: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-900" style={{ fontFamily: 'Cinzel, serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Welcome to ZAM ZAM Tours & Travels admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5 ${
                card.highlight ? 'border-red-300 shadow-sm' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: card.color + '20' }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                {card.highlight && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">New!</span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">{card.value}</p>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions + Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Hajj Package', href: '/admin/hajj-packages/new', icon: Plus },
              { label: 'Add Umrah Package', href: '/admin/umrah-packages/new', icon: Plus },
              { label: 'View Enquiries', href: '/admin/enquiries', icon: MessageSquare },
              { label: 'Edit Settings', href: '/admin/settings', icon: Settings },
              { label: 'Add Hotel', href: '/admin/hotels/new', icon: Plus },
              { label: 'View Website', href: '/', icon: TrendingUp },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  target={action.href === '/' ? '_blank' : undefined}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-sm font-medium text-gray-700 hover:text-emerald-800"
                >
                  <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {action.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-emerald-900 text-lg">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
              View all →
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((e) => (
                <Link
                  key={e.id}
                  href={`/admin/enquiries`}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{e.name}</p>
                    <p className="text-xs text-gray-500">{e.mobile} · {e.serviceType}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColors[e.status]}`}>
                    {e.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
