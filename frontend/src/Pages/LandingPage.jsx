import React, { useState } from "react";

/**
 * SwipeX — Landing Page
 * "Midnight Aurora" visual system
 *
 * Stack: React (Vite) + Tailwind CSS only. No router, no sidebar, no forms.
 * Drop this component into any existing Vite + Tailwind app.
 *
 * Props are optional hooks for wiring up real auth flows later —
 * this component never manages auth state itself.
 */
export default function LandingPage({ onLoginClick, onRegisterClick, onGetStartedClick } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [swipeState, setSwipeState] = useState(null); // 'pass' | 'save' | 'apply' | null

  const handleLogin = () => (onLoginClick ? onLoginClick() : console.log("login:click"));
  const handleRegister = () => (onRegisterClick ? onRegisterClick() : console.log("register:click"));
  const handleGetStarted = () => (onGetStartedClick ? onGetStartedClick() : console.log("get-started:click"));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-slate-100 selection:bg-indigo-500/40 selection:text-white">
      {/* ================= PERSISTENT MIDNIGHT AURORA BACKDROP ================= */}
      <AuroraBackdrop />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">
        <NavBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />

        <Hero
          onGetStarted={handleGetStarted}
          swipeState={swipeState}
          setSwipeState={setSwipeState}
        />

        <LogoStrip />

        <Features />

        <HowItWorks />

        <Testimonials />

        <CTA onRegister={handleRegister} />

        <Footer />
      </div>

      {/* Local keyframes — kept self-contained, no Tailwind config changes required */}
      <style>{`
        @keyframes swipex-float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
        @keyframes swipex-pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
        @keyframes swipex-pulse-slow-2 {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.32; transform: scale(1.06); }
        }
        .swipex-float { animation: swipex-float 6s ease-in-out infinite; }
        .swipex-orb-1 { animation: swipex-pulse-slow 10s ease-in-out infinite; }
        .swipex-orb-2 { animation: swipex-pulse-slow-2 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .swipex-float, .swipex-orb-1, .swipex-orb-2 { animation: none; }
        }
      `}</style>
    </div>
  );
}

/* =========================================================================
   BACKDROP — base gradient + two persistent glow orbs, fixed across scroll
   ========================================================================= */
function AuroraBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(160deg,#030712_0%,#111827_35%,#1E1B4B_70%,#020617_100%)]">
      {/* purple glow orb */}
      <div
        className="swipex-orb-1 absolute -top-32 -left-40 h-[620px] w-[620px] rounded-full bg-[#7C3AED] opacity-25 blur-[140px]"
        aria-hidden="true"
      />
      {/* cyan glow orb */}
      <div
        className="swipex-orb-2 absolute bottom-[-10%] right-[-10%] h-[680px] w-[680px] rounded-full bg-[#06B6D4] opacity-20 blur-[160px]"
        aria-hidden="true"
      />
      {/* subtle vignette to keep edges rich and dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />
      {/* faint grid texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* =========================================================================
   NAV BAR
   ========================================================================= */
function NavBar({ mobileMenuOpen, setMobileMenuOpen, onLogin, onRegister }) {
  const links = ["Features", "How it works", "Testimonials"];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030712]/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#06B6D4] shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SwipeX</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onLogin}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(6,182,212,0.45)]"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="rounded-xl bg-[#6366F1] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(99,102,241,0.75)] hover:brightness-110"
          >
            Sign up free
          </button>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#030712]/90 px-6 py-5 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-slate-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={onLogin}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.45)]"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={onRegister}
                className="w-full rounded-xl bg-[#6366F1] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(99,102,241,0.75)]"
              >
                Sign up free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================================
   HERO — two column: copy + CTAs on left, floating job card on right
   ========================================================================= */
function Hero({ onGetStarted, swipeState, setSwipeState }) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-24">
      {/* LEFT: copy */}
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-medium text-slate-300">AI matching is live — 2.4M swipes this week</span>
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Swipe right on
          <br />
          <span className="bg-gradient-to-r from-[#818CF8] via-[#A78BFA] to-[#22D3EE] bg-clip-text text-transparent">
            your next role.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
          SwipeX reads your resume, learns what you actually want, and turns your job
          search into a stack of matches worth saying yes to. No cover letters. No cold
          applying into the void. Just swipe.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onGetStarted}
            className="group relative rounded-xl bg-[#6366F1] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.8)] hover:brightness-110"
          >
            Start swiping — it's free
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            See how it works
          </button>
        </div>

        <div className="mt-12 flex items-center gap-8">
          <Stat value="94%" label="match satisfaction" />
          <Stat value="3.1x" label="faster to offer" />
          <Stat value="12k+" label="companies hiring" />
        </div>
      </div>

      {/* RIGHT: floating glassmorphic job card */}
      <div className="relative flex justify-center lg:justify-end">
        {/* soft glow behind the card */}
        <div className="absolute h-72 w-72 rounded-full bg-[#7C3AED] opacity-30 blur-[100px]" aria-hidden="true" />

        <div className="swipex-float relative w-full max-w-sm -rotate-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-0">
          {/* card header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-900">
                G
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Google</p>
                <p className="text-xs text-slate-400">Mountain View, CA · Remote-friendly</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
              96% AI Match
            </span>
          </div>

          {/* role */}
          <h3 className="mt-5 text-2xl font-bold text-white">Frontend Engineer</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Build interfaces used by billions. React, TypeScript, and a design system
            that ships fast. Hybrid, L4–L5.
          </p>

          {/* tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["React", "TypeScript", "$165k–$220k", "Hybrid"].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* match bar */}
          <div className="mt-5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4]" />
            </div>
          </div>

          {/* swipe actions */}
          <div className="mt-6 flex items-center justify-center gap-5 border-t border-white/10 pt-5">
            <SwipeButton
              label="Pass"
              active={swipeState === "pass"}
              onClick={() => setSwipeState("pass")}
              colorClasses="hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:border-rose-400/60"
              activeClasses="border-rose-400/70 bg-rose-400/10 shadow-[0_0_25px_rgba(244,63,94,0.6)]"
            >
              <HeartIcon />
            </SwipeButton>

            <SwipeButton
              label="Save"
              active={swipeState === "save"}
              onClick={() => setSwipeState("save")}
              large
              colorClasses="hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:border-amber-400/60"
              activeClasses="border-amber-400/70 bg-amber-400/10 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
            >
              <StarIcon />
            </SwipeButton>

            <SwipeButton
              label="Apply"
              active={swipeState === "apply"}
              onClick={() => setSwipeState("apply")}
              colorClasses="hover:shadow-[0_0_25px_rgba(52,211,153,0.6)] hover:border-emerald-400/60"
              activeClasses="border-emerald-400/70 bg-emerald-400/10 shadow-[0_0_25px_rgba(52,211,153,0.6)]"
            >
              <CheckIcon />
            </SwipeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function SwipeButton({ children, label, active, onClick, large, colorClasses, activeClasses }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={[
        "flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300",
        large ? "h-14 w-14" : "h-11 w-11",
        colorClasses,
        active ? activeClasses : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function HeartIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.35 2 7.5 2 5.015 4.015 3 6.5 3c1.412 0 2.734.66 3.5 1.712C10.766 3.66 12.088 3 13.5 3 15.985 3 18 5.015 18 7.5c0 2.85-2.045 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003-.002.001a.75.75 0 01-.69 0l-.002-.001z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.454 1.405 1.02L10 15.591l4.069 2.485c.713.434 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* =========================================================================
   LOGO STRIP
   ========================================================================= */
function LogoStrip() {
  const companies = ["Google", "Stripe", "Figma", "Netflix", "Airbnb", "Notion"];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-500">
          Matching talent into roles at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((c) => (
            <span key={c} className="text-lg font-bold tracking-tight text-slate-500/70">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FEATURES
   ========================================================================= */
function Features() {
  const features = [
    {
      title: "AI resume reading",
      desc: "Upload once. SwipeX parses your experience and translates it into a match profile recruiters actually search for.",
      icon: "🧠",
      glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]",
    },
    {
      title: "Real-time match scoring",
      desc: "Every card comes with a live compatibility score, so you know exactly why a role showed up in your stack.",
      icon: "⚡",
      glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]",
    },
    {
      title: "One-swipe apply",
      desc: "Right swipe sends your profile straight to the hiring team. No forms, no re-typing your work history.",
      icon: "👆",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]",
    },
    {
      title: "Mutual match chat",
      desc: "When a recruiter swipes back, a conversation opens instantly — just like the apps you already use.",
      icon: "💬",
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
    },
    {
      title: "Salary transparency",
      desc: "Every card shows a real compensation range up front. No surprises three interviews in.",
      icon: "💰",
      glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]",
    },
    {
      title: "Privacy-first browsing",
      desc: "Browse anonymously until you choose to reveal your profile. Your current employer never sees a thing.",
      icon: "🛡️",
      glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Features"
        title="Everything a job search should have been"
        subtitle="SwipeX strips the friction out of finding work — one honest, well-matched card at a time."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className={`group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${f.glow}`}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-inset ring-white/10">
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   HOW IT WORKS
   ========================================================================= */
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Build your stack",
      desc: "Import your resume or LinkedIn in seconds. SwipeX builds a card for you and a queue of matches to review.",
    },
    {
      step: "02",
      title: "Swipe through matches",
      desc: "Heart to save, swipe right to apply, swipe left to pass. Your queue refines itself with every decision.",
    },
    {
      step: "03",
      title: "Match with recruiters",
      desc: "When interest is mutual, a chat opens instantly — no application black hole, no waiting weeks for a reply.",
    },
    {
      step: "04",
      title: "Land the interview",
      desc: "Schedule directly in-thread. SwipeX keeps every match, message, and offer in one place.",
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="How it works"
        title="From resume to offer, one swipe at a time"
        subtitle="A straightforward path — designed so the search takes minutes a day, not hours."
      />

      <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
                  {s.step}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent lg:block" />
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TESTIMONIALS
   ========================================================================= */
function Testimonials() {
  const testimonials = [
    {
      quote:
        "I matched with a design lead role in four days. The salary was on the card before I even swiped — that alone saved me weeks.",
      name: "Priya Nair",
      role: "Product Designer, matched at Figma",
      initials: "PN",
    },
    {
      quote:
        "Swiping past roles that weren't a fit felt oddly satisfying. By the end of the week my queue only had jobs I actually wanted.",
      name: "Marcus Webb",
      role: "Backend Engineer, matched at Stripe",
      initials: "MW",
    },
    {
      quote:
        "The mutual-match chat meant recruiters were already warm when they messaged me. No cold outreach, no generic templates.",
      name: "Aiko Tanaka",
      role: "Data Analyst, matched at Netflix",
      initials: "AT",
    },
  ];

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="People who swiped their way to an offer"
        subtitle="A few of the matches that turned into real roles."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
          >
            <p className="text-sm leading-relaxed text-slate-300">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4] text-xs font-bold text-white">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   CTA
   ========================================================================= */
function CTA({ onRegister }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center backdrop-blur-md sm:px-16">
        <div
          className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED] opacity-25 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-[#06B6D4] opacity-20 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your next match is already in the deck.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Join for free and start swiping through roles matched to what you actually want next.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onRegister}
              className="rounded-xl bg-[#6366F1] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.8)] hover:brightness-110"
            >
              Create your free account
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FOOTER
   ========================================================================= */
function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "How it works", "Pricing", "For recruiters"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Blog"],
    },
    {
      title: "Resources",
      links: ["Help center", "Guides", "API docs", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security"],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#06B6D4]">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-white">SwipeX</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-slate-500">
              AI-powered, swipe-based job discovery. Find work that matches you back.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} SwipeX, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {["Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="text-xs text-slate-600 transition-colors hover:text-slate-300">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   SHARED: Section heading
   ========================================================================= */
function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-slate-400">{subtitle}</p>
    </div>
  );
}