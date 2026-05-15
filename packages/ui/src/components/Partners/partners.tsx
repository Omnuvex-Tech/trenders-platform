'use client'

import React from 'react'
import { AutoScroll } from './autoscroll'
import styles from '../../styles/Partners/partners.module.css'

export interface PartnerItem {
  id: number
  svg: React.ReactNode
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
  row2,
}: PartnersUIProps) {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.partnersDivider} />
      <div className={styles.partnersHeader}>
        <h2 className={styles.partnersTitle}>{sectionTitle}</h2>
        <p className={styles.partnersDescription}>{description}  </p>
      </div>

      <AutoScroll direction="ltr" speed={20}>
        {row1.map((partner) => (
          <div key={partner.id} className={styles.partnerLogo}>
            {partner.svg}
          </div>
        ))}
      </AutoScroll>

      <div style={{ marginTop: '48px' }}>
        <AutoScroll direction="rtl" speed={20}>
          {row2.map((partner) => (
            <div key={partner.id} className={styles.partnerLogo}>
              {partner.svg}
            </div>
          ))}
        </AutoScroll>
      </div>
    </section>
  )
}