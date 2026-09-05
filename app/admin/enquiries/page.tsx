import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { updateEnquiryStatus } from '@/actions/enquiry'
import { formatDate } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'

export const metadata: Metadata = { title: 'Enquiries | Admin' }

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONFIRMED', 'CLOSED']
const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-red-100 text-red-700 border-red-200',
  CONTACTED: 'bg-blue-100 text-blue-700 border-blue-200',
  FOLLOW_UP: 'bg-amber-100 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
  CLOSED: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  let enquiries: { id: string; name: string; mobile: string; whatsapp: string | null; email: string | null; serviceType: string; packageName: string | null; persons: number; departureCity: string | null; travelDate: string | null; message: string | null; status: string; adminNotes: string | null; createdAt: Date }[] = []

  try {
    enquiries = await prisma.enquiry.findMany({
      where: status && STATUS_OPTIONS.includes(status) ? { status: status as 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONFIRMED' | 'CLOSED' } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  } catch {}

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Cinzel, serif' }}>Enquiries</h1>
          <p className="text-gray-500 mt-1">{enquiries.length} enquiries</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a href="/admin/enquiries" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!status ? 'bg-emerald-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'}`}>All</a>
        {STATUS_OPTIONS.map((s) => (
          <a key={s} href={`/admin/enquiries?status=${s}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${status === s ? 'bg-emerald-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
            {s}
          </a>
        ))}
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-bold text-gray-900 text-lg">{e.name}</h2>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                    <span className="badge-green text-xs">{e.serviceType}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(e.createdAt)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div><span className="text-gray-400 font-medium">Mobile: </span><a href={`tel:${e.mobile}`} className="text-emerald-700 font-semibold">{e.mobile}</a></div>
                {e.whatsapp && <div><span className="text-gray-400 font-medium">WhatsApp: </span><a href={`https://wa.me/${e.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="text-green-600 font-semibold">{e.whatsapp}</a></div>}
                {e.email && <div><span className="text-gray-400 font-medium">Email: </span><a href={`mailto:${e.email}`} className="text-blue-600">{e.email}</a></div>}
                {e.packageName && <div><span className="text-gray-400 font-medium">Package: </span><span className="font-medium text-gray-700">{e.packageName}</span></div>}
                <div><span className="text-gray-400 font-medium">Persons: </span><span className="font-medium text-gray-700">{e.persons}</span></div>
                {e.departureCity && <div><span className="text-gray-400 font-medium">From: </span><span className="font-medium text-gray-700">{e.departureCity}</span></div>}
                {e.travelDate && <div><span className="text-gray-400 font-medium">Travel Date: </span><span className="font-medium text-gray-700">{e.travelDate}</span></div>}
              </div>

              {e.message && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">Message:</p>
                  <p className="text-sm text-gray-700">{e.message}</p>
                </div>
              )}

              {/* Status Update */}
              <form action={async (formData: FormData) => {
                'use server'
                const newStatus = formData.get('status') as string
                const adminNotes = formData.get('adminNotes') as string
                await updateEnquiryStatus(e.id, newStatus, adminNotes)
              }} className="border-t border-gray-100 pt-4">
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="flex-1 min-w-40">
                    <label className="form-label text-xs">Update Status</label>
                    <select name="status" className="form-input py-2 text-sm" defaultValue={e.status}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 min-w-60">
                    <label className="form-label text-xs">Admin Notes</label>
                    <input name="adminNotes" type="text" className="form-input py-2 text-sm" placeholder="Add notes..." defaultValue={e.adminNotes || ''} />
                  </div>
                  <button type="submit" className="btn-primary text-sm py-2 px-5" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
