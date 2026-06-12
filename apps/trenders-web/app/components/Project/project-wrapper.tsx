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
            tags: p.tags ?? [],
            title: t(p.title, locale),
            slug: p.slug,
            href: `/portfolio/${p.slug}`,
        }))
    } catch (e) {
        console.error('[ProjectsWrapper] fetch error:', e)
        return []
    }
}

export async function ProjectsWrapper({ locale }: { locale?: string }) {
    const cookieStore = await cookies()
    const resolvedLocale = locale ?? cookieStore.get("NEXT_LOCALE")?.value ?? "az"

    const projects = await getHomepageProjects(resolvedLocale)

    return (
        <ProjectsUI
            sectionTitle="Proyektlər"
            moreBtnLabel="Bütün layihələrə bax"
            moreBtnHref="/portfolio"
            projects={projects}
        />
    )
}