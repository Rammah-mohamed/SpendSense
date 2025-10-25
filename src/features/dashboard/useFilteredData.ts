import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "./store";
import type { SpendRecord } from "@/types/types";

export function useFilteredData() {
	const queryClient = useQueryClient();
	const { department, dateRange } = useDashboardStore();

	const allData = (queryClient.getQueryData(["spendData"]) as SpendRecord[]) || [];

	const filtered = useMemo(() => {
		return allData.filter((r) => {
			if (department && r.department !== department) return false;

			if (dateRange) {
				const [start, end] = dateRange.map((d) => new Date(d).getTime());
				const renewal = new Date(r.renewalDate).getTime();
				if (renewal < start || renewal > end) return false;
			}

			return true;
		});
	}, [allData, department, dateRange]);

	return filtered;
}
