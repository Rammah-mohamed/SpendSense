// components/chat/ChatToggle.tsx
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { Button } from "@/components/ui/button";

export function ChatToggle({ contextData }: any) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && (
				<div className="fixed bottom-0 right-0 h-[80vh] w-full md:w-[360px] z-50">
					<ChatPanel onClose={() => setOpen(false)} contextData={contextData} />
				</div>
			)}
			{!open && (
				<Button
					onClick={() => setOpen(true)}
					className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
				>
					💬
				</Button>
			)}
		</>
	);
}
