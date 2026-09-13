import { redirect } from 'next/navigation'
import { createHajjPackage } from '@/actions/packages'

export default function NewHajjPackagePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
        Add Hajj Package
      </h1>
      <PackageForm type="hajj" />
    </div>
  )
}

function PackageForm({ type, defaultValues }: { type: 'hajj' | 'umrah'; defaultValues?: Record<string, string | boolean | number | null> }) {
  const submitAction = async (formData: FormData) => {
    'use server'
    if (type === 'hajj') {
      await createHajjPackage(formData)
      redirect('/admin/hajj-packages')
    }
  }

  return (
    <form action={submitAction} className="space-y-8">
      {/* Basic Info */}
      <FormSection title="Basic Information">
        <FormGrid>
          <FormField label="Package Name *" name="name" placeholder="e.g. Economy Hajj Package 2025" required defaultValue={String(defaultValues?.name ?? '')} />
          <FormField label="URL Slug (Optional)" name="slug" placeholder="Auto-generated if left empty" defaultValue={String(defaultValues?.slug ?? '')} />
          <FormField label="Category *" name="category" type="select" required defaultValue={String(defaultValues?.category ?? 'ECONOMY')}
            options={['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'EXECUTIVE'].map(v => ({ value: v, label: v }))} />
          <FormField label="Price (INR) *" name="price" type="number" placeholder="285000" required defaultValue={String(defaultValues?.price ?? '')} />
          <FormField label="Duration (days) *" name="duration" type="number" placeholder="40" required defaultValue={String(defaultValues?.duration ?? '')} />
          <FormField label="Departure City" name="departureCity" placeholder="Mumbai" defaultValue={String(defaultValues?.departureCity ?? 'Mumbai')} />
          <FormField label="Departure Date" name="departureDate" type="date" defaultValue={String(defaultValues?.departureDate ?? '')} />
          <FormField label="Return Date" name="returnDate" type="date" defaultValue={String(defaultValues?.returnDate ?? '')} />
          <FormField label="Airline" name="airline" placeholder="Air India / Saudi Airlines" defaultValue={String(defaultValues?.airline ?? '')} />
        </FormGrid>
      </FormSection>

      {/* Makkah Accommodation */}
      <FormSection title="Makkah Accommodation">
        <FormGrid>
          <FormField label="Hotel Name" name="makkahHotel" placeholder="Al Masa Hotel, Makkah" defaultValue={String(defaultValues?.makkahHotel ?? '')} />
          <FormField label="Distance from Haram" name="makkahHotelDistance" placeholder="800m from Masjid al-Haram" defaultValue={String(defaultValues?.makkahHotelDistance ?? '')} />
          <FormField label="Nights in Makkah" name="makkahNights" type="number" placeholder="25" defaultValue={String(defaultValues?.makkahNights ?? '')} />
        </FormGrid>
      </FormSection>

      {/* Madinah Accommodation */}
      <FormSection title="Madinah Accommodation">
        <FormGrid>
          <FormField label="Hotel Name" name="madinahHotel" placeholder="Al Ansar Hotel, Madinah" defaultValue={String(defaultValues?.madinahHotel ?? '')} />
          <FormField label="Distance from Nabawi" name="madinahHotelDistance" placeholder="500m from Masjid an-Nabawi" defaultValue={String(defaultValues?.madinahHotelDistance ?? '')} />
          <FormField label="Nights in Madinah" name="madinahNights" type="number" placeholder="8" defaultValue={String(defaultValues?.madinahNights ?? '')} />
        </FormGrid>
      </FormSection>

      {/* Description */}
      <FormSection title="Package Details">
        <div className="space-y-4">
          <div>
            <label className="form-label">Description *</label>
            <textarea name="description" rows={5} className="form-input resize-y" required placeholder="Detailed description of the package..." defaultValue={String(defaultValues?.description ?? '')} />
          </div>
          <div>
            <label className="form-label">Inclusions (one per line)</label>
            <textarea name="inclusions" rows={6} className="form-input resize-y" placeholder="Return airfare&#10;Visa assistance&#10;Hotel in Makkah..." defaultValue={String(defaultValues?.inclusions ?? '')} />
          </div>
          <div>
            <label className="form-label">Exclusions (one per line)</label>
            <textarea name="exclusions" rows={4} className="form-input resize-y" placeholder="Personal expenses&#10;Meals (unless specified)..." defaultValue={String(defaultValues?.exclusions ?? '')} />
          </div>
          <div>
            <label className="form-label">Cancellation Policy</label>
            <textarea name="cancellationPolicy" rows={3} className="form-input resize-y" defaultValue={String(defaultValues?.cancellationPolicy ?? '')} />
          </div>
          <div>
            <label className="form-label">Terms & Conditions</label>
            <textarea name="terms" rows={3} className="form-input resize-y" defaultValue={String(defaultValues?.terms ?? '')} />
          </div>
        </div>
      </FormSection>

      {/* Amenities */}
      <FormSection title="Amenities Included">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: 'visaIncluded', label: 'Visa', default: true },
            { name: 'mealsIncluded', label: 'Meals', default: false },
            { name: 'transportIncluded', label: 'Transport', default: true },
            { name: 'ziyaratIncluded', label: 'Ziyarat', default: false },
            { name: 'laundryIncluded', label: 'Laundry', default: false },
            { name: 'travelKitIncluded', label: 'Travel Kit', default: false },
            { name: 'groupLeaderIncluded', label: 'Group Leader', default: false },
          ].map((amenity) => (
            <label key={amenity.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 cursor-pointer">
              <input
                type="checkbox"
                name={amenity.name}
                value="true"
                className="w-4 h-4 accent-emerald-600"
                defaultChecked={defaultValues ? Boolean(defaultValues[amenity.name]) : amenity.default}
              />
              <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* Publish Settings */}
      <FormSection title="Publish Settings">
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" value="true" className="w-4 h-4 accent-emerald-600"
              defaultChecked={defaultValues ? Boolean(defaultValues.published) : true} />
            <span className="text-sm font-semibold text-gray-700">Published (visible on website)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-emerald-600"
              defaultChecked={Boolean(defaultValues?.featured)} />
            <span className="text-sm font-semibold text-gray-700">Featured (shown on homepage)</span>
          </label>
        </div>
      </FormSection>

      <div className="flex gap-4">
        <button type="submit" className="btn-primary px-8 py-3" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
          Save Package
        </button>
        <a href="/admin/hajj-packages" className="btn-outline-green px-8 py-3">Cancel</a>
      </div>
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="font-bold text-emerald-900 text-lg mb-5 pb-3 border-b border-gray-100">{title}</h2>
      {children}
    </div>
  )
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

function FormField({
  label, name, type = 'text', placeholder, required, defaultValue, options,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; defaultValue?: string; options?: { value: string; label: string }[];
}) {
  if (type === 'select' && options) {
    return (
      <div>
        <label className="form-label" htmlFor={`field-${name}`}>{label}</label>
        <select id={`field-${name}`} name={name} className="form-input" required={required} defaultValue={defaultValue}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    )
  }
  return (
    <div>
      <label className="form-label" htmlFor={`field-${name}`}>{label}</label>
      <input id={`field-${name}`} name={name} type={type} className="form-input"
        placeholder={placeholder} required={required} defaultValue={defaultValue} />
    </div>
  )
}
