// components/Chat/ChatPanel.tsx
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatStore } from "./useChatStore";
import type { SpendRecord } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash, IconX } from "@tabler/icons-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "@/context/ThemeContext";

type ChatPanelProps = {
	contextData: SpendRecord[];
	onClose: () => void;
};

export function ChatPanel({ contextData, onClose }: ChatPanelProps) {
	const { messages, isTyping } = useChatStore();
	const { theme } = useTheme();
	const clearChat = useChatStore((s) => s.clearChat);

	return (
		<Card
			className={`flex flex-col w-full h-full rounded-2xl overflow-hidden border shadow-xl transition-colors duration-300
				${
					theme === "dark"
						? "bg-surface-dark border-border-dark text-text-dark"
						: "bg-surface border-border text-text"
				}
			`}
		>
			{/* Header */}
			<CardHeader
				className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-300
					${theme === "dark" ? "border-border-dark" : "border-border"}
				`}
			>
				<div className="flex items-center gap-2">
					<div
						className={`h-2.5 w-2.5 rounded-full animate-pulse
							${theme === "dark" ? "bg-success-dark" : "bg-success"}
						`}
					/>
					<h3 className="font-medium text-sm">SpendSense AI</h3>
				</div>

				<div className="flex items-center gap-1.5">
					<Button
						variant="ghost"
						size="icon"
						onClick={clearChat}
						title="Clear chat"
						className={`h-8 w-8 hover:opacity-80 transition-colors
							${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}
						`}
					>
						<IconTrash className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						title="Close"
						className={`h-8 w-8 hover:opacity-80 transition-colors
							${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}
						`}
					>
						<IconX className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>

			{/* Messages */}
			<CardContent
				className={`flex-1 overflow-y-auto px-4 py-3 scroll-smooth transition-colors duration-300
					${theme === "dark" ? "bg-bg-dark" : "bg-bg"}
				`}
			>
				<ChatMessages messages={messages} isTyping={isTyping} />
			</CardContent>

			{/* Divider */}
			<Separator
				className={`transition-colors duration-300
					${theme === "dark" ? "border-border-dark" : "border-border"}
				`}
			/>

			{/* Input */}
			<CardFooter
				className={`p-3 border-t transition-colors duration-300
					${theme === "dark" ? "border-border-dark bg-surface-dark" : "border-border bg-surface"}
				`}
			>
				<ChatInput contextData={contextData} />
			</CardFooter>
		</Card>
	);
}
