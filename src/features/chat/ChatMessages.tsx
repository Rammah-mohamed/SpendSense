// src/components/Chat/ChatMessages.tsx
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ChatMessagesProps {
	messages: {
		id: string;
		role: "user" | "ai";
		content: string;
	}[];
	isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	// Auto-scroll to bottom whenever messages update
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	if (!messages || messages.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
				<p>Start chatting with SpendSense AI 💬</p>
				<p>Ask about your spend, renewals, or vendors!</p>
			</div>
		);
	}

	return (
		<ScrollArea ref={scrollRef} className="flex-1 p-4">
			{messages.map((m) => (
				<MessageBubble key={m.id} role={m.role} content={m.content} />
			))}
			{isTyping && <div className="text-sm text-gray-500 italic">SpendSense AI is thinking…</div>}
		</ScrollArea>
	);
}
