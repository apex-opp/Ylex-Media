import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'

function Chip({ children }) {
  return (
    <div className="glass neon-border rounded-full px-4 py-2 text-sm text-white/80">
      {children}
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const linesRef = useRef([])

  useLayoutEffect(() => {
    const el = heroRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(linesRef.current, { y: 100, opacity: 0 })
      gsap.to(linesRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.1,
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const trustItems = useMemo(
    () => [
      'Vedam World School',
      'Yellow Sphere',
      'Rochit Singh',
      'Short-form Retention',
      'Performance Creative',
      'Motion Systems',
      'Brand Authority',
      'UGC Pipelines',
      'CGI Virality',
    ],
    [],
  )

  return (
    <div className="relative">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full glass neon-border px-3 py-2 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-primary-lime shadow-[0_0_20px_rgba(57,255,20,0.35)]" />
                High-ticket creative & digital marketing systems
              </div>

              <h1 className="mt-6 font-heading tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
                <span ref={(n) => (linesRef.current[0] = n)} className="block">
                  We don&apos;t just make content.
                </span>
                <span ref={(n) => (linesRef.current[1] = n)} className="block text-gradient">
                  We engineer attention.
                </span>
              </h1>

              <p
                ref={(n) => (linesRef.current[2] = n)}
                className="mt-6 max-w-xl text-base sm:text-lg text-white/70"
              >
                Strategy + production + performance creative built to win the scroll, raise retention,
                and turn distribution into predictable pipeline.
              </p>

              <div ref={(n) => (linesRef.current[3] = n)} className="mt-8 flex flex-wrap gap-3">
                <NavLink
                  to="/contact"
                  className="rounded-2xl px-6 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                  data-cursor="magnet"
                >
                  Get a Proposal
                </NavLink>
                <NavLink
                  to="/case-studies"
                  className="rounded-2xl px-6 py-3 text-sm font-medium bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.06] transition"
                  data-cursor="magnet"
                >
                  View Case Studies
                </NavLink>
              </div>

              <div ref={(n) => (linesRef.current[4] = n)} className="mt-10 flex flex-wrap gap-2">
                <Chip>Retention loops</Chip>
                <Chip>Authority design</Chip>
                <Chip>UGC frameworks</Chip>
                <Chip>CGI ads</Chip>
                <Chip>Platform-native scaling</Chip>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass neon-border rounded-3xl p-6 md:p-7 grid-fade">
                <div className="text-sm uppercase tracking-wider text-white/60">What you get</div>
                <div className="mt-4 grid gap-4">
                  {[
                    {
                      title: 'Dopamine-first editing',
                      desc: 'Fast pacing, pattern interrupts, and hook-to-payoff structure for retention.',
                    },
                    {
                      title: 'Performance creative system',
                      desc: 'Testable variants, native formats, and iteration loops to scale winners.',
                    },
                    {
                      title: 'Premium execution',
                      desc: 'High-signal design, motion, and polish without bloated timelines.',
                    },
                  ].map((c) => (
                    <div key={c.title} className="rounded-2xl glass neon-border p-4">
                      <div className="font-heading text-lg">{c.title}</div>
                      <div className="mt-1 text-sm text-white/70">{c.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/60">Signal, not noise</div>
                  <div className="mt-2 text-sm text-white/75">
                    Everything is designed to improve one thing: measurable attention that converts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center gap-3 text-xs text-white/55">
              <div className="h-px flex-1 bg-white/10" />
              <div>Scroll</div>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="glass neon-border rounded-3xl p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-wider text-white/60">Trusted by</div>
                <div className="mt-1 text-white/80">
                  Creators, institutions, and brands that care about outcomes.
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-pink" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-purple" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-lime" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-orange" />
              </div>
            </div>

            <div className="mt-6 marquee">
              <div className="marquee-track">
                {[...trustItems, ...trustItems].map((t, i) => (
                  <div
                    key={`${t}-${i}`}
                    className="shrink-0 rounded-full px-4 py-2 text-sm glass neon-border text-white/75"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP / BENTO */}
      <section className="relative mt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7 glass neon-border rounded-3xl p-7 md:p-8 grid-fade">
              <div className="text-sm uppercase tracking-wider text-white/60">Data-Driven ROI</div>
              <div className="mt-3 font-heading text-2xl md:text-3xl leading-tight">
                Creative that maps directly to outcomes.
              </div>
              <p className="mt-3 text-white/70">
                We build creative with a measurable intent: retention, CTR, lead quality, and conversion.
                Not vibes. Not vanity.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Hook Engineering', 'Scroll-stopping openers built on audience psychology.'],
                  ['Retention Loops', 'Payoff cadence that keeps watch-time climbing.'],
                  ['Offer Clarity', 'Value is obvious, fast, and frictionless.'],
                  ['Iterative Testing', 'Variants shipped without quality degradation.'],
                ].map(([a, b]) => (
                  <div key={a} className="rounded-2xl glass neon-border p-4">
                    <div className="font-medium text-white">{a}</div>
                    <div className="mt-1 text-sm text-white/70">{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 grid gap-6">
              <div className="glass neon-border rounded-3xl p-7 md:p-8">
                <div className="text-sm uppercase tracking-wider text-white/60">High-Energy Creativity</div>
                <div className="mt-3 font-heading text-2xl leading-tight">Modern motion + premium design.</div>
                <p className="mt-3 text-white/70">
                  Editorial typography, bold gradients, micro-interactions, and platform-native formats.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>Motion Graphics</Chip>
                  <Chip>CGI Ads</Chip>
                  <Chip>Brand Identity</Chip>
                </div>
              </div>

              <div className="glass neon-border rounded-3xl p-7 md:p-8 grid-fade">
                <div className="text-sm uppercase tracking-wider text-white/60">Speed</div>
                <div className="mt-3 font-heading text-2xl leading-tight">Fast turnaround without shortcuts.</div>
                <p className="mt-3 text-white/70">
                  Systems, templates, and pipelines to ship more creative while keeping quality high.
                </p>
                <NavLink
                  to="/services"
                  className="mt-6 inline-flex items-center rounded-2xl px-5 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                  data-cursor="magnet"
                >
                  Explore Services →
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
