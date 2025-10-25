import { create } from "zustand";

interface FilterState {
	department: string | null;
	dateRange: [string, string] | null;
	setDepartment: (dept: string | null) => void;
	setDateRange: (range: [string, string] | null) => void;
	reset: () => void;
}

export const useDashboardStore = create<FilterState>((set) => ({
	department: null,
	dateRange: null,
	setDepartment: (department) => set({ department }),
	setDateRange: (dateRange) => set({ dateRange }),
	reset: () => set({ department: null, dateRange: null }),
}));
