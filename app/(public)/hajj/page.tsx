import { Metadata } from 'next'
import { getHajjPackages } from '@/actions/packages'
import { PackageCard } from '@/components/ui/PackageCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hajj Packages 2025',
  description: 'Browse our premium Hajj packages for 2025. Economy, Standard, Premium, and VIP Hajj packages with complete visa assistance, flights, hotels, and support.',
}

export default async function HajjPage() {
  let packages: Awaited<ReturnType<typeof getHajjPackages>> = []
  try {
    packages = await getHajjPackages()
  } catch {}

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
            Hajj 2025
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            Hajj Packages
          </h1>
          <div className="h-1 w-20 mx-auto rounded mb-5"
            style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Complete Hajj packages including flights, visa assistance, premium accommodation in Makkah & Madinah, transport, and guided support.
          </p>
        </div>
      </div>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {packages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🕋</div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                Packages Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">Our Hajj packages are being updated. Please contact us for the latest packages and pricing.</p>
              <a href="/contact" className="btn-primary" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                Contact Us
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  Showing <strong>{packages.length}</strong> Hajj packages
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} type="hajj" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-800 text-sm font-medium">
            ⚠️ <strong>Visa Note:</strong> While we provide full visa application assistance, Hajj & Umrah visa approval
            is at the sole discretion of Saudi Arabian authorities. We strongly recommend not making any other travel
            arrangements until your visa is confirmed.
          </p>
        </div>
      </section>
    </>
  )
}
