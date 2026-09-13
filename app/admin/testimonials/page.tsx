import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAllTestimonials, createTestimonial, deleteTestimonial } from '@/actions/settings'
import { Plus, Star } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'

export const metadata: Metadata = { title: 'Testimonials | Admin' }

export default async function AdminTestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getAllTestimonials>> = []
  try { testimonials = await getAllTestimonials() } catch {}

  const addAction = async (formData: FormData) => {
    'use server'
    await createTestimonial(formData)
    redirect('/admin/testimonials')
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Testimonials</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-5">Add Testimonial</h2>
          <form action={addAction} className="space-y-4">
            <div><label className="form-label">Name *</label><input name="name" type="text" className="form-input" required /></div>
            <div><label className="form-label">Designation</label><input name="designation" type="text" className="form-input" placeholder="Hajj Pilgrim 2024" /></div>
            <div><label className="form-label">City</label><input name="city" type="text" className="form-input" placeholder="Mumbai" /></div>
            <div><label className="form-label">Testimonial *</label><textarea name="content" rows={5} className="form-input resize-y" required /></div>
            <div><label className="form-label">Rating</label>
              <select name="rating" className="form-input"><option value="5">5 ⭐⭐⭐⭐⭐</option><option value="4">4 ⭐⭐⭐⭐</option><option value="3">3 ⭐⭐⭐</option></select></div>
            <div><label className="form-label">Sort Order</label><input name="sortOrder" type="number" className="form-input" defaultValue="0" /></div>
            <label className="flex items-center gap-2"><input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked /><span className="text-sm">Published</span></label>
            <button type="submit" className="btn-primary w-full justify-center cursor-pointer" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
              <Plus className="w-4 h-4" />Add Testimonial
            </button>
          </form>
        </div>
        <div className="space-y-3">
          <h2 className="font-bold text-emerald-900 text-lg">{testimonials.length} Testimonials</h2>
          {testimonials.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">No testimonials yet</div>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{t.name}</p>
                      <span className="text-xs text-gray-400">{t.designation}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2" style={{ color: '#f59e0b' }}>
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{t.content}</p>
                    {!t.published && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-1 inline-block">Draft</span>}
                  </div>
                  <DeleteConfirmButton
                    action={deleteTestimonial.bind(null, t.id)}
                    itemName={t.name}
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
