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
  dropdownLabel?: string
  dropdownOptions?: string[]
}

export function PortfolioUI({
  sectionTitle,
  moreBtnLabel,
  moreBtnHref,
  projects,
  showControls = false,
  dropdownLabel = "Filter",
  dropdownOptions = [],
}: PortfolioUIProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const displayed = useMemo(() => {
    if (selectedOption) {
      return projects.filter(p =>
        p.tags.some(t => t === selectedOption)
      )
    }
    return projects
  }, [projects, selectedOption])

  return (
    <section className={styles.projects}>
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>{sectionTitle}</h2>

        {showControls ? (
          <div className={styles.controls}>
            <div className={styles.dropdownWrap}>
              <button
                className={`${styles.dropdownBtn} ${dropdownOpen ? styles.dropdownBtnOpen : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedOption || dropdownLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownList}>
                  {dropdownOptions.map((opt) => (
                    <button
                      key={opt}
                      className={`${styles.dropdownOption} ${selectedOption === opt ? styles.dropdownOptionActive : ""}`}
                      onClick={() => {
                        setSelectedOption(selectedOption === opt ? null : opt)
                        setDropdownOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
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