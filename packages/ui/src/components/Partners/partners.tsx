
'use client'

import React, { useRef, useEffect } from 'react'
import { AutoScroll } from './autoscroll'
import styles from '../../styles/Partners/partners.module.css'

export interface PartnerItem {
  id: number
  svg: React.ReactNode
  isLargeLogo?: boolean
}

export interface PartnersUIProps {
  sectionTitle: string
  description: React.ReactNode
  row1: PartnerItem[]
  row2: PartnerItem[]
}

export function PartnersUI({
  sectionTitle,
  description,
  row1,
}: PartnersUIProps) {
  const animRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = animRef.current
    if (!el) return

    const trigger = () => {
      el.classList.add(styles.partnersRevealActive!)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trigger()
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.partnersSection}>
      <div className={styles.partnersDivider} />
      <div ref={animRef} className={`w-full ${styles.partnersReveal}`}>
        <div className={styles.partnersHeader}>
          <h2 className={styles.partnersTitle}>{sectionTitle}</h2>
          <div className={styles.partnersDescription}>{description}</div>
        </div>
        <div className={styles.partnersScrollWrapper}>
          <AutoScroll direction="ltr" speed={20}>
            {row1.map((partner) => (
              <div
                key={partner.id}
                className={`${styles.partnerLogo} ${
                  partner.isLargeLogo ? styles.logoLarge : ''
                }`}
              >
                {partner.svg}
              </div>
            ))}
          </AutoScroll>
        </div>
      </div>
    </section>
  )
}