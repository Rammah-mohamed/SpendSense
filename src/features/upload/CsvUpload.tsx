import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCsvParser } from "./useCsvParser";
import type { SpendRecord } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export const CsvUpload = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [done, setDone] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { theme } = useTheme();

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

	const handleNavigate = () => {
		navigate("/dashboard");
		document.getElementById("Dashboard")?.click();
	};

	return (
		<div
			className={cn(
				"max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md text-center space-y-4 border transition-all",
				theme === "dark"
					? "bg-(--color-surface-dark) border-border-dark text-text-dark"
					: "bg-surface border-border text-text"
			)}
		>
			<h2 className="text-xl font-semibold">Upload SaaS Spend CSV</h2>

			{/* File Input */}
			<input
				ref={fileInputRef}
				type="file"
				accept=".csv"
				onChange={handleUpload}
				disabled={loading}
				className={cn(
					"w-full p-2 rounded text-sm border cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all",
					theme === "dark"
						? "bg-bg-dark border-border-dark text-text-dark file:text-text-muted-dark hover:border-(--color-accent-dark)"
						: "bg-bg border-border text-text file:text-text-muted hover:border-accent"
				)}
			/>

			{/* Status messages */}
			{loading && (
				<div className={cn("text-sm", theme === "dark" ? "text-blue-400" : "text-blue-500")}>
					Parsing...
				</div>
			)}

			{error && (
				<p className={cn("text-sm", theme === "dark" ? "text-red-400" : "text-red-500")}>{error}</p>
			)}

			{done && !error && (
				<div>
					<p
						className={cn(
							"text-sm font-semibold",
							theme === "dark" ? "text-green-400" : "text-green-500"
						)}
					>
						Upload Successful
					</p>
					<Button
						onClick={handleNavigate}
						className={cn(
							"mt-2",
							theme === "dark"
								? "bg-accent-dark text-surface-dark hover:bg-accent-hover-dark"
								: "bg-accent text-surface hover:bg-accent-hover"
						)}
					>
						View Dashboard
					</Button>
				</div>
			)}

			{/* Expected Columns */}
			<p className={cn("text-xs", theme === "dark" ? "text-text-muted-dark" : "text-text-muted")}>
				Expected columns: <strong>vendor, amount, department, renewal_date</strong>
			</p>
		</div>
	);
};
