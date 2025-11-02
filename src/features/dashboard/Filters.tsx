import { Input } from "@/components/ui/input";
import { useDashboardStore } from "./useDashboardStore";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const departments = [
	"Engineering",
	"Marketing",
	"Finance",
	"Sales",
	"Product",
	"HR",
	"Operations",
	"Design",
	"Support",
	"Legal",
];

export const Filters = () => {
	const { department, dateRange, setDepartment, setDateRange, reset } = useDashboardStore();
	const { theme } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className={cn(
				"flex flex-wrap items-end gap-4 mb-4 p-3 rounded-xl border transition-all",
				theme === "dark"
					? "bg-surface-dark border-border-dark text-text-dark"
					: "bg-surface border-border text-text"
			)}
		>
			{/* Department Filter */}
			<div className="flex flex-col space-y-1.5">
				<label
					htmlFor="department"
					className={cn(
						"text-sm font-medium",
						theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
					)}
				>
					Department
				</label>
				<Select value={department || ""} onValueChange={(v) => setDepartment(v || null)}>
					<SelectTrigger
						id="department"
						className={cn(
							"min-w-[180px] text-sm rounded-md border",
							theme === "dark"
								? "bg-bg-dark border-border-dark text-text-dark focus:ring-accent-dark"
								: "bg-bg border-border text-text focus:ring-accent"
						)}
					>
						<SelectValue placeholder="All Departments" />
					</SelectTrigger>
					<SelectContent
						className={cn(
							"rounded-md border mt-1",
							theme === "dark"
								? "bg-surface-dark border-border-dark text-text-dark"
								: "bg-surface border-border text-text"
						)}
					>
						<SelectItem value="All Departments">All Departments</SelectItem>
						{departments.map((d) => (
							<SelectItem key={d} value={d}>
								{d}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Renewal Date Range Filter */}
			<div className="flex flex-col space-y-1.5">
				<label
					htmlFor="dateRange"
					className={cn(
						"text-sm font-medium",
						theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
					)}
				>
					Renewal Date Range
				</label>

				<div id="dateRange" className="flex items-center gap-2">
					{/* From */}
					<div className="flex items-center gap-1.5">
						<span
							className={cn(
								"text-xs",
								theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
							)}
						>
							From
						</span>
						<Input
							id="startDate"
							type="date"
							value={dateRange.start || ""}
							onChange={(e) => setDateRange({ ...dateRange, start: e.target.value || null })}
							className={cn(
								"h-9 w-[140px] text-sm rounded-md border",
								theme === "dark"
									? "bg-bg-dark border-border-dark text-text-dark focus:ring-accent-dark"
									: "bg-bg border-border text-text focus:ring-accent"
							)}
						/>
					</div>

					{/* To */}
					<div className="flex items-center gap-1.5">
						<span
							className={cn(
								"text-xs",
								theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
							)}
						>
							To
						</span>
						<Input
							id="endDate"
							type="date"
							value={dateRange.end || ""}
							onChange={(e) => setDateRange({ ...dateRange, end: e.target.value || null })}
							className={cn(
								"h-9 w-[140px] text-sm rounded-md border",
								theme === "dark"
									? "bg-bg-dark border-border-dark text-text-dark focus:ring-accent-dark"
									: "bg-bg border-border text-text focus:ring-accent"
							)}
						/>
					</div>
				</div>
			</div>

			{/* Reset Button */}
			<Button
				onClick={reset}
				variant="outline"
				className={cn(
					"mt-6 flex items-center gap-2 transition-all hover:scale-[1.03] border rounded-md",
					theme === "dark"
						? "border-border-dark text-text-muted-dark hover:text-text-dark hover:border-accent-dark"
						: "border-border text-text-muted hover:text-text hover:border-accent"
				)}
			>
				<IconRefresh className="h-4 w-4" />
				Reset
			</Button>
		</motion.div>
	);
};
