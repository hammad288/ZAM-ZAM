import { redirect } from 'next/navigation'
import { createUmrahPackage } from '@/actions/packages'

export default function NewUmrahPackagePage() {
  const submitAction = async (formData: FormData) => {
    'use server'
    await createUmrahPackage(formData)
    redirect('/admin/umrah-packages')
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Add Umrah Package</h1>
      <form action={submitAction} className="space-y-8">
        <Section title="Basic Information">
          <Grid>
            <Field label="Package Name *" name="name" required />
            <Field label="URL Slug *" name="slug" required />
            <Field label="Umrah Type *" name="umrahType" type="select"
              options={['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'EXECUTIVE', 'RAMZAN_SPECIAL', 'FAMILY'].map(v => ({ value: v, label: v.replace('_', ' ') }))} />
            <Field label="Price (INR) *" name="price" type="number" required />
            <Field label="Duration (days) *" name="duration" type="number" required />
            <Field label="Departure City" name="departureCity" defaultValue="Mumbai" />
            <Field label="Departure Date" name="departureDate" type="date" />
            <Field label="Return Date" name="returnDate" type="date" />
            <Field label="Airline" name="airline" />
          </Grid>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="isRamzan" value="true" className="w-4 h-4 accent-emerald-600" /><span className="text-sm font-medium text-gray-700">🌙 Ramzan Package</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="isFamilyPackage" value="true" className="w-4 h-4 accent-emerald-600" /><span className="text-sm font-medium text-gray-700">👨‍👩‍👧 Family Package</span></label>
          </div>
        </Section>

        <Section title="Makkah Accommodation">
          <Grid>
            <Field label="Hotel Name" name="makkahHotel" />
            <Field label="Distance from Haram" name="makkahHotelDistance" />
            <Field label="Nights" name="makkahNights" type="number" />
          </Grid>
        </Section>

        <Section title="Madinah Accommodation">
          <Grid>
            <Field label="Hotel Name" name="madinahHotel" />
            <Field label="Distance from Nabawi" name="madinahHotelDistance" />
            <Field label="Nights" name="madinahNights" type="number" />
          </Grid>
        </Section>

        <Section title="Package Details">
          <div className="space-y-4">
            <div><label className="form-label">Description *</label><textarea name="description" rows={5} className="form-input resize-y" required /></div>
            <div><label className="form-label">Inclusions (one per line)</label><textarea name="inclusions" rows={6} className="form-input resize-y" /></div>
            <div><label className="form-label">Exclusions (one per line)</label><textarea name="exclusions" rows={4} className="form-input resize-y" /></div>
            <div><label className="form-label">Cancellation Policy</label><textarea name="cancellationPolicy" rows={3} className="form-input resize-y" /></div>
            <div><label className="form-label">Terms & Conditions</label><textarea name="terms" rows={3} className="form-input resize-y" /></div>
          </div>
        </Section>

        <Section title="Amenities">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: 'visaIncluded', label: 'Visa', default: true },
              { name: 'mealsIncluded', label: 'Meals', default: false },
              { name: 'transportIncluded', label: 'Transport', default: true },
              { name: 'ziyaratIncluded', label: 'Ziyarat', default: false },
              { name: 'laundryIncluded', label: 'Laundry', default: false },
              { name: 'travelKitIncluded', label: 'Travel Kit', default: false },
              { name: 'groupLeaderIncluded', label: 'Group Leader', default: false },
            ].map((a) => (
              <label key={a.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 cursor-pointer">
                <input type="checkbox" name={a.name} value="true" className="w-4 h-4 accent-emerald-600" defaultChecked={a.default} />
                <span className="text-sm font-medium text-gray-700">{a.label}</span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Publish Settings">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600" defaultChecked /><span className="text-sm font-semibold text-gray-700">Published</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-emerald-600" /><span className="text-sm font-semibold text-gray-700">Featured</span></label>
          </div>
        </Section>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary px-8 py-3" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>Save Package</button>
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
function Field({ label, name, type = 'text', required, defaultValue, options }: {
  label: string; name: string; type?: string; required?: boolean; defaultValue?: string; options?: { value: string; label: string }[];
}) {
  if (type === 'select' && options) {
    return <div><label className="form-label">{label}</label><select name={name} className="form-input">{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
  }
  return <div><label className="form-label">{label}</label><input name={name} type={type} className="form-input" required={required} defaultValue={defaultValue} /></div>
}
