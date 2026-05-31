import React, { useMemo } from 'react'
import gsap from 'gsap'

const neon = ['#ff007f', '#39ff14', '#9d00ff', '#ff5e00']

function ServiceCard({ index, title, focus }) {
  const color = neon[index % neon.length]

  const onEnter = (e) => {
    const card = e.currentTarget
    gsap.to(card, {
      duration: 0.35,
      scale: 1.015,
      rotateX: -6,
      rotateY: 10,
      transformPerspective: 900,
      ease: 'power3.out',
    })
    gsap.to(card, {
      duration: 0.35,
      boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 14px 45px rgba(0,0,0,0.35), 0 0 40px ${color}33`,
      ease: 'power3.out',
    })
  }

  const onMove = (e) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * 10
    const ry = (px - 0.5) * 14
    gsap.to(card, {
      duration: 0.25,
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 900,
      ease: 'power3.out',
    })
  }

  const onLeave = (e) => {
    const card = e.currentTarget
    gsap.to(card, {
      duration: 0.5,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 900,
      ease: 'power3.out',
    })
    gsap.to(card, {
      duration: 0.5,
      boxShadow: '0 8px 32px rgba(157,0,255,0.10)',
      ease: 'power3.out',
    })
  }

  return (
    <div
      className="glass neon-border rounded-3xl p-6 md:p-7 transition will-change-transform"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="magnet"
    >
      <div className="text-xs uppercase tracking-wider text-white/60">Service {String(index + 1).padStart(2, '0')}</div>
      <div className="mt-3 font-heading text-2xl leading-tight">{title}</div>
      <div className="mt-3 text-white/70">{focus}</div>

      <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
        <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 16px ${color}55` }} />
        <span>Hover-reactive motion</span>
      </div>
    </div>
  )
}

export default function Services() {
  const services = useMemo(
    () => [
      ['Video Editing', 'Dopamine-infused retention loops'],
      ['Graphic Designing', 'Market authority visual identity'],
      ['Motion Graphics', 'Keyframe choreography'],
      ['Content Management', 'Algorithmic scaling pipelines'],
      ['Script Writing', 'Psychological hooks & conversion'],
      ['UGC Ads', 'Native creator frameworks'],
      ['CGI Ads', 'Surreal 3D physics-defying virality'],
      ['Full Ad Creatives', 'Platform-native scaling'],
    ],
    [],
  )

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-10 grid-fade">
          <div className="text-sm uppercase tracking-wider text-white/60">Services</div>
          <div className="mt-3 font-heading text-3xl md:text-4xl leading-tight">
            The corporate matrix — built for speed, scale, and signal.
          </div>
          <p className="mt-3 text-white/70 max-w-3xl">
            Eight core services engineered as a single system. Strategy informs creative. Creative informs tests.
            Tests inform scale.
          </p>
        </div>
      </section>

      <section className="mt-8 mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Asymmetric mapping */}
          <div className="md:col-span-5 grid gap-6">
            <ServiceCard index={0} title={services[0][0]} focus={services[0][1]} />
            <ServiceCard index={1} title={services[1][0]} focus={services[1][1]} />
            <ServiceCard index={2} title={services[2][0]} focus={services[2][1]} />
          </div>

          <div className="md:col-span-7 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <ServiceCard index={3} title={services[3][0]} focus={services[3][1]} />
              <ServiceCard index={4} title={services[4][0]} focus={services[4][1]} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ServiceCard index={5} title={services[5][0]} focus={services[5][1]} />
              <ServiceCard index={6} title={services[6][0]} focus={services[6][1]} />
            </div>
            <ServiceCard index={7} title={services[7][0]} focus={services[7][1]} />
          </div>
        </div>
      </section>
    </div>
  )
}
