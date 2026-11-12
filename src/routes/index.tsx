import { certifications } from "@/lib/certifications";
import { createFileRoute, Link } from "@tanstack/react-router";
import { works, workCategories } from "@/lib/works";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/components/booking-calendar";
import { ResultsGrid, PackagesGrid, FaqList } from "@/components/offer-sections";
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
  { t: "Workflow Audit", tag: "Find", flow: ["Your process", "Bottleneck map", "Priority plan"], d: "I study how your business actually runs day-to-day and pinpoint what should be automated first." },
  { t: "AI Integration", tag: "Connect", flow: ["Inbox & CRM", "AI agent", "Auto replies"], d: "Connecting the tools you already use to handle data, scheduling and customer outreach on autopilot." },
  { t: "Data & Inventory Automation", tag: "Track", flow: ["Stock data", "Checks", "Live report"], d: "No more manual stock counts or spreadsheet errors — systems that track every unit for you." },
  { t: "Executive Support", tag: "Lead", flow: ["Requests", "AI assist", "Done"], d: "High-level admin strategy, built for speed with AI agents, LLMs and smart workflows." },
];

const experience = [
  {
    role: "Data Operations Analyst / Inventory Control Analyst", co: "Mercury Drug Corp.", when: "Dec 2024 — Jul 2026", scope: "Branch operations & data", wins: ["100% data integrity", "Leaner inventory", "Supplier liaison"],
    pts: [
      "Audited and streamlined daily operational workflows with the Branch Manager to speed up stock movement and sales.",
      "Oversaw high-volume data recording, accounts receivable and digital filing with 100% data integrity.",
      "Analyzed merchandise and supply chain reports to keep inventory lean and remove bottlenecks.",
      "Primary liaison between management, internal teams and external suppliers.",
    ],
  },
  {
    role: "Pharmacy Assistant", co: "Mercury Drug Corp.", when: "Sep 2008 — Nov 2024", scope: "High-volume retail pharmacy", wins: ["Zero-expiry-loss target", "Real-time stock tracking", "16 yrs customer loyalty"],
    pts: [
      "Prevented stockouts with real-time inventory tracking down to the last unit.",
      "Targeted zero expiry loss through early-expiry monitoring and proactive stock rotation.",
      "Grew branch revenue through proactive customer outreach and repeat refills.",
      "Earned 16 years of customer loyalty through personalized, high-touch service.",
    ],
  },
];

const testimonials = [
  { q: "Edson saw exactly where our process was leaking time. Within weeks our follow-ups ran themselves.", n: "Luzviminda de Mesa", r: "MDC 364 - Branch Manager" },
  { q: "Reliable, detail-obsessed and calm under pressure. His inventory work was always spot on.", n: "Ardi Nil Driz", r: "MDC 75 - Branch Manager" },
  { q: "He doesn't just add tools — he builds a system that actually fits how we work.", n: "Leo Ante", r: "MDC 45 - Branch Manager" },
];

const certs = ["AI Operator", "AI for Project Managers", "Zapier Automation", "HighLevel CRM Full Training", "GoHighLevel Workshop"];

function Reveal({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ "--i": i } as CSSProperties}>{children}</div>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="portfolio-section mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-6 md:py-20 lg:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
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
      <div className="filter-bar glass mb-8 flex w-fit max-w-full flex-wrap gap-1 rounded-full p-1.5" role="tablist" aria-label="Filter projects">
        {workCategories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`btn-lux press min-h-10 rounded-full border border-transparent px-4 py-2 text-sm ${cat === c ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
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
              <span className="metric-chip shrink-0">{w.category}</span>
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
              <Reveal><p className="status-pill"><span className="status-dot" aria-hidden />Available for new automation projects · Los Baños, PH</p></Reveal>
              <Reveal i={1}>
                <h1 className="hero-title mt-5 max-w-4xl font-display">
                  Cut operational cycle times by <em className="text-primary">up to 80%</em> with audit-ready AI workflows.
                </h1>
              </Reveal>
              <Reveal i={2}>
                <p className="hero-description mt-6 max-w-2xl text-base text-muted-foreground lg:text-lg">
                  I turn manual handoffs between your CRM, ERP, inbox and spreadsheets into reliable n8n and AI pipelines — built with the zero-error data discipline from 17+ years running high-volume operations at Mercury Drug Corp.
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
                <Button asChild className="btn-lux hero-primary h-12 rounded-full px-7 font-medium"><a href="#contact">Book a workflow audit →</a></Button>
                <Button asChild variant="outline" className="btn-lux h-12 rounded-full bg-transparent px-7 font-medium"><a href="#works">Explore my workflows</a></Button>
              </Reveal>
            </div>
            <Reveal i={5} className="hero-portrait justify-self-center">
              <LivingCard max={10} className="rounded-3xl">
                <div className="press glass relative w-full overflow-hidden rounded-3xl p-2">
                  <img src={portraitImg} alt="Edson Halili" className="aspect-[4/5] w-full rounded-2xl object-cover" />
                </div>
                <div className="proof-node glass" aria-label="Example automation flow">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Example flow · live</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs font-medium"><span>Inbound lead</span><span className="text-primary">→</span><span>Gemini AI triage</span><span className="text-primary">→</span><span>CRM logged &amp; call booked</span></p>
                </div>
                <div className="cred-chip glass"><span className="font-display text-lg text-primary">17+</span><span className="text-[11px] leading-tight text-muted-foreground">yrs enterprise ops<br />9 verified certs</span></div>
              </LivingCard>
            </Reveal>
          </div>
          <div className="hero-stats grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
            {[["17+", "Years in operations"], ["100%", "Stock precision"], ["9", "Certifications"]].map(([n, l], i) => (
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
                <div className="flex items-center justify-between gap-3"><p className="font-mono text-sm text-accent">0{i + 1}</p><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.tag}</span></div>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl">{s.t}</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">{s.d}</p>
                <div className="pipeline mt-6" aria-hidden>{s.flow.map((f, k) => <span key={f} className="pipe-step" style={{ "--k": k } as CSSProperties}>{f}</span>)}</div>
              </div></LivingCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="experience" label="02 — Experience" title="Career journey">
        <ol className="timeline">
          {experience.map((e, i) => (
            <Reveal key={e.role} i={i} className="tl-item">
              <span className="tl-node font-mono" aria-hidden>0{i + 1}</span>
              <div className="tl-era">
                <p className="font-mono text-sm text-primary">{e.when}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.co}</p>
                <span className="mt-3 inline-block rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">{e.scope}</span>
              </div>
              <div className="glass tl-card rounded-2xl">
                <h3 className="font-display text-2xl sm:text-3xl">{e.role}</h3>
                <div className="mt-4 flex flex-wrap gap-2">{e.wins.map((w) => <span key={w} className="metric-chip">{w}</span>)}</div>
                <ul className="mt-5 space-y-2 text-muted-foreground">
                  {e.pts.map((p) => <li key={p} className="flex gap-3"><span className="text-primary">→</span>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="tl-item">
            <span className="tl-node font-mono" aria-hidden>03</span>
            <div className="tl-era"><p className="font-mono text-sm text-primary">Education & Certs</p></div>
            <div className="glass tl-card rounded-2xl">
              <h3 className="font-display text-2xl sm:text-3xl">BS Information Technology</h3>
              <p className="text-muted-foreground">Laguna State Polytechnic University — Los Baños</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certs.map((c) => <span key={c} className="rounded-full border border-border px-3 py-1 text-sm">{c}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal className="tl-bridge">
            <p className="font-display text-2xl sm:text-3xl">From <em className="text-primary">physical inventory discipline</em> to autonomous AI systems.</p>
            <p className="mt-2 text-sm text-muted-foreground">The same accuracy that kept every unit counted now powers the workflows I build.</p>
          </Reveal>
        </ol>
      </Section>

      <ToolsDock />

      <Section id="works" label="03 — Previous works" title="Workflows I've built — and my ongoing build">
        <WorkGrid />
      </Section>

      <Section id="results" label="04 — Real results" title="What these systems deliver">
        <ResultsGrid />
      </Section>

      <Section id="certifications" label="05 — Certifications" title="Verified credentials & skills">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.url} i={i % 3}>
              <LivingCard className="h-full"><article className="glass flex h-full flex-col rounded-2xl p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{c.issuer} · {c.date}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.learning}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => <li key={s} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{s}</li>)}
                </ul>
                <a href={c.url} target="_blank" rel="noreferrer" className="link-lux mt-auto pt-5 text-sm font-medium text-primary">Verify credential ↗</a>
              </article></LivingCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="testimonials" label="06 — Testimonials" title="Kind words">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} i={i}>
              <LivingCard className="h-full"><figure className="quote-card h-full glass flex flex-col rounded-2xl p-8">
                <div className="flex items-center justify-between"><span className="font-display text-5xl leading-none text-primary" aria-hidden>“</span><span className="metric-chip">{t.r.split(" - ")[0]}</span></div>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug sm:text-2xl">{t.q}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-sm"><span className="block font-semibold">{t.n}</span><span className="text-muted-foreground">{t.r.split(" - ")[1]}</span></figcaption>
              </figure></LivingCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="packages" label="07 — Packages" title="Pricing & packages">
        <PackagesGrid />
      </Section>

      <Section id="faq" label="08 — FAQ" title="Questions & answers">
        <FaqList />
      </Section>

      <Section id="contact" label="09 — Contact" title="Book a discovery call">
        <Reveal className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-2xl text-lg text-muted-foreground">Choose the system you want built, then pick a time for a free discovery call.</p>
          <ol className="grid gap-2 text-sm">{["We map your current workflow", "I flag the biggest time leaks", "You leave with a clear next step"].map((x, k) => <li key={x} className="flex gap-3"><span className="font-mono text-primary">0{k + 1}</span>{x}</li>)}</ol>
        </Reveal>
        <BookingCalendar />
      </Section>

      <footer className="py-10 text-center text-sm text-muted-foreground">
        © 2026 Edson Halili · Los Baños, Laguna, Philippines ·{" "}
        <a href="https://www.linkedin.com/in/edson-halili" target="_blank" rel="noreferrer" className="link-lux text-foreground">LinkedIn ↗</a>
      </footer>
    </div>
  );
}
