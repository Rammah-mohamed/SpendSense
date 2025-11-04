import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
} from "recharts";
import { useFilteredData } from "./useFilteredData";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

const VendorChart = () => {
	const filtered = useFilteredData();
	const { theme } = useTheme();

	const vendorTotals = filtered.reduce((acc, r) => {
		acc[r.vendor] = (acc[r.vendor] || 0) + r.amount;
		return acc;
	}, {} as Record<string, number>);

	const data = Object.entries(vendorTotals).map(([vendor, amount]) => ({
		vendor,
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
						Top Vendors by Spend
					</h3>

					<div className="h-[350px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 50 }}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "var(--color-border-dark)" : "var(--color-border)"}
								/>

								<XAxis
									dataKey="vendor"
									angle={-20}
									textAnchor="end"
									interval={0}
									height={70}
									tick={{
										fontSize: 12,
										fill:
											theme === "dark" ? "var(--color-text-muted-dark)" : "var(--color-text-muted)",
									}}
								/>

								<YAxis
									tickFormatter={(value) => formatCurrency(value)}
									tick={{
										fontSize: 12,
										fill:
											theme === "dark" ? "var(--color-text-muted-dark)" : "var(--color-text-muted)",
									}}
								/>

								<Tooltip
									formatter={(value: number) => formatCurrency(value)}
									cursor={{
										fill: theme === "dark" ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.08)",
									}}
									contentStyle={{
										borderRadius: "10px",
										border: "1px solid var(--color-border)",
										backgroundColor:
											theme === "dark" ? "var(--color-surface-dark)" : "var(--color-surface)",
										boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
									}}
								/>

								<Legend
									verticalAlign="top"
									align="right"
									wrapperStyle={{
										fontSize: 12,
										color:
											theme === "dark" ? "var(--color-text-muted-dark)" : "var(--color-text-muted)",
									}}
								/>

								<Bar
									dataKey="amount"
									name="Spend"
									fill={theme === "dark" ? "var(--color-accent-dark)" : "var(--color-accent)"}
									radius={[6, 6, 0, 0]}
									maxBarSize={50}
									animationDuration={800}
									onMouseOver={(e) => {
										if (e && e.target) e.target.style.opacity = 0.8;
									}}
									onMouseOut={(e) => {
										if (e && e.target) e.target.style.opacity = 1;
									}}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default VendorChart;
