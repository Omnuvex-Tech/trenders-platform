

'use client'

import React, { useRef, useEffect, useState } from 'react'
import { AutoScroll } from './autoscroll'
import styles from '../../styles/Partners/partners.module.css'
import { motion } from 'framer-motion'

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
}: PartnersUIProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Əgər element artıq viewport-dadırsa (qayıdış zamanı), dərhal göstər
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

   const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  },
  { threshold: 0.05 }
);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.partnersSection}>
      <div className={styles.partnersDivider} />

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 70, scale: 0.96 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.partnersHeader}>
          <h2 className={styles.partnersTitle}>
            {sectionTitle}
          </h2>
          <div className={styles.partnersDescription}>
            {description}
          </div>
        </div>

        <div className={styles.partnersScrollWrapper}>
          <AutoScroll direction="ltr" speed={20}>
            {row1.map((partner) => (
              <div key={partner.id} className={styles.partnerLogo}>
                {partner.svg}
              </div>
            ))}
          </AutoScroll>
        </div>
      </motion.div>
    </section>
  )
}