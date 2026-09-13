import { Metadata } from 'next'
import Link from 'next/link'
import { getAllHajjPackages, deleteHajjPackage } from '@/actions/packages'
import { formatCurrency } from '@/lib/utils'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'

export const metadata: Metadata = { title: 'Hajj Packages | Admin' }

export default async function AdminHajjPackagesPage() {
  let packages: Awaited<ReturnType<typeof getAllHajjPackages>> = []
  try { packages = await getAllHajjPackages() } catch {}

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Cinzel, serif' }}>Hajj Packages</h1>
          <p className="text-gray-500 mt-1">{packages.length} total packages</p>
        </div>
        <Link href="/admin/hajj-packages/new"
          className="btn-primary text-sm px-5 py-2.5"
          style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
          <Plus className="w-4 h-4" />
          Add Package
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {packages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🕋</div>
            <p className="text-gray-500 mb-4">No Hajj packages yet</p>
            <Link href="/admin/hajj-packages/new" className="btn-primary text-sm"
              style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
              <Plus className="w-4 h-4" />Add First Package
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Package</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-700">Duration</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{pkg.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{pkg.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="badge-green text-xs">{pkg.category}</span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-emerald-800">
                      {formatCurrency(Number(pkg.price))}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{pkg.duration} days</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {pkg.published ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Eye className="w-3 h-3" />Published
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <EyeOff className="w-3 h-3" />Draft
                          </span>
                        )}
                        {pkg.featured && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">⭐</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/hajj-packages/${pkg.id}/edit`}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Edit Package">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link href={`/hajj/${pkg.slug}`} target="_blank"
                          className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                          title="View on site">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <DeleteConfirmButton
                          action={deleteHajjPackage.bind(null, pkg.id)}
                          itemName={pkg.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
