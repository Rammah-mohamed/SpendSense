export function MessageBubble({ role, content }: { role: "user" | "ai"; content: string }) {
	const isUser = role === "user";
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className="max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm"
				style={{
					backgroundColor: isUser ? "var(--color-accent)" : "var(--color-surface)",
					color: isUser ? "var(--color-surface)" : "var(--color-text)",
					border: isUser ? "none" : `1px solid var(--color-border)`,
				}}
			>
				{content}
			</div>
		</div>
	);
}
