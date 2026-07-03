'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import styles from "../../styles/Project/project.module.css";

export interface ProjectItem {
  id: number
  image: string
  gif?: string;
  tags: string[]
  title: string
  href?: string
}

export interface ProjectsUIProps {
  sectionTitle: string
  moreBtnLabel: string
  moreBtnHref: string
  moreBtnNewTab?: boolean;
  projects: ProjectItem[]
}

export function ProjectsUI({
  sectionTitle,
  moreBtnLabel,
  moreBtnHref,
  moreBtnNewTab,
  projects,
}: ProjectsUIProps) {
  return (
    <section className={styles.projects}>
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>{sectionTitle}</h2>
        <Link
          href={moreBtnHref}
          className={styles.projectsMoreBtn}
          target={moreBtnNewTab ? "_blank" : "_self"}
        >
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
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add(styles.projectCardVisible)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const inner = (
    <>
      <img src={project.image} alt={project.title} className={`${styles.projectCardImg} ${project.gif ? styles.imageStatic : ""}`} />

      {project.gif && (
        project.gif.toLowerCase().endsWith('.mp4') ? (
          <video
            src={project.gif}
            className={`${styles.projectCardImg} ${styles.imageGif}`} autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={project.gif}
            alt=""
            className={`${styles.projectCardImg} ${styles.imageGif}`} />
        )
      )}
      <div className={styles.projectCardOverlay} />
      <div className={styles.projectCardContent}>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.projectTag}>{tag}</span>
          ))}
        </div>
        <div className={styles.projectCardTitle} dangerouslySetInnerHTML={{ __html: project.title }} />
      </div>
    </>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        className={styles.projectCard}
        style={{ animationDelay: `${index * 0.1}s` }}
        ref={cardRef as any}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      ref={cardRef}
      className={styles.projectCard}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {inner}
    </div>
  );
}