export const REQUIRED_COLUMNS = ["vendor", "amount", "department", "renewal_date"];

export function validateCsv(headers: string[]): string | null {
	const missing = REQUIRED_COLUMNS.filter(
		(col) => !headers.map((h) => h.toLowerCase().trim()).includes(col)
	);
	if (missing.length > 0) {
		return `Missing required columns: ${missing.join(", ")}`;
	}
	return null;
}
