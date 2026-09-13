import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAllFAQs, createFAQ, deleteFAQ } from '@/actions/settings'
import { Plus } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'

export const metadata: Metadata = { title: 'FAQs | Admin' }

export default async function AdminFAQsPage() {
  let faqs: Awaited<ReturnType<typeof getAllFAQs>> = []
  try { faqs = await getAllFAQs() } catch {}

  const addAction = async (formData: FormData) => {
    'use server'
    await createFAQ(formData)
    redirect('/admin/faqs')
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>FAQs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-5">Add FAQ</h2>
          <form action={addAction} className="space-y-4">
            <div><label className="form-label">Question *</label><input name="question" type="text" className="form-input" required /></div>
            <div><label className="form-label">Answer *</label><textarea name="answer" rows={5} className="form-input resize-y" required /></div>
            <div><label className="form-label">Category</label>
              <select name="category" className="form-input">
                <option value="GENERAL">General</option><option value="HAJJ">Hajj</option>
                <option value="UMRAH">Umrah</option><option value="VISA">Visa</option><option value="PAYMENT">Payment</option>
              </select></div>
            <div><label className="form-label">Sort Order</label><input name="sortOrder" type="number" className="form-input" defaultValue="0" /></div>
            <label className="flex items-center gap-2"><input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked /><span className="text-sm">Published</span></label>
            <button type="submit" className="btn-primary w-full justify-center cursor-pointer" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
              <Plus className="w-4 h-4" />Add FAQ
            </button>
          </form>
        </div>
        <div className="space-y-3">
          <h2 className="font-bold text-emerald-900 text-lg">{faqs.length} FAQs</h2>
          {faqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">No FAQs yet</div>
          ) : (
            faqs.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mb-2 inline-block">{f.category}</span>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{f.question}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{f.answer}</p>
                    {!f.published && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-1 inline-block">Draft</span>}
                  </div>
                  <DeleteConfirmButton
                    action={deleteFAQ.bind(null, f.id)}
                    itemName={f.question}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
