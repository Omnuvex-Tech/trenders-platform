'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import styles from "../../styles/Portfolio/portfolio.module.css";

export interface PortfolioItem {
  id: number
  image: string
  tags: string[]
  title: string
}

export interface PortfolioUIProps {
  sectionTitle: string
  moreBtnLabel?: string
  moreBtnHref?: string
  projects: PortfolioItem[]
  showControls?: boolean
  
}

export function PortfolioUI({
  sectionTitle,
  moreBtnLabel,
  moreBtnHref,
  projects,
  showControls = false,
}: PortfolioUIProps) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'asc' | 'desc' | 'default'>('default')
  const [filterOpen, setFilterOpen] = useState(false)

  const displayed = useMemo(() => {
    let result = [...projects]
    if (search.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (sort === 'asc') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'desc') result.sort((a, b) => b.title.localeCompare(a.title))
    return result
  }, [projects, search, sort])

  return (
    <section className={styles.projects}>
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>{sectionTitle}</h2>

        {showControls ? (
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <input
                type="text"
                placeholder="Search ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <div className={styles.filterWrap}>
              <button
                className={styles.filterBtn}
                onClick={() => setFilterOpen(prev => !prev)}
              >
                Filter
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={filterOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
              </button>
              {filterOpen && (
                <div className={styles.filterDropdown}>
                  <button
                    className={`${styles.filterOption} ${sort === 'asc' ? styles.active : ''}`}
                    onClick={() => { setSort('asc'); setFilterOpen(false) }}
                  >
                    A → Z
                  </button>
                  <button
                    className={`${styles.filterOption} ${sort === 'desc' ? styles.active : ''}`}
                    onClick={() => { setSort('desc'); setFilterOpen(false) }}
                  >
                    Z → A
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          moreBtnLabel && moreBtnHref && (
            <Link href={moreBtnHref} className={styles.projectsMoreBtn}>
              {moreBtnLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )
        )}
      </div>

      <div className={styles.projectsGrid}>
        {displayed.map((project, i) => (
          <div key={`${project.id}-${i}`} className={styles.projectCard}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.projectCardImg}
            />
            <div className={styles.projectCardOverlay} />
            <div className={styles.projectCardContent}>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>{tag}</span>
                ))}
              </div>
              <h3 className={styles.projectCardTitle}>{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}