import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const recommendServices = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ description: z.string().trim().min(20).max(2000) }).parse(input))
  .handler(async ({ data }) => {
    const { matchProject } = await import("./project-match.server");
    return matchProject(data.description);
  });
