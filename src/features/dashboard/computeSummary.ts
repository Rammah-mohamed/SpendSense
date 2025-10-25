import type { SpendRecord } from "@/types/types";

export const computeSummary = (data: SpendRecord[] | []) => {
	const totalSpend = data.reduce((acc, item) => acc + item.amount, 0);
	const departments = new Set(data.map((d) => d.department)).size;
	const vendors = new Set(data.map((d) => d.vendor)).size;
	const upcomingRenewals = data.filter(
		(d) => new Date(d.renewalDate) < new Date(Date.now() + 30 * 86400000)
	).length;

	return { totalSpend, departments, vendors, upcomingRenewals };
};
