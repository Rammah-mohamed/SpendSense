import { useDashboardStore } from "./store";

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

	return (
		<div className="flex flex-wrap gap-4 mb-6 items-center">
			{/* Department Filter */}
			<div className="flex flex-col">
				<label htmlFor="department" className="text-sm font-medium text-gray-700 mb-1">
					Department
				</label>
				<select
					id="department"
					value={department || ""}
					onChange={(e) => setDepartment(e.target.value || null)}
					className="border rounded p-2 min-w-[180px]"
				>
					<option value="">All Departments</option>
					{departments.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</div>

			{/* Renewal Date Range Filter */}
			<div className="flex flex-col">
				<label htmlFor="dateRange" className="text-sm font-medium text-gray-700 mb-1">
					Renewal Date Range
				</label>
				<div id="dateRange" className="flex items-center gap-2">
					<label htmlFor="startDate" className="text-xs text-gray-600 whitespace-nowrap">
						From:
					</label>
					<input
						id="startDate"
						type="date"
						value={dateRange.start || ""}
						onChange={(e) => setDateRange({ ...dateRange, start: e.target.value || null })}
						className="border rounded p-2"
					/>
					<label htmlFor="endDate" className="text-xs text-gray-600 whitespace-nowrap">
						To:
					</label>
					<input
						id="endDate"
						type="date"
						value={dateRange.end || ""}
						onChange={(e) => setDateRange({ ...dateRange, end: e.target.value || null })}
						className="border rounded p-2"
					/>
				</div>
			</div>

			{/* Reset Button */}
			<button onClick={reset} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 mt-6">
				Reset
			</button>
		</div>
	);
};
