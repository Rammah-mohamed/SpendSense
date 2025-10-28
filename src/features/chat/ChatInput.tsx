import { useState } from "react";
import { useAIChat } from "./useAIChat";
import type { SpendRecord } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
	contextData: SpendRecord[];
};

export function ChatInput({ contextData }: ChatInputProps) {
	const [query, setQuery] = useState("");
	const { sendMessage } = useAIChat();

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;
		await sendMessage(query, contextData);
		setQuery("");
	};

	return (
		<form onSubmit={handleSend} className="border-t p-3 flex items-center gap-2 bg-white">
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="flex-1 border rounded-lg p-2 text-sm"
				placeholder="Ask about your spend data..."
			/>
			<Button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
				Send
			</Button>
		</form>
	);
}
