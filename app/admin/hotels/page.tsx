import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAllHotels, createHotel, deleteHotel } from '@/actions/settings'
import { Plus, Edit, Trash2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Hotels | Admin' }

export default async function AdminHotelsPage() {
  let hotels: Awaited<ReturnType<typeof getAllHotels>> = []
  try { hotels = await getAllHotels() } catch {}

  const addAction = async (formData: FormData) => {
    'use server'
    await createHotel(formData)
    redirect('/admin/hotels')
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Hotels</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-emerald-900 text-lg mb-5">Add Hotel</h2>
          <form action={addAction} className="space-y-4">
            <div><label className="form-label">Hotel Name *</label><input name="name" type="text" className="form-input" required placeholder="Hotel Name" /></div>
            <div><label className="form-label">City *</label>
              <select name="city" className="form-input"><option value="MAKKAH">Makkah</option><option value="MADINAH">Madinah</option></select></div>
            <div><label className="form-label">Star Rating</label>
              <select name="category" className="form-input"><option value="5">5 Star</option><option value="4">4 Star</option><option value="3">3 Star</option></select></div>
            <div><label className="form-label">Distance from Haram</label><input name="distance" type="text" className="form-input" placeholder="e.g. 200m from Masjid al-Haram" /></div>
            <div><label className="form-label">Address</label><input name="address" type="text" className="form-input" placeholder="Full address" /></div>
            <div><label className="form-label">Description *</label><textarea name="description" rows={3} className="form-input resize-y" required /></div>
            <div><label className="form-label">Amenities (one per line)</label><textarea name="amenities" rows={4} className="form-input resize-y" placeholder="WiFi&#10;Restaurant&#10;Room Service" /></div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-emerald-600" /><span className="text-sm">Featured</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked /><span className="text-sm">Published</span></label>
            </div>
            <button type="submit" className="btn-primary w-full justify-center" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
              <Plus className="w-4 h-4" />Add Hotel
            </button>
          </form>
        </div>

        {/* List */}
        <div className="space-y-3">
          <h2 className="font-bold text-emerald-900 text-lg">{hotels.length} Hotels</h2>
          {hotels.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">No hotels yet</div>
          ) : (
            hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{hotel.name}</p>
                  <p className="text-xs text-gray-500">{hotel.city} · {'⭐'.repeat(hotel.category)} · {hotel.distance}</p>
                </div>
                <form action={async () => { 'use server'; await deleteHotel(hotel.id) }}>
                  <button type="submit" className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
