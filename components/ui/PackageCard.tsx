import Link from 'next/link'
import { Calendar, Clock, MapPin, Plane, Star, Check } from 'lucide-react'
import { formatCurrency, formatShortDate } from '@/lib/utils'
import { HajjPackage, UmrahPackage } from '@/types'

type Package = HajjPackage | UmrahPackage

interface PackageCardProps {
  pkg: Package
  type: 'hajj' | 'umrah'
}

const categoryColors: Record<string, string> = {
  ECONOMY: 'bg-blue-100 text-blue-800',
  STANDARD: 'bg-emerald-100 text-emerald-800',
  PREMIUM: 'bg-purple-100 text-purple-800',
  VIP: 'bg-amber-100 text-amber-800',
  EXECUTIVE: 'bg-red-100 text-red-800',
  RAMZAN_SPECIAL: 'bg-orange-100 text-orange-800',
  FAMILY: 'bg-pink-100 text-pink-800',
}

export function PackageCard({ pkg, type }: PackageCardProps) {
  const category = 'category' in pkg ? pkg.category : pkg.umrahType
  const href = `/${type}/${pkg.slug}`
  const isRamzan = 'isRamzan' in pkg && pkg.isRamzan
  const isFamily = 'isFamilyPackage' in pkg && pkg.isFamilyPackage

  return (
    <article className="package-card group">
      {/* Image placeholder / top strip */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 60%, #047857 100%)' }}
      >
        {/* Decorative Islamic pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-30" />

        {/* Kaaba silhouette / icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white opacity-20 text-6xl select-none">🕋</div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`badge-green text-xs font-semibold ${categoryColors[category] || 'bg-emerald-100 text-emerald-800'}`}>
            {category.replace('_', ' ')}
          </span>
          {pkg.featured && (
            <span className="badge-gold text-xs">Featured</span>
          )}
          {isRamzan && (
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-semibold">Ramzan</span>
          )}
          {isFamily && (
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs font-semibold">Family</span>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white rounded-lg px-3 py-1.5 shadow-md">
            <p className="text-xs text-gray-500 leading-none">Starting from</p>
            <p className="text-emerald-800 font-bold text-lg leading-tight">
              {formatCurrency(Number(pkg.price), pkg.currency)}
            </p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-cinzel font-bold text-emerald-900 text-lg leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2" style={{ fontFamily: 'Cinzel, serif' }}>
          {pkg.name}
        </h3>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>{pkg.duration} Days</span>
          </div>
          {pkg.departureCity && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{pkg.departureCity}</span>
            </div>
          )}
          {pkg.departureDate && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{formatShortDate(pkg.departureDate)}</span>
            </div>
          )}
          {pkg.airline && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Plane className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{pkg.airline}</span>
            </div>
          )}
        </div>

        {/* Inclusions snippet */}
        {pkg.inclusions.length > 0 && (
          <div className="mb-4 space-y-1">
            {pkg.inclusions.slice(0, 3).map((inc, i) => (
              <div key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{inc}</span>
              </div>
            ))}
            {pkg.inclusions.length > 3 && (
              <p className="text-xs text-emerald-600 font-medium pl-5">+{pkg.inclusions.length - 3} more inclusions</p>
            )}
          </div>
        )}

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.visaIncluded && <span className="badge-green">Visa ✓</span>}
          {pkg.mealsIncluded && <span className="badge-green">Meals ✓</span>}
          {pkg.transportIncluded && <span className="badge-green">Transport ✓</span>}
          {pkg.ziyaratIncluded && <span className="badge-green">Ziyarat ✓</span>}
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="btn-primary w-full justify-center text-sm"
          style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}
        >
          View Details & Enquire
        </Link>
      </div>
    </article>
  )
}
