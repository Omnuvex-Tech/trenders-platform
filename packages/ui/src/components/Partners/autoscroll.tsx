
'use client'

import React from 'react'
import styles from '../../styles/Partners/autoscroll.module.css'

export interface AutoScrollProps {
  children: React.ReactNode
  direction?: 'ltr' | 'rtl'
  speed?: number
}
export function AutoScroll({
  children,
  direction = 'ltr',
  speed = 40,
}: AutoScrollProps) {
  const items = React.Children.toArray(children)
    const copies = [...items, ...items,...items, ...items,...items, ...items,...items, ...items,]
  const duration = `${(items.length * 200) / speed}s`

  return (
    <div
      className={`${styles.wrapper} ${direction === 'rtl' ? styles.rtl : styles.ltr}`}
      style={{
        ['--marquee-duration' as any]: duration,
      }}
    >
      <div className={styles.track}>
        {copies.map((child, i) => (
          <div key={i} className={styles.item}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
