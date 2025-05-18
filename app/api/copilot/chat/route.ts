// Simple API route for chat functionality

import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";

export const runtime = "edge";

// Reverting to older action structure based on lint error
const getInitialAppSummary = {
  name: "getInitialAppSummary",
  description: "Provides a brief summary of current application insights, including overall sentiment and any urgent issues. This is typically called automatically when the chat starts.",
  argumentAnnotations: [], // Changed from parameters
  implementation: async () => { // Changed from handler
    console.log("[getInitialAppSummary Action] Called"); // Log action call
    // Mock data, simulating fetched insights
    const overallSentiment = "Positive"; // Example: from sentiment-indicator
    const urgentIssues = [
      "High negative sentiment spike noted in 'New Feature X' feedback.",
      // "Login failures reported by 3 users in the last hour."
    ]; // Example: from sentiment-details

    let summary = `Hello! Here's a quick update based on current app data: Overall app sentiment is currently ${overallSentiment}. `;

    if (urgentIssues.length > 0) {
      summary += `There are ${urgentIssues.length} urgent issue(s) needing attention, starting with: "${urgentIssues[0]}"`;
    } else {
      summary += "No new critical issues flagged at the moment.";
    }
    console.log("[getInitialAppSummary Action] Returning summary:", summary); // Log returned summary
    return summary.trim();
  },
};

export async function POST(req: Request) {
  console.log("[API Route POST] Received request"); // Log request received

  if (!process.env.OPENAI_API_KEY) {
    console.error("[API Route POST] OpenAI API key not configured");
    return new Response("OpenAI API key not configured", { status: 500 });
  }

  try {
    // Read the original request body to modify messages if it's a new chat
    const originalRequestBody = await req.json();
    console.log("[API Route POST] Original request body:", JSON.stringify(originalRequestBody, null, 2));

    let messages = originalRequestBody.messages || [];
    console.log("[API Route POST] Initial messages count:", messages.length);

    // Check if this is the initial request for a new chat session (no messages yet from user)
    if (messages.length === 0) {
      console.log("[API Route POST] Empty messages, prepending trigger for summary.");
      // Prepend a user message to trigger the summary action
      messages.unshift({
        role: "user",
        content: "Provide the initial application insights summary.", 
        // ID can be omitted, CopilotKit/OpenAI usually handles it or generates one
      });
      console.log("[API Route POST] Messages after prepend:", JSON.stringify(messages, null, 2));
    } else {
      console.log("[API Route POST] Messages not empty, proceeding as normal.");
    }

    // Create a new Request object with the potentially modified messages
    // This is necessary because the body of a Request can only be read once.
    const newReq = new Request(req.url, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify({ ...originalRequestBody, messages }), // Pass modified messages back
    });

    const copilotKit = new CopilotRuntime({
      actions: [getInitialAppSummary],
    });

    const openaiAdapter = new OpenAIAdapter({
      model: process.env.OPENAI_MODEL || "gpt-4-turbo",
    });

    console.log("[API Route POST] Calling copilotKit.response()");
    const response = await copilotKit.response(newReq, openaiAdapter);
    console.log("[API Route POST] copilotKit.response() finished");
    return response;

  } catch (error) {
    console.error('[API Route POST] Error processing CopilotKit request:', error);
    return new Response('Error processing your request', { status: 500 });
  }
}
