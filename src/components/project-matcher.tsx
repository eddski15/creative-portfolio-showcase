import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Copy, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recommendServices } from "@/lib/project-match.functions";

type Result = { summary: string; recommendations: { service: string; reason: string }[]; subject: string; inquiry: string };

export function ProjectMatcher() {
  const run = useServerFn(recommendServices);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 20) { setError("Please describe your project in at least a sentence or two."); return; }
    setLoading(true); setError(null);
    try {
      const res = await run({ data: { description: text } });
      if (res.ok) { setResult(res.data); setDraft(res.data.inquiry); } else setError(res.error);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const copy = async () => { await navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const mailto = result ? `mailto:edsonhalili@gmail.com?subject=${encodeURIComponent(result.subject)}&body=${encodeURIComponent(draft)}` : "#";

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8">
        <label htmlFor="project-desc" className="font-display text-2xl">Tell me about your project</label>
        <p className="mt-2 text-sm text-muted-foreground">Describe what's slowing your business down. AI will suggest the best-fit services and draft an inquiry you can send.</p>
        <textarea id="project-desc" value={text} onChange={(e) => setText(e.target.value)} maxLength={2000} rows={7}
          placeholder="e.g. We run 3 pharmacy branches and track stock in spreadsheets. Reorders are often late and our weekly sales report takes a full day..."
          className="mt-5 w-full resize-y rounded-xl border border-input bg-background/60 p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground tabular-nums">{text.length}/2000</span>
          <Button type="submit" disabled={loading} className="press h-11 rounded-full px-6 font-semibold">
            <Sparkles className="h-4 w-4" />{loading ? "Thinking…" : "Get recommendations"}
          </Button>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      </form>

      <div className="glass rounded-2xl p-6 sm:p-8" aria-live="polite">
        {!result ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-muted-foreground">
            <Sparkles className="h-6 w-6 text-primary" />
            <p className="mt-3 text-sm">{loading ? "Matching your project to the right services…" : "Your recommendations and draft inquiry will appear here."}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
            <ul className="mt-4 space-y-3">
              {result.recommendations.map((r) => (
                <li key={r.service} className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-display text-lg text-primary">{r.service}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.reason}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Draft inquiry · {result.subject}</p>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={9} aria-label="Draft inquiry"
              className="mt-2 w-full resize-y rounded-xl border border-input bg-background/60 p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <div className="mt-3 flex flex-wrap gap-3">
              <Button asChild className="press h-11 rounded-full px-5 font-semibold"><a href={mailto}><Mail className="h-4 w-4" />Send via email</a></Button>
              <Button type="button" variant="ghost" onClick={copy} className="press glass h-11 rounded-full px-5">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
