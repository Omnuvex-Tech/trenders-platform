import type { MetadataRoute } from "next"

const BASE_URL = "https://trenders.team"
const LOCALES = ["az", "en", "ru"] as const
const DEFAULT_LOCALE = "az"

const STATIC_PATHS = ["", "/about", "/service", "/portfolio", "/vacancy", "/blog", "/contact", "/partners", "/ourteam"]

function localizedUrl(locale: string, path: string): string {
  // Default dil (az) prefikssizdir: /about
  // Digər dillər prefiks daşıyır: /en/about, /ru/about
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return `${BASE_URL}${prefix}${path}`
}

async function fetchList(path: string): Promise<any[]> {
  try {
    const res = await fetch(`${process.env.API_URL}${path}`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function toDate(value: string | null | undefined): Date {
  return value ? new Date(value) : new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: localizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  )

  const [portfolios, services, vacancies, blogs, authors] = await Promise.all([
    fetchList("/portfolio/public"),
    fetchList("/services"),
    fetchList("/vacancy"),
    fetchList("/blog/public"),
    fetchList("/blog/authors/our-team"),
  ])

  const dynamicEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    ...portfolios
      .filter((p) => p.isVisible)
      .map((p) => ({
        url: localizedUrl(locale, `/portfolio/${p.slug}`),
        lastModified: toDate(p.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ...services
      .filter((s) => s.isVisible)
      .map((s) => ({
        url: localizedUrl(locale, `/service/${s.slug}`),
        lastModified: toDate(s.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ...vacancies
      .filter((v) => v.isVisible)
      .map((v) => ({
        url: localizedUrl(locale, `/vacancy/${v.slug}`),
        lastModified: toDate(v.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ...blogs
      .filter((b) => b.isVisible)
      .map((b) => ({
        url: localizedUrl(locale, `/blog/${b.slug}`),
        lastModified: toDate(b.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ...authors
      .filter((a) => a.isVisible && a.slug)
      .map((a) => ({
        url: localizedUrl(locale, `/blogauthor/${a.slug}`),
        lastModified: toDate(a.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.4,
      })),
  ])

  return [...staticEntries, ...dynamicEntries]
}