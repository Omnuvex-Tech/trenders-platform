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
  speed = 120,
}: AutoScrollProps) {
  const items = React.Children.toArray(children)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const animRef = React.useRef<Animation | null>(null)

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const oneSetWidth = track.scrollWidth / 6
    const duration = (oneSetWidth / speed) * 1000

    const keyframes =
      direction === 'ltr'
        ? [{ transform: 'translateX(0)' }, { transform: `translateX(-${oneSetWidth}px)` }]
        : [{ transform: `translateX(-${oneSetWidth}px)` }, { transform: 'translateX(0)' }]

    animRef.current = track.animate(keyframes, {
      duration,
      iterations: Infinity,
      easing: 'linear',
    })

    return () => {
      animRef.current?.cancel()
    }
  }, [direction, speed, items.length])

  const handleMouseEnter = () => {
    if (animRef.current) animRef.current.playbackRate = 0
  }

  const handleMouseLeave = () => {
    if (animRef.current) animRef.current.playbackRate = 1
  }

  const copies = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className={styles.track}>
        {copies.map((child, i) => (
          <div key={i} className={styles.item}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}