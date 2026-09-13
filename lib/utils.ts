import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string | null): string {
  if (!date) return 'TBA'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatShortDate(date: Date | string | null): string {
  if (!date) return 'TBA'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function generateEnquiryWhatsAppMessage(data: {
  name: string
  mobile: string
  serviceType: string
  packageName?: string
  persons: number
  departureCity?: string
  travelDate?: string
  message?: string
}): string {
  const lines = [
    '🕌 *New Enquiry — ZAM ZAM Tours & Travels*',
    '',
    `👤 *Name:* ${data.name}`,
    `📱 *Mobile:* ${data.mobile}`,
    `✈️ *Service:* ${data.serviceType}`,
  ]

  if (data.packageName) lines.push(`📦 *Package:* ${data.packageName}`)
  lines.push(`👥 *Persons:* ${data.persons}`)
  if (data.departureCity) lines.push(`🏙️ *Departure City:* ${data.departureCity}`)
  if (data.travelDate) lines.push(`📅 *Travel Date:* ${data.travelDate}`)
  if (data.message) lines.push(`💬 *Message:* ${data.message}`)

  lines.push('', '_Sent from zamzamtours.com_')

  return lines.join('\n')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function getStarRating(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export function parseListString(str: string): string[] {
  if (!str) return []
  return str
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean)
}
