'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import styles from "../../styles/Portfolio/portfolio.module.css";

export interface PortfolioItem {
  id: number;
  image: string;
  gif?: string;
  imageAlt?: string;
  tags: string[];
  title: string;
  slug?: string;
}

export interface PortfolioUIProps {
  sectionTitle: string;
  moreBtnLabel?: string;
  moreBtnHref?: string;
  projects: PortfolioItem[];
  showControls?: boolean;
  dropdownLabel?: string; 
  dropdownOptions?: string[];
  loadMoreLabel?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 0.5
    }
  }
};

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
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'az'
  const ALL_LABELS: Record<string, string> = {
    az: 'Bütün layihələr',
    en: 'All projects',
    ru: 'Все проекты',
  }
  const allLabel = ALL_LABELS[locale] || ALL_LABELS.az

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

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
            <div className={styles.dropdownWrap} ref={dropdownRef}>
              <button
                className={`${styles.dropdownBtn} ${dropdownOpen ? styles.dropdownBtnOpen : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedOption || dropdownLabel}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownList}>
                  <div className={styles.dropdownInner}>
                    <button
                      className={`${styles.dropdownOption} ${selectedOption === null ? styles.dropdownOptionActive : ""}`}
                      onClick={() => {
                        setSelectedOption(null)
                        setDropdownOpen(false)
                        setVisibleCount(6)
                      }}
                    >
                      {allLabel}
                    </button>
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
        {displayed.map((project) => (
          <motion.div
            key={project.id} 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }} 
            className={`${styles.projectCard} ${project.gif ? styles.projectCardWithGif : ""}`}
          >
            <Link
              href={project.slug ? `/portfolio/${project.slug}` : '#'}
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <img
                src={project.image}
                alt={project.imageAlt || ""}
                className={`${styles.projectCardImg} ${styles.imageStatic}`}
              />

              {project.gif && (
                project.gif.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={project.gif}
                    className={`${styles.projectCardImg} ${styles.imageGif}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={project.gif}
                    alt=""
                    className={`${styles.projectCardImg} ${styles.imageGif}`}
                  />
                )
              )}
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
          </motion.div>
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