import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCsvParser } from "./useCsvParser";
import type { SpendRecord } from "@/types/types";
import { CacheDebugger } from "./CacheDebugger";

export const CsvUpload = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [done, setDone] = useState<boolean>(false);
	const queryClient = useQueryClient();

	// Destructure from updated hook
	const { parseFileAsync, loading, error } = useCsvParser();

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const records: SpendRecord[] = await parseFileAsync(file);

			// Store parsed data in React Query cache
			queryClient.setQueryData(["spendData"], records);

			setDone(true);

			// Optional: reset file input for future uploads
			if (fileInputRef.current) fileInputRef.current.value = "";
		} catch (err: any) {
			console.error("CSV parse failed:", err.message);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center space-y-4">
			<h2 className="text-xl font-semibold">Upload SaaS Spend CSV</h2>

			<input
				ref={fileInputRef}
				type="file"
				accept=".csv"
				onChange={handleUpload}
				disabled={loading}
				className="w-full border border-gray-200 p-2 rounded cursor-pointer text-sm"
			/>

			{loading && <div className="text-sm text-blue-500">Parsing...</div>}

			{error && <p className="text-sm text-red-500">{error}</p>}

			{done && !error && <p className="text-sm font-semibold text-green-500">Upload Successed</p>}

			<p className="text-xs text-gray-500">
				Expected columns: <strong>vendor, amount, department, renewal_date</strong>
			</p>
			<CacheDebugger />
		</div>
	);
};
