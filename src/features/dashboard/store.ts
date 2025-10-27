import { create } from "zustand";

type DashboardState = {
	department: string | null;
	dateRange: { start: string | null; end: string | null };
	setDepartment: (dept: string | null) => void;
	setDateRange: (range: { start: string | null; end: string | null }) => void;
	reset: () => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
	department: null,
	dateRange: { start: null, end: null },
	setDepartment: (department) => set({ department }),
	setDateRange: (dateRange) => set({ dateRange }),
	reset: () =>
		set({
			department: null,
			dateRange: { start: null, end: null },
		}),
}));
