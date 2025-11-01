import { useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "../dashboard/useDashboardStore";
import { useChatStore } from "./useChatStore";
import { queryAI } from "./aiClient";
import { exportDashboardPdf } from "../report/exportPdf";
import { useReportStore } from "../report/useReportStore";

/**
 * AI chat hook — connects Groq API to dashboard data and charts.
 * Uses structured actions to trigger filters or summaries automatically.
 */
export function useAIChat() {
	const { addMessage, setIsTyping } = useChatStore();
	const queryClient = useQueryClient();
	const { setDepartment, setDateRange, reset } = useDashboardStore();
	const { setIsPreview } = useReportStore();

	async function sendMessage(query: string, contextData?: any) {
		if (!query.trim()) return;

		// Pull spend data from cache if no explicit context provided
		const allData = contextData || queryClient.getQueryData(["spendData"]) || [];

		const structuredContext = {
			recordCount: Array.isArray(allData) ? allData.length : 0,
			sampleRecords: Array.isArray(allData) ? allData.slice(0, 10) : [],
		};

		addMessage("user", query);
		setIsTyping(true);

		try {
			// Call centralized AI client
			const { reply, action } = await queryAI(query, structuredContext);

			// Add AI reply to chat
			addMessage("ai", reply);

			//structured actions (controlled AI automation)
			if (action) {
				switch (action.type) {
					case "SET_DEPARTMENT":
						setDepartment(action.payload);
						break;
					case "SET_DATE_RANGE":
						setDateRange(action.payload);
						break;
					case "EXPORT":
						await exportDashboardPdf();
						break;
					case "PREVIEW":
						setIsPreview(true);
						break;
					case "RESET_FILTERS":
						reset();
						break;
					default:
						if (action.type !== "NO_ACTION") {
							console.warn("Unknown AI action:", action);
						}
				}
			}
		} catch (err) {
			console.error("AI chat failed:", err);
			addMessage("ai", "⚠️ Error while sending message to AI.");
		} finally {
			setIsTyping(false);
		}
	}

	return { sendMessage };
}
