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

			if (dateRange.start || dateRange.end) {
				const renewalDate = new Date(r.renewalDate).getTime();
				const afterStart = !dateRange.start || renewalDate >= new Date(dateRange.start).getTime();
				const beforeEnd = !dateRange.end || renewalDate <= new Date(dateRange.end).getTime();
				if (!afterStart || !beforeEnd) return false;
			}

			return true;
		});
	}, [allData, department, dateRange]);

	return filtered;
}
