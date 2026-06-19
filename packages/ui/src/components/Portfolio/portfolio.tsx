'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import styles from "../../styles/Portfolio/portfolio.module.css";

export interface PortfolioItem {
  id: number;
  image: string;
  imageAlt?: string;
  tags: string[];
  title: string;
  slug?: string;
}

export interface PortfolioUIProps {
  sectionTitle: string
  moreBtnLabel?: string
  moreBtnHref?: string
  projects: PortfolioItem[]
  showControls?: boolean
  dropdownLabel?: string
  dropdownOptions?: string[]
  loadMoreLabel?: string
}

export function PortfolioUI({
  sectionTitle,
  moreBtnLabel,
  moreBtnHref,
  projects,
  showControls = false,
  dropdownLabel = "Filter",
  dropdownOptions = [],
  loadMoreLabel = "Daha çox Portfolio",
}: PortfolioUIProps) {

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredProjects = useMemo(() => {
    if (selectedOption) {
      return projects.filter(p =>
        p.tags.some(t => t === selectedOption)
      )
    }
    return projects
  }, [projects, selectedOption])

  const displayed = useMemo(() => {
    return filteredProjects.slice(0, visibleCount)
  }, [filteredProjects, visibleCount])

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length))
  }

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
                        setVisibleCount(6)
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
          <Link
            key={`${project.id}-${i}`}
            href={project.slug ? `/portfolio/${project.slug}` : '#'}
            className={styles.projectCard}
          >
            <img
              src={project.image}
              alt={project.imageAlt || ""}
              className={styles.projectCardImg}
            />
            <div className={styles.projectCardOverlay} />
            <div className={styles.projectCardContent}>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>{tag}</span>
                ))}
              </div>
              <div
                className={styles.projectCardTitle}
                dangerouslySetInnerHTML={{ __html: project.title }}
              />
            </div>
          </Link>
        ))}
      </div>

      {isMounted && filteredProjects.length > visibleCount && (
        <div className={styles.moreBtnWrapper}>
          <button
            type="button"
            onClick={handleShowMore}
            className={styles.projectsMoreBtn}
          >
            {loadMoreLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}