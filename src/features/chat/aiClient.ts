import { getTopVendor, summarizeSpend } from "./dataUtils";

export async function queryAI(query: string, data: any) {
	await new Promise((r) => setTimeout(r, 800)); // simulate delay

	if (query.toLowerCase().includes("total spend")) {
		const total = summarizeSpend(data);
		return `The total spend is $${total.toLocaleString()}.`;
	}

	if (query.toLowerCase().includes("top vendor")) {
		const vendor = getTopVendor(data);
		return `The top vendor by renewal count is ${vendor.name} with ${vendor.count} renewals.`;
	}

	return "I’m not sure yet, but I can analyze the uploaded data for trends or totals!";
}
