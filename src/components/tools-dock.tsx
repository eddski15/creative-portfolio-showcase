import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siZapier, siMake, siN8n, siAsana, siGoogle, siRender, siClaudecode, siGooglegemini, type SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { aiBrandPaths } from "@/components/ai-brand-paths";

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

function ToolIcon({ icon, fallback }: { icon: SimpleIcon | undefined; fallback: string | undefined }) {
  if (icon) return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg>;
  if (fallback === "highlevel") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M4 22V12m-3 3 3-3 3 3M12 22V7m-3 3 3-3 3 3M20 22V2m-3 3 3-3 3 3" /></svg>;
  if (fallback === "slack") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="8" width="10" height="4" rx="2" /><rect x="8" y="2" width="4" height="10" rx="2" /><rect x="12" y="12" width="10" height="4" rx="2" /><rect x="12" y="12" width="4" height="10" rx="2" /><path d="M6 6H4a2 2 0 1 1 2-2v2Zm12 0V4a2 2 0 1 1 2 2h-2Zm0 12h2a2 2 0 1 1-2 2v-2ZM6 18v2a2 2 0 1 1-2-2h2Z" /></svg>;
  const path = fallback === "codex" ? aiBrandPaths.codex : fallback === "lovable" ? aiBrandPaths.lovable : aiBrandPaths.grok;
  return <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true"><path d={path} /></svg>;
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
          {tools.map((tool) => (
            <Button asChild variant="ghost" key={tool.name} className="tool-link press" onMouseEnter={() => setActive(tool.name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(tool.name)} onBlur={() => setActive(null)}>
              <a href={tool.href} target="_blank" rel="noreferrer" aria-label={tool.name} title={tool.name}>
                <span className="tool-symbol"><ToolIcon icon={tool.icon} fallback={tool.fallback} /></span>
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