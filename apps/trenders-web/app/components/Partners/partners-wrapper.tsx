import React from 'react'
import { PartnersUI } from '@repo/ui'
import type { PartnerItem } from '@repo/ui'

type LocalizedString = Record<string, string>

function toAbsUrl(path: string): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${process.env.API_URL}${path}`
}

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
  if (!obj) return fallback
  if (typeof obj === "string") return obj
  return obj[locale] || obj["az"] || fallback
}

function stripHtml(html: string): string {
  return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function getHomePartners(locale: string): Promise<{
  sectionTitle: string
  description: string
  partners: PartnerItem[]
}> {
  try {
   const res = await fetch(`${process.env.API_URL}/partners`, {
  next: { revalidate: 10 },
})
    if (!res.ok) return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
    const data = await res.json()

    const partners: PartnerItem[] = (data.partners as any[])
      .filter((p) => p.isHomepage)
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        id: p.id,
        svg: (
          <img
            src={toAbsUrl(p.image)}
            alt={t(p.altText, locale) || t(p.name, locale)}
          />
        ),
      }))

    return {
      sectionTitle: stripHtml(t(data.title, locale)),
      description: t(data.description, locale),
      partners,
    }
  } catch {
    return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
  }
}

export async function PartnersWrapper({ locale = "az" }: { locale?: string }) {
  const { sectionTitle, description, partners } = await getHomePartners(locale)

  return (
    <PartnersUI
      sectionTitle={sectionTitle}
      description={
        <div className="partners-desc-wrap">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      }
      row1={partners}
      row2={[]}
    />
  )
}