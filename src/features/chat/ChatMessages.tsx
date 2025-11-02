// src/components/Chat/ChatMessages.tsx
import { useEffect, useRef } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { useTheme } from "@/context/ThemeContext";

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
	const { theme } = useTheme();

	// Auto-scroll to bottom whenever messages update
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	if (!messages || messages.length === 0) {
		return (
			<div
				className={`flex flex-col items-center justify-center h-full text-center px-6 transition-colors duration-300
					${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}
				`}
			>
				<p className="font-medium text-sm">Start chatting with SpendSense AI 💬</p>
				<p className="text-xs mt-1">Ask about your spend, renewals, or vendors.</p>
			</div>
		);
	}

	return (
		<ScrollArea
			className={`flex-1 px-3 py-4 transition-colors duration-300
				${theme === "dark" ? "bg-bg-dark" : "bg-bg"}
			`}
		>
			<div className="flex flex-col gap-3">
				<AnimatePresence>
					{messages.map((m: any) => (
						<motion.div
							key={m.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.2 }}
						>
							<MessageBubble role={m.role} content={m.content} />
						</motion.div>
					))}
				</AnimatePresence>

				{isTyping && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`text-xs italic ml-3 mt-1 transition-colors duration-300
							${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}
						`}
					>
						SpendSense AI is thinking…
					</motion.div>
				)}
			</div>
		</ScrollArea>
	);
}
