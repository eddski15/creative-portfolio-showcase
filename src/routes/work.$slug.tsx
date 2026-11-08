import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { works } from "@/lib/works";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const work = works.find((w) => w.slug === params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.work.t} — Case study · Edson Halili` : "Case study · Edson Halili";
    const d = loaderData?.work.problem ?? "Case study by Edson Halili";
    return { meta: [
      { title: t }, { name: "description", content: d },
      { property: "og:title", content: t }, { property: "og:description", content: d },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { work: w } = Route.useLoaderData();
  const idx = works.findIndex((x) => x.slug === w.slug);
  const next = works[(idx + 1) % works.length] ?? works[0]!;
  return (
    <div className="relative min-h-screen">
      <div className="orbs" aria-hidden><span /><span /><span /><span /></div>
      <header className="sticky top-0 z-20 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3">
          <Link to="/" className="link-lux font-display text-xl sm:text-2xl">Edson Halili</Link>
          <Link to="/" hash="works" className="link-lux flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All work</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{w.category} · {w.tag}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">{w.t}</h1>
        <p className="mt-4 text-muted-foreground">Role: <span className="text-foreground">{w.role}</span>{w.ongoing && " · In progress"}</p>
        <figure className="glass mt-10 overflow-hidden rounded-3xl p-2">
          <img src={w.img} alt={`${w.t} screenshot`} className="w-full rounded-2xl" />
        </figure>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <section><p className="font-mono text-xs uppercase tracking-widest text-primary">01 — Problem</p><p className="mt-3 text-lg">{w.problem}</p></section>
          <section><p className="font-mono text-xs uppercase tracking-widest text-primary">02 — Process</p>
            <ol className="mt-3 space-y-2 text-muted-foreground">{w.process.map((p, i) => <li key={p} className="flex gap-3"><span className="text-primary">{i + 1}.</span>{p}</li>)}</ol>
          </section>
          <section><p className="font-mono text-xs uppercase tracking-widest text-primary">03 — Solution</p><p className="mt-3 text-lg">{w.solution}</p></section>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <Button asChild className="btn-lux hero-primary h-12 rounded-full px-7"><Link to="/" hash="contact">Start a similar project</Link></Button>
          <Link to="/work/$slug" params={{ slug: next.slug }} className="link-lux text-sm text-muted-foreground hover:text-foreground">Next: {next.t} →</Link>
        </div>
      </main>
    </div>
  );
}
