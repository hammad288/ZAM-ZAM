import { Metadata } from 'next'
import { getSetting } from '@/lib/settings'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default async function TermsPage() {
  let content = ''
  try { content = await getSetting('terms_conditions', '') } catch {}
  return (
    <>
      <div className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Terms & Conditions</h1>
        <div className="h-1 w-20 mx-auto rounded mt-4" style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-emerald max-w-none" dangerouslySetInnerHTML={{ __html: content || '<p>Content coming soon.</p>' }} />
      </div>
    </>
  )
}
