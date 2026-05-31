import React, { useEffect, useMemo, useRef, useState } from 'react'

function useInView(ref, options = { threshold: 0.35 }) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, options])

  return inView
}

function useCountUp(inView, target, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const from = 0
    const to = target

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    let rafId = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(p)
      const next = Math.round(from + (to - from) * eased)
      setValue(next)
      if (p < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return value
}

function formatCompact(n) {
  try {
    return new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
  } catch {
    if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`
    if (n >= 1_000) return `${Math.round(n / 100) / 10}K`
    return String(n)
  }
}

function Metric({ label, value, compact = false }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const v = useCountUp(inView, value, 1100)

  return (
    <div ref={ref} className="glass neon-border rounded-2xl p-4">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-2 font-heading text-2xl">
        {compact ? formatCompact(v) : v.toLocaleString('en-IN')}
        <span className="text-white/55">+</span>
      </div>
    </div>
  )
}

function Dossier({ role, name, location, summary, skills, software, timeline, education }) {
  return (
    <div className="glass neon-border rounded-3xl p-7 md:p-8 grid-fade">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/60">{role}</div>
          <div className="mt-2 font-heading text-3xl leading-tight">{name}</div>
          <div className="mt-1 text-white/65 text-sm">{location}</div>
        </div>
        <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 grid place-items-center animate-floaty">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-primary-pink via-primary-purple to-primary-lime opacity-90" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-wider text-white/60">Overview</div>
        <p className="mt-2 text-white/75 leading-relaxed">{summary}</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl glass neon-border p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">Core skills</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full px-3 py-1 text-xs glass neon-border text-white/75">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl glass neon-border p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">Software stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {software.map((s) => (
              <span key={s} className="rounded-full px-3 py-1 text-xs glass neon-border text-white/75">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl glass neon-border p-5">
        <div className="text-xs uppercase tracking-wider text-white/60">Work timeline</div>
        <div className="mt-4 grid gap-3">
          {timeline.map((t) => (
            <div key={t.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-white/60">{t.when}</div>
              </div>
              <div className="mt-1 text-sm text-white/70">{t.what}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl glass neon-border p-5">
        <div className="text-xs uppercase tracking-wider text-white/60">Education</div>
        <div className="mt-4 grid gap-3">
          {education.map((e) => (
            <div key={e.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-white/60">{e.when}</div>
              </div>
              {e.where ? <div className="mt-1 text-sm text-white/70">{e.where}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const data = useMemo(
    () => ({
      tushar: {
        role: 'Lead Video Editor',
        name: 'Tushar Singh',
        location: 'Lucknow',
        summary:
          '4 years of professional video editing across influencers and brands. Long-term collaboration with Rochit Singh (2M IG; ~150K YouTube), with 200+ videos edited in the last year and 600+ short videos delivered overall—plus long-form projects. Focused on precision, pacing, and retention-first structure.',
        skills: ['Video Editing', 'Color Grading', 'Time Management', 'Video Production', 'Short-form Reels'],
        software: ['Premiere Pro', 'After Effects', 'Canva', 'CapCut', 'Filmora'],
        timeline: [
          {
            title: 'Rochit__Singh (1.9M)',
            when: '2022 — 2026 (Full Time)',
            what: 'Video editing, thumbnail design, video production.',
          },
          {
            title: 'Rochit.unfilterd (340k)',
            when: '2023 — 2026 (Full Time)',
            what: 'Video editing, thumbnail design, video production.',
          },
          {
            title: 'Talkswithrochit (158k) — YouTube',
            when: '2023 — 2026 (Full Time)',
            what: 'Video editing, thumbnail design, video production.',
          },
          {
            title: 'Vedam World School',
            when: '2025 — 2026 (Freelance)',
            what: 'Video editing, graphic design, video shooting.',
          },
          {
            title: 'Yellow Sphere',
            when: 'Jan 2026 — Present',
            what: 'Video editing and social media handling.',
          },
        ],
        education: [
          { title: 'B.Sc. Agriculture', when: '2018 — 2022', where: 'CBG University' },
          { title: 'Intermediate', when: '2016', where: 'AIC Parsehramal Sitapur' },
        ],
        metrics: [
          { label: 'Years Experience', value: 4 },
          { label: 'Videos Edited (Last Year)', value: 200 },
          { label: 'Short Videos Delivered', value: 600 },
          { label: 'Audience Touched', value: 2000000, compact: true },
          { label: 'YouTube Subscribers (Client)', value: 150000, compact: true },
        ],
      },
      sachin: {
        role: 'Graphic Designer + Video Editor',
        name: 'Sachin Verma',
        location: 'India',
        summary:
          '3 years of experience delivering captivating social content, video, and static assets. Known for outside-the-box thinking and brand-focused design systems across campaigns, banners, and promotional materials.',
        skills: [
          'Social Media Creatives',
          'Branding Materials',
          'Banners & Promotions',
          'E-commerce Campaign Design',
          'Animation Support',
        ],
        software: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Adobe Animation'],
        timeline: [
          {
            title: 'Markitiers — Designer',
            when: '2022 — 2023',
            what: 'Designed brochures, posters, standees, and branding materials.',
          },
          {
            title: 'e-patang — Creative Designer',
            when: '2023 — 2024',
            what: 'Created social media creatives, banners, promotional materials; e-commerce campaigns and branding.',
          },
        ],
        education: [
          { title: 'Diploma — Video Editing & Graphic Design', when: '—', where: 'Anipixart Animation' },
          { title: 'Intermediate', when: '—', where: 'Elpis Global School' },
        ],
        metrics: [
          { label: 'Years Experience', value: 3 },
          { label: 'Core Tools Mastered', value: 5 },
        ],
      },
    }),
    [],
  )

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-10 grid-fade">
          <div className="text-sm uppercase tracking-wider text-white/60">About</div>
          <div className="mt-3 font-heading text-3xl md:text-4xl leading-tight">
            The team war-room — focused on output, speed, and clarity.
          </div>
          <p className="mt-3 text-white/70 max-w-3xl">
            Execution-first: clean design systems, retention-first editing, and production pipelines that scale without quality loss.
          </p>
        </div>
      </section>

      <section className="mt-8 mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <Dossier {...data.tushar} />
          </div>
          <div className="md:col-span-6">
            <Dossier {...data.sachin} />
          </div>
        </div>
      </section>

      <section className="mt-10 mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-8">
          <div className="text-sm uppercase tracking-wider text-white/60">Metrics</div>
          <div className="mt-3 font-heading text-2xl md:text-3xl leading-tight">
            Proof-driven numbers — animated on scroll.
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.tushar.metrics.map((m) => (
              <Metric key={m.label} label={m.label} value={m.value} compact={m.compact} />
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.sachin.metrics.map((m) => (
              <Metric key={m.label} label={m.label} value={m.value} compact={m.compact} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
