import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="glass neon-border rounded-3xl p-8 md:p-10 grid-fade">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-heading text-3xl md:text-4xl leading-tight">
                <span className="text-gradient">Ylex Media</span>
                <span className="text-white"> builds attention systems.</span>
              </div>
              <p className="mt-4 text-white/70 max-w-md">
                High-energy creative, production, and performance execution designed to turn scroll into
                clicks, clicks into leads, and leads into revenue.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink
                  to="/contact"
                  className="rounded-2xl px-5 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                  data-cursor="magnet"
                >
                  Request a Proposal
                </NavLink>
                <a
                  href="mailto:ylexmedia@outlook.com"
                  className="rounded-2xl px-5 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                  data-cursor="magnet"
                >
                  Email Us
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Navigation</div>
                  <div className="mt-3 grid gap-2">
                    {[
                      { to: '/', label: 'Home' },
                      { to: '/services', label: 'Services' },
                      { to: '/about', label: 'About' },
                      { to: '/case-studies', label: 'Case Studies' },
                      { to: '/contact', label: 'Contact' },
                    ].map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className="text-white/75 hover:text-white transition"
                        data-cursor="magnet"
                      >
                        {l.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Agency Details</div>
                  <div className="mt-3 grid gap-3 text-sm text-white/75">
                    <div>
                      <div className="text-white/60">Email</div>
                      <a href="mailto:ylexmedia@outlook.com" className="hover:text-white transition" data-cursor="magnet">
                        ylexmedia@outlook.com
                      </a>
                    </div>
                    <div>
                      <div className="text-white/60">Phone</div>
                      <a href="tel:+917307176089" className="hover:text-white transition" data-cursor="magnet">
                        +91 73071 76089
                      </a>
                    </div>
                    <div>
                      <div className="text-white/60">Instagram</div>
                      <a
                        href="https://www.instagram.com/ylexmedia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition"
                        data-cursor="magnet"
                      >
                        @ylexmedia
                      </a>
                    </div>
                    <div>
                      <div className="text-white/60">Location</div>
                      <div className="leading-relaxed">
                        7/145, Plot no, 113/167, Mata Swaruprani Rd, Chat Chauraha, Khalasi Line,
                        Swaroop Nagar, Kanpur, Uttar Pradesh 208002
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4">
                <div className="h-px w-full bg-white/10" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/55">
                  <div>© {new Date().getFullYear()} Ylex Media. All rights reserved.</div>
                  <div className="flex gap-3">
                    <span className="text-white/45">Built with React + WebGL</span>
                    <span className="text-white/45">•</span>
                    <span className="text-white/45">High performance by design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
