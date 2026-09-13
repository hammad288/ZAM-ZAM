import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { updateUmrahPackage } from '@/actions/packages'

interface Props { params: Promise<{ id: string }> }

export default async function EditUmrahPackagePage({ params }: Props) {
  const { id } = await params
  const pkg = await prisma.umrahPackage.findUnique({ where: { id } })
  if (!pkg) notFound()

  const submitAction = async (formData: FormData) => {
    'use server'
    await updateUmrahPackage(id, formData)
    redirect('/admin/umrah-packages')
  }

  const dv: Record<string, any> = {
    ...pkg,
    price: Number(pkg.price),
    departureDate: pkg.departureDate ? pkg.departureDate.toISOString().split('T')[0] : '',
    returnDate: pkg.returnDate ? pkg.returnDate.toISOString().split('T')[0] : '',
    inclusions: pkg.inclusions.join('\n'),
    exclusions: pkg.exclusions.join('\n'),
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
        Edit: {pkg.name}
      </h1>
      <form action={submitAction} className="space-y-8">
        {/* ---- Basic Info ---- */}
        <Section title="Basic Information">
          <Grid>
            <Field label="Package Name *" name="name" required defaultValue={pkg.name} />
            <Field label="URL Slug (Optional)" name="slug" defaultValue={pkg.slug} placeholder="Auto-generated if left empty" />
            <Field label="Umrah Type *" name="umrahType" type="select" defaultValue={pkg.umrahType}
              options={['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'EXECUTIVE', 'RAMZAN_SPECIAL', 'FAMILY'].map(v => ({ value: v, label: v.replace('_', ' ') }))} />
            <Field label="Price (INR) *" name="price" type="number" required defaultValue={String(Number(pkg.price))} />
            <Field label="Duration (days) *" name="duration" type="number" required defaultValue={String(pkg.duration)} />
            <Field label="Departure City" name="departureCity" defaultValue={pkg.departureCity} />
            <Field label="Departure Date" name="departureDate" type="date" defaultValue={dv.departureDate as string} />
            <Field label="Return Date" name="returnDate" type="date" defaultValue={dv.returnDate as string} />
            <Field label="Airline" name="airline" defaultValue={pkg.airline || ''} />
          </Grid>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isRamzan" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={pkg.isRamzan} />
              <span className="text-sm font-medium text-gray-700">🌙 Ramzan Package</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isFamilyPackage" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={pkg.isFamilyPackage} />
              <span className="text-sm font-medium text-gray-700">👨‍👩‍👧 Family Package</span>
            </label>
          </div>
        </Section>

        {/* ---- Makkah Accommodation ---- */}
        <Section title="Makkah Accommodation">
          <Grid>
            <Field label="Hotel Name" name="makkahHotel" defaultValue={pkg.makkahHotel || ''} />
            <Field label="Distance from Haram" name="makkahHotelDistance" defaultValue={pkg.makkahHotelDistance || ''} />
            <Field label="Nights" name="makkahNights" type="number" defaultValue={String(pkg.makkahNights ?? '')} />
          </Grid>
        </Section>

        {/* ---- Madinah Accommodation ---- */}
        <Section title="Madinah Accommodation">
          <Grid>
            <Field label="Hotel Name" name="madinahHotel" defaultValue={pkg.madinahHotel || ''} />
            <Field label="Distance from Nabawi" name="madinahHotelDistance" defaultValue={pkg.madinahHotelDistance || ''} />
            <Field label="Nights" name="madinahNights" type="number" defaultValue={String(pkg.madinahNights ?? '')} />
          </Grid>
        </Section>

        {/* ---- Package Details ---- */}
        <Section title="Package Details">
          <div className="space-y-4">
            <div>
              <label className="form-label">Description *</label>
              <textarea name="description" rows={5} className="form-input resize-y" required defaultValue={pkg.description} />
            </div>
            <div>
              <label className="form-label">Inclusions (one per line)</label>
              <textarea name="inclusions" rows={6} className="form-input resize-y" defaultValue={pkg.inclusions.join('\n')} />
            </div>
            <div>
              <label className="form-label">Exclusions (one per line)</label>
              <textarea name="exclusions" rows={4} className="form-input resize-y" defaultValue={pkg.exclusions.join('\n')} />
            </div>
            <div>
              <label className="form-label">Cancellation Policy</label>
              <textarea name="cancellationPolicy" rows={3} className="form-input resize-y" defaultValue={pkg.cancellationPolicy || ''} />
            </div>
            <div>
              <label className="form-label">Terms & Conditions</label>
              <textarea name="terms" rows={3} className="form-input resize-y" defaultValue={pkg.terms || ''} />
            </div>
          </div>
        </Section>

        {/* ---- Amenities ---- */}
        <Section title="Amenities">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: 'visaIncluded', label: 'Visa', val: pkg.visaIncluded },
              { name: 'mealsIncluded', label: 'Meals', val: pkg.mealsIncluded },
              { name: 'transportIncluded', label: 'Transport', val: pkg.transportIncluded },
              { name: 'ziyaratIncluded', label: 'Ziyarat', val: pkg.ziyaratIncluded },
              { name: 'laundryIncluded', label: 'Laundry', val: pkg.laundryIncluded },
              { name: 'travelKitIncluded', label: 'Travel Kit', val: pkg.travelKitIncluded },
              { name: 'groupLeaderIncluded', label: 'Group Leader', val: pkg.groupLeaderIncluded },
            ].map((a) => (
              <label key={a.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 cursor-pointer">
                <input type="checkbox" name={a.name} value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={a.val} />
                <span className="text-sm font-medium text-gray-700">{a.label}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* ---- Publish Settings ---- */}
        <Section title="Publish Settings">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={pkg.published} />
              <span className="text-sm font-semibold text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={pkg.featured} />
              <span className="text-sm font-semibold text-gray-700">Featured</span>
            </label>
          </div>
        </Section>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary px-8 py-3" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
            Save Changes
          </button>
          <a href="/admin/umrah-packages" className="btn-outline-green px-8 py-3">Cancel</a>
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl border border-gray-200 p-6"><h2 className="font-bold text-emerald-900 text-lg mb-5 pb-3 border-b border-gray-100">{title}</h2>{children}</div>
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

function Field({ label, name, type = 'text', required, defaultValue, placeholder, options }: {
  label: string; name: string; type?: string; required?: boolean; defaultValue?: string; placeholder?: string; options?: { value: string; label: string }[];
}) {
  if (type === 'select' && options) {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select name={name} className="form-input" defaultValue={defaultValue}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    )
  }
  return (
    <div>
      <label className="form-label">{label}</label>
      <input name={name} type={type} className="form-input" required={required} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  )
}
