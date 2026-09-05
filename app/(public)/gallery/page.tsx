import { Metadata } from 'next'
import { getGalleryImages } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photo gallery from Hajj & Umrah pilgrimages — Makkah, Madinah, Ziyarat and more.',
}

const CATEGORY_LABELS: Record<string, string> = {
  MAKKAH: '🕋 Makkah',
  MADINAH: '🕌 Madinah',
  HAJJ: '✈️ Hajj',
  UMRAH: '🤲 Umrah',
  ZIYARAT: '🗺️ Ziyarat',
  GENERAL: '📸 General',
}

export default async function GalleryPage() {
  let images: Awaited<ReturnType<typeof getGalleryImages>> = []
  try { images = await getGalleryImages() } catch {}

  return (
    <>
      {/* Hero */}
      <div className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Gallery</h1>
          <div className="h-1 w-20 mx-auto rounded mb-5" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg">Moments from sacred journeys to the Holy Land.</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {images.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📸</div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Gallery Coming Soon</h2>
              <p className="text-gray-600">Photos will be added here. Please check back soon.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt || img.caption || 'ZAM ZAM Tours gallery image'}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {img.caption && (
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-700">{img.caption}</p>
                      <span className="text-xs text-emerald-600 font-medium">{CATEGORY_LABELS[img.category]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
