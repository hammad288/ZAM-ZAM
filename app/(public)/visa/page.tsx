import { Metadata } from 'next'
import Link from 'next/link'
import { FileCheck, AlertTriangle, CheckCircle, Clock, Users, Shield } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EnquiryForm } from '@/components/ui/EnquiryForm'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Visa Assistance',
  description: 'ZAM ZAM Tours provides complete Hajj & Umrah visa application assistance. Note: Visa approval is at the discretion of Saudi Arabian authorities.',
}

const visaSteps = [
  { step: '01', title: 'Document Collection', desc: 'We guide you on all required documents — passport, photos, vaccination certificates, and application forms.' },
  { step: '02', title: 'Application Preparation', desc: 'Our team carefully prepares and reviews your complete visa application to ensure accuracy.' },
  { step: '03', title: 'Submission & Follow-up', desc: 'We submit your application and follow up with the relevant authorities on your behalf.' },
  { step: '04', title: 'Visa Decision', desc: 'Visa issuance is at the sole discretion of Saudi Arabian authorities. We inform you of the decision promptly.' },
]

const docList = [
  'Valid passport (minimum 6 months validity from travel date)',
  'Recent passport-size photographs (white background)',
  'Completed visa application form',
  'Meningitis vaccination certificate (ACWY)',
  'COVID-19 vaccination certificate (as per current Saudi requirements)',
  'Proof of accommodation bookings (provided by us)',
  'Proof of travel bookings (provided by us)',
  'For women under 45: Mahram documentation or group arrangement letter',
  'Any other documents as required by Saudi Embassy/Consulate',
]

export default async function VisaPage() {
  let settings: Record<string, string> = {}
  try { settings = await getSettings() } catch {}

  return (
    <>
      {/* Hero */}
      <div className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Visa Assistance</h1>
          <div className="h-1 w-20 mx-auto rounded mb-5" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Complete Hajj & Umrah visa application guidance. We handle the paperwork; Saudi authorities make the decision.
          </p>
        </div>
      </div>

      {/* Important Disclaimer */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-amber-800 mb-1">Important Disclaimer</h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                ZAM ZAM Tours & Travels provides visa <strong>application assistance only</strong>. We do not guarantee visa approval.
                Visa issuance is entirely at the discretion of the Royal Saudi Arabian Embassy/Consulate and Saudi Arabian authorities.
                We strongly advise against making any irrevocable travel arrangements until your visa is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading badge="How It Works" title="Visa Application" highlight="Process" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaSteps.map((step) => (
              <div key={step.step} className="text-center p-6 rounded-2xl border border-emerald-100 bg-white hover:shadow-lg transition-shadow">
                <div className="text-4xl font-black mb-4" style={{ fontFamily: 'Cinzel, serif', background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {step.step}
                </div>
                <h3 className="font-bold text-emerald-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading badge="Required" title="Visa" highlight="Documents" subtitle="General document requirements for Hajj & Umrah visa. Requirements may vary — please contact us for latest updates." />
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
            <ul className="space-y-3">
              {docList.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-amber-700 text-sm">
                <strong>Note:</strong> Requirements are subject to change. Contact us for the most up-to-date information specific to your travel dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white mb-10">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Need Visa Assistance?</h2>
            <p className="text-emerald-200">Contact us and our team will guide you through the entire visa process.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <EnquiryForm whatsappNumber={settings.whatsapp} defaultService="VISA" />
          </div>
        </div>
      </section>
    </>
  )
}
