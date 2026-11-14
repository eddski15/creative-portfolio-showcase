import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export const CAL_LINK = "edson-halili-uaojuo";

export const bookingServices = [
  "Intelligent Customer Inquiry & Triage Assistant",
  "Automated Document & Invoicing Extraction Pipeline",
  "Smart CRM Lead Enrichment & Scoring Engine",
  "Automated Content Repurposing & Social Distribution Hub",
  "Operations Incident-to-Action Dispatcher",
] as const;

type CalFn = ((...args: unknown[]) => void) & { ns?: Record<string, CalFn>; q?: unknown[]; loaded?: boolean };
declare global {
  interface Window { Cal?: CalFn }
}

// Official Cal.com embed loader (inline embeds auto-size their height, so no inner scrollbar).
function loadCal(): CalFn {
  const w = window as Window & { Cal?: CalFn };
  if (!w.Cal) {
    /* eslint-disable */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal; const ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
          else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    /* eslint-enable */
  }
  return w.Cal!;
}

const BRAND = { light: { "cal-brand": "#B28735" }, dark: { "cal-brand": "#B28735" } };

export function BookingCalendar() {
  const [service, setService] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const holder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const host = holder.current;
    if (!host || near) return;
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(host);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    const read = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const host = holder.current;
    if (!host || !near) return;
    const el = document.createElement("div");
    el.className = "w-full";
    host.replaceChildren(el);
    const ns = `book-${theme}-${service ? bookingServices.indexOf(service as (typeof bookingServices)[number]) : "x"}`;
    const Cal = loadCal();
    Cal("init", ns, { origin: "https://app.cal.com" });
    const api = Cal.ns?.[ns];
    if (!api) return;
    api("inline", {
      elementOrSelector: el,
      calLink: CAL_LINK,
      config: { layout: "month_view", theme, ...(service ? { notes: `Service: ${service}` } : {}) },
    });
    api("ui", { theme, cssVarsPerTheme: BRAND, hideEventTypeDetails: false, layout: "month_view" });
    return () => el.remove();
  }, [service, theme, near]);

  return (
    <div className="mt-10 space-y-6">
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Step 1 — Which service do you want to book?
        </legend>
        <div className="mt-4 flex flex-wrap gap-2" role="radiogroup">
          {bookingServices.map((s) => {
            const on = service === s;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setService(s)}
                className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border px-4 py-2 text-left text-sm transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                  on ? "border-primary bg-primary text-primary-foreground" : "bg-card/60 hover:border-primary"
                }`}
              >
                {on && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                <span className="[overflow-wrap:anywhere]">{s}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Step 2 — Pick a time{service ? ` for: ${service}` : ""}
        </p>
        <div className="glass mt-4 rounded-2xl p-2 sm:p-4">
          <div ref={holder} className="min-h-[560px] w-full" aria-label="Booking calendar" />
        </div>
      </div>
    </div>
  );
}
