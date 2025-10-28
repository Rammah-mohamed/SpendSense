/**
 * Summarizes total spend across all departments/vendors.
 * @param data - Array of records from the uploaded CSV.
 * @returns Total spend as a number.
 */
export function summarizeSpend(data: any[] = []): number {
	if (!Array.isArray(data) || data.length === 0) return 0;

	return data.reduce((sum, item) => {
		const amount = parseFloat(item.amount);
		return sum + (isNaN(amount) ? 0 : amount);
	}, 0);
}

/**
 * Finds the vendor with the highest renewal count.
 * @param data - Array of records from the uploaded CSV.
 * @returns Object with vendor name and renewal count.
 */
export function getTopVendor(data: any[] = []): { name: string; count: number } {
	if (!Array.isArray(data) || data.length === 0) return { name: "N/A", count: 0 };

	// Count renewals per vendor
	const vendorCounts = data.reduce<Record<string, number>>((acc, item) => {
		const vendor = item.vendor?.trim() || "Unknown";
		acc[vendor] = (acc[vendor] || 0) + 1;
		return acc;
	}, {});

	// Find vendor with max renewals
	let topVendor = "N/A";
	let maxCount = 0;

	for (const [vendor, count] of Object.entries(vendorCounts)) {
		if (count > maxCount) {
			topVendor = vendor;
			maxCount = count;
		}
	}

	return { name: topVendor, count: maxCount };
}
