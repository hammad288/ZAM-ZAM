'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { slugify, parseListString } from '@/lib/utils'
import { requireAdmin } from '@/lib/auth-guard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any

// ============================================================
// VISA SERVICES
// ============================================================
export async function getVisaServices() {
  return db.visaService.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getAllVisaServices() {
  return db.visaService.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
}

export async function getVisaServiceBySlug(slug: string) {
  return db.visaService.findUnique({ where: { slug } })
}

async function generateUniqueVisaSlug(raw: string, excludeId?: string): Promise<string> {
  let baseSlug = slugify(raw || '')
  if (!baseSlug) baseSlug = 'visa-service'
  let slug = baseSlug
  let counter = 1
  while (true) {
    const existing = await db.visaService.findUnique({
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

export async function createVisaService(formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueVisaSlug(rawSlug || title)

  await db.visaService.create({
    data: {
      title,
      slug,
      visaType: (formData.get('visaType') as string) || 'Umrah Visa',
      description: (formData.get('description') as string) || '',
      requirements: parseListString(formData.get('requirements') as string || ''),
      processingTime: (formData.get('processingTime') as string) || null,
      price: formData.get('price') ? parseFloat(formData.get('price') as string) : null,
      currency: 'INR',
      requiredDocuments: parseListString(formData.get('requiredDocuments') as string || ''),
      importantNotes: (formData.get('importantNotes') as string) || null,
      image: (formData.get('image') as string) || null,
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/visa')
  revalidatePath('/admin/visa-services')
  return { success: true }
}

export async function updateVisaService(id: string, formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const slug = await generateUniqueVisaSlug(rawSlug || title, id)

  await db.visaService.update({
    where: { id },
    data: {
      title,
      slug,
      visaType: (formData.get('visaType') as string) || 'Umrah Visa',
      description: (formData.get('description') as string) || '',
      requirements: parseListString(formData.get('requirements') as string || ''),
      processingTime: (formData.get('processingTime') as string) || null,
      price: formData.get('price') ? parseFloat(formData.get('price') as string) : null,
      requiredDocuments: parseListString(formData.get('requiredDocuments') as string || ''),
      importantNotes: (formData.get('importantNotes') as string) || null,
      image: (formData.get('image') as string) || null,
      published: formData.get('published') !== 'false',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    },
  })
  revalidatePath('/visa')
  revalidatePath('/admin/visa-services')
  return { success: true }
}

export async function deleteVisaService(id: string) {
  await requireAdmin()
  await db.visaService.delete({ where: { id } })
  revalidatePath('/visa')
  revalidatePath('/admin/visa-services')
  return { success: true }
}
