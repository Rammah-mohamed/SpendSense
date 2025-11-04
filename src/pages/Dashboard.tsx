import React, { Suspense, useEffect } from "react";
import { Filters } from "../features/dashboard/Filters";
import { useFilteredData } from "../features/dashboard/useFilteredData";
import { computeSummary } from "@/features/dashboard/computeSummary";
import { SummaryCards } from "@/features/dashboard/SummaryCards";
import { useTheme } from "@/context/ThemeContext";

// 🧩 Lazy-loaded heavy features
const VendorChart = React.lazy(() => import("../features/dashboard/VendorChart"));
const DepartmentChart = React.lazy(() => import("../features/dashboard/DepartmentChart"));
const ExportWithPreview = React.lazy(() => import("@/features/report/ExportWithPreview"));
const ChatToggle = React.lazy(() => import("@/features/chat/ChatToggle"));

const Dashboard = () => {
	const filtered = useFilteredData();
	const { theme } = useTheme();

	// 🧠 Compute summary only when filtered data changes
	const summary = computeSummary(filtered);

	// 🚀 Preload heavy chunks right after first paint for snappier interaction later
	useEffect(() => {
		import("../features/dashboard/VendorChart");
		import("../features/dashboard/DepartmentChart");
		import("@/features/report/ExportWithPreview");
		import("@/features/chat/ChatToggle");
	}, []);

	const isDark = theme === "dark";
	const textColor = isDark ? "text-text-dark" : "text-text";
	const bgColor = isDark ? "bg-bg-dark" : "bg-bg";

	return (
		<div className={`${bgColor} min-h-screen`}>
			<h1 className={`text-2xl font-bold mb-4 ${textColor}`}>SpendSense Dashboard</h1>

			<Filters />

			{/* Lazy-load export UI — not needed until after data exists */}
			<Suspense fallback={<p className="text-gray-500 text-center">Preparing export tools...</p>}>
				<ExportWithPreview />
			</Suspense>

			{filtered.length === 0 ? (
				<p className="text-gray-500 text-center mt-12">
					No data available. Please upload a CSV file first.
				</p>
			) : (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-4" id="dashboard-report">
						<SummaryCards data={summary} />

						{/* Lazy-load heavy charts */}
						<Suspense fallback={<p className="text-gray-500 text-center">Loading charts...</p>}>
							<VendorChart />
							<DepartmentChart />
						</Suspense>
					</div>

					{/* Lazy-load chat toggle — non-critical UI */}
					<Suspense fallback={null}>
						<ChatToggle contextData={filtered} />
					</Suspense>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
