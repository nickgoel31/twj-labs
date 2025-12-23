"use server";

import { GoogleGenerativeAI, Part, SchemaType, Tool } from "@google/generative-ai";
import { servicesForAI } from "@/data/services"; // Your services array
import { getPricingPlans } from "./get-pricing";
import { submitLeadData } from "./submit-lead"; // Import the helper above

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// --- TOOLS DEFINITION ---
const tools = {
  getServices: () => JSON.stringify(servicesForAI),
  getPricing: async () => {
    const plans = await getPricingPlans();
    return typeof plans === 'string' ? plans : JSON.stringify(plans);
  },
  // This tool doesn't return data, it just signals the UI to open
  triggerServiceSelector: () => {
    return JSON.stringify({ status: "waiting_for_user_selection" });
  },
  // The final step
  submitLead: async (args: any) => {
    const result = await submitLeadData({
      name: args.name,
      company: args.company || "Not specified",
      contact: args.contact,
      services: args.services.split(',').map((s: string) => s.trim()), // Clean up string
      budget: args.budget,
      website: "Not specified",
      projectDetails: "Not specified",
    });
    return JSON.stringify({ 
      success: true, 
      message: `Lead captured successfully. Reference ID: ${result.id}` 
    });
  }
};

const toolDefinitions:Tool[] = [
  {
    functionDeclarations: [
      {
        name: "getServices",
        description: "Get a list of services offered by the agency.",
      },
      {
        name: "getPricing",
        description: "Get detailed pricing tiers and packages.",
      },
      {
        name: "triggerServiceSelector",
        description: "Call this tool when you have collected Name, Company, and Contact info, and it is time for the user to select their interested services from a list.",
      },
      {
        name: "submitLead",
        description: "Final step. Call this ONLY after collecting: Name, Company, Contact, Services, and Budget.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            name: { type: SchemaType.STRING },
            company: { type: SchemaType.STRING },
            contact: { type: SchemaType.STRING, description: "Email or Phone number" },
            services: { type: SchemaType.STRING, description: "Comma separated list of services selected by user" },
            budget: { type: SchemaType.STRING },
          },
          required: ["name", "contact", "services", "budget"],
        },
      },
    ],
  },
];

export async function chatAction(history: { role: "user" | "model"; parts: string }[], newMessage: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      tools: toolDefinitions,
      systemInstruction: `
        You are 'JumboBot', an agency sales assistant. 
        
        **YOUR GOAL:**
        You must guide the user through a STRICT step-by-step lead qualification process.
        
        **THE PROCESS:**
        1. Ask for their **Name**.
        2. Ask for their **Company Name** (optional).
        3. Ask for their **Email or Phone Number**.
        4. Once you have the contact info, CALL THE TOOL \`triggerServiceSelector\` to let them choose services. Do not ask them to type it.
        5. After they finish selecting services, ask for their **Budget Range**.
        6. Finally, confirm the details and CALL THE TOOL \`submitLead\`.

        **RULES:**
        - Ask ONE question at a time.
        - Keep responses short and conversational.
        - If the user asks about Pricing or Services during the flow, answer them, then gently return to the current step of the form.
      `
    });

    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.parts }],
      })),
    });

    let result = await chat.sendMessage(newMessage);
    let response = result.response;
    let functionCalls = response.functionCalls();

    let uiComponent = null;

    while (functionCalls && functionCalls.length > 0) {
      const functionResponses: Part[] = [];

      for (const call of functionCalls) {
        const functionName = call.name;
        // @ts-ignore
        const action = tools[functionName];

        if (action) {
          const apiResponse = await action(call.args);
          
         
          if (functionName === 'getServices') {
              uiComponent = { type: 'services', data: JSON.parse(apiResponse) };
          } else if (functionName === 'getPricing') {
              uiComponent = { type: 'pricing', data: JSON.parse(apiResponse) };
          } else if (functionName === 'triggerServiceSelector') {
              const serviceNames = servicesForAI.map((s: any) => s.name || s.title);
              uiComponent = { type: 'serviceSelector', data: serviceNames }; 

          } else if (functionName === 'submitLead') {
              uiComponent = { type: 'leadConfirmation', data: JSON.parse(apiResponse) };
          }

          functionResponses.push({
            functionResponse: {
                name: functionName,
                response: { name: functionName, content: apiResponse }
            }
          });
        }
      }

      result = await chat.sendMessage(functionResponses);
      response = result.response;
      functionCalls = response.functionCalls();
    }

    const text = response.text();
    
    return { success: true, message: text, uiComponent };

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return { success: false, message: "I'm having a bit of trouble connecting. Can we try that again?" };
  }
}