import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAllGalleryImages, createGalleryImage, deleteGalleryImage } from '@/actions/settings'
import { Plus } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'

export const metadata: Metadata = { title: 'Gallery | Admin' }

export default async function AdminGalleryPage() {
  let images: Awaited<ReturnType<typeof getAllGalleryImages>> = []
  try { images = await getAllGalleryImages() } catch {}

  const addAction = async (formData: FormData) => {
    'use server'
    await createGalleryImage(formData)
    redirect('/admin/gallery')
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Gallery</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-5">Add Image</h2>
          <form action={addAction} className="space-y-4">
            <div><label className="form-label">Image URL *</label><input name="url" type="url" className="form-input" required placeholder="https://..." /></div>
            <div><label className="form-label">Caption</label><input name="caption" type="text" className="form-input" /></div>
            <div><label className="form-label">Alt Text (for SEO)</label><input name="alt" type="text" className="form-input" placeholder="Description for screen readers" /></div>
            <div><label className="form-label">Category</label>
              <select name="category" className="form-input">
                <option value="GENERAL">General</option><option value="MAKKAH">Makkah</option>
                <option value="MADINAH">Madinah</option><option value="HAJJ">Hajj</option>
                <option value="UMRAH">Umrah</option><option value="ZIYARAT">Ziyarat</option>
              </select></div>
            <div><label className="form-label">Sort Order</label><input name="sortOrder" type="number" className="form-input" defaultValue="0" /></div>
            <label className="flex items-center gap-2"><input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked /><span className="text-sm">Published</span></label>
            <button type="submit" className="btn-primary w-full justify-center cursor-pointer" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
              <Plus className="w-4 h-4" />Add Image
            </button>
          </form>
        </div>
        <div className="lg:col-span-2">
          <h2 className="font-bold text-emerald-900 text-lg mb-4">{images.length} Images</h2>
          {images.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">No gallery images yet</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative rounded-xl overflow-hidden border border-gray-200 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt || img.caption || 'Gallery'} className="w-full h-32 object-cover" />
                  <div className="p-2">
                    <p className="text-xs text-gray-600 truncate">{img.caption || '—'}</p>
                    <p className="text-xs text-emerald-600">{img.category}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteConfirmButton
                      action={deleteGalleryImage.bind(null, img.id)}
                      itemName={img.caption || 'this image'}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg transition-colors cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
