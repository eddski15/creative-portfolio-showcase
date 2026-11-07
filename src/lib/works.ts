import salesImg from "@/assets/n8n-200815.jpg";
import agentImg from "@/assets/n8n-201520.jpg";
import reportsImg from "@/assets/n8n-201638.jpg";
import weeklyImg from "@/assets/n8n-202148.jpg";
import processpilotImg from "@/assets/processpilot-discovery.jpg";

export type Work = {
  slug: string; t: string; tag: string; img: string; d: string; ongoing?: boolean;
  category: "Automation" | "AI Agents" | "Web Apps";
  role: string; problem: string; process: string[]; solution: string;
};

export const workCategories = ["All", "Automation", "AI Agents", "Web Apps"] as const;

export const works: Work[] = [
  { slug: "sales-data-pipeline", t: "Sales Data Pipeline", tag: "n8n · HTTP · CSV", img: salesImg, category: "Automation", role: "Automation architect",
    d: "Pulls sales data, totals each order and splits into 3 branches: order data to the warehouse, a regional analysis to finance, and a CSV report to the manager.",
    problem: "Sales data had to be copied by hand into separate files for the warehouse, finance and management — slow and error-prone.",
    process: ["Mapped who needs which data and in what format", "Designed one intake step that totals every order", "Split the flow into three branches, one per team"],
    solution: "A single n8n pipeline that delivers warehouse order data, a regional finance analysis and a manager CSV report automatically." },
  { slug: "ai-customer-sales-agent", t: "AI Customer & Sales Agent", tag: "n8n · AI Agent · Gemini", img: agentImg, category: "AI Agents", role: "AI agent builder",
    d: "A chat-based AI agent with memory that looks up customers and orders on its own, then answers with a full customer list and total sales report.",
    problem: "Answering customer and sales questions meant searching several data sources manually.",
    process: ["Defined the questions the agent must answer", "Connected customer and order data as agent tools", "Added memory so follow-up questions keep context"],
    solution: "A Gemini-powered chat agent that looks up customers and orders by itself and returns complete answers and sales totals." },
  { slug: "automated-report-generation", t: "Automated Report Generation", tag: "n8n · Merge · Discord", img: reportsImg, category: "Automation", role: "Workflow designer",
    d: "Merges order and customer data, calculates totals, builds a Europe-only CSV and regional summaries, then posts results to a Discord channel.",
    problem: "Regional sales reports were built manually and shared late.",
    process: ["Merged order and customer data into one view", "Built totals, sorting and regional summaries", "Chose Discord as the delivery channel for the team"],
    solution: "Reports build themselves — including a Europe-only CSV — and land in Discord without anyone lifting a finger." },
  { slug: "weekly-order-status", t: "Weekly Order Status Workflow", tag: "n8n · Schedule · Discord", img: weeklyImg, category: "Automation", role: "Automation architect",
    d: "Runs every Monday at 9AM: fetches warehouse data, checks order status, updates customer records and sends booked order totals to Discord.",
    problem: "Order statuses and customer records drifted out of date between manual weekly checks.",
    process: ["Set a fixed Monday 9AM schedule", "Added status checks on warehouse data", "Automated record updates and a team summary"],
    solution: "A scheduled workflow that keeps records current and posts booked order totals to Discord every week." },
  { slug: "processpilot-ai", t: "ProcessPilot AI", tag: "Web App · AI Copilot", img: processpilotImg, ongoing: true, category: "Web Apps", role: "Founder & product builder",
    d: "My ongoing build: a process discovery copilot that interviews business owners, maps their real workflows step by step, and turns each session into an implementation brief — with a private client-projects workspace and an internal AI Development Office to plan its own development.",
    problem: "Business owners struggle to explain how their work really runs, so automation projects start on guesswork.",
    process: ["Designed a guided business-context interview", "Built step-by-step process mapping", "Added a private client-projects workspace and an internal AI Development Office"],
    solution: "A process discovery copilot that turns each interview into a clear implementation brief. Currently in progress." },
];
