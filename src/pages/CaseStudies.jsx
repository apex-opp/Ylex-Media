import React, { useMemo } from 'react'

function MetricPill({ label, value }) {
  return (
    <div className="rounded-full px-3 py-1 text-xs glass neon-border text-white/75">
      <span className="text-white/55">{label}:</span> <span className="text-white">{value}</span>
    </div>
  )
}

function CaseStudyCard({ title, metrics, description, videoUrl }) {
  return (
    <div className="glass neon-border rounded-3xl overflow-hidden">
      <div className="p-7 md:p-8 grid-fade">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60">Case Study</div>
            <div className="mt-2 font-heading text-2xl md:text-3xl leading-tight">{title}</div>
            <p className="mt-3 text-white/70 max-w-2xl">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {metrics.map((m) => (
              <MetricPill key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20 p-6 md:p-7">
        <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Video Embed</div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <iframe
            className="h-full w-full"
            src={videoUrl || 'about:blank'}
            title={`${title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="mt-3 text-xs text-white/55">
          Paste a YouTube/Reel embed URL into <span className="text-white/70">videoUrl</span> and it will stay perfectly responsive.
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const cases = useMemo(
    () => [
      {
        title: 'Rochit Singh (1.9M+ IG) — Retention & Audience Scaling',
        metrics: [
          { label: 'IG', value: '1.9M+' },
          { label: 'Output', value: '600+ shorts' },
          { label: 'Last year', value: '200+ videos' },
        ],
        description:
          'Retention-first editing system: fast pacing, pattern interrupts, and hook-to-payoff structure to increase watch-time and repeat views. Built as an iteration loop for consistent scaling.',
        videoUrl: '',
      },
      {
        title: 'Vedam World School — Corporate Lead Pipeline',
        metrics: [
          { label: 'Type', value: 'Institution' },
          { label: 'Goal', value: 'Lead quality' },
          { label: 'Work', value: 'Video + design' },
        ],
        description:
          'Polished, trust-building content designed for institutional credibility: clean messaging, structured narratives, and consistent brand execution to support lead generation.',
        videoUrl: '',
      },
      {
        title: 'Yellow Sphere — Immersive Viral CGI',
        metrics: [
          { label: 'Focus', value: 'CGI virality' },
          { label: 'Work', value: 'Edit + handling' },
          { label: 'Start', value: 'Jan 2026' },
        ],
        description:
          'Surreal, high-impact creative built for shareability: sharp visual rhythm, bold concepts, and platform-native framing to maximize reach.',
        videoUrl: '',
      },
    ],
    [],
  )

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-10 grid-fade">
          <div className="text-sm uppercase tracking-wider text-white/60">Case Studies</div>
          <div className="mt-3 font-heading text-3xl md:text-4xl leading-tight">
            Evidence beats claims — outcomes over opinions.
          </div>
          <p className="mt-3 text-white/70 max-w-3xl">
            A portfolio engineered as a conversion asset: clear goals, clear execution, and clear proof.
          </p>
        </div>
      </section>

      <section className="mt-8 mx-auto max-w-6xl px-4">
        <div className="grid gap-6">
          {cases.map((c) => (
            <CaseStudyCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      <section className="mt-10 mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-8">
          <div className="font-heading text-2xl md:text-3xl leading-tight">
            Want similar results? Build your content like a system.
          </div>
          <p className="mt-3 text-white/70 max-w-2xl">
            If you have a real offer and you want creative that scales, send your details and we&apos;ll reply with a plan.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center rounded-2xl px-6 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
            data-cursor="magnet"
          >
            Start the Intake →
          </a>
        </div>
      </section>
    </div>
  )
}
