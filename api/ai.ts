// /api/ai.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { query, contextData } = req.body;

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "moonshotai/kimi-k2-instruct-0905",
				temperature: 0.3,
				messages: [
					{
						role: "system",
						content: `
              You are SpendSense AI, a SaaS spend analytics assistant.
              You help users analyze CSV data, chart metrics, and renewals.
              
              You can reply conversationally AND (if appropriate) return one of the following structured actions in JSON:
              - { "type": "SET_DEPARTMENT", "payload": "<departmentName>" }
              - { "type": "SET_DATE_RANGE", "payload": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" } }
              - { "type": "RESET_FILTERS" }
              - { "type": "GENERATE_SUMMARY" }
              - { "type": "EXPORT" }
              - { "type": "PREVIEW" }
              - { "type": "NO_ACTION" }

              Rules:
              - Always provide a "reply" (the conversational answer).
              - If the user asks for filtering, date range, reset, or summary, include the correct JSON action.
              - Respond strictly in JSON with the following shape:
                {
                  "reply": "your text reply to the user",
                  "action": { "type": "SOME_TYPE", "payload": ... }
                }
            `,
					},
					{
						role: "user",
						content: `Context data: ${JSON.stringify(contextData).slice(0, 4000)}
            User query: ${query}`,
					},
				],
			}),
		});

		const data = await response.json();
		const raw = data.choices?.[0]?.message?.content || "";

		// Try parsing AI output to structured JSON
		let parsed;
		try {
			parsed = JSON.parse(raw);
		} catch {
			parsed = { reply: raw || "No response.", action: { type: "NO_ACTION" } };
		}

		res.status(200).json(parsed);
	} catch (err: any) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
}
