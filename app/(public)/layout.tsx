import { getSettings } from '@/lib/settings'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomBar, WhatsAppFloat } from '@/components/layout/MobileBar'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let settings: Record<string, string> = {}
  try {
    settings = await getSettings()
  } catch {}

  return (
    <>
      <Navbar phone={settings.phone} whatsapp={settings.whatsapp} />
      <main>{children}</main>
      <Footer settings={settings} />
      <MobileBottomBar phone={settings.phone} whatsapp={settings.whatsapp} />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
    </>
  )
}
