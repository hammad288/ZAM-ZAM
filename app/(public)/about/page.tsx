import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Heart, Shield, Users, Star, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'ZAM ZAM Tours & Travels — trusted Hajj & Umrah specialist since 1996. Learn about our journey, values, and commitment to serving pilgrims.',
}

const values = [
  { icon: Heart, title: 'Devotion', desc: 'Every pilgrimage is planned with the utmost care, devotion, and respect for the sacred journey.' },
  { icon: Shield, title: 'Trust', desc: 'Built on decades of trust — pilgrims and their families choose us for our reliability and transparency.' },
  { icon: Star, title: 'Excellence', desc: 'We continuously strive for excellence in every aspect of our service — from booking to return.' },
  { icon: Users, title: 'Community', desc: 'We are proud to be part of the Muslim community and serve pilgrims across India and beyond.' },
]

const milestones = [
  { year: '1996', event: 'ZAM ZAM Tours & Travels established with a vision to serve pilgrims with integrity and excellence.' },
  { year: '2000s', event: 'Expanded to serve pilgrims from multiple cities across India with dedicated Hajj & Umrah packages.' },
  { year: '2010s', event: 'Enhanced our premium package offerings with 5-star hotel tie-ups in Makkah & Madinah.' },
  { year: '2020s', event: 'Continued serving pilgrims through challenging times, maintaining our commitment to excellence.' },
  { year: 'Today', event: 'Serving thousands of pilgrims annually with an unwavering commitment to spiritual and service excellence.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>About Us</h1>
          <div className="h-1 w-20 mx-auto rounded mb-5" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Trusted partner for Hajj & Umrah since 1996 — serving pilgrims with devotion, integrity, and excellence.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                style={{ background: 'rgba(6,95,70,0.1)', color: '#065f46', border: '1px solid rgba(6,95,70,0.2)' }}>
                Since 1996
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6 leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                Our Story
              </h2>
              <div className="h-1 w-20 rounded mb-6" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  ZAM ZAM Tours & Travels was established in 1996 with a single, clear purpose: to help Muslim pilgrims
                  perform Hajj and Umrah with ease, comfort, and spiritual focus.
                </p>
                <p>
                  Named after the blessed ZAM ZAM water — a symbol of sustenance, blessing, and divine mercy — our company
                  has been a trusted name in Hajj & Umrah services for nearly three decades.
                </p>
                <p>
                  Over the years, we have had the privilege of serving thousands of pilgrims, helping them fulfil the most
                  sacred obligations and aspirations of their faith. Each journey is planned with the utmost care, ensuring
                  our pilgrims can focus on worship rather than logistics.
                </p>
                <p>
                  We are a <strong>Hajj & Umrah specialist</strong> — this is our only focus, our only expertise,
                  and our only commitment.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #022c22, #065f46)', padding: '3rem', textAlign: 'center' }}>
                <div className="text-8xl mb-4">🕋</div>
                <p className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>ZAM ZAM</p>
                <p className="text-emerald-300">Tours & Travels</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-10 rounded-xl p-4">
                    <p className="text-gold-400 text-3xl font-black" style={{ color: '#fbbf24' }}>28+</p>
                    <p className="text-emerald-200 text-sm">Years of Service</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-4">
                    <p className="text-gold-400 text-3xl font-black" style={{ color: '#fbbf24' }}>1996</p>
                    <p className="text-emerald-200 text-sm">Established</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-emerald-50 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading badge="Our Values" title="What We" highlight="Stand For" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-emerald-900 text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading badge="Our Journey" title="A Legacy of" highlight="Service" />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative flex gap-6">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-700 bg-white flex-shrink-0 flex items-center justify-center z-10"
                    style={{ boxShadow: '0 0 0 4px rgba(6,95,70,0.1)' }}>
                    <span className="text-xs font-bold text-emerald-800 text-center leading-tight">{m.year}</span>
                  </div>
                  <div className="pt-3 pb-3">
                    <p className="text-gray-700 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading badge="Why Choose Us" title="The ZAM ZAM" highlight="Difference" light />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Nearly 3 decades of Hajj & Umrah specialization',
              'Thousands of pilgrims served with care',
              'Expert visa application assistance',
              'Premium hotels close to Haramain',
              'Experienced, knowledgeable group leaders',
              'Transparent pricing with no hidden charges',
              'Dedicated support before, during, and after journey',
              'Hajj & Umrah only — complete focus, complete expertise',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 bg-white bg-opacity-10 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                <span className="text-emerald-100 text-sm">{point}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-gold px-10 py-4 text-base inline-flex"
              style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
