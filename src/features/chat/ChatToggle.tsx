// components/chat/ChatToggle.tsx
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { IconMessageChatbot } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";

export function ChatToggle({ contextData }: any) {
	const [open, setOpen] = useState(false);
	const { theme } = useTheme();

	return (
		<>
			{/* Floating Chat Button */}
			<AnimatePresence>
				{!open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ duration: 0.25 }}
						className="fixed bottom-6 right-6 z-40"
					>
						<Button
							onClick={() => setOpen(true)}
							size="icon"
							className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer
								${
									theme === "dark"
										? "bg-accent-dark hover:bg-accent-hover-dark text-surface-dark"
										: "bg-accent hover:bg-accent-hover text-surface"
								}
							`}
						>
							<IconMessageChatbot className="h-6 w-6" />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Chat Panel */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						transition={{ type: "spring", stiffness: 300, damping: 25 }}
						className="fixed bottom-0 right-0 z-40 w-full md:w-[420px] h-[80vh] md:h-[85vh] p-2"
					>
						<div
							className={`relative w-full h-full rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300
								${theme === "dark" ? "bg-surface-dark border-border-dark" : "bg-surface border-border"}
							`}
						>
							<ChatPanel onClose={() => setOpen(false)} contextData={contextData} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
