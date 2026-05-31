import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="magnet"]'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const state = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tx: window.innerWidth / 2,
    ty: window.innerHeight / 2,
    magnetEl: null,
    magnetRect: null,
    hovering: false,
    hidden: false,
  })

  useEffect(() => {
    // Disable for coarse pointers (touch)
    const isCoarse = window.matchMedia?.('(pointer: coarse)')?.matches
    if (isCoarse) return

    const el = cursorRef.current
    if (!el) return

    const setX = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3.out' })
    const setY = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3.out' })
    const setScale = gsap.quickTo(el, 'scale', { duration: 0.22, ease: 'power3.out' })
    const setOpacity = gsap.quickTo(el, 'opacity', { duration: 0.22, ease: 'power3.out' })

    const onMove = (e) => {
      const s = state.current
      s.x = e.clientX
      s.y = e.clientY

      if (s.magnetEl && s.magnetRect) {
        const r = s.magnetRect
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (e.clientX - cx) * 0.12
        const dy = (e.clientY - cy) * 0.12
        s.tx = cx + dx
        s.ty = cy + dy
      } else {
        s.tx = e.clientX
        s.ty = e.clientY
      }

      if (s.hidden) {
        s.hidden = false
        setOpacity(1)
      }

      setX(s.tx)
      setY(s.ty)
    }

    const onLeaveWindow = () => {
      state.current.hidden = true
      setOpacity(0)
    }

    const onEnterWindow = () => {
      state.current.hidden = false
      setOpacity(1)
    }

    const setMagnet = (target) => {
      const s = state.current
      s.magnetEl = target
      s.magnetRect = target?.getBoundingClientRect?.() || null
      setScale(1.5)
    }

    const clearMagnet = () => {
      const s = state.current
      s.magnetEl = null
      s.magnetRect = null
      setScale(1)
    }

    const onOver = (e) => {
      const target = e.target?.closest?.(SELECTOR)
      if (!target) return
      state.current.hovering = true
      setMagnet(target)
    }

    const onOut = (e) => {
      // If leaving a magnet element entirely, clear it
      const related = e.relatedTarget
      const stillOn = related?.closest?.(SELECTOR)
      if (stillOn) return
      state.current.hovering = false
      clearMagnet()
    }

    const onScroll = () => {
      const s = state.current
      if (!s.magnetEl) return
      // keep rect updated while pinned elements move
      s.magnetRect = s.magnetEl.getBoundingClientRect()
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    window.addEventListener('mouseleave', onLeaveWindow)
    window.addEventListener('mouseenter', onEnterWindow)
    window.addEventListener('scroll', onScroll, { passive: true })

    // initial state
    gsap.set(el, { x: state.current.x, y: state.current.y, opacity: 0, scale: 1 })
    requestAnimationFrame(() => setOpacity(1))

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('mouseleave', onLeaveWindow)
      window.removeEventListener('mouseenter', onEnterWindow)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      aria-hidden="true"
    >
      <div className="h-6 w-6 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm" />
    </div>
  )
}
