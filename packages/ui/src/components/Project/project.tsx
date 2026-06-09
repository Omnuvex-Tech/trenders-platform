'use client'

import { useRef } from 'react'
import Link from 'next/link'
import styles from "../../styles/Project/project.module.css";
import { motion, Variants } from 'framer-motion'

export interface ProjectItem {
  id: number
  image: string
  tags: string[]
  title: string
  href?: string
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
  const containerRef = useRef<HTMLDivElement>(null);

  const rowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const chunkedProjects: ProjectItem[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    chunkedProjects.push(projects.slice(i, i + 3));
  }

  return (
    <section ref={containerRef} className={styles.projects}>
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

      <div className={styles.projectsGrid} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {chunkedProjects.map((rowItems, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }} 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              width: '100%'
            }}
          >
            {rowItems.map((project, index) => (
              <ProjectCardWrapper 
                key={project.id || index} 
                project={project} 
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProjectCardWrapper({ 
  project 
}: { 
  project: ProjectItem; 
}) {
  const Component = project.href ? Link : 'div';
  const MotionCard = motion(Component);
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 45 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <MotionCard
      {...(project.href ? { href: project.href } : {})}
      className={styles.projectCard}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{ display: 'block', height: '100%' }}
    >
      <img src={project.image} alt={project.title} className={styles.projectCardImg} />
      <div className={styles.projectCardOverlay} />
      <div className={styles.projectCardContent}>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.projectTag}>{tag}</span>
          ))}
        </div>
        <div className={styles.projectCardTitle} dangerouslySetInnerHTML={{ __html: project.title }} />
      </div>
    </MotionCard>
  );
}


