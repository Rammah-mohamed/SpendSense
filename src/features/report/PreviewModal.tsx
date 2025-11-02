// components/PreviewModal.tsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconDownload, IconX } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

interface PreviewModalProps {
	image: string;
	onClose: () => void;
	onExport: () => void;
}

export default function PreviewModal({ image, onClose, onExport }: PreviewModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();

	// Close on background click
	const handleClick = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) onClose();
	};

	// Close on ESC + disable background scroll
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleEsc);

		return () => {
			document.body.style.overflow = "auto";
			window.removeEventListener("keydown", handleEsc);
		};
	}, [onClose]);

	return (
		<AnimatePresence>
			<motion.div
				ref={modalRef}
				onClick={handleClick}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
			>
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.95, opacity: 0 }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					className={cn(
						"w-[900px] max-h-[95vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl",
						theme === "dark"
							? "bg-(--color-surface-dark) border-border-dark text-text-dark"
							: "bg-surface border-border text-text"
					)}
				>
					{/* Header */}
					<div
						className={cn(
							"flex items-center justify-between px-6 py-3 border-b",
							theme === "dark" ? "border-border-dark" : "border-border"
						)}
					>
						<h2 className="font-semibold text-base">Report Preview</h2>
						<Button
							size="icon"
							variant="ghost"
							onClick={onClose}
							className={cn(
								"h-8 w-8 hover:opacity-90 cursor-pointer transition-all",
								theme === "dark"
									? "text-text-muted-dark hover:text-text-dark"
									: "text-text-muted hover:text-text"
							)}
						>
							<IconX className="h-5 w-5" />
						</Button>
					</div>

					{/* Centered A4 Image */}
					<div
						className={cn(
							"flex-1 overflow-auto flex justify-center items-center p-4",
							theme === "dark" ? "bg-bg-dark" : "bg-bg"
						)}
					>
						<Card
							className={cn(
								"p-3 flex justify-center rounded-lg shadow-md",
								theme === "dark"
									? "bg-(--color-surface-dark) border-border-dark"
									: "bg-surface border-border"
							)}
						>
							<img
								src={image}
								alt="PDF Preview"
								className={cn(
									"w-[595px] h-auto max-h-[842px] object-contain rounded-md border",
									theme === "dark" ? "border-border-dark" : "border-border"
								)}
							/>
						</Card>
					</div>

					{/* Footer */}
					<div
						className={cn(
							"flex justify-end gap-3 px-6 py-4 border-t",
							theme === "dark"
								? "bg-(--color-sidebar-dark) border-border-dark"
								: "bg-sidebar border-border"
						)}
					>
						<Button
							variant="outline"
							onClick={onClose}
							className={cn(
								"hover:opacity-85 transition-all",
								theme === "dark" ? "border-border-dark text-text-dark" : "border-border text-text"
							)}
						>
							Cancel
						</Button>

						<Button
							onClick={onExport}
							className={cn(
								"transition-all hover:opacity-90 flex items-center",
								theme === "dark"
									? "bg-(--color-accent-dark) text-(--color-surface-dark) hover:bg-(--color-accent-hover-dark)"
									: "bg-accent text-surface hover:bg-accent-hover"
							)}
						>
							<IconDownload className="mr-2 h-4 w-4" />
							Download PDF
						</Button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
