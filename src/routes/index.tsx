import { createFileRoute, Link } from "@tanstack/react-router";
import { works, workCategories } from "@/lib/works";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolsDock } from "@/components/tools-dock";
import { LivingCard, CursorTrail } from "@/components/living-card";
import portraitImg from "@/assets/edson-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edson Halili — AI Automation Systems Specialist" },
      { name: "description", content: "Edson Halili builds AI workflows that remove bottlenecks, cut errors and save hours — backed by 17+ years of enterprise operations." },
      { property: "og:title", content: "Edson Halili — AI Automation Systems Specialist" },
      { property: "og:description", content: "Workflow audits, AI integration, data & inventory automation, and AI-powered executive support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { t: "Workflow Audit", d: "I study how your business actually runs day-to-day and pinpoint what should be automated first." },
  { t: "AI Integration", d: "Connecting the tools you already use to handle data, scheduling and customer outreach on autopilot." },
  { t: "Data & Inventory Automation", d: "No more manual stock counts or spreadsheet errors — systems that track every unit for you." },
  { t: "Executive Support", d: "High-level admin strategy, built for speed with AI agents, LLMs and smart workflows." },
];

const experience = [
  {
    role: "Data Operations Analyst / Inventory Control Analyst", co: "Mercury Drug Corp.", when: "Dec 2024 — Jul 2026",
    pts: [
      "Audited and streamlined daily operational workflows with the Branch Manager to speed up stock movement and sales.",
      "Oversaw high-volume data recording, accounts receivable and digital filing with 100% data integrity.",
      "Analyzed merchandise and supply chain reports to keep inventory lean and remove bottlenecks.",
      "Primary liaison between management, internal teams and external suppliers.",
    ],
  },
  {
    role: "Pharmacy Assistant", co: "Mercury Drug Corp.", when: "Sep 2008 — Nov 2024",
    pts: [
      "Prevented stockouts with real-time inventory tracking down to the last unit.",
      "Targeted zero expiry loss through early-expiry monitoring and proactive stock rotation.",
      "Grew branch revenue through proactive customer outreach and repeat refills.",
      "Earned 16 years of customer loyalty through personalized, high-touch service.",
    ],
  },
];

const testimonials = [
  { q: "Edson saw exactly where our process was leaking time. Within weeks our follow-ups ran themselves.", n: "Client name", r: "Small business owner" },
  { q: "Reliable, detail-obsessed and calm under pressure. His inventory work was always spot on.", n: "Client name", r: "Former colleague" },
  { q: "He doesn't just add tools — he builds a system that actually fits how we work.", n: "Client name", r: "Operations lead" },
];

const certs = ["AI Operator", "AI for Project Managers", "Zapier Automation", "HighLevel CRM Full Training", "GoHighLevel Workshop"];

function Reveal({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ "--i": i } as CSSProperties}>{children}</div>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="portfolio-section mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" className="btn-lux shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium" aria-live="polite"
      onClick={async () => { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600); }}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
    setTimeout(() => root.classList.remove("theme-anim"), 300);
  };
  return (
    <Button variant="ghost" size="icon" onClick={toggle} title={dark ? "Switch to light mode" : "Switch to dark mode"} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="press glass shrink-0 rounded-full">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function WorkGrid() {
  const [cat, setCat] = useState<(typeof workCategories)[number]>("All");
  const list = works.filter((w) => cat === "All" || w.category === cat);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {workCategories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`btn-lux press rounded-full border px-4 py-2 text-sm ${cat === c ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <Link key={w.slug} to="/work/$slug" params={{ slug: w.slug }} className="work-card group glass block overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={w.img} alt={`${w.t} preview`} loading="lazy" className="zoom h-full w-full object-cover object-left-top" />
              <div className="work-overlay absolute inset-0 flex flex-col justify-end p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{w.role}</p>
                <h3 className="mt-2 font-display text-2xl text-card-foreground">{w.t}</h3>
                <p className="mt-2 text-sm text-card-foreground">View case study →</p>
              </div>
              {w.ongoing && <span className="absolute left-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">In progress</span>}
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <p className="min-w-0 truncate font-medium">{w.t}</p>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{w.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onDown = (ev: PointerEvent) => {
      if (reduce) return;
      const el = (ev.target as HTMLElement).closest<HTMLElement>(".press");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const s = document.createElement("span");
      s.className = "ripple";
      Object.assign(s.style, { width: `${size}px`, height: `${size}px`, left: `${ev.clientX - r.left}px`, top: `${ev.clientY - r.top}px` });
      el.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    };
    document.addEventListener("pointerdown", onDown);
    return () => { io.disconnect(); document.removeEventListener("pointerdown", onDown); };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="orbs" aria-hidden><span /><span /><span /><span /></div>
      <div className="scroll-progress" aria-hidden />
      <CursorTrail />
      <header className="sticky top-0 z-20 px-4 pt-4">
        <nav className="glass mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-5 py-3 md:flex md:justify-between">
          <a href="#top" className="link-lux min-w-0 truncate font-display text-xl sm:text-2xl">Edson Halili</a>
          <div className="flex shrink-0 items-center gap-2 md:gap-6">
            <div className="hidden gap-6 text-sm text-muted-foreground md:flex">
              {[["Home","top"],["Work","works"],["About","experience"],["Contact","contact"]].map(([n,id]) => (
                <a key={id} href={`#${id}`} className="link-lux hover:text-foreground">{n}</a>
              ))}
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="glass absolute left-4 right-4 top-full mt-2 grid gap-1 rounded-2xl p-3 md:hidden">
          {[["Home","top"],["Work","works"],["About","experience"],["Contact","contact"]].map(([n,id]) => <Button key={id} asChild variant="ghost" className="justify-start" onClick={() => setMenuOpen(false)}><a href={`#${id}`}>{n}</a></Button>)}
        </nav>}
      </header>

      <section id="top" className="hero-glow">
        <div className="hero-inner mx-auto max-w-6xl px-6">
          <div className="hero-layout grid items-center">
            <div className="hero-copy min-w-0">
              <Reveal><p className="font-mono text-xs uppercase tracking-widest text-primary">AI Automation Systems Specialist · Los Baños, PH</p></Reveal>
              <Reveal i={1}>
                <h1 className="hero-title mt-5 max-w-4xl font-display">
                  I give your business back the hours lost to <em className="text-primary">manual work</em>.
                </h1>
              </Reveal>
              <Reveal i={2}>
                <p className="hero-description mt-6 max-w-2xl text-base text-muted-foreground lg:text-lg">
                  I design AI automations that run your follow-ups, reports, inventory and data entry for you — so your team stops copy-pasting and starts growing. Backed by 17+ years running high-volume operations for one of the largest enterprises in the Philippines.
                </p>
              </Reveal>
              <Reveal i={3}>
                <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                  {["Fewer errors in your data and stock", "Reports that build and send themselves", "Customer replies handled by AI, 24/7", "All your tools connected in one flow"].map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-primary">✓</span>{b}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal i={4} className="hero-actions mt-8 flex flex-wrap gap-3">
                <Button asChild className="btn-lux hero-primary h-12 rounded-full px-7 font-medium"><a href="#contact">Book a free workflow audit</a></Button>
                <Button asChild variant="outline" className="btn-lux h-12 rounded-full bg-transparent px-7 font-medium"><a href="#works">See my work</a></Button>
              </Reveal>
            </div>
            <Reveal i={5} className="hero-portrait justify-self-center">
              <LivingCard max={10} className="rounded-3xl">
                <div className="press glass relative w-full overflow-hidden rounded-3xl p-2">
                  <img src={portraitImg} alt="Edson Halili" className="aspect-[4/5] w-full rounded-2xl object-cover" />
                </div>
              </LivingCard>
            </Reveal>
          </div>
          <div className="hero-stats grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
            {[["17+", "Years in operations"], ["100%", "Stock precision"], ["5", "Certifications"]].map(([n, l], i) => (
              <Reveal key={l} i={i + 6}>
                <p className="font-display text-3xl text-primary sm:text-4xl">{n}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section id="services" label="01 — Services" title="What I do best">
        <div className="bento bento-3">
          {services.map((s, i) => (
            <Reveal key={s.t} i={i} className={i === 0 || i === 3 ? "bento-wide" : ""}>
              <LivingCard><div className="lift h-full glass rounded-2xl p-8">
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </div></LivingCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="experience" label="02 — Experience" title="Career journey">
        <div className="space-y-12">
          {experience.map((e, i) => (
            <Reveal key={e.role} i={i} className="grid gap-6 md:grid-cols-[240px_1fr]">
              <div>
                <p className="font-mono text-sm text-primary">{e.when}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.co}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl">{e.role}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {e.pts.map((p) => <li key={p} className="flex gap-3"><span className="text-primary">→</span>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="grid gap-6 md:grid-cols-[240px_1fr]">
            <p className="font-mono text-sm text-primary">Education & Certs</p>
            <div>
              <h3 className="font-display text-2xl">BS Information Technology</h3>
              <p className="text-muted-foreground">Laguna State Polytechnic University — Los Baños</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certs.map((c) => <span key={c} className="glass rounded-full px-3 py-1 text-sm">{c}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ToolsDock />

      <Section id="works" label="03 — Previous works" title="Workflows I've built — and my ongoing build">
        <WorkGrid />
      </Section>

      <Section id="testimonials" label="04 — Testimonials" title="Kind words">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} i={i}>
              <LivingCard><figure className="h-full glass rounded-2xl p-8">
                <blockquote className="font-display text-xl leading-snug">“{t.q}”</blockquote>
                <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.n}</span><span className="text-muted-foreground"> · {t.r}</span></figcaption>
              </figure></LivingCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="contact" label="05 — Contact" title="Let's automate your bottlenecks">
        <Reveal><p className="max-w-2xl text-lg text-muted-foreground">Tell me where your team loses time. I reply within one business day with where automation can help first.</p></Reveal>
        <Reveal className="mt-10 overflow-hidden rounded-2xl border">
          {[
            ["Email", "edsonhalili@gmail.com", "mailto:edsonhalili@gmail.com"],
            ["Mobile / Messaging", "0949 347 7934", "tel:09493477934"],
            ["LinkedIn", "in/edson-halili", "https://www.linkedin.com/in/edson-halili"],
          ].map(([l, v, h]) => (
            <div key={l} className="contact-row flex items-center gap-4 border-b px-6 py-6 last:border-b-0 sm:px-8">
              <a href={h} target={l === "LinkedIn" ? "_blank" : undefined} rel="noreferrer" className="link-lux flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">{l}</span>
                <span className="min-w-0 font-display text-xl [overflow-wrap:anywhere] sm:text-3xl">{v}</span>
              </a>
              {l === "Email" && <CopyButton value={v ?? ""} />}
              <span className="arrow shrink-0 text-xl text-primary" aria-hidden>↗</span>
            </div>
          ))}
        </Reveal>
      </Section>

      <footer className="py-10 text-center text-sm text-muted-foreground">
        © 2026 Edson Halili · Los Baños, Laguna, Philippines
      </footer>
    </div>
  );
}
