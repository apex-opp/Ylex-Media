"use client";

import { useEffect, useRef, useState } from "react";
import TextScramble from "@/components/TextScramble";
import { clamp } from "@/lib/utils";

const CONTACT = {
  email: "ylexmedia@outlook.com",
  phone: "+91 73071 76089",
  address:
    "7/145, Plot no, 113/167, Mata Swaruprani Rd, Chat Chauraha, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002",
  instagram:
    "https://www.instagram.com/ylexmedia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
};

export default function ContactFooter() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-16 md:pb-20 md:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="kicker">SECTION_03 • CONTACT PORTAL • DO NOT PANIC</div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-blueprint-ink md:text-5xl">
            <TextScramble text="Open a ticket. Deploy the chaos." />
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base text-blueprint-ink/70 md:text-lg">
            If you want fast, clean, conversion-first creative — send the brief. If you want “make it pop” with no
            context… also send the brief, but include therapy budget.
          </p>

          <div className="mt-8 grid gap-4">
            <ContactRow label="EMAIL" value={CONTACT.email} href={`mailto:${CONTACT.email}`} cursor="MAIL" />
            <ContactRow label="PHONE" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} cursor="CALL" />
            <ContactRow label="ADDRESS" value={CONTACT.address} cursor="MAP" />
          </div>

          <div className="mt-10">
            <InstagramPortal href={CONTACT.instagram} />
          </div>
        </div>

        <div className="rounded-2xl border border-blueprint-line bg-blueprint-bg/40 p-6 shadow-wire backdrop-blur-sm">
          <div className="kicker">CONTACT FORM</div>
          <p className="mt-3 text-sm text-blueprint-ink/70">
            This form intentionally uses <span className="font-mono">mailto:</span> so you can deploy without backend
            setup. Want a proper API? Add a Next Route Handler later.
          </p>

          <ContactForm />
        </div>
      </div>

      <Footer />
    </section>
  );
}

function ContactRow({ label, value, href, cursor = "OPEN" }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      data-cursor={cursor}
      data-magnet="0.55"
      className="rounded-xl border border-blueprint-line bg-blueprint-bg/35 p-4 shadow-wire transition hover:bg-blueprint-bg/55"
    >
      <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">{label}</div>
      <div className="mt-2 text-sm text-blueprint-ink/75">{value}</div>
    </Comp>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [armed, setArmed] = useState(false);

  const buildMailto = () => {
    const subject = encodeURIComponent(`Ylex Media — New inquiry from ${form.name || "Someone mysterious"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\n— Sent from the Ylex Blueprint Interface`
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    // "arm" the CTA only when message isn't empty; it feels deliberate.
    setArmed(form.message.trim().length > 5);
  }, [form.message]);

  return (
    <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="YOUR NAME"
        value={form.name}
        onChange={(v) => setForm((s) => ({ ...s, name: v }))}
        placeholder="Tejash, Batman, or 'Anonymous #42'"
      />
      <Field
        label="YOUR EMAIL"
        value={form.email}
        onChange={(v) => setForm((s) => ({ ...s, email: v }))}
        placeholder="you@domain.com"
        type="email"
      />
      <Field
        label="MESSAGE"
        value={form.message}
        onChange={(v) => setForm((s) => ({ ...s, message: v }))}
        placeholder="What are you building, what’s the goal, and what’s your deadline?"
        textarea
      />

      <a
        href={buildMailto()}
        data-cursor={armed ? "SEND" : "LOCKED"}
        data-magnet="0.7"
        className={[
          "group mt-2 inline-flex items-center justify-between rounded-xl border px-5 py-4 font-mono text-xs tracking-[0.22em] shadow-wire transition",
          armed
            ? "border-blueprint-neon/35 bg-blueprint-bg/55 text-blueprint-ink/90 hover:bg-blueprint-bg/70"
            : "cursor-not-allowed border-blueprint-line bg-blueprint-bg/30 text-blueprint-ink/45",
        ].join(" ")}
        onClick={(e) => {
          if (!armed) e.preventDefault();
        }}
      >
        <span className="flex items-center gap-3">
          <span
            className={[
              "h-2 w-2 rounded-full",
              armed ? "bg-blueprint-neon/60 shadow-[0_0_12px_rgba(106,228,255,0.22)]" : "bg-blueprint-ink/25",
            ].join(" ")}
          />
          <TextScramble text={armed ? "TRIGGER EMAIL LAUNCH" : "FILL MESSAGE TO ARM"} />
        </span>
        <span className="opacity-60 group-hover:opacity-90">→</span>
      </a>
    </form>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", textarea = false }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">{label}</span>
      <Comp
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        rows={textarea ? 6 : undefined}
        className="rounded-xl border border-blueprint-line bg-blueprint-bg/35 px-4 py-3 text-sm text-blueprint-ink/80 outline-none transition focus:border-blueprint-neon/35 focus:bg-blueprint-bg/55 focus:shadow-[0_0_0_1px_rgba(106,228,255,0.20),0_0_24px_rgba(106,228,255,0.10)]"
      />
    </label>
  );
}

function InstagramPortal({ href }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = clamp((e.clientY - r.top) / r.height, 0, 1);
      el.style.setProperty("--px", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--py", `${(y * 100).toFixed(2)}%`);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="IG"
      data-magnet="0.6"
      className="group relative block overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/35 p-6 shadow-wire"
      style={{ "--px": "50%", "--py": "30%" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px 280px at var(--px) var(--py), rgba(255,106,139,0.20), transparent 62%), radial-gradient(420px 280px at calc(var(--px) + 14%) calc(var(--py) + 10%), rgba(106,228,255,0.16), transparent 64%)",
        }}
      />
      <div className="relative">
        <div className="kicker">INSTAGRAM PORTAL</div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-sm tracking-[0.22em] text-blueprint-ink/90">
            <TextScramble text="@ylexmedia" />
          </div>
          <div className="rounded border border-blueprint-line bg-blueprint-bg/55 px-3 py-2 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/60">
            FOLLOW → WATCH → DM
          </div>
        </div>

        {/* A little schematic lure line */}
        <svg viewBox="0 0 600 90" className="mt-5 h-16 w-full" aria-hidden="true">
          <path
            d="M10 45 H220 l40-24 36 44 40-20 h254"
            fill="none"
            stroke="rgba(214,228,255,0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="220" cy="45" r="4" fill="rgba(106,228,255,0.35)" />
          <circle cx="336" cy="45" r="4" fill="rgba(255,106,139,0.35)" />
          <path
            d="M560 30 l30 15-30 15"
            fill="none"
            stroke="rgba(106,228,255,0.40)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-warn/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </a>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-blueprint-line/70 pt-8">
      <div className="grid gap-4 md:grid-cols-2 md:items-end">
        <div className="font-mono text-[11px] tracking-[0.22em] text-blueprint-ink/55">
          © {year} Ylex Media. All rights reserved. No pixels were physically harmed in the production of this interface.
        </div>
        <div className="font-mono text-[11px] tracking-[0.22em] text-blueprint-ink/55 md:text-right">
          Warning: Side effects of working with us include sudden visibility, extreme brand envy, and an influx of
          notifications.
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blueprint-line bg-blueprint-bg/30 px-4 py-3 shadow-wire">
        <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/55">
          BUILD_STATUS: <span className="text-blueprint-neon/80">STABLE</span> • HUMOR_MODULE:{" "}
          <span className="text-blueprint-warn/75">ARMED</span>
        </div>
        <a
          href="#top"
          data-cursor="UP"
          data-magnet="0.65"
          className="rounded border border-blueprint-line bg-blueprint-bg/50 px-3 py-2 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/65 transition hover:bg-blueprint-bg/70 hover:text-blueprint-ink/90"
        >
          BACK_TO_TOP ↑
        </a>
      </div>
    </footer>
  );
}
