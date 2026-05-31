import React, { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/contact', label: 'Contact' },
]

function LinkItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'relative px-3 py-2 text-sm tracking-wide transition',
          isActive ? 'text-white' : 'text-white/80 hover:text-white',
        ].join(' ')
      }
    >
      <span>{label}</span>
      <span className="absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-primary-pink via-primary-purple to-primary-lime transition-transform duration-300 group-hover:scale-x-100" />
    </NavLink>
  )
}

export default function Navbar() {
  const rootRef = useRef(null)
  const itemsRef = useRef([])
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useLayoutEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: -18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.1,
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div ref={rootRef} className="mx-auto max-w-6xl px-4">
        <div className="mt-4 glass neon-border rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <NavLink to="/" className="group flex items-center gap-2" aria-label="Ylex Media">
              <span className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                <span className="text-gradient font-heading text-lg leading-none">Y</span>
              </span>
              <div className="leading-tight">
                <div className="font-heading tracking-tight text-white">Ylex Media</div>
                <div className="text-xs text-white/60 -mt-0.5">Engineer Attention</div>
              </div>
            </NavLink>

            <nav className="hidden md:flex items-center gap-1">
              {nav.map((l, i) => (
                <div
                  key={l.to}
                  ref={(node) => (itemsRef.current[i] = node)}
                  className="group"
                >
                  <LinkItem to={l.to} label={l.label} />
                </div>
              ))}
              <div ref={(node) => (itemsRef.current[nav.length] = node)} className="ml-2">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                  data-cursor="magnet"
                >
                  Get Proposal
                </NavLink>
              </div>
            </nav>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 glass neon-border"
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              data-cursor="magnet"
            >
              <span className="text-sm font-medium">{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>

          <div className={open ? 'block md:hidden' : 'hidden'}>
            <div className="px-3 pb-3">
              <div className="grid gap-1">
                {nav.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-3 py-3 glass neon-border text-sm',
                        isActive ? 'text-white' : 'text-white/80',
                      ].join(' ')
                    }
                    data-cursor="magnet"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-2">
                <NavLink
                  to="/contact"
                  className="block text-center rounded-xl px-3 py-3 glass neon-border font-medium"
                  data-cursor="magnet"
                >
                  Get Proposal
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
