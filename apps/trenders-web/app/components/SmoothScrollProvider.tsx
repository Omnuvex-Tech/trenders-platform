

'use client'

import { useEffect, ReactNode, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important')
    
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08, 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: true
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize()
    })
    
    if (document.body) {
      resizeObserver.observe(document.body)
    }

    return () => {
      lenis.destroy()
      resizeObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}