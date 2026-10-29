import { useState } from "react";
import { ArrowUpRight, Heart, Terminal, ArrowUp, Hash } from "lucide-react";
import { siZapier, siMake, siN8n, siAsana, siGoogle, siRender, siClaudecode, siGooglegemini, type SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";

const tools = [
  { name: "Zapier", href: "https://zapier.com", icon: siZapier },
  { name: "Make.com", href: "https://www.make.com", icon: siMake },
  { name: "n8n", href: "https://n8n.io", icon: siN8n },
  { name: "HighLevel", href: "https://www.gohighlevel.com", fallback: "highlevel" },
  { name: "Asana", href: "https://asana.com", icon: siAsana },
  { name: "Google Workspace", href: "https://workspace.google.com", icon: siGoogle },
  { name: "Slack", href: "https://slack.com", fallback: "slack" },
  { name: "Lovable", href: "https://lovable.dev", fallback: "lovable" },
  { name: "Render", href: "https://render.com", icon: siRender },
  { name: "Codex", href: "https://openai.com/codex", fallback: "codex" },
  { name: "Claude Code", href: "https://claude.com/product/claude-code", icon: siClaudecode },
  { name: "Gemini AI", href: "https://gemini.google.com", icon: siGooglegemini },
  { name: "Grok", href: "https://grok.com", fallback: "grok" },
];

function ToolIcon({ icon, fallback }: { icon?: SimpleIcon; fallback?: string }) {
  if (icon) return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg>;
  if (fallback === "lovable") return <Heart fill="currentColor" strokeWidth={0} aria-hidden="true" />;
  if (fallback === "codex") return <Terminal aria-hidden="true" />;
  if (fallback === "highlevel") return <ArrowUp strokeWidth={3} aria-hidden="true" />;
  if (fallback === "slack") return <Hash strokeWidth={4} aria-hidden="true" />;
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 2H22l-8.7 10.1L21 22h-6.1l-5.1-6.6L4.2 22H0l7.8-9.1L.5 3h6.2l4.6 6L17.8 2Zm-2 18h1.7L5.6 5H3.9L15.8 20Z" /></svg>;
}

export function ToolsDock() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="tools-section mx-auto max-w-6xl px-6 pb-16" aria-labelledby="tools-title">
      <div className="reveal">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="tools-title" className="font-mono text-xs uppercase tracking-widest text-primary">My toolkit</h2>
          <span className="text-xs text-muted-foreground">Automation · Operations · AI</span>
        </div>
        <nav aria-label="Tools I use" className="tools-dock glass">
          {tools.map((tool, i) => (
            <Button asChild variant="ghost" key={tool.name} className="tool-link press" onMouseEnter={() => setActive(tool.name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(tool.name)} onBlur={() => setActive(null)}>
              <a href={tool.href} target="_blank" rel="noreferrer" aria-label={tool.name} title={tool.name}>
                <span className={`tool-symbol tool-phase-${i % 3}`}><ToolIcon icon={tool.icon} fallback={tool.fallback} /></span>
                <span className="tool-label">{tool.name}</span>
              </a>
            </Button>
          ))}
        </nav>
        <div className="mt-4 flex h-5 items-center justify-center gap-2 text-xs text-muted-foreground" aria-hidden="true">
          {active && <>{active}<ArrowUpRight className="h-3 w-3" /></>}
        </div>
      </div>
    </section>
  );
}