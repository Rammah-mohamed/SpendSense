import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useFilteredData } from "./useFilteredData";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const COLORS = [
	"#3b82f6", // Blue
	"#f97316", // Orange
	"#22c55e", // Green
	"#eab308", // Yellow
	"#8b5cf6", // Purple
	"#06b6d4", // Cyan
];

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

const DepartmentChart = () => {
	const filtered = useFilteredData();
	const { theme } = useTheme();

	const totals = filtered.reduce((acc, r) => {
		acc[r.department] = (acc[r.department] || 0) + r.amount;
		return acc;
	}, {} as Record<string, number>);

	const data = Object.entries(totals).map(([department, amount]) => ({
		department,
		amount,
	}));

	return (
		<motion.div
			whileHover={{ scale: 1.01 }}
			transition={{ type: "spring", stiffness: 280, damping: 22 }}
		>
			<Card
				className={cn(
					"rounded-2xl border transition-shadow duration-300 shadow-sm hover:shadow-md",
					theme === "dark"
						? "bg-surface-dark border-border-dark hover:border-border-dark/80"
						: "bg-surface border-border hover:border-border/80"
				)}
			>
				<CardContent className="p-6">
					<h3
						className={cn(
							"font-semibold mb-6 text-lg",
							theme === "dark" ? "text-text-dark" : "text-text"
						)}
					>
						Spend by Department
					</h3>

					<div className="h-80 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									dataKey="amount"
									nameKey="department"
									innerRadius={60}
									outerRadius={110}
									paddingAngle={4}
									stroke={theme === "dark" ? "var(--color-surface-dark)" : "var(--color-surface)"}
									strokeWidth={2}
									label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
									labelLine={false}
									isAnimationActive
									animationDuration={800}
								>
									{data.map((_, i) => (
										<Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
									))}
								</Pie>

								<Tooltip
									formatter={(value: number) => formatCurrency(value)}
									contentStyle={{
										borderRadius: "10px",
										border: "1px solid var(--color-border)",
										backgroundColor:
											theme === "dark" ? "var(--color-surface-dark)" : "var(--color-surface)",
										boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
									}}
									cursor={{
										fill: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
									}}
								/>

								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									wrapperStyle={{
										paddingTop: "12px",
										fontSize: 12,
										color:
											theme === "dark" ? "var(--color-text-muted-dark)" : "var(--color-text-muted)",
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default DepartmentChart;
