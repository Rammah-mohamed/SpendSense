import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MessageBubble({ role, content }: { role: "user" | "ai"; content: string }) {
	const isUser = role === "user";
	const { theme } = useTheme();
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
				className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm wrap-break-word
					${
						isUser
							? theme === "dark"
								? "bg-accent-dark text-surface"
								: "bg-accent text-surface"
							: theme === "dark"
							? "bg-surface-dark border border-border-dark text-text-dark"
							: "bg-surface border border-border text-text"
					}
				`}
			>
				{/* Markdown-enabled content (so AI can format nicely) */}
				<ReactMarkdown
					// className="prose prose-sm dark:prose-invert leading-relaxed"
					remarkPlugins={[remarkGfm]}
					components={{
						a: (props) => (
							<a
								{...props}
								className="text-accent hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							/>
						),
						code: (props) => (
							<code {...props} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono" />
						),
					}}
				>
					{content}
				</ReactMarkdown>
			</motion.div>
		</div>
	);
}
