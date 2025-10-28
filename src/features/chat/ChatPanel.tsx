// components/Chat/ChatPanel.tsx
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatStore } from "./useChatStore";
import type { SpendRecord } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

type ChatPanelProps = {
	contextData: SpendRecord[];
	onClose: () => void;
};

export function ChatPanel({ contextData, onClose }: ChatPanelProps) {
	const { messages, isTyping } = useChatStore();
	const clearChat = useChatStore((s) => s.clearChat);

	return (
		<Card className="flex flex-col w-full md:w-[360px] h-full border-l bg-white shadow-xl rounded-none">
			<CardHeader className="flex items-center justify-between p-3 border-b">
				<h3 className="font-semibold text-gray-800 text-sm flex items-center gap-1">
					💬 SpendSense AI
				</h3>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm" onClick={clearChat} className="text-xs">
						Clear
					</Button>
					<Button variant="ghost" size="sm" onClick={onClose}>
						<IconX className="w-4 h-4" />
					</Button>
				</div>
			</CardHeader>

			<CardContent className="flex-1 overflow-hidden">
				<ChatMessages messages={messages} isTyping={isTyping} />
			</CardContent>

			<Separator />
			<CardFooter className="p-0">
				<ChatInput contextData={contextData} />
			</CardFooter>
		</Card>
	);
}
