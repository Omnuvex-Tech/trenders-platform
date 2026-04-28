'use client'

import Link from 'next/link'
import styles from "../../styles/Project/project.module.css";

export interface ProjectItem {
  id: number
  image: string
  tags: string[]
  title: string
}

export interface ProjectsUIProps {
  sectionTitle: string
  moreBtnLabel: string
  moreBtnHref: string
  projects: ProjectItem[]
}

export function ProjectsUI({
  sectionTitle,
  moreBtnLabel,
  moreBtnHref,
  projects,
}: ProjectsUIProps) {
  return (
    <section className={styles.projects}>
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>{sectionTitle}</h2>
        <Link href={moreBtnHref} className={styles.projectsMoreBtn}>
          {moreBtnLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
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