// components/Chat/ChatPanel.tsx
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatStore } from "./useChatStore";
import type { SpendRecord } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash, IconX } from "@tabler/icons-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

type ChatPanelProps = {
	contextData: SpendRecord[];
	onClose: () => void;
};

export function ChatPanel({ contextData, onClose }: ChatPanelProps) {
	const { messages, isTyping } = useChatStore();
	const clearChat = useChatStore((s) => s.clearChat);

	return (
		<Card
			className="flex flex-col w-full h-full rounded-2xl overflow-hidden border shadow-xl"
			style={{
				backgroundColor: "var(--color-surface)",
				borderColor: "var(--color-border)",
				color: "var(--color-text)",
			}}
		>
			{/* Header */}
			<CardHeader
				className="flex items-center justify-between px-4 py-3 border-b"
				style={{ borderColor: "var(--color-border)" }}
			>
				<div className="flex items-center gap-2">
					<div
						className="h-2.5 w-2.5 rounded-full animate-pulse"
						style={{ backgroundColor: "var(--color-success)" }}
					/>
					<h3 className="font-medium text-sm">SpendSense AI</h3>
				</div>

				<div className="flex items-center gap-1.5">
					<Button
						variant="ghost"
						size="icon"
						onClick={clearChat}
						title="Clear chat"
						className="h-8 w-8 hover:opacity-80 cursor-pointer"
						style={{ color: "var(--color-text-muted)" }}
					>
						<IconTrash className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						title="Close"
						className="h-8 w-8 hover:opacity-80 cursor-pointer"
						style={{ color: "var(--color-text-muted)" }}
					>
						<IconX className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>

			{/* Messages */}
			<CardContent className="flex-1 overflow-y-auto px-4 py-3 scroll-smooth">
				<ChatMessages messages={messages} isTyping={isTyping} />
			</CardContent>

			<Separator style={{ borderColor: "var(--color-border)" }} />

			{/* Input */}
			<CardFooter
				className="p-3 border-t"
				style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
			>
				<ChatInput contextData={contextData} />
			</CardFooter>
		</Card>
	);
}
