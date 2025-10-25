import { useDashboardStore } from "./store";

export const Filters = () => {
	const { department, setDepartment, reset } = useDashboardStore();

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

	return (
		<div className="flex gap-4 mb-6 items-center">
			<select
				value={department || ""}
				onChange={(e) => setDepartment(e.target.value || null)}
				className="border rounded p-2"
			>
				<option value="">All Departments</option>
				{departments.map((d) => (
					<option key={d} value={d}>
						{d}
					</option>
				))}
			</select>

			<button onClick={reset} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
				Reset
			</button>
		</div>
	);
};
