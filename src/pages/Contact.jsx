import React from 'react'

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputBase =
  'w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none focus:border-white/20 focus:ring-1 focus:ring-primary-purple/30'

export default function Contact() {
  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-4">
        <div className="glass neon-border rounded-3xl p-7 md:p-10 grid-fade">
          <div className="text-sm uppercase tracking-wider text-white/60">Contact</div>
          <div className="mt-3 font-heading text-3xl md:text-4xl leading-tight">
            Lead capture portal — send the intake, get the plan.
          </div>
          <p className="mt-3 text-white/70 max-w-3xl">
            Fill out the form with real details. Low-info requests get low-info replies.
          </p>
        </div>
      </section>

      <section className="mt-8 mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="glass neon-border rounded-3xl p-7 md:p-8">
              <div className="text-sm uppercase tracking-wider text-white/60">Project Intake</div>
              <form
                className="mt-6 grid gap-5"
                action="mailto:media.ylexmedia@gmail.com"
                method="post"
                encType="text/plain"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input className={inputBase} name="name" type="text" placeholder="Your name" required />
                  </Field>
                  <Field label="Company / Brand">
                    <input className={inputBase} name="company" type="text" placeholder="Company name" required />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email">
                    <input className={inputBase} name="email" type="email" placeholder="you@company.com" required />
                  </Field>
                  <Field label="Phone / WhatsApp">
                    <input className={inputBase} name="phone" type="tel" placeholder="+91 ..." />
                  </Field>
                </div>

                <Field label="Revenue Scale">
                  <select className={inputBase} name="revenueScale" defaultValue="" required>
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="Pre-revenue / Just starting">Pre-revenue / Just starting</option>
                    <option value="₹1L–₹5L / month">₹1L–₹5L / month</option>
                    <option value="₹5L–₹25L / month">₹5L–₹25L / month</option>
                    <option value="₹25L+ / month">₹25L+ / month</option>
                  </select>
                </Field>

                <Field label="Project Scope">
                  <select className={inputBase} name="projectScope" defaultValue="" required>
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="Short-form editing system">Short-form editing system</option>
                    <option value="Full creative + performance ads">Full creative + performance ads</option>
                    <option value="Brand identity + content templates">Brand identity + content templates</option>
                    <option value="Motion graphics / CGI ads">Motion graphics / CGI ads</option>
                    <option value="Content management + distribution">Content management + distribution</option>
                  </select>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Budget (Monthly)">
                    <select className={inputBase} name="budget" defaultValue="" required>
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="₹10k–₹25k">₹10k–₹25k</option>
                      <option value="₹25k–₹50k">₹25k–₹50k</option>
                      <option value="₹50k–₹1L">₹50k–₹1L</option>
                      <option value="₹1L+">₹1L+</option>
                    </select>
                  </Field>

                  <Field label="Timeline">
                    <select className={inputBase} name="timeline" defaultValue="" required>
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="ASAP (this week)">ASAP (this week)</option>
                      <option value="2–4 weeks">2–4 weeks</option>
                      <option value="1–2 months">1–2 months</option>
                      <option value="Exploring / Not sure">Exploring / Not sure</option>
                    </select>
                  </Field>
                </div>

                <Field label="Details (Goals, Offer, Links, Competitors)">
                  <textarea
                    className={inputBase + ' min-h-[140px] resize-y'}
                    name="details"
                    placeholder="Tell us exactly what you need, what success looks like, and include any links."
                    required
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-2xl px-6 py-3 text-sm font-medium glass neon-border hover:bg-white/[0.04] transition"
                    data-cursor="magnet"
                  >
                    Send Intake
                  </button>
                  <div className="text-xs text-white/55">
                    Submits via your default email client (mailto).
                  </div>
                </div>
              </form>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="glass neon-border rounded-3xl p-7 md:p-8 grid-fade h-full">
              <div className="text-sm uppercase tracking-wider text-white/60">Agency Metadata</div>

              <div className="mt-6 grid gap-5 text-sm text-white/75">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs text-white/60 uppercase tracking-wider">Email</div>
                  <div className="mt-2">
                    <a href="mailto:ylexmedia@outlook.com" className="hover:text-white transition" data-cursor="magnet">
                      ylexmedia@outlook.com
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs text-white/60 uppercase tracking-wider">Phone</div>
                  <div className="mt-2">
                    <a href="tel:+917307176089" className="hover:text-white transition" data-cursor="magnet">
                      +91 73071 76089
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs text-white/60 uppercase tracking-wider">Location</div>
                  <div className="mt-2 leading-relaxed">
                    7/145, Plot no, 113/167, Mata Swaruprani Rd, Chat Chauraha, Khalasi Line, Swaroop Nagar,
                    Kanpur, Uttar Pradesh 208002
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs text-white/60 uppercase tracking-wider">Instagram</div>
                  <div className="mt-2">
                    <a
                      href="https://www.instagram.com/ylexmedia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition break-all"
                      data-cursor="magnet"
                    >
                      https://www.instagram.com/ylexmedia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-2xl glass neon-border p-5">
                <div className="text-xs uppercase tracking-wider text-white/60">Expectation</div>
                <p className="mt-2 text-white/70">
                  Provide links, existing assets, and a clear offer. If your offer is weak, creative cannot save it.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
