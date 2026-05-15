'use client'

import { ProjectsUI } from '@repo/ui'
import type { ProjectItem } from '@repo/ui'

const PROJECTS: ProjectItem[] = [
  { id: 1, image: '/images/project1.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },
  { id: 2, image: '/images/project2.png', tags: ['SMM', 'Development'], title: 'Marina Village' },
  { id: 3, image: '/images/project3.png', tags: ['Website', 'Development'], title: 'Marina Village' },
  { id: 4, image: '/images/project4.png', tags: ['Branding', 'Ux/Ui dizayn'], title: 'Whitestone Estate branding visualization' },
  { id: 5, image: '/images/project5.png', tags: ['SMM', 'Development'], title: 'TREVA Real Estate' },
  { id: 6, image: '/images/project6.png', tags: ['SMM', 'Development'], title: 'AI Lab' },
]

export function ProjectsWrapper() {
  return (
    <ProjectsUI
      sectionTitle="Proyektlər"
      moreBtnLabel="Bütün layihələrə bax"
      moreBtnHref="#"
      projects={PROJECTS}
    />
  )
}