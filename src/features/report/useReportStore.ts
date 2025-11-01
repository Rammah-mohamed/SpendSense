import { create } from "zustand";

interface ReportState {
	isPreview: boolean;
	setIsPreview: (status: boolean) => void;
}

export const useReportStore = create<ReportState>((set) => ({
	isPreview: false,
	setIsPreview: (status) => set({ isPreview: status }),
}));
