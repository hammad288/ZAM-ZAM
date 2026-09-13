// ============================================================
// ZAMZAM TOURS — Settings Cache (server-side)
// ============================================================

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { SettingsMap } from '@/types'

export const DEFAULT_SETTINGS: SettingsMap = {
  whatsapp: '919712457888',
  phone: '+91 97120 57888 / +91 97124 57888',
  phone_display: '+91 97120 57888 / +91 97124 57888',
  email: 'Zamzamtours@gmail.com',
  address: '08 Ground Floor, Daskroi Chambers, Opp. Petrol Pump, Khamasa, Ahmedabad - 380001, Gujarat',
  footer_tagline: 'Your trusted partner for Hajj & Umrah since 1996. Serving pilgrims with devotion and excellence.',
  footer_copyright: '© 2026 ZAM ZAM Tours & Travels. All rights reserved.',
}

export const getSettings = cache(async (): Promise<SettingsMap> => {
  try {
    const settings = await prisma.websiteSettings.findMany()
    const mapped = settings.reduce((acc, s) => {
      acc[s.key] = s.value
      return acc
    }, {} as SettingsMap)
    return { ...DEFAULT_SETTINGS, ...mapped }
  } catch {
    return DEFAULT_SETTINGS
  }
})

export const getSetting = cache(async (key: string, fallback: string = ''): Promise<string> => {
  try {
    const setting = await prisma.websiteSettings.findUnique({ where: { key } })
    return setting?.value ?? DEFAULT_SETTINGS[key] ?? fallback
  } catch {
    return DEFAULT_SETTINGS[key] ?? fallback
  }
})
