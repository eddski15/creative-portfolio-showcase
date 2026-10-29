import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import salesImg from "@/assets/n8n-200815.png.asset.json";
import agentImg from "@/assets/n8n-201520.png.asset.json";
import reportsImg from "@/assets/n8n-201638.png.asset.json";
import weeklyImg from "@/assets/n8n-202148.png.asset.json";

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
    role: "Branch Administrative Assistant", co: "Mercury Drug Corp.", when: "Dec 2024 — Jul 2026",
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

const works = [
  { t: "Sales Data Pipeline", tag: "n8n · HTTP · CSV", img: salesImg.url, d: "Pulls sales data, totals each order and splits into 3 branches: order data to the warehouse, a regional analysis to finance, and a CSV report to the manager." },
  { t: "AI Customer & Sales Agent", tag: "n8n · AI Agent · Gemini", img: agentImg.url, d: "A chat-based AI agent with memory that looks up customers and orders on its own, then answers with a full customer list and total sales report." },
  { t: "Automated Report Generation", tag: "n8n · Merge · Discord", img: reportsImg.url, d: "Merges order and customer data, calculates totals, builds a Europe-only CSV and regional summaries, then posts results to a Discord channel." },
  { t: "Weekly Order Status Workflow", tag: "n8n · Schedule · Discord", img: weeklyImg.url, d: "Runs every Monday at 9AM: fetches warehouse data, checks order status, updates customer records and sends booked order totals to Discord." },
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
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 border-t">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
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
    <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="press grid h-9 w-9 place-items-center rounded-full border hover:bg-secondary">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Index() {
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
    <div className="min-h-screen">
      <div className="scroll-progress" aria-hidden />
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-xl">Edson<span className="text-primary">.</span></a>
          <div className="flex items-center gap-6">
            <div className="hidden gap-6 text-sm text-muted-foreground md:flex">
              {["services", "experience", "works", "testimonials", "contact"].map((s) => (
                <a key={s} href={`#${s}`} className="capitalize transition-colors hover:text-foreground">{s}</a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section id="top" className="hero-glow">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:pt-36">
          <Reveal><p className="font-mono text-xs uppercase tracking-widest text-primary">AI Automation Systems Specialist · Los Baños, PH</p></Reveal>
          <Reveal i={1}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
              I help business owners stop <em className="text-primary">drowning</em> in repetitive work.
            </h1>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
              17+ years running high-volume operations, data and inventory for one of the largest enterprises in the Philippines — now building AI workflows that save hours, cut errors and lower overhead.
            </p>
          </Reveal>
          <Reveal i={3} className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="press rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Book a workflow audit</a>
            <a href="#works" className="press rounded-full border px-6 py-3 font-semibold hover:bg-secondary">See my work</a>
          </Reveal>
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[["17+", "Years in operations"], ["100%", "Stock precision"], ["5", "Certifications"], ["BS IT", "LSPU Los Baños"]].map(([n, l], i) => (
              <Reveal key={l} i={i + 4}>
                <p className="font-display text-4xl text-primary">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section id="services" label="01 — Services" title="What I do best">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.t} i={i}>
              <div className="lift h-full rounded-xl border bg-card p-8">
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="experience" label="02 — Experience" title="17 years, 11 months at Mercury Drug">
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
                {certs.map((c) => <span key={c} className="rounded-full border px-3 py-1 text-sm">{c}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="works" label="03 — Previous works" title="Workflows I've built in n8n">
        <div className="grid gap-5 md:grid-cols-2">
          {works.map((w, i) => (
            <Reveal key={w.t} i={i}>
              <a href={w.img} target="_blank" rel="noreferrer" className="lift press group block h-full overflow-hidden rounded-xl border bg-card">
                <div className="aspect-[16/9] overflow-hidden border-b bg-muted">
                  <img src={w.img} alt={`${w.t} workflow in n8n`} loading="lazy" className="zoom h-full w-full object-cover object-left-top" />
                </div>
                <div className="p-8">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">{w.tag}</p>
                  <h3 className="mt-3 font-display text-2xl">{w.t}</h3>
                  <p className="mt-3 text-muted-foreground">{w.d}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="testimonials" label="04 — Testimonials" title="Kind words">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} i={i}>
              <figure className="h-full rounded-xl border bg-card p-8">
                <blockquote className="font-display text-xl leading-snug">“{t.q}”</blockquote>
                <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.n}</span><span className="text-muted-foreground"> · {t.r}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="contact" label="05 — Contact" title="Let's automate your bottlenecks">
        <Reveal className="grid gap-5 md:grid-cols-3">
          {[
            ["Email", "edsonhalili@gmail.com", "mailto:edsonhalili@gmail.com"],
            ["Mobile", "0949 347 7934", "tel:09493477934"],
            ["LinkedIn", "in/edson-halili", "https://www.linkedin.com/in/edson-halili"],
          ].map(([l, v, h]) => (
            <a key={l} href={h} target={l === "LinkedIn" ? "_blank" : undefined} rel="noreferrer" className="lift block rounded-xl border bg-card p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
              <p className="mt-3 font-display text-xl break-all">{v}</p>
            </a>
          ))}
        </Reveal>
      </Section>

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © 2026 Edson Halili · Los Baños, Laguna, Philippines
      </footer>
    </div>
  );
}
