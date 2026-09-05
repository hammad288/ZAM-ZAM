import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { getSettings } from '@/lib/settings'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ZAM ZAM Tours & Travels for Hajj & Umrah enquiries. Call, WhatsApp, or fill our enquiry form.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; service?: string }>
}) {
  const { package: pkg, service } = await searchParams
  let settings: Record<string, string> = {}
  try { settings = await getSettings() } catch {}

  const targetWa = settings.whatsapp || '919712457888'
  const whatsappUrl = `https://wa.me/${targetWa.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20enquire%20about%20Hajj%2FUmrah%20packages.`

  return (
    <>
      {/* Hero */}
      <div className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Contact Us</h1>
          <div className="h-1 w-20 mx-auto rounded mb-5" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us for Hajj & Umrah enquiries, package information, or any questions.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-emerald-900 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Get In Touch</h2>

                <div className="space-y-3 mb-4">
                  <a href="tel:+919712057888" className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Primary Phone</p>
                      <p className="font-bold text-emerald-900 group-hover:text-emerald-700">+91 97120 57888</p>
                    </div>
                  </a>

                  <a href="tel:+919712457888" className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Secondary Phone</p>
                      <p className="font-bold text-emerald-900 group-hover:text-emerald-700">+91 97124 57888</p>
                    </div>
                  </a>
                </div>

                {settings.whatsapp && (
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-green-100 hover:border-green-300 hover:bg-green-50 transition-colors mb-4 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">WhatsApp</p>
                      <p className="font-bold text-green-700 group-hover:text-green-600">Chat with us</p>
                    </div>
                  </a>
                )}

                {settings.email && (
                  <a href={`mailto:${settings.email}`}
                    className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors mb-4 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                      <p className="font-bold text-emerald-900 group-hover:text-emerald-700 break-all">{settings.email}</p>
                    </div>
                  </a>
                )}

                {settings.address && (
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Office Address</p>
                      <p className="font-medium text-gray-800">{settings.address}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Office Hours</p>
                    <p className="font-medium text-gray-800 text-sm">Mon–Sat: 10:00 AM – 7:00 PM</p>
                    <p className="text-gray-500 text-sm">Sunday: By appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-emerald-900 mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Send an Enquiry</h2>
              <EnquiryForm
                whatsappNumber={settings.whatsapp}
                defaultPackage={pkg || ''}
                defaultService={(service as 'HAJJ' | 'UMRAH' | 'VISA' | 'HOTEL' | 'OTHER') || 'UMRAH'}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
