// ============================================================
// ZAMZAM TOURS & TRAVELS — Shared TypeScript Types
// ============================================================

export type HajjCategory = 'ECONOMY' | 'STANDARD' | 'PREMIUM' | 'VIP' | 'EXECUTIVE'
export type UmrahType = 'ECONOMY' | 'STANDARD' | 'PREMIUM' | 'VIP' | 'EXECUTIVE' | 'RAMZAN_SPECIAL' | 'FAMILY'
export type HotelCity = 'MAKKAH' | 'MADINAH'
export type GalleryCategory = 'MAKKAH' | 'MADINAH' | 'HAJJ' | 'UMRAH' | 'ZIYARAT' | 'GENERAL'
export type FAQCategory = 'HAJJ' | 'UMRAH' | 'VISA' | 'GENERAL' | 'PAYMENT'
export type ServiceType = 'HAJJ' | 'UMRAH' | 'VISA' | 'HOTEL' | 'OTHER'
export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONFIRMED' | 'CLOSED'
export type Role = 'ADMIN' | 'SUPER_ADMIN'

export interface HajjPackage {
  id: string
  name: string
  slug: string
  category: HajjCategory
  price: any
  currency: string
  duration: number
  departureDate: Date | null
  returnDate: Date | null
  departureCity: string
  airline: string | null
  makkahHotel: string | null
  makkahHotelDistance: string | null
  makkahNights: number | null
  madinahHotel: string | null
  madinahHotelDistance: string | null
  madinahNights: number | null
  description: string
  inclusions: string[]
  exclusions: string[]
  mealsIncluded: boolean
  visaIncluded: boolean
  transportIncluded: boolean
  ziyaratIncluded: boolean
  laundryIncluded: boolean
  travelKitIncluded: boolean
  groupLeaderIncluded: boolean
  cancellationPolicy: string | null
  terms: string | null
  images: string[]
  featured: boolean
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UmrahPackage {
  id: string
  name: string
  slug: string
  umrahType: UmrahType
  isRamzan: boolean
  isFamilyPackage: boolean
  price: any
  currency: string
  duration: number
  departureDate: Date | null
  returnDate: Date | null
  departureCity: string
  airline: string | null
  makkahHotel: string | null
  makkahHotelDistance: string | null
  makkahNights: number | null
  madinahHotel: string | null
  madinahHotelDistance: string | null
  madinahNights: number | null
  description: string
  inclusions: string[]
  exclusions: string[]
  mealsIncluded: boolean
  visaIncluded: boolean
  transportIncluded: boolean
  ziyaratIncluded: boolean
  laundryIncluded: boolean
  travelKitIncluded: boolean
  groupLeaderIncluded: boolean
  cancellationPolicy: string | null
  terms: string | null
  images: string[]
  featured: boolean
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Hotel {
  id: string
  name: string
  slug: string
  city: HotelCity
  category: number
  description: string
  distance: string
  address: string | null
  amenities: string[]
  images: string[]
  featured: boolean
  published: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface GalleryImage {
  id: string
  url: string
  caption: string | null
  alt: string | null
  category: GalleryCategory
  sortOrder: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  designation: string | null
  city: string | null
  content: string
  rating: number
  image: string | null
  published: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: FAQCategory
  sortOrder: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Enquiry {
  id: string
  name: string
  mobile: string
  whatsapp: string | null
  email: string | null
  serviceType: ServiceType
  packageName: string | null
  persons: number
  departureCity: string | null
  travelDate: string | null
  message: string | null
  status: EnquiryStatus
  adminNotes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface WebsiteSettings {
  id: string
  key: string
  value: string
  label: string | null
  group: string | null
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// FORM TYPES
// ============================================================
export interface EnquiryFormData {
  name: string
  mobile: string
  whatsapp?: string
  email?: string
  serviceType: ServiceType
  packageName?: string
  persons: number
  departureCity?: string
  travelDate?: string
  message?: string
}

// ============================================================
// SETTINGS MAP
// ============================================================
export type SettingsMap = Record<string, string>
