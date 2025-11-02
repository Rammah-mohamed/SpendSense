import { useState } from "react";
import { useAIChat } from "./useAIChat";
import type { SpendRecord } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSend } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";

type ChatInputProps = {
	contextData: SpendRecord[];
};

export function ChatInput({ contextData }: ChatInputProps) {
	const [query, setQuery] = useState("");
	const { sendMessage } = useAIChat();
	const { theme } = useTheme();

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;
		await sendMessage(query, contextData);
		setQuery("");
	};

	return (
		<form
			onSubmit={handleSend}
			className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl shadow-inner border transition-colors duration-300
				${theme === "dark" ? "bg-surface-dark border-border-dark" : "bg-surface border-border"}
			`}
		>
			{/* Input Field */}
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Ask about your spend data..."
				className={`flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm placeholder:text-text-muted transition-colors
					${
						theme === "dark"
							? "text-text-dark placeholder:text-text-muted-dark"
							: "text-text placeholder:text-text-muted"
					}
				`}
			/>

			{/* Send Button */}
			<Button
				type="submit"
				size="icon"
				disabled={!query.trim()}
				className={`rounded-full h-9 w-9 transition-all duration-200 hover:scale-105
					${
						theme === "dark"
							? "bg-accent-dark hover:bg-accent-hover-dark text-surface-dark"
							: "bg-accent hover:bg-accent-hover text-surface"
					}
				`}
			>
				<IconSend className="h-4 w-4" />
			</Button>
		</form>
	);
}
