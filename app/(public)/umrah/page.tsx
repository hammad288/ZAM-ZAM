import { Metadata } from 'next'
import { getUmrahPackages } from '@/actions/packages'
import { PackageCard } from '@/components/ui/PackageCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Umrah Packages',
  description: 'Browse our premium Umrah packages including Economy, Premium, Ramzan Umrah, and Family Umrah packages with complete visa assistance and hotel bookings.',
}

export default async function UmrahPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  let packages: Awaited<ReturnType<typeof getUmrahPackages>> = []
  try {
    packages = await getUmrahPackages()
  } catch {}

  const filtered = type === 'ramzan'
    ? packages.filter((p) => p.isRamzan)
    : type === 'family'
    ? packages.filter((p) => p.isFamilyPackage)
    : packages

  return (
    <>
      {/* Hero */}
      <div
        className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
      >
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(217,119,6,0.25)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
            Year-Round Umrah
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            Umrah Packages
          </h1>
          <div className="h-1 w-20 mx-auto rounded mb-5"
            style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Perform Umrah any time of the year with our comprehensive packages.
            Economy, Premium, Ramzan, and Family options available.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {[
              { label: 'All Packages', href: '/umrah' },
              { label: 'Ramzan Special', href: '/umrah?type=ramzan' },
              { label: 'Family Packages', href: '/umrah?type=family' },
            ].map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  (type === 'ramzan' && tab.href.includes('ramzan')) ||
                  (type === 'family' && tab.href.includes('family')) ||
                  (!type && tab.href === '/umrah')
                    ? 'bg-emerald-800 text-white'
                    : 'text-gray-600 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🕌</div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                Packages Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">Our Umrah packages are being updated. Please contact us.</p>
              <a href="/contact" className="btn-primary" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                Contact Us
              </a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">Showing <strong>{filtered.length}</strong> Umrah packages</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} type="umrah" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Visa note */}
      <section className="py-12 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-800 text-sm font-medium">
            ⚠️ <strong>Visa Note:</strong> Umrah visa approval is at the sole discretion of Saudi Arabian authorities.
            We do not guarantee visa approval. Please contact us for the latest visa requirements.
          </p>
        </div>
      </section>
    </>
  )
}
