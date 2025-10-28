import { cn } from "@/lib/utils";

export function MessageBubble({ role, content }: { role: "user" | "ai"; content: string }) {
	const isUser = role === "user";
	return (
		<div className={cn("flex mb-3", isUser ? "justify-end" : "justify-start")}>
			<div
				className={cn(
					"max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
					isUser
						? "bg-blue-600 text-white rounded-br-none"
						: "bg-gray-100 text-gray-800 rounded-bl-none"
				)}
			>
				{content}
			</div>
		</div>
	);
}
