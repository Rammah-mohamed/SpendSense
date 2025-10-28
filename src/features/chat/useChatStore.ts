// store/useChatStore.ts
import { create } from "zustand";

interface Message {
	id: string;
	role: "user" | "ai";
	content: string;
}

interface ChatState {
	messages: Message[];
	addMessage: (role: "user" | "ai", content: string) => void;
	isTyping: boolean;
	setTyping: (status: boolean) => void;
	clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
	messages: [],
	addMessage: (role, content) =>
		set((state) => ({
			messages: [...state.messages, { id: crypto.randomUUID(), role, content }],
		})),
	isTyping: false,
	setTyping: (status) => set({ isTyping: status }),
	clearChat: () => set({ messages: [] }),
}));
