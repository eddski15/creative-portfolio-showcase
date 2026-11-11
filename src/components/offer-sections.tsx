import { Check } from "lucide-react";

export const results = [
  { m: "100%", h: "Manual copy-paste removed", ref: "Sales Data Pipeline", d: "Orders route automatically to warehouse, finance and management — no hand-built files." },
  { m: "Seconds", h: "Customer & sales answers", ref: "AI Customer & Sales Agent", d: "An agent with memory looks up customers and orders on its own instead of manual searching." },
  { m: "0 hrs", h: "Spent building reports", ref: "Automated Report Generation", d: "Regional summaries and CSVs build themselves and land in Discord on time." },
  { m: "Weekly", h: "Records always current", ref: "Weekly Order Status Workflow", d: "Every Monday 9AM, statuses and customer records sync before anyone has to ask." },
  { m: "Clear brief", h: "From discovery to plan", ref: "ProcessPilot AI", d: "Guided interviews turn messy processes into an implementation brief to build from." },
];

export const packages = [
  { n: "Workflow Discovery & Blueprint", p: "$850", t: "3–5 business days", fit: "You know work is manual but not where automation pays off first.",
    items: ["Audit of your tools and repetitive tasks", "Bottleneck scorecard with ROI estimate", "Step-by-step automation blueprint", "Tool recommendation: n8n, Make or Zapier"] },
  { n: "Core Automation Sprint", p: "$2,800–$4,200", t: "2–3 weeks", popular: true, fit: "One high-friction process you want automated end to end.",
    items: ["Production-ready n8n or Make workflow", "Routing, validation and error handling", "Slack, Discord or email alerts", "Team walkthrough + recorded docs", "14 days post-launch monitoring"] },
  { n: "Full Operations Engine", p: "From $5,500", t: "4–6 weeks or $2,500/mo", fit: "Multi-system pipelines and AI agents with ongoing optimization.",
    items: ["Multi-platform pipelines & CRM sync", "AI agents with memory and tools", "Scheduled reporting & reconciliation", "Priority support and monthly audits"] },
];

export const faqs = [
  { q: "How fast will our first automation be live?", a: "Most single-workflow sprints go live in 10–14 days. The core data flow is prototyped in the first 48 hours so you can test with real data early." },
  { q: "Do we need to replace our current software?", a: "No. I connect the tools you already use — Google Workspace, Asana, Slack, HighLevel, databases and more." },
  { q: "Why n8n instead of Zapier?", a: "Zapier is great for simple triggers. n8n handles multi-branch logic, data transformation and self-hosting, and costs far less at scale." },
  { q: "How is our data kept secure?", a: "Credentials and data stay in your own accounts or self-hosted environment. I don't store client data on my servers." },
  { q: "What if something breaks later?", a: "Every workflow includes error catches and instant alerts so nothing fails silently, plus monitoring and documentation for your team." },
  { q: "Can we talk through our workflow first?", a: "Yes — pick a service below and book a 15- or 30-minute discovery call." },
];

export function ResultsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((r) => (
        <div key={r.ref} className="glass rounded-2xl p-7">
          <p className="font-display text-4xl text-primary">{r.m}</p>
          <h3 className="mt-3 text-lg font-medium">{r.h}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          <p className="mt-4 font-mono text-xs text-accent">{r.ref}</p>
        </div>
      ))}
    </div>
  );
}

export function PackagesGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {packages.map((p) => (
        <div key={p.n} className={`glass flex flex-col rounded-2xl p-7 ${p.popular ? "ring-2 ring-primary" : ""}`}>
          {p.popular && <span className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Most popular</span>}
          <h3 className="font-display text-2xl">{p.n}</h3>
          <p className="mt-3 font-display text-3xl text-primary">{p.p}</p>
          <p className="mt-1 text-xs text-muted-foreground">{p.t}</p>
          <p className="mt-4 text-sm text-muted-foreground">{p.fit}</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {p.items.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{i}</li>)}
          </ul>
          <a href="#contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Book a discovery call</a>
        </div>
      ))}
    </div>
  );
}

export function FaqList() {
  return (
    <div className="glass divide-y divide-border rounded-2xl">
      {faqs.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {f.q}<span className="text-xl text-primary transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
