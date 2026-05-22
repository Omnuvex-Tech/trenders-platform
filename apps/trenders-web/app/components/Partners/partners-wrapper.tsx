// import React from 'react'
// import { PartnersUI } from '@repo/ui'
// import type { PartnerItem } from '@repo/ui'

// function toAbsUrl(path: string): string {
//   if (!path) return ""
//   if (path.startsWith("http")) return path
//   return `${process.env.API_URL}${path}`
// }

// function stripHtml(html: string): string {
//   return (html ?? "").replace(/<[^>]*>/g, "").trim()
// }

// async function getHomePartners(): Promise<{
//   sectionTitle: string
//   description: string
//   partners: PartnerItem[]
// }> {
//   try {
//     const res = await fetch(`${process.env.API_URL}/partners`, {
//       cache: 'no-store',
//     })
//     if (!res.ok) return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
//     const data = await res.json()

//     const partners: PartnerItem[] = (data.partners as any[])
//       .filter((p) => p.isHomepage)
//       .sort((a, b) => a.order - b.order)
//       .map((p) => {
//         const altText = p.altText || stripHtml(p.name ?? "")
//         return {
//           id: p.id,
//           svg: (
//             <svg
//               viewBox="0 0 160 60"
//               xmlns="http://www.w3.org/2000/svg"
//               style={{ width: '160px', height: '60px' }}
//               role="img"
//               aria-label={altText}
//             >
//               <title>{altText}</title>
//               <image
//                 href={toAbsUrl(p.image)}
//                 x="0"
//                 y="0"
//                 width="160"
//                 height="60"
//                 preserveAspectRatio="xMidYMid meet"
//               />
//             </svg>
//           ),
//         }
//       })

//     return {
//       sectionTitle: data.title ?? "Tərəfdaşlarımız",
//       description: data.description ?? "",
//       partners,
//     }
//   } catch {
//     return { sectionTitle: "Tərəfdaşlarımız", description: "", partners: [] }
//   }
// }

// export async function PartnersWrapper() {
//   const { sectionTitle, description, partners } = await getHomePartners()

//   const mid = Math.ceil(partners.length / 2)
//   const row1 = partners.slice(0, mid)
//   const row2 = partners.slice(mid)

//   return (
//     <PartnersUI
//       sectionTitle={sectionTitle}
//       description={
//         <div dangerouslySetInnerHTML={{ __html: description }} />
//       }
//       row1={row1}
//       row2={row2}
//     />
//   )
// }




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
              style={{ width: '160px', height: '60px', objectFit: 'contain' }}
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

export async function PartnersWrapper() {
  const { sectionTitle, description, partners } = await getHomePartners()

  const mid = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, mid)
  const row2 = partners.slice(mid)

  return (
    <PartnersUI
      sectionTitle={sectionTitle}
      description={
        <div dangerouslySetInnerHTML={{ __html: description }} />
      }
      row1={row1}
      row2={row2}
    />
  )
}