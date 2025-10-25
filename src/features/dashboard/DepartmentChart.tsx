import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useFilteredData } from "./useFilteredData";

const COLORS = [
	"#3b82f6", // Blue
	"#f97316", // Orange
	"#22c55e", // Green
	"#eab308", // Yellow
	"#8b5cf6", // Purple
	"#06b6d4", // Cyan
];

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

export const DepartmentChart = () => {
	const filtered = useFilteredData();

	const totals = filtered.reduce((acc, r) => {
		acc[r.department] = (acc[r.department] || 0) + r.amount;
		return acc;
	}, {} as Record<string, number>);

	const data = Object.entries(totals).map(([department, amount]) => ({
		department,
		amount,
	}));

	return (
		<div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
			<h3 className="font-semibold text-gray-800 mb-6 text-lg">Spend by Department</h3>
			<ResponsiveContainer width="100%" height={320}>
				<PieChart>
					<Pie
						data={data}
						dataKey="amount"
						nameKey="department"
						innerRadius={60}
						outerRadius={110}
						paddingAngle={4}
						stroke="#fff"
						strokeWidth={2}
						label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
					>
						{data.map((_, i) => (
							<Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
						))}
					</Pie>
					<Tooltip
						formatter={(value: number) => formatCurrency(value)}
						contentStyle={{
							borderRadius: "8px",
							borderColor: "#e5e7eb",
							backgroundColor: "#ffffff",
							boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
						}}
					/>
					<Legend
						layout="horizontal"
						verticalAlign="bottom"
						align="center"
						wrapperStyle={{ paddingTop: "12px" }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
