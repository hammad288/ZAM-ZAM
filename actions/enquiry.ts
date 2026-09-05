'use server'

import { prisma } from '@/lib/prisma'
import { enquirySchema, EnquiryInput } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function createEnquiry(data: EnquiryInput) {
  const validated = enquirySchema.safeParse(data)

  if (!validated.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check all fields.',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  const { whatsapp, email, packageName, departureCity, travelDate, message, ...rest } = validated.data

  await prisma.enquiry.create({
    data: {
      ...rest,
      whatsapp: whatsapp || null,
      email: email || null,
      packageName: packageName || null,
      departureCity: departureCity || null,
      travelDate: travelDate || null,
      message: message || null,
      status: 'NEW',
    },
  })

  revalidatePath('/admin/enquiries')

  return { success: true }
}

export async function updateEnquiryStatus(id: string, status: string, adminNotes?: string) {
  await prisma.enquiry.update({
    where: { id },
    data: {
      status: status as 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONFIRMED' | 'CLOSED',
      adminNotes: adminNotes ?? undefined,
    },
  })

  revalidatePath('/admin/enquiries')
  return { success: true }
}

export async function getEnquiries(status?: string) {
  return prisma.enquiry.findMany({
    where: status ? { status: status as 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONFIRMED' | 'CLOSED' } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}
