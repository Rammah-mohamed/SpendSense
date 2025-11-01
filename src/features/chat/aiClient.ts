// aiClient.ts
export async function queryAI(query: string, contextData: any) {
	try {
		const res = await fetch("/api/ai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query, contextData }),
		});

		const data = await res.json();

		// Ensure consistent structure
		return {
			reply: data.reply || "No response from AI.",
			action: data.action || { type: "NO_ACTION" },
		};
	} catch (err) {
		console.error("AI request failed:", err);
		return {
			reply: "⚠️ Something went wrong while communicating with the AI.",
			action: { type: "NO_ACTION" },
		};
	}
}
