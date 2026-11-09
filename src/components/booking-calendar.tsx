import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export const CAL_LINK = "edsonhalili/30min";

export const bookingServices = [
  "Intelligent Customer Inquiry & Triage Assistant",
  "Automated Document & Invoicing Extraction Pipeline",
  "Smart CRM Lead Enrichment & Scoring Engine",
  "Automated Content Repurposing & Social Distribution Hub",
  "Operations Incident-to-Action Dispatcher",
] as const;

export function BookingCalendar() {
  const [service, setService] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const params = new URLSearchParams({ embed: "true", theme, layout: "month_view" });
  if (service) params.set("notes", `Service: ${service}`);
  const src = `https://cal.com/${CAL_LINK}?${params.toString()}`;

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
        <div className="mt-4 overflow-hidden rounded-2xl border bg-card/60">
          <iframe
            key={src}
            src={src}
            title="Book a 30-minute discovery call"
            loading="lazy"
            className="block h-[720px] w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
