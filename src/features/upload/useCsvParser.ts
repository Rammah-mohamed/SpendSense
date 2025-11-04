import { useCallback, useState } from "react";
import Papa from "papaparse";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { validateCsv } from "./validateCsv";
import type { SpendRecord } from "@/types/types";

export function useCsvParser() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const parseFileAsync = useCallback((file: File): Promise<SpendRecord[]> => {
		setLoading(true);
		setError(null);

		console.time("parse");
		return new Promise((resolve, reject) => {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				worker: true, // parse in a web worker to avoid blocking UI
				complete: (results) => {
					const { data, meta } = results;
					const headers = (meta.fields || []).map((h) => h?.toLowerCase().trim());

					const validationError = validateCsv(headers);
					if (validationError) {
						setError(validationError);
						setLoading(false);
						reject(new Error(validationError));
						return;
					}

					try {
						const records: SpendRecord[] = (data as any[]).map((row) => {
							// --- Normalize amount ---
							const rawAmount = String(row.amount || "").replace(/[^\d.,-]/g, "");
							const normalizedAmount =
								rawAmount.includes(",") && !rawAmount.includes(".")
									? rawAmount.replace(",", ".") // handle European decimal
									: rawAmount.replace(/,/g, ""); // remove thousand separators

							const amount = Number.parseFloat(normalizedAmount) || 0;

							// --- Normalize date ---
							const dateStr = row.renewal_date || row.renewalDate || "";
							const parsedDate = dayjs(dateStr, ["YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY"], true);
							const renewalDate = parsedDate.isValid()
								? parsedDate.toISOString()
								: new Date(0).toISOString(); // fallback: epoch start if invalid

							// --- Normalize department & vendor ---
							return {
								id: uuidv4(),
								vendor: (row.vendor || "").toString().trim(),
								amount,
								department: (row.department || "Unknown").toString().trim(),
								renewalDate,
							};
						});

						setLoading(false);
						resolve(records);
					} catch (err: any) {
						setError(err.message || "Failed to parse records");
						setLoading(false);
						reject(err);
					}

					console.timeEnd("parse");
				},
				error: (err) => {
					setError(err.message || "Parsing error");
					setLoading(false);
					reject(err);
				},
			});
		});
	}, []);

	return { parseFileAsync, loading, error };
}
