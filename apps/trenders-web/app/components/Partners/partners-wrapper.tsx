import React from 'react'
import { PartnersUI } from '@repo/ui'
import type { PartnerItem } from '@repo/ui'

function toAbsUrl(path: string): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${process.env.API_URL}${path}`
}

function stripHtml(html: string): string {
  return (html ?? "").replace(/<[^>]*>/g, "").trim()
}

async function getHomePartners(): Promise<{
  sectionTitle: string
  description: string
  partners: PartnerItem[]
}> {
  try {
    const res = await fetch(`${process.env.API_URL}/partners`, {
      cache: 'no-store',
    })
    if (!res.ok) return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
    const data = await res.json()

    const partners: PartnerItem[] = (data.partners as any[])
      .filter((p) => p.isHomepage)
      .sort((a, b) => a.order - b.order)
      .map((p) => {
        const altText = p.altText || stripHtml(p.name ?? "")
        return {
          id: p.id,
          svg: (
            <img
              src={toAbsUrl(p.image)}
              alt={altText}
            />
          ),
        }
      })

    return {
      sectionTitle: data.title ?? "Tərəfdaşlarımız",
      description: data.description ?? "",
      partners,
    }
  } catch {
    return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
  }
}

export async function PartnersWrapper({ locale = "az" }: { locale?: string }) {
  const { sectionTitle, description, partners } = await getHomePartners()

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