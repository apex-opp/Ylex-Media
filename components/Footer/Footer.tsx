"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="absolute inset-0 bg-aurora opacity-[0.35]" />
        <div className="grain" />
        <div className="vignette" />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to stop settling for average?
              <span className="block text-gradient">
                Let&apos;s build something your audience won&apos;t immediately skip.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              If you want the safe option, hire someone else. If you want attention, conversion,
              and creative that looks like it costs more than it does — talk to Ylex Media.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="mailto:ylexmedia@outlook.com">
                <MagneticButton className="border-gradient bg-white/5 text-white shadow-glowMagenta">
                  ylexmedia@outlook.com
                </MagneticButton>
              </a>

              <a
                href="https://www.instagram.com/ylexmedia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/75 transition hover:text-white hover:border-white/20"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="glass-strong edge-glow rounded-3xl border border-white/10 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                  Contact Portal
                </div>
                <div className="mt-2 font-display text-2xl font-bold text-white">
                  Ylex Media
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                Response time: fast
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Phone
                </div>
                <a className="mt-2 block text-white" href="tel:+917307176089">
                  +91 73071 76089
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Address
                </div>
                <div className="mt-2 text-white/80">
                  7/145, Plot no, 113/167, Mata Swaruprani Rd, Chat Chauraha,
                  Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Quick Note
                </div>
                <div className="mt-2 text-white/80">
                  Bring a product, a goal, and the courage to be bold. We&apos;ll handle the rest.
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55">
              <span>© {new Date().getFullYear()} Ylex Media</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Built for 60fps (because slow is embarrassing)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
