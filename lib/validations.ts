import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z
    .string()
    .min(10, 'Enter a valid mobile number')
    .max(15)
    .regex(/^[+]?[0-9\s\-()]+$/, 'Enter a valid mobile number'),
  whatsapp: z
    .string()
    .max(15)
    .regex(/^[+]?[0-9\s\-()]*$/, 'Enter a valid WhatsApp number')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  serviceType: z.enum(['HAJJ', 'UMRAH', 'VISA', 'HOTEL', 'OTHER']),
  packageName: z.string().max(200).optional().or(z.literal('')),
  persons: z.coerce.number().min(1, 'At least 1 person').max(50),
  departureCity: z.string().max(100).optional().or(z.literal('')),
  travelDate: z.string().max(100).optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

// Admin login
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Hajj package form
export const hajjPackageSchema = z.object({
  name: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  category: z.enum(['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'EXECUTIVE']),
  price: z.coerce.number().min(0),
  currency: z.string().default('INR'),
  duration: z.coerce.number().min(1),
  departureDate: z.string().optional().or(z.literal('')),
  returnDate: z.string().optional().or(z.literal('')),
  departureCity: z.string().default('Mumbai'),
  airline: z.string().optional().or(z.literal('')),
  makkahHotel: z.string().optional().or(z.literal('')),
  makkahHotelDistance: z.string().optional().or(z.literal('')),
  makkahNights: z.coerce.number().optional().nullable(),
  madinahHotel: z.string().optional().or(z.literal('')),
  madinahHotelDistance: z.string().optional().or(z.literal('')),
  madinahNights: z.coerce.number().optional().nullable(),
  description: z.string().min(10),
  inclusions: z.string(), // comma/newline separated, parsed in action
  exclusions: z.string(),
  mealsIncluded: z.coerce.boolean().default(false),
  visaIncluded: z.coerce.boolean().default(true),
  transportIncluded: z.coerce.boolean().default(true),
  ziyaratIncluded: z.coerce.boolean().default(false),
  laundryIncluded: z.coerce.boolean().default(false),
  travelKitIncluded: z.coerce.boolean().default(false),
  groupLeaderIncluded: z.coerce.boolean().default(false),
  cancellationPolicy: z.string().optional().or(z.literal('')),
  terms: z.string().optional().or(z.literal('')),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
})

export type HajjPackageInput = z.infer<typeof hajjPackageSchema>

// Umrah package form
export const umrahPackageSchema = hajjPackageSchema.omit({ category: true }).extend({
  umrahType: z.enum(['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'EXECUTIVE', 'RAMZAN_SPECIAL', 'FAMILY']),
  isRamzan: z.coerce.boolean().default(false),
  isFamilyPackage: z.coerce.boolean().default(false),
})

export type UmrahPackageInput = z.infer<typeof umrahPackageSchema>

// Settings form
export const settingsSchema = z.record(z.string(), z.string())

// Enquiry status update
export const enquiryStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONFIRMED', 'CLOSED']),
  adminNotes: z.string().optional(),
})

// Visa service
export const visaServiceSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  visaType: z.string().min(2).max(100),
  description: z.string().min(10),
  requirements: z.string(), // newline-separated
  processingTime: z.string().optional().or(z.literal('')),
  price: z.coerce.number().min(0).optional().nullable(),
  requiredDocuments: z.string(), // newline-separated
  importantNotes: z.string().optional().or(z.literal('')),
  published: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().default(0),
})

export type VisaServiceInput = z.infer<typeof visaServiceSchema>

// Admin user
export const adminUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name too short').max(100),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['EDITOR', 'ADMIN', 'SUPER_ADMIN']),
})

export type AdminUserInput = z.infer<typeof adminUserSchema>

