import { ProjectsUI } from '@repo/ui'
import type { ProjectItem } from '@repo/ui'

const API = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL

async function getHomepageProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API}/portfolio/homepage`, {
      next: { revalidate: 10 },
    })
    console.log('[ProjectsWrapper] status:', res.status, 'url:', `${API}/portfolio/homepage`)
    if (!res.ok) return []
    const data = await res.json()
    console.log('[ProjectsWrapper] data length:', data.length)
    return data.map((p: any) => ({
      id: p.id,
      image: p.coverImage?.startsWith('http') ? p.coverImage : `${API}${p.coverImage}`,
      tags: p.tags ?? [],
      title: p.title,
      slug: p.slug,
    }))
  } catch (e) {
    console.error('[ProjectsWrapper] fetch error:', e)
    return []
  }
}

export async function ProjectsWrapper() {
  const projects = await getHomepageProjects()
  console.log('[ProjectsWrapper] rendering with', projects.length, 'projects')

  return (
    <ProjectsUI
      sectionTitle="Proyektlər"
      moreBtnLabel="Bütün layihələrə bax"
      moreBtnHref="/portfolio"
      projects={projects}
    />
  )
}