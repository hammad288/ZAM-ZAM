import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zamzamtours.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/hajj`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/umrah`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/visa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/hotels`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cancellation-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  try {
    const [hajjPackages, umrahPackages] = await Promise.all([
      prisma.hajjPackage.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.umrahPackage.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ])

    const hajjRoutes: MetadataRoute.Sitemap = hajjPackages.map((pkg) => ({
      url: `${baseUrl}/hajj/${pkg.slug}`,
      lastModified: pkg.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const umrahRoutes: MetadataRoute.Sitemap = umrahPackages.map((pkg) => ({
      url: `${baseUrl}/umrah/${pkg.slug}`,
      lastModified: pkg.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...staticRoutes, ...hajjRoutes, ...umrahRoutes]
  } catch {
    return staticRoutes
  }
}
