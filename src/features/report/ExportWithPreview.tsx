import { useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import PreviewModal from "./PreviewModal";
import { exportDashboardPdf } from "./exportPdf";
import { useReportStore } from "./useReportStore";

export default function ExportWithPreview() {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const { isPreview, setIsPreview } = useReportStore();

	useEffect(() => {
		console.log(isPreview);
		const preview = async () => {
			if (isPreview) await handlePreview();
			setIsPreview(false);
		};
		preview();
	}, [isPreview]);

	const handlePreview = async () => {
		const report = document.getElementById("dashboard-report");
		if (!report) return;

		// Ensure element is fully visible and scrolled to top
		window.scrollTo(0, 0);

		const canvas = await html2canvas(report, {
			scale: 2,
			backgroundColor: "#ffffff",
			useCORS: true,
			scrollY: -window.scrollY, // capture from top
			windowWidth: report.scrollWidth,
			windowHeight: report.scrollHeight,
		});

		setPreviewImage(canvas.toDataURL("image/png"));
	};

	const handleExport = async () => {
		await exportDashboardPdf();
	};

	return (
		<>
			<button
				onClick={handlePreview}
				className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Preview PDF
			</button>

			{previewImage && (
				<PreviewModal
					image={previewImage}
					onClose={() => setPreviewImage(null)}
					onExport={handleExport}
				/>
			)}
		</>
	);
}
