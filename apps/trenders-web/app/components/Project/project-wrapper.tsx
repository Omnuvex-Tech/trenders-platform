import { ProjectsUI } from '@repo/ui'
import type { ProjectItem } from '@repo/ui'
import { cookies } from 'next/headers'

type LocalizedString = Record<string, string>

const API = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
  if (!obj) return fallback;
  if (typeof obj === "string") return obj;
  return obj[locale] || obj["az"] || fallback;
}

function decodeHtmlEntities(text: string) {
    return (text ?? "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

function stripHtml(html: string) {
    return decodeHtmlEntities((html ?? "").replace(/<[^>]*>/g, "")).trim();
}

async function getHomepageProjects(locale: string): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API}/portfolio/homepage`, {
      next: { revalidate: 10 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.map((p: any) => ({
      id: p.id,
      image: p.coverImage?.startsWith('http') ? p.coverImage : `${API}${p.coverImage}`,
      gif: p.gif ? (p.gif.startsWith('http') ? p.gif : `${API}${p.gif}`) : undefined,
      tags: (p.services ?? []).map((ps: any) => stripHtml(t(ps.service?.title, locale))).filter(Boolean),
      title: t(p.title, locale),
      slug: p.slug,
      href: `/${locale}/portfolio/${p.slug}`,
    }))
  } catch (e) {
    console.error('[ProjectsWrapper] fetch error:', e)
    return []
  }
}

async function getHomeSettings() {
  try {
    const res = await fetch(`${API}/home`, { next: { revalidate: 10 } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function ProjectsWrapper({ locale }: { locale?: string }) {
  const cookieStore = await cookies()
  const resolvedLocale = locale ?? cookieStore.get("NEXT_LOCALE")?.value ?? "az"

  const [projects, home] = await Promise.all([
    getHomepageProjects(resolvedLocale),
    getHomeSettings(),
  ])

  return (
    <ProjectsUI
      sectionTitle={t(home?.projectsTitle, resolvedLocale, "Proyektlər")}
      moreBtnLabel={t(home?.projectsBtnText, resolvedLocale, "Bütün layihələrə bax")}
      moreBtnHref={home?.projectsBtnLink || "/portfolio"}
      moreBtnNewTab={home?.projectsBtnNewTab ?? false}
      projects={projects}
    />
  )
}