"use server";

import Groq from "groq-sdk";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "groq-sdk/resources/chat/completions";
import { submitLeadData } from "./submit-lead";
import { getPricingPlans } from "./get-pricing";

// ─── Services data (icons stripped — server-safe) ───────────────────────────
const servicesForAI = [
    { id: 1, name: "Webflow Development", tagline: "High-converting, scalable websites", category: "Main Service" },
    { id: 2, name: "Wordpress Development", tagline: "Custom WordPress solutions", category: "Main Service" },
    { id: 3, name: "Web Design", tagline: "Visually stunning & user-friendly", category: "Main Service" },
    { id: 4, name: "E-commerce Solutions", tagline: "Boost Online Sales", category: "Main Service" },
    { id: 5, name: "Custom Software Development", tagline: "Tailored software solutions", category: "Main Service" },
    { id: 6, name: "AI Integration & Automation", tagline: "Enhancing efficiency with AI", category: "Main Service" },
    { id: 7, name: "Accessibility Testing", tagline: "Ensuring digital inclusivity", category: "Main Service" },
    { id: 8, name: "SEO Optimization", tagline: "Improving your website's visibility", category: "Other Service" },
    { id: 9, name: "Social Media Management", tagline: "Managing social media presence", category: "Other Service" },
    { id: 10, name: "Website Maintenance", tagline: "Ongoing support and maintenance", category: "Other Service" },
    { id: 11, name: "Copywriting Services", tagline: "Compelling content that converts", category: "Other Service" },
    { id: 12, name: "Migration & Integration", tagline: "Seamless transitions for your digital landscape", category: "Other Service" },
];

// ─── Groq client ─────────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = "openai/gpt-oss-120b";

// ─── Tool definitions ─────────────────────────────────────────────────────────
const tools: ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "getServices",
            description: "Get the full list of services offered by The Walking Jumbo agency.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "getPricing",
            description: "Get detailed pricing tiers and packages.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "triggerServiceSelector",
            description:
                "Open an interactive service picker for the user. Call this ONLY after you have collected Name, Company (optional), and Contact info.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "submitLead",
            description:
                "Submit the collected lead. Call this ONLY once you have: Name, Contact, Services (from selector), and Budget.",
            parameters: {
                type: "object",
                properties: {
                    name: { type: "string", description: "User's full name" },
                    company: { type: "string", description: "User's company name (optional)" },
                    contact: { type: "string", description: "Email address or phone number" },
                    services: { type: "string", description: "Comma-separated services the user selected" },
                    budget: { type: "string", description: "Budget range stated by the user" },
                },
                required: ["name", "contact", "services", "budget"],
            },
        },
    },
];

// ─── Tool handlers ────────────────────────────────────────────────────────────
const toolHandlers: Record<string, (args: any) => Promise<string>> = {
    getServices: async () => JSON.stringify(servicesForAI),

    getPricing: async () => {
        const plans = await getPricingPlans();
        return typeof plans === "string" ? plans : JSON.stringify(plans);
    },

    triggerServiceSelector: async () =>
        JSON.stringify({ status: "waiting_for_user_selection" }),

    submitLead: async (args: {
        name: string;
        company?: string;
        contact: string;
        services: string;
        budget: string;
    }) => {
        const result = await submitLeadData({
            name: args.name,
            company: args.company || "Not specified",
            contact: args.contact,
            services: args.services.split(",").map((s) => s.trim()),
            budget: args.budget,
            website: "Not specified",
            projectDetails: "Not specified",
        });
        return JSON.stringify({ success: true, message: `Lead captured. Reference ID: ${result.id}` });
    },
};

// ─── Public types ─────────────────────────────────────────────────────────────
export type ChatMessage = { role: "user" | "assistant"; content: string };

export type UIComponent =
    | { type: "serviceSelector"; data: string[] }
    | { type: "services"; data: any }
    | { type: "pricing"; data: any }
    | { type: "leadConfirmation"; data: any }
    | null;

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are 'JumboBot', a friendly AI sales assistant for The Walking Jumbo — a premium creative digital agency.

**YOUR GOAL:** Help users explore the agency OR collect their lead info step-by-step.

**LEAD COLLECTION FLOW (strict order):**
1. Ask for their **Name**.
2. Ask for their **Company Name** (let them know it's optional).
3. Ask for their **Email or Phone Number**.
4. Once you have contact info → immediately CALL \`triggerServiceSelector\`. Do NOT ask them to type services.
5. After the selector is confirmed, ask for their **Budget Range**.
6. Summarise the details, then CALL \`submitLead\`.

**RULES:**
- One question per reply. Keep it short and warm.
- If asked about services or pricing mid-flow, answer briefly using the tools, then return to where you left off.
- Never invent information — always use the available tools.
- Use markdown to format responses (bold key terms, bullet lists where helpful).`;

// ─── Main server action ───────────────────────────────────────────────────────
export async function groqChatAction(
    history: ChatMessage[],
    newMessage: string
): Promise<{ success: boolean; message: string; uiComponent: UIComponent }> {
    const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: newMessage },
    ];

    let uiComponent: UIComponent = null;

    // Agentic loop — keep going until the model stops calling tools (max 5 turns)
    for (let i = 0; i < 5; i++) {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages,
            tools,
            tool_choice: "auto",
            max_tokens: 1024,
        });

        const choice = completion.choices[0];
        const assistantMsg = choice.message;

        // Push the assistant turn back into the thread
        messages.push(assistantMsg as ChatCompletionMessageParam);

        // No tool calls → final text response
        if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
            return { success: true, message: assistantMsg.content ?? "", uiComponent };
        }

        // Execute each tool call in this turn
        for (const toolCall of assistantMsg.tool_calls) {
            const name = toolCall.function.name;
            const args = toolCall.function.arguments
                ? JSON.parse(toolCall.function.arguments)
                : {};

            const handler = toolHandlers[name];
            const toolResult = handler
                ? await handler(args)
                : JSON.stringify({ error: `Unknown tool: ${name}` });

            // Resolve the UI component to surface in the client
            if (name === "triggerServiceSelector") {
                uiComponent = { type: "serviceSelector", data: servicesForAI.map((s) => s.name) };
            } else if (name === "getServices") {
                uiComponent = { type: "services", data: JSON.parse(toolResult) };
            } else if (name === "getPricing") {
                uiComponent = { type: "pricing", data: JSON.parse(toolResult) };
            } else if (name === "submitLead") {
                uiComponent = { type: "leadConfirmation", data: JSON.parse(toolResult) };
            }

            // Feed the tool result back into the thread
            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: toolResult,
            });
        }
    }

    return { success: true, message: "Still working on that — one moment!", uiComponent };
}