'use client'

import { PortfolioUI } from '@repo/ui'
import type { PortfolioItem } from '@repo/ui'


const PROJECTS: PortfolioItem[] = [
  { id: 1, image: '/images/project1.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },
  { id: 2, image: '/images/project2.png', tags: ['SMM', 'Development'], title: 'Marina Village' },
  { id: 3, image: '/images/project3.png', tags: ['Website', 'Development'], title: 'Marina Village' },
  { id: 4, image: '/images/project4.png', tags: ['Branding', 'Ux/Ui dizayn'], title: 'Whitestone Estate branding visualization' },
  { id: 5, image: '/images/project5.png', tags: ['SMM', 'Development'], title: 'TREVA Real Estate' },
  { id: 6, image: '/images/project6.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },
  { id: 6, image: '/images/project7.png', tags: ['SMM', 'Development'], title: 'AI Lab' },
  { id: 6, image: '/images/project8.png', tags: ['SMM', 'Development'], title: 'Marina Village' },
  { id: 6, image: '/images/project9.png', tags: ['SMM', 'Development'], title: 'AI Lab' },
  { id: 6, image: '/images/project10.png', tags: ['SMM', 'Development'], title: 'TREVA Real Estate' },
  { id: 6, image: '/images/project1.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },
  { id: 6, image: '/images/project4.png', tags: ['SMM', 'Development'], title: 'AI Lab' },
  { id: 6, image: '/images/project7.png', tags: ['SMM', 'Development'], title: 'Marina Village' },
  { id: 6, image: '/images/project2.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },
  { id: 6, image: '/images/project10.png', tags: ['SMM', 'Development'], title: 'East Park Premium Suites' },

]

export function PortfolioWrapper() {
  return (
  <PortfolioUI
  sectionTitle="Portfolio"
  projects={PROJECTS}
  showControls={true}
  dropdownLabel="Xidmətləri seçin"
  dropdownOptions={['SMM', 'Development', 'Branding', 'Website', 'Ux/Ui dizayn']}
/>
  )
}