import Link from 'next/link'
import { Metadata } from 'next'
import {
  Shield, Award, Users, Clock, Plane, Hotel, FileCheck, MapPin,
  BriefcaseMedical, Package, Star, ArrowRight, Phone, CheckCircle,
} from 'lucide-react'
import { getSettings } from '@/lib/settings'
import { getHajjPackages } from '@/actions/packages'
import { getUmrahPackages } from '@/actions/packages'
import { getTestimonials } from '@/actions/settings'
import { getFAQs } from '@/actions/settings'
import { PackageCard } from '@/components/ui/PackageCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata: Metadata = {
  title: 'ZAM ZAM Tours & Travels — Trusted Hajj & Umrah Services Since 1996',
  description:
    'ZAM ZAM Tours & Travels — Your trusted partner for Hajj & Umrah packages since 1996. Premium packages, visa assistance, hotel bookings in Makkah & Madinah.',
}

const services = [
  { icon: Plane, title: 'Air Ticketing', desc: 'Return airfare from major Indian cities on reputed airlines.' },
  { icon: FileCheck, title: 'Visa Assistance', desc: 'Expert visa application support. Results at discretion of Saudi authorities.' },
  { icon: Hotel, title: 'Hotel Bookings', desc: 'Premium hotels in Makkah & Madinah, close to the Haramain.' },
  { icon: MapPin, title: 'Ziyarat', desc: 'Guided tours to holy sites in Makkah and Madinah.' },
  { icon: Package, title: 'Travel Kit', desc: 'Complete pilgrimage kit for a prepared and comfortable journey.' },
  { icon: Users, title: 'Group Leader', desc: 'Experienced group leader and religious guide throughout.' },
  { icon: BriefcaseMedical, title: 'Saudi Transport', desc: 'Air-conditioned transport for all transfers and ziyarat.' },
  { icon: Shield, title: 'Full Support', desc: '24/7 support throughout your entire pilgrimage journey.' },
]

const hajjSteps = [
  { num: '01', title: 'Ihram & Intention', desc: 'Enter state of Ihram at the Miqat with the intention for Hajj.' },
  { num: '02', title: 'Tawaf al-Qudum', desc: 'Perform the arrival Tawaf around the Kaaba upon reaching Makkah.' },
  { num: '03', title: 'Day of Tarwiyah', desc: 'Travel to Mina on 8th Dhul-Hijja to begin the Hajj rituals.' },
  { num: '04', title: 'Day of Arafah', desc: 'The most important pillar — stand at Arafah on 9th Dhul-Hijja.' },
  { num: '05', title: 'Muzdalifah', desc: 'Collect pebbles at Muzdalifah and spend the night there.' },
  { num: '06', title: 'Rami & Eid', desc: 'Stone the Jamarat, sacrifice, shave hair on 10th Dhul-Hijja.' },
]

const trustStats = [
  { value: '28+', label: 'Years of Service', icon: Award },
  { value: '5000+', label: 'Pilgrims Served', icon: Users },
  { value: '100%', label: 'Dedicated Support', icon: Shield },
  { value: 'Since 1996', label: 'Established', icon: Clock },
]

export default async function HomePage() {
  let settings: Record<string, string> = {}
  let hajjPackages: Awaited<ReturnType<typeof getHajjPackages>> = []
  let umrahPackages: Awaited<ReturnType<typeof getUmrahPackages>> = []
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = []
  let faqs: Awaited<ReturnType<typeof getFAQs>> = []

  try {
    ;[settings, hajjPackages, umrahPackages, testimonials, faqs] = await Promise.all([
      getSettings(),
      getHajjPackages(true),
      getUmrahPackages(true),
      getTestimonials(),
      getFAQs(),
    ])
  } catch {}

  const whatsapp = settings.whatsapp || ''
  const phone = settings.phone || ''

  return (
    <>
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="hero-bg relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-20">
          {/* Arabic calligraphy / Bismillah */}
          <p className="text-gold-300 text-2xl mb-4 opacity-80" style={{ fontFamily: 'Amiri, serif', color: '#fde68a' }}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ background: 'rgba(217,119,6,0.2)', border: '1px solid rgba(251,191,36,0.4)' }}>
            <Star className="w-4 h-4" style={{ color: '#fbbf24' }} />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#fbbf24' }}>
              {settings.hero_badge || 'Since 1996 · Trusted · Experienced'}
            </span>
            <Star className="w-4 h-4" style={{ color: '#fbbf24' }} />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            {settings.hero_title || (
              <>
                Your Journey to the
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Holy Land
                </span>{' '}
                Begins Here
              </>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-emerald-200 mb-4 animate-fade-in-up delay-100 font-light">
            {settings.hero_subtitle || 'Trusted Hajj & Umrah Services Since 1996'}
          </p>
          <p className="text-base text-emerald-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
            ZAM ZAM Tours & Travels — Your trusted partner for a spiritually fulfilling pilgrimage.
            Premium packages, expert guidance, complete support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <Link
              href="/hajj"
              className="btn-gold text-base px-8 py-3.5"
              style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: 'white' }}
            >
              View Hajj Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/umrah"
              className="btn-outline-green text-base px-8 py-3.5"
              style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
            >
              View Umrah Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="text-base px-8 py-3.5 rounded-lg border-2 font-semibold inline-flex items-center gap-2 transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)' }}
            >
              Enquire Now
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <div className="w-0.5 h-12 bg-white rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST STATS
          ============================================================ */}
      <section className="py-16 bg-white islamic-pattern">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center glass-card rounded-2xl p-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p
                    className="text-3xl font-bold mb-1"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED HAJJ PACKAGES
          ============================================================ */}
      {hajjPackages.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              badge="Hajj 2025"
              title="Featured"
              highlight="Hajj Packages"
              subtitle="Begin your sacred journey to Makkah & Madinah with our carefully curated Hajj packages."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hajjPackages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} type="hajj" />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/hajj"
                className="btn-primary text-base px-8 py-3.5 inline-flex"
                style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}
              >
                View All Hajj Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          FEATURED UMRAH PACKAGES
          ============================================================ */}
      {umrahPackages.length > 0 && (
        <section className="py-20 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              badge="Year-Round"
              title="Featured"
              highlight="Umrah Packages"
              subtitle="Perform Umrah any time of the year with our flexible and premium Umrah packages."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {umrahPackages.slice(0, 4).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} type="umrah" />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/umrah"
                className="btn-primary text-base px-8 py-3.5 inline-flex"
                style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}
              >
                View All Umrah Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SERVICES
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            badge="What We Offer"
            title="Our"
            highlight="Services"
            subtitle="Comprehensive Hajj & Umrah services to ensure a spiritually fulfilling and comfortable pilgrimage."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="group p-6 rounded-2xl border border-emerald-100 bg-white hover:border-emerald-500 hover:shadow-lg transition-all text-center"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}
                  >
                    <Icon className="w-7 h-7 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-emerald-900 mb-2 text-base">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          HAJJ PROCESS
          ============================================================ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            badge="Hajj Guide"
            title="The"
            highlight="Hajj Journey"
            subtitle="A simplified overview of the Hajj pilgrimage — the fifth pillar of Islam."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hajjSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="text-5xl font-black mb-4 leading-none"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-emerald-200 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/hajj" className="btn-gold px-8 py-3.5 text-base"
              style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
              Explore Hajj Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-emerald-50 islamic-pattern">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              badge="Pilgrims Say"
              title="What Our"
              highlight="Pilgrims Say"
              subtitle="Alhamdulillah — heartfelt testimonials from those who have performed Hajj & Umrah with us."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map((t) => (
                <div key={t.id} className="testimonial-card">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4" style={{ color: '#f59e0b' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #065f46, #047857)' }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">
                        {t.designation}{t.city ? ` · ${t.city}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          FAQ
          ============================================================ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked"
              highlight="Questions"
              subtitle="Everything you need to know about Hajj & Umrah with ZAM ZAM Tours & Travels."
            />
            <FAQAccordion faqs={faqs.slice(0, 8)} />
            <div className="text-center mt-8">
              <Link href="/contact" className="btn-outline-green px-8 py-3">
                Have More Questions? Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          FINAL ENQUIRY CTA
          ============================================================ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="text-white">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Begin Your Sacred
                <span style={{
                  background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}> Journey</span>
                <br />Today
              </h2>
              <p className="text-emerald-200 text-lg leading-relaxed mb-8">
                Let us help you plan the most important journey of your life.
                Fill in the form and our team will reach out to guide you.
              </p>
              <div className="space-y-4">
                {[
                  'Expert guidance from experienced team',
                  'Transparent pricing — no hidden costs',
                  'Complete visa assistance',
                  'Premium accommodation close to Haramain',
                  'Dedicated support throughout your journey',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                    <span className="text-emerald-100">{point}</span>
                  </div>
                ))}
              </div>
              {phone && (
                <div className="mt-8 pt-8 border-t border-emerald-700">
                  <p className="text-emerald-300 text-sm mb-2">Prefer to call us directly?</p>
                  <a
                    href={`tel:${phone}`}
                    className="btn-gold text-base inline-flex px-8 py-3"
                    style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}
                  >
                    <Phone className="w-5 h-5" />
                    {settings.phone_display || phone}
                  </a>
                </div>
              )}
            </div>

            {/* Right — Enquiry Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="font-bold text-emerald-900 text-xl mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                Send Us an Enquiry
              </h3>
              <EnquiryForm whatsappNumber={whatsapp} compact />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
