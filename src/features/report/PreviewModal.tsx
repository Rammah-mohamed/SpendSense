// components/PreviewModal.tsx
import { useEffect, useRef } from "react";

interface PreviewModalProps {
	image: string;
	onClose: () => void;
	onExport: () => void;
}

export default function PreviewModal({ image, onClose, onExport }: PreviewModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

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
		<div
			ref={modalRef}
			onClick={handleClick}
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
		>
			<div className="bg-white rounded-xl shadow-xl w-[900px] max-h-[95vh] flex flex-col">
				<div className="flex justify-between items-center px-6 py-3 border-b">
					<h2 className="font-semibold text-gray-800">Report Preview</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-xl leading-none"
					>
						✕
					</button>
				</div>

				{/* Centered A4 Image */}
				<div className="flex-1 overflow-auto bg-gray-100 flex justify-center items-center p-4">
					<div className="bg-white shadow-md rounded-md p-4 flex justify-center">
						<img
							src={image}
							alt="PDF preview"
							className="w-[595px] h-auto max-h-[842px] object-contain border border-gray-200"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
					>
						Cancel
					</button>
					<button
						onClick={onExport}
						className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
					>
						Download PDF
					</button>
				</div>
			</div>
		</div>
	);
}
