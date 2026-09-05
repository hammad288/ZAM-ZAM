import { Metadata } from 'next'
import { getHotels } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MapPin, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hotels in Makkah & Madinah',
  description: 'Premium hotel options in Makkah & Madinah for Hajj & Umrah pilgrims. Close to Masjid al-Haram and Masjid an-Nabawi.',
}

export default async function HotelsPage() {
  let makkahHotels: Awaited<ReturnType<typeof getHotels>> = []
  let madinahHotels: Awaited<ReturnType<typeof getHotels>> = []
  try {
    ;[makkahHotels, madinahHotels] = await Promise.all([getHotels('MAKKAH'), getHotels('MADINAH')])
  } catch {}

  return (
    <>
      {/* Hero */}
      <div className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Hotels</h1>
          <div className="h-1 w-20 mx-auto rounded mb-5" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Carefully selected hotels in Makkah & Madinah — close to the Haramain for convenient access to prayers.
          </p>
        </div>
      </div>

      {/* Makkah Hotels */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading badge="Makkah" title="Hotels in" highlight="Makkah" subtitle="Close to Masjid al-Haram" />
          {makkahHotels.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Hotels will be listed here. Please contact us for availability.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {makkahHotels.map((hotel) => (
                <div key={hotel.id} className="package-card">
                  <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                    <span className="text-5xl">🕋</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-emerald-900 text-lg leading-snug">{hotel.name}</h3>
                      <div className="flex gap-0.5 flex-shrink-0 ml-2" style={{ color: '#f59e0b' }}>
                        {Array.from({ length: hotel.category }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-sm text-emerald-700 flex items-center gap-1 mb-3"><MapPin className="w-3.5 h-3.5" />{hotel.distance}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{hotel.description}</p>
                    {hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities.slice(0, 4).map((a) => <span key={a} className="badge-green text-xs">{a}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Madinah Hotels */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading badge="Madinah" title="Hotels in" highlight="Madinah" subtitle="Close to Masjid an-Nabawi" />
          {madinahHotels.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Hotels will be listed here. Please contact us for availability.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {madinahHotels.map((hotel) => (
                <div key={hotel.id} className="package-card">
                  <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #022c22, #047857)' }}>
                    <span className="text-5xl">🕌</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-emerald-900 text-lg leading-snug">{hotel.name}</h3>
                      <div className="flex gap-0.5 flex-shrink-0 ml-2" style={{ color: '#f59e0b' }}>
                        {Array.from({ length: hotel.category }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-sm text-emerald-700 flex items-center gap-1 mb-3"><MapPin className="w-3.5 h-3.5" />{hotel.distance}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{hotel.description}</p>
                    {hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities.slice(0, 4).map((a) => <span key={a} className="badge-green text-xs">{a}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
