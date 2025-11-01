import { useState } from "react";
import { useAIChat } from "./useAIChat";
import type { SpendRecord } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSend } from "@tabler/icons-react";

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
		<form
			onSubmit={handleSend}
			className="flex items-center gap-2 w-full px-3 py-2 rounded-xl shadow-inner"
			style={{
				backgroundColor: "var(--color-surface)",
				border: `1px solid var(--color-border)`,
			}}
		>
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Ask about your spend data..."
				className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm"
				style={
					{
						color: "var(--color-text)",
						"--tw-placeholder-color": "var(--color-text-muted)",
					} as React.CSSProperties
				}
			/>
			<Button
				type="submit"
				size="icon"
				disabled={!query.trim()}
				className="rounded-full h-9 w-9 transition-all hover:scale-105 cursor-pointer"
				style={{
					backgroundColor: "var(--color-accent)",
					color: "var(--color-surface)",
				}}
			>
				<IconSend className="h-4 w-4" />
			</Button>
		</form>
	);
}
