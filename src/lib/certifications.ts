export type Certification = {
  title: string;
  issuer: string;
  date: string;
  learning: string;
  skills: string[];
  url: string;
};

export const certifications: Certification[] = [
  {
    title: "n8n101 — Essentials: Your First Workflows",
    issuer: "n8n GmbH",
    date: "Aug 31, 2026",
    learning: "Built first workflows in n8n, learned how data moves between nodes, and used triggers, expressions, transformations and credentials to automate real tasks.",
    skills: ["Visual workflow design", "Items & JSON", "Data transformation", "Merging sources", "n8n expressions", "Binary data", "Debugging"],
    url: "https://badges.n8n.io/9210dbf1-cbd5-4c69-81c5-f9d43541b9f1#acc.EybdLG3T",
  },
  {
    title: "n8n Quickstart (QS101)",
    issuer: "n8n GmbH",
    date: "Aug 24, 2026",
    learning: "Built working workflows from scratch: a scheduled API integration, a data processing pipeline, and an AI agent with memory and tools.",
    skills: ["Triggers & scheduling", "HTTP requests & APIs", "Data Tables", "Merge, filter, sort", "Error handling", "AI agents & tools"],
    url: "https://badges.n8n.io/960d2c69-bbdd-4f39-9036-a3940c6f0d27#acc.zcYr4Sxf",
  },
  {
    title: "AI Operator Masterclass",
    issuer: "Techademy",
    date: "Jul 30, 2026",
    learning: "Designing and operating AI solutions for business workflows, from prompt engineering to agent-driven task execution.",
    skills: ["AI solutions", "LLMs", "Prompt engineering", "AI agents", "Workflow automation"],
    url: "https://www.techademyonline.com/credentials/2897e87d-34d7-4ade-a3a8-eb23d3880b58",
  },
  {
    title: "AI Native Project Manager Masterclass",
    issuer: "Techademy",
    date: "Jul 30, 2026",
    learning: "AI-powered project management: planning, tracking and reporting on initiatives with AI built into every step.",
    skills: ["AI project management", "Planning & roadmaps", "Automated reporting", "Stakeholder coordination"],
    url: "https://www.techademyonline.com/credentials/06f6550b-e123-4b3a-a4fd-568412bfd21e",
  },
  {
    title: "HighLevel CRM Full Training",
    issuer: "Tara AI Community+",
    date: "Oct 29, 2026",
    learning: "Full HighLevel CRM training covering pipelines, funnels, websites, marketing, bookings and advanced workflow automations with API integration.",
    skills: ["CRM & pipelines", "Sales funnels", "Website builder", "Email marketing", "Booking & appointments", "API workflows", "Reputation management", "AI agents"],
    url: "https://my-certificates.com/certificates/6ae311976f6540accd27640b",
  },
  {
    title: "AI Automation with n8n Full Training",
    issuer: "Tara AI Community+",
    date: "Oct 21, 2026",
    learning: "End-to-end n8n training from server setup to branching, looping, API connections, MCP servers/clients and AI agents.",
    skills: ["n8n server setup", "AI agents vs workflows", "Triggers & actions", "Branching & conditions", "Looping & merging", "APIs", "MCP"],
    url: "https://my-certificates.com/certificates/6ad89ecaa5e209cacf6d1383",
  },
  {
    title: "No Code Automation with Make.com",
    issuer: "Tara AI Community+",
    date: "Oct 9, 2026",
    learning: "Building Make.com scenarios that connect apps, route data and call external services, including AI agents.",
    skills: ["Scenario structure", "Filters & triggers", "Connecting apps", "Data manipulation", "Advanced routing", "HTTP requests", "AI agents"],
    url: "https://my-certificates.com/certificates/6ac8bcf1fbbec5be3d2e40db",
  },
  {
    title: "No Code Automation with Zapier",
    issuer: "Tara AI Community+",
    date: "Oct 6, 2026",
    learning: "Automating work with Zapier's full logic toolkit, from formatters and paths to sub-zaps, webhooks and human-in-the-loop AI.",
    skills: ["Triggers", "Formatter", "Delay & filter", "Paths", "Looping", "Sub-Zaps", "Webhooks", "Human-in-the-loop AI"],
    url: "https://my-certificates.com/certificates/6ac463142cd92d9ed73e9acd",
  },
  {
    title: "GoHighLevel Workshop",
    issuer: "Excelerate Digital Marketing",
    date: "Aug 21, 2026",
    learning: "Participated in a 3-hour live GoHighLevel workshop on using the platform for real client operations.",
    skills: ["GoHighLevel", "CRM operations", "Live workshop"],
    url: "https://my-certificates.com/certificates/6a87a690760dcbad4b38689c",
  },
];
