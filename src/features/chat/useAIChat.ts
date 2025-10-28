import { queryAI } from "./aiClient";
import { useChatStore } from "./useChatStore";

export function useAIChat() {
	const { messages, addMessage, setTyping } = useChatStore();

	const sendMessage = async (query: string, contextData?: any) => {
		addMessage("user", query);
		setTyping(true);

		const response = await queryAI(query, contextData);
		setTyping(false);
		addMessage("ai", response);
	};

	return { messages, sendMessage };
}
