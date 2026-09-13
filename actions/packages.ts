'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { slugify, parseListString } from '@/lib/utils'
import { requireAdmin } from '@/lib/auth-guard'

// ============================================================
// HAJJ PACKAGES
// ============================================================
export async function getHajjPackages(featuredOnly = false) {
  return prisma.hajjPackage.findMany({
    where: { published: true, ...(featuredOnly ? { featured: true } : {}) },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getHajjPackageBySlug(slug: string) {
  return prisma.hajjPackage.findUnique({ where: { slug } })
}

export async function getAllHajjPackages() {
  return prisma.hajjPackage.findMany({ orderBy: { createdAt: 'desc' } })
}

async function generateUniqueHajjSlug(raw: string, excludeId?: string): Promise<string> {
  let baseSlug = slugify(raw || '')
  if (!baseSlug) baseSlug = 'hajj-package'
  let slug = baseSlug
  let counter = 1
  while (true) {
    const existing = await prisma.hajjPackage.findUnique({
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

async function generateUniqueUmrahSlug(raw: string, excludeId?: string): Promise<string> {
  let baseSlug = slugify(raw || '')
  if (!baseSlug) baseSlug = 'umrah-package'
  let slug = baseSlug
  let counter = 1
  while (true) {
    const existing = await prisma.umrahPackage.findUnique({
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

export async function createHajjPackage(formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueHajjSlug(rawSlug || name)

  const data = {
    name,
    slug,
    category: (formData.get('category') as string) || 'ECONOMY',
    price: parseFloat(formData.get('price') as string) || 0,
    currency: 'INR',
    duration: parseInt(formData.get('duration') as string) || 0,
    departureDate: formData.get('departureDate') ? new Date(formData.get('departureDate') as string) : null,
    returnDate: formData.get('returnDate') ? new Date(formData.get('returnDate') as string) : null,
    departureCity: (formData.get('departureCity') as string) || 'Mumbai',
    airline: (formData.get('airline') as string) || null,
    makkahHotel: (formData.get('makkahHotel') as string) || null,
    makkahHotelDistance: (formData.get('makkahHotelDistance') as string) || null,
    makkahNights: formData.get('makkahNights') ? parseInt(formData.get('makkahNights') as string) : null,
    madinahHotel: (formData.get('madinahHotel') as string) || null,
    madinahHotelDistance: (formData.get('madinahHotelDistance') as string) || null,
    madinahNights: formData.get('madinahNights') ? parseInt(formData.get('madinahNights') as string) : null,
    description: (formData.get('description') as string) || '',
    inclusions: parseListString(formData.get('inclusions') as string || ''),
    exclusions: parseListString(formData.get('exclusions') as string || ''),
    mealsIncluded: formData.get('mealsIncluded') === 'true',
    visaIncluded: formData.get('visaIncluded') !== 'false',
    transportIncluded: formData.get('transportIncluded') !== 'false',
    ziyaratIncluded: formData.get('ziyaratIncluded') === 'true',
    laundryIncluded: formData.get('laundryIncluded') === 'true',
    travelKitIncluded: formData.get('travelKitIncluded') === 'true',
    groupLeaderIncluded: formData.get('groupLeaderIncluded') === 'true',
    cancellationPolicy: (formData.get('cancellationPolicy') as string) || null,
    terms: (formData.get('terms') as string) || null,
    featured: formData.get('featured') === 'true',
    published: formData.get('published') !== 'false',
  }

  await prisma.hajjPackage.create({ data: data as Parameters<typeof prisma.hajjPackage.create>[0]['data'] })
  revalidatePath('/hajj')
  revalidatePath('/admin/hajj-packages')
  return { success: true }
}

export async function updateHajjPackage(id: string, formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueHajjSlug(rawSlug || name, id)

  const data = {
    name,
    slug,
    category: (formData.get('category') as string) || 'ECONOMY',
    price: parseFloat(formData.get('price') as string) || 0,
    duration: parseInt(formData.get('duration') as string) || 0,
    departureDate: formData.get('departureDate') ? new Date(formData.get('departureDate') as string) : null,
    returnDate: formData.get('returnDate') ? new Date(formData.get('returnDate') as string) : null,
    departureCity: (formData.get('departureCity') as string) || 'Mumbai',
    airline: (formData.get('airline') as string) || null,
    makkahHotel: (formData.get('makkahHotel') as string) || null,
    makkahHotelDistance: (formData.get('makkahHotelDistance') as string) || null,
    makkahNights: formData.get('makkahNights') ? parseInt(formData.get('makkahNights') as string) : null,
    madinahHotel: (formData.get('madinahHotel') as string) || null,
    madinahHotelDistance: (formData.get('madinahHotelDistance') as string) || null,
    madinahNights: formData.get('madinahNights') ? parseInt(formData.get('madinahNights') as string) : null,
    description: (formData.get('description') as string) || '',
    inclusions: parseListString(formData.get('inclusions') as string || ''),
    exclusions: parseListString(formData.get('exclusions') as string || ''),
    mealsIncluded: formData.get('mealsIncluded') === 'true',
    visaIncluded: formData.get('visaIncluded') !== 'false',
    transportIncluded: formData.get('transportIncluded') !== 'false',
    ziyaratIncluded: formData.get('ziyaratIncluded') === 'true',
    laundryIncluded: formData.get('laundryIncluded') === 'true',
    travelKitIncluded: formData.get('travelKitIncluded') === 'true',
    groupLeaderIncluded: formData.get('groupLeaderIncluded') === 'true',
    cancellationPolicy: (formData.get('cancellationPolicy') as string) || null,
    terms: (formData.get('terms') as string) || null,
    featured: formData.get('featured') === 'true',
    published: formData.get('published') !== 'false',
  }

  await prisma.hajjPackage.update({ where: { id }, data: data as Parameters<typeof prisma.hajjPackage.update>[0]['data'] })
  revalidatePath('/hajj')
  revalidatePath('/admin/hajj-packages')
  return { success: true }
}

export async function deleteHajjPackage(id: string) {
  await requireAdmin()
  await prisma.hajjPackage.delete({ where: { id } })
  revalidatePath('/hajj')
  revalidatePath('/admin/hajj-packages')
  return { success: true }
}

// ============================================================
// UMRAH PACKAGES
// ============================================================
export async function getUmrahPackages(featuredOnly = false) {
  return prisma.umrahPackage.findMany({
    where: { published: true, ...(featuredOnly ? { featured: true } : {}) },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getUmrahPackageBySlug(slug: string) {
  return prisma.umrahPackage.findUnique({ where: { slug } })
}

export async function getAllUmrahPackages() {
  return prisma.umrahPackage.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createUmrahPackage(formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueUmrahSlug(rawSlug || name)

  const data = {
    name,
    slug,
    umrahType: (formData.get('umrahType') as string) || 'STANDARD',
    isRamzan: formData.get('isRamzan') === 'true',
    isFamilyPackage: formData.get('isFamilyPackage') === 'true',
    price: parseFloat(formData.get('price') as string) || 0,
    currency: 'INR',
    duration: parseInt(formData.get('duration') as string) || 0,
    departureDate: formData.get('departureDate') ? new Date(formData.get('departureDate') as string) : null,
    returnDate: formData.get('returnDate') ? new Date(formData.get('returnDate') as string) : null,
    departureCity: (formData.get('departureCity') as string) || 'Mumbai',
    airline: (formData.get('airline') as string) || null,
    makkahHotel: (formData.get('makkahHotel') as string) || null,
    makkahHotelDistance: (formData.get('makkahHotelDistance') as string) || null,
    makkahNights: formData.get('makkahNights') ? parseInt(formData.get('makkahNights') as string) : null,
    madinahHotel: (formData.get('madinahHotel') as string) || null,
    madinahHotelDistance: (formData.get('madinahHotelDistance') as string) || null,
    madinahNights: formData.get('madinahNights') ? parseInt(formData.get('madinahNights') as string) : null,
    description: (formData.get('description') as string) || '',
    inclusions: parseListString(formData.get('inclusions') as string || ''),
    exclusions: parseListString(formData.get('exclusions') as string || ''),
    mealsIncluded: formData.get('mealsIncluded') === 'true',
    visaIncluded: formData.get('visaIncluded') !== 'false',
    transportIncluded: formData.get('transportIncluded') !== 'false',
    ziyaratIncluded: formData.get('ziyaratIncluded') === 'true',
    laundryIncluded: formData.get('laundryIncluded') === 'true',
    travelKitIncluded: formData.get('travelKitIncluded') === 'true',
    groupLeaderIncluded: formData.get('groupLeaderIncluded') === 'true',
    cancellationPolicy: (formData.get('cancellationPolicy') as string) || null,
    terms: (formData.get('terms') as string) || null,
    featured: formData.get('featured') === 'true',
    published: formData.get('published') !== 'false',
  }

  await prisma.umrahPackage.create({ data: data as Parameters<typeof prisma.umrahPackage.create>[0]['data'] })
  revalidatePath('/umrah')
  revalidatePath('/admin/umrah-packages')
  return { success: true }
}

export async function updateUmrahPackage(id: string, formData: FormData) {
  await requireAdmin()
  const name = formData.get('name') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueUmrahSlug(rawSlug || name, id)

  const data = {
    name,
    slug,
    umrahType: (formData.get('umrahType') as string) || 'STANDARD',
    isRamzan: formData.get('isRamzan') === 'true',
    isFamilyPackage: formData.get('isFamilyPackage') === 'true',
    price: parseFloat(formData.get('price') as string) || 0,
    duration: parseInt(formData.get('duration') as string) || 0,
    departureDate: formData.get('departureDate') ? new Date(formData.get('departureDate') as string) : null,
    returnDate: formData.get('returnDate') ? new Date(formData.get('returnDate') as string) : null,
    departureCity: (formData.get('departureCity') as string) || 'Mumbai',
    airline: (formData.get('airline') as string) || null,
    makkahHotel: (formData.get('makkahHotel') as string) || null,
    makkahHotelDistance: (formData.get('makkahHotelDistance') as string) || null,
    makkahNights: formData.get('makkahNights') ? parseInt(formData.get('makkahNights') as string) : null,
    madinahHotel: (formData.get('madinahHotel') as string) || null,
    madinahHotelDistance: (formData.get('madinahHotelDistance') as string) || null,
    madinahNights: formData.get('madinahNights') ? parseInt(formData.get('madinahNights') as string) : null,
    description: (formData.get('description') as string) || '',
    inclusions: parseListString(formData.get('inclusions') as string || ''),
    exclusions: parseListString(formData.get('exclusions') as string || ''),
    mealsIncluded: formData.get('mealsIncluded') === 'true',
    visaIncluded: formData.get('visaIncluded') !== 'false',
    transportIncluded: formData.get('transportIncluded') !== 'false',
    ziyaratIncluded: formData.get('ziyaratIncluded') === 'true',
    laundryIncluded: formData.get('laundryIncluded') === 'true',
    travelKitIncluded: formData.get('travelKitIncluded') === 'true',
    groupLeaderIncluded: formData.get('groupLeaderIncluded') === 'true',
    cancellationPolicy: (formData.get('cancellationPolicy') as string) || null,
    terms: (formData.get('terms') as string) || null,
    featured: formData.get('featured') === 'true',
    published: formData.get('published') !== 'false',
  }

  await prisma.umrahPackage.update({ where: { id }, data: data as Parameters<typeof prisma.umrahPackage.update>[0]['data'] })
  revalidatePath('/umrah')
  revalidatePath('/admin/umrah-packages')
  return { success: true }
}

export async function deleteUmrahPackage(id: string) {
  await requireAdmin()
  await prisma.umrahPackage.delete({ where: { id } })
  revalidatePath('/umrah')
  revalidatePath('/admin/umrah-packages')
  return { success: true }
}
