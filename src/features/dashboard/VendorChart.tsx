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

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

export const VendorChart = () => {
	const filtered = useFilteredData();

	const vendorTotals = filtered.reduce((acc, r) => {
		acc[r.vendor] = (acc[r.vendor] || 0) + r.amount;
		return acc;
	}, {} as Record<string, number>);

	const data = Object.entries(vendorTotals).map(([vendor, amount]) => ({
		vendor,
		amount,
	}));

	return (
		<div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
			<h3 className="font-semibold text-gray-800 mb-6 text-lg">Top Vendors by Spend</h3>

			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 50 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
					<XAxis
						dataKey="vendor"
						angle={-20}
						textAnchor="end"
						interval={0}
						height={70}
						tick={{ fontSize: 12, fill: "#6b7280" }}
					/>
					<YAxis
						tickFormatter={(value) => formatCurrency(value)}
						tick={{ fontSize: 12, fill: "#6b7280" }}
					/>
					<Tooltip
						formatter={(value: number) => formatCurrency(value)}
						cursor={{ fill: "rgba(59,130,246,0.08)" }}
						contentStyle={{
							borderRadius: "8px",
							borderColor: "#e5e7eb",
							backgroundColor: "#ffffff",
							boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
						}}
					/>
					<Legend
						verticalAlign="top"
						align="right"
						wrapperStyle={{ fontSize: 12, color: "#6b7280" }}
					/>
					<Bar
						dataKey="amount"
						name="Spend"
						fill="#3b82f6"
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
	);
};
