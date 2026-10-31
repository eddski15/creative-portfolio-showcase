import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./run-id.server";

export const SERVICE_NAMES = ["Workflow Audit", "AI Integration", "Data & Inventory Automation", "Executive Support"] as const;

const schema = z.object({
  summary: z.string(),
  recommendations: z.array(z.object({ service: z.string(), reason: z.string() })),
  subject: z.string(),
  inquiry: z.string(),
});

export type ProjectMatch = z.infer<typeof schema>;

const INSTRUCTIONS = `You help prospective clients of Edson Halili, an AI Automation Systems Specialist (Los Baños, Philippines) with 17+ years of enterprise operations, data and inventory experience. He builds automations with n8n, Zapier, Make.com, HighLevel and AI agents.
His services: ${SERVICE_NAMES.map((s) => `"${s}"`).join(", ")}.
Given a client's project description:
- summary: one sentence restating their need.
- recommendations: 1-3 of the services above (use the exact names), most relevant first, each with a one-sentence reason tied to their description.
- subject: a short email subject line.
- inquiry: a friendly, concise email (120-180 words) written FROM the client TO Edson, describing their project and asking for a workflow audit call. Use placeholders like [Your name] where details are unknown. Never invent prices or commitments.`;

export async function matchProject(description: string): Promise<{ ok: true; data: ProjectMatch } | { ok: false; error: string }> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return { ok: false, error: "The AI assistant is not configured yet." };
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: INSTRUCTIONS,
      messages: [{ role: "user", content: description }],
      output: Output.object({ schema }),
      maxRetries: 0,
      providerOptions: {
        openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
      },
    });
    const out = await result.output;
    const valid = out.recommendations.filter((r) => (SERVICE_NAMES as readonly string[]).includes(r.service)).slice(0, 3);
    return { ok: true, data: { ...out, recommendations: valid } };
  } catch (e) {
    if (NoObjectGeneratedError.isInstance(e)) return { ok: false, error: "The AI couldn't put together a recommendation. Please add a bit more detail and try again." };
    const status = (e as { statusCode?: number }).statusCode;
    console.error("project match failed", status, e);
    if (status === 429) return { ok: false, error: "Lots of requests right now — please try again in a minute." };
    if (status === 402 || status === 403) return { ok: false, error: "The AI assistant is temporarily unavailable. Please email Edson directly." };
    return { ok: false, error: "Something went wrong. Please try again or email Edson directly." };
  }
}
