'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { slugify, parseListString } from '@/lib/utils'
import { requireAdmin } from '@/lib/auth-guard'

export async function updateSettings(settings: Record<string, string>) {
  await requireAdmin()
  const updates = Object.entries(settings).map(([key, value]) =>
    prisma.websiteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  )
  await Promise.all(updates)
  revalidatePath('/', 'layout')
  return { success: true }
}

// ============================================================
// HOTELS
// ============================================================
async function generateUniqueHotelSlug(raw: string, excludeId?: string): Promise<string> {
  let baseSlug = slugify(raw || '')
  if (!baseSlug) baseSlug = 'hotel'
  let slug = baseSlug
  let counter = 1
  while (true) {
    const existing = await prisma.hotel.findUnique({
      where: { slug },
      select: { id: true },
    })
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug
    }
    slug = `${baseSlug}-${counter}`
    counter++
  }
}

export async function getFeaturedHotels() {
  return prisma.hotel.findMany({
    where: { published: true, featured: true },
    orderBy: [{ city: 'asc' }, { sortOrder: 'asc' }],
  })
}

export async function getHotels(city?: 'MAKKAH' | 'MADINAH') {
  return prisma.hotel.findMany({
    where: { published: true, ...(city ? { city } : {}) },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getAllHotels() {
  return prisma.hotel.findMany({ orderBy: [{ city: 'asc' }, { sortOrder: 'asc' }] })
}

export async function createHotel(formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueHotelSlug(rawSlug || name)
  await prisma.hotel.create({
    data: {
      name,
      slug,
      city: (formData.get('city') as 'MAKKAH' | 'MADINAH') || 'MAKKAH',
      category: parseInt(formData.get('category') as string) || 5,
      description: (formData.get('description') as string) || '',
      distance: (formData.get('distance') as string) || '',
      address: (formData.get('address') as string) || null,
      amenities: parseListString((formData.get('amenities') as string) || ''),
      featured: formData.get('featured') === 'true',
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/hotels')
  revalidatePath('/admin/hotels')
  return { success: true }
}

export async function updateHotel(id: string, formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueHotelSlug(rawSlug || name, id)

  await prisma.hotel.update({
    where: { id },
    data: {
      name,
      slug,
      city: (formData.get('city') as 'MAKKAH' | 'MADINAH') || 'MAKKAH',
      category: parseInt(formData.get('category') as string) || 5,
      description: (formData.get('description') as string) || '',
      distance: (formData.get('distance') as string) || '',
      address: (formData.get('address') as string) || null,
      amenities: parseListString((formData.get('amenities') as string) || ''),
      featured: formData.get('featured') === 'true',
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/hotels')
  revalidatePath('/admin/hotels')
  return { success: true }
}

export async function deleteHotel(id: string) {
  await requireAdmin()
  await prisma.hotel.delete({ where: { id } })
  revalidatePath('/hotels')
  revalidatePath('/admin/hotels')
  return { success: true }
}

// ============================================================
// TESTIMONIALS
// ============================================================
export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: [{ sortOrder: 'asc' }] })
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin()
  await prisma.testimonial.create({
    data: {
      name: formData.get('name') as string,
      designation: (formData.get('designation') as string) || null,
      city: (formData.get('city') as string) || null,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin()
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      designation: (formData.get('designation') as string) || null,
      city: (formData.get('city') as string) || null,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  await requireAdmin()
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

// ============================================================
// FAQS
// ============================================================
export async function getFAQs(category?: string) {
  return prisma.fAQ.findMany({
    where: { published: true, ...(category ? { category: category as 'HAJJ' | 'UMRAH' | 'VISA' | 'GENERAL' | 'PAYMENT' } : {}) },
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
  })
}

export async function getAllFAQs() {
  return prisma.fAQ.findMany({ orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] })
}

export async function createFAQ(formData: FormData) {
  await requireAdmin()
  await prisma.fAQ.create({
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: (formData.get('category') as 'HAJJ' | 'UMRAH' | 'VISA' | 'GENERAL' | 'PAYMENT') || 'GENERAL',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      published: formData.get('published') !== 'false',
    },
  })
  revalidatePath('/')
  revalidatePath('/admin/faqs')
  return { success: true }
}

export async function updateFAQ(id: string, formData: FormData) {
  await requireAdmin()
  await prisma.fAQ.update({
    where: { id },
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: (formData.get('category') as 'HAJJ' | 'UMRAH' | 'VISA' | 'GENERAL' | 'PAYMENT') || 'GENERAL',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      published: formData.get('published') !== 'false',
    },
  })
  revalidatePath('/')
  revalidatePath('/admin/faqs')
  return { success: true }
}

export async function deleteFAQ(id: string) {
  await requireAdmin()
  await prisma.fAQ.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin/faqs')
  return { success: true }
}

// ============================================================
// GALLERY
// ============================================================
export async function getGalleryImages(category?: string) {
  return prisma.galleryImage.findMany({
    where: { published: true, ...(category ? { category: category as 'MAKKAH' | 'MADINAH' | 'HAJJ' | 'UMRAH' | 'ZIYARAT' | 'GENERAL' } : {}) },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getAllGalleryImages() {
  return prisma.galleryImage.findMany({ orderBy: [{ sortOrder: 'asc' }] })
}

export async function createGalleryImage(formData: FormData) {
  await requireAdmin()
  await prisma.galleryImage.create({
    data: {
      url: formData.get('url') as string,
      caption: (formData.get('caption') as string) || null,
      alt: (formData.get('alt') as string) || null,
      category: (formData.get('category') as 'MAKKAH' | 'MADINAH' | 'HAJJ' | 'UMRAH' | 'ZIYARAT' | 'GENERAL') || 'GENERAL',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      published: formData.get('published') !== 'false',
    },
  })
  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin()
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true }
}
