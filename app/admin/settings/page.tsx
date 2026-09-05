import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSettings } from '@/lib/settings'
import { updateSettings } from '@/actions/settings'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Website Settings | Admin' }

const SETTING_GROUPS = [
  {
    group: 'contact',
    title: '📞 Contact Information',
    fields: [
      { key: 'phone', label: 'Phone Number', placeholder: '+91-XXXXXXXXXX', type: 'text' },
      { key: 'phone_display', label: 'Phone (Display Format)', placeholder: '+91-XX-XXXX-XXXX', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp Number (digits only, with country code)', placeholder: '91XXXXXXXXXX', type: 'text' },
      { key: 'email', label: 'Primary Email', placeholder: 'Zamzamtours@gmail.com', type: 'email' },
      { key: 'email_secondary', label: 'Secondary Email', placeholder: 'zamzamtours@gmail.com', type: 'email' },
      { key: 'address', label: 'Office Address', placeholder: '08 Ground Floor, Daskroi Chambers, Opp. Petrol Pump, Khamasa, Ahmedabad - 380001, Gujarat', type: 'textarea' },
    ],
  },
  {
    group: 'hero',
    title: '🏠 Homepage Hero',
    fields: [
      { key: 'hero_title', label: 'Hero Title', placeholder: 'Your Journey to the Holy Land Begins Here', type: 'text' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', placeholder: 'Trusted Hajj & Umrah Services Since 1996', type: 'text' },
      { key: 'hero_badge', label: 'Hero Badge Text', placeholder: 'Since 1996 · Trusted · Experienced', type: 'text' },
    ],
  },
  {
    group: 'social',
    title: '📱 Social Media Links',
    fields: [
      { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...', type: 'url' },
      { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...', type: 'url' },
      { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/...', type: 'url' },
      { key: 'twitter', label: 'Twitter/X URL', placeholder: 'https://twitter.com/...', type: 'url' },
    ],
  },
  {
    group: 'footer',
    title: '📝 Footer',
    fields: [
      { key: 'footer_tagline', label: 'Footer Tagline', placeholder: 'Your trusted partner...', type: 'textarea' },
      { key: 'footer_copyright', label: 'Footer Copyright Text', placeholder: '© 2024 ZAM ZAM Tours...', type: 'text' },
    ],
  },
  {
    group: 'policy',
    title: '📄 Policy Pages (HTML supported)',
    fields: [
      { key: 'privacy_policy', label: 'Privacy Policy Content', placeholder: '<h2>Privacy Policy</h2><p>...', type: 'textarea-large' },
      { key: 'terms_conditions', label: 'Terms & Conditions Content', placeholder: '<h2>Terms...</h2>', type: 'textarea-large' },
      { key: 'cancellation_policy', label: 'Cancellation Policy Content', placeholder: '<h2>Cancellation...</h2>', type: 'textarea-large' },
    ],
  },
]

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  let settings: Record<string, string> = {}
  try { settings = await getSettings() } catch {}

  const saveAction = async (formData: FormData) => {
    'use server'
    const updates: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') updates[key] = value
    }
    await updateSettings(updates)
    redirect('/admin/settings?saved=1')
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Cinzel, serif' }}>Website Settings</h1>
          <p className="text-gray-500 mt-1">Manage all website content, contact details, and settings.</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 font-medium">Settings saved successfully!</p>
        </div>
      )}

      <form action={saveAction} className="space-y-8">
        {SETTING_GROUPS.map((group) => (
          <div key={group.group} className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-emerald-900 text-lg mb-5 pb-3 border-b border-gray-100">{group.title}</h2>
            <div className="space-y-4">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="form-label" htmlFor={`setting-${field.key}`}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea id={`setting-${field.key}`} name={field.key} rows={3} className="form-input resize-y"
                      placeholder={field.placeholder} defaultValue={settings[field.key] || ''} />
                  ) : field.type === 'textarea-large' ? (
                    <textarea id={`setting-${field.key}`} name={field.key} rows={10} className="form-input resize-y font-mono text-sm"
                      placeholder={field.placeholder} defaultValue={settings[field.key] || ''} />
                  ) : (
                    <input id={`setting-${field.key}`} name={field.key} type={field.type} className="form-input"
                      placeholder={field.placeholder} defaultValue={settings[field.key] || ''} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4 pb-8">
          <button type="submit" className="btn-primary px-10 py-3 text-base" style={{ background: 'linear-gradient(135deg, #022c22, #065f46)' }}>
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  )
}
