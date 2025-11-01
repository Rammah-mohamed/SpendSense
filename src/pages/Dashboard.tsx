import { Filters } from "../features/dashboard/Filters";
import { VendorChart } from "../features/dashboard/VendorChart";
import { DepartmentChart } from "../features/dashboard/DepartmentChart";
import { useFilteredData } from "../features/dashboard/useFilteredData";
import { computeSummary } from "@/features/dashboard/computeSummary";
import { SummaryCards } from "@/features/dashboard/SummaryCards";
import { useTheme } from "@/context/ThemeContext";
import { ChatToggle } from "@/features/chat/ChatToggle";
import ExportWithPreview from "@/features/report/ExportWithPreview";

const Dashboard = () => {
	const filtered = useFilteredData();
	const { theme } = useTheme();

	const summary = computeSummary(filtered);

	return (
		<div className={`p-8${theme === "dark" ? "bg-bg-dark" : "bg-bg"} min-h-screen`}>
			<h1 className="text-2xl font-bold mb-6">SpendSense Dashboard</h1>
			<Filters />
			<ExportWithPreview />
			{filtered.length === 0 ? (
				<p className="text-gray-500 text-center mt-12">
					No data available. Please upload a CSV file first.
				</p>
			) : (
				<div className="flex flex-col gap-4">
					<div id="dashboard-report">
						<SummaryCards data={summary} />
						<VendorChart />
						<DepartmentChart />
					</div>
					<ChatToggle contextData={filtered} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
