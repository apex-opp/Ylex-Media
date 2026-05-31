import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) return

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      syncTouch: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (t) => {
      // GSAP ticker is seconds; Lenis expects ms
      lenis.raf(t * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <div id="smooth-root" className="relative">
      {children}
    </div>
  )
}
