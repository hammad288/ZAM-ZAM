import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Plane, Check, X, Phone, MessageCircle, Hotel, Star, Users, Shield, Package } from 'lucide-react'
import { getUmrahPackageBySlug } from '@/actions/packages'
import { getSettings } from '@/lib/settings'
import { formatCurrency, formatDate, generateWhatsAppUrl, generateEnquiryWhatsAppMessage } from '@/lib/utils'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getUmrahPackageBySlug(slug)
  if (!pkg) return { title: 'Package Not Found' }
  return {
    title: `${pkg.name} — Umrah Package`,
    description: pkg.description.substring(0, 160),
  }
}

export default async function UmrahDetailPage({ params }: Props) {
  const { slug } = await params
  const [pkg, settings] = await Promise.all([getUmrahPackageBySlug(slug), getSettings()])

  if (!pkg || !pkg.published) notFound()

  const whatsapp = settings.whatsapp || ''
  const phone = settings.phone || ''
  const waUrl = whatsapp
    ? generateWhatsAppUrl(whatsapp, generateEnquiryWhatsAppMessage({
        name: 'Potential Customer', mobile: 'Via Website', serviceType: 'UMRAH', packageName: pkg.name, persons: 1,
      }))
    : '#'

  const amenities = [
    { label: 'Visa Assistance', value: pkg.visaIncluded },
    { label: 'Meals', value: pkg.mealsIncluded },
    { label: 'Transport', value: pkg.transportIncluded },
    { label: 'Ziyarat', value: pkg.ziyaratIncluded },
    { label: 'Laundry', value: pkg.laundryIncluded },
    { label: 'Travel Kit', value: pkg.travelKitIncluded },
    { label: 'Group Leader', value: pkg.groupLeaderIncluded },
  ]

  return (
    <>
      <div className="bg-emerald-50 border-b border-emerald-100 py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-800">Home</Link>
          <span>/</span>
          <Link href="/umrah" className="hover:text-emerald-800">Umrah Packages</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium truncate">{pkg.name}</span>
        </div>
      </div>

      <div className="py-16 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-gold">{pkg.umrahType.replace('_', ' ')}</span>
            {pkg.isRamzan && <span className="bg-orange-200 text-orange-800 px-3 py-0.5 rounded-full text-xs font-bold">🌙 Ramzan Special</span>}
            {pkg.isFamilyPackage && <span className="bg-pink-200 text-pink-800 px-3 py-0.5 rounded-full text-xs font-bold">👨‍👩‍👧 Family Package</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl" style={{ fontFamily: 'Cinzel, serif' }}>{pkg.name}</h1>
          <div className="flex flex-wrap gap-6 text-emerald-200">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{pkg.duration} Days</span>
            {pkg.departureCity && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{pkg.departureCity}</span>}
            {pkg.airline && <span className="flex items-center gap-2"><Plane className="w-4 h-4" />{pkg.airline}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Package Overview</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{pkg.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Accommodation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-emerald-100 p-5 bg-emerald-50">
                  <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center"><Hotel className="w-4 h-4 text-white" /></div><span className="font-bold text-emerald-900">Makkah</span></div>
                  {pkg.makkahHotel && <p className="font-semibold text-gray-800 mb-1">{pkg.makkahHotel}</p>}
                  {pkg.makkahHotelDistance && <p className="text-sm text-emerald-700 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.makkahHotelDistance}</p>}
                  {pkg.makkahNights && <p className="text-sm text-gray-600 mt-1">{pkg.makkahNights} nights</p>}
                </div>
                <div className="rounded-xl border border-emerald-100 p-5 bg-emerald-50">
                  <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center"><Hotel className="w-4 h-4 text-white" /></div><span className="font-bold text-emerald-900">Madinah</span></div>
                  {pkg.madinahHotel && <p className="font-semibold text-gray-800 mb-1">{pkg.madinahHotel}</p>}
                  {pkg.madinahHotelDistance && <p className="text-sm text-emerald-700 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.madinahHotelDistance}</p>}
                  {pkg.madinahNights && <p className="text-sm text-gray-600 mt-1">{pkg.madinahNights} nights</p>}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {amenities.map(({ label, value }) => (
                  <div key={label} className={`rounded-xl p-3 text-center text-sm font-medium border ${value ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-gray-50 text-gray-400'}`}>
                    {value ? <Check className="w-4 h-4 mx-auto mb-1 text-emerald-600" /> : <X className="w-4 h-4 mx-auto mb-1" />}
                    {label}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>✓ Inclusions</h3>
                    <ul className="space-y-2">{pkg.inclusions.map((inc, i) => <li key={i} className="flex items-start gap-2 text-gray-700 text-sm"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{inc}</li>)}</ul>
                  </div>
                )}
                {pkg.exclusions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>✗ Exclusions</h3>
                    <ul className="space-y-2">{pkg.exclusions.map((exc, i) => <li key={i} className="flex items-start gap-2 text-gray-500 text-sm"><X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />{exc}</li>)}</ul>
                  </div>
                )}
              </div>
            </section>

            {(pkg.terms || pkg.cancellationPolicy) && (
              <section className="space-y-5">
                {pkg.cancellationPolicy && <div className="bg-amber-50 border border-amber-200 rounded-xl p-5"><h3 className="font-bold text-amber-800 mb-2">Cancellation Policy</h3><p className="text-amber-700 text-sm">{pkg.cancellationPolicy}</p></div>}
                {pkg.terms && <div className="bg-gray-50 border border-gray-200 rounded-xl p-5"><h3 className="font-bold text-gray-800 mb-2">Terms & Conditions</h3><p className="text-gray-600 text-sm">{pkg.terms}</p></div>}
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-emerald-500 p-6 shadow-lg sticky top-20">
              <p className="text-gray-500 text-sm mb-1">Starting from</p>
              <p className="text-4xl font-bold text-emerald-800 mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{formatCurrency(Number(pkg.price), pkg.currency)}</p>
              <p className="text-gray-500 text-sm mb-5">per person</p>
              {pkg.departureDate && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Calendar className="w-4 h-4 text-emerald-600" /><span>Departure: {formatDate(pkg.departureDate)}</span></div>}
              <div className="border-t border-gray-100 my-5" />
              <div className="space-y-3">
                <Link href={`/contact?package=${encodeURIComponent(pkg.name)}&service=UMRAH`} className="btn-primary w-full justify-center py-3" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>Enquire Now</Link>
                {whatsapp && <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center py-3"><MessageCircle className="w-5 h-5" />WhatsApp Enquiry</a>}
                {phone && <a href={`tel:${phone}`} className="btn-outline-green w-full justify-center py-3"><Phone className="w-5 h-5" />Call Us</a>}
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">* Visa approval at discretion of Saudi authorities</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg" style={{ fontFamily: 'Cinzel, serif' }}>Quick Enquiry</h3>
              <EnquiryForm whatsappNumber={whatsapp} defaultPackage={pkg.name} defaultService="UMRAH" compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
