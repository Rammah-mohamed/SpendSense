import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export async function exportDashboardPdf() {
	const report = document.getElementById("dashboard-report");
	if (!report) return;

	// Capture element → Canvas
	const canvas = await html2canvas(report, {
		scale: 2, // crisp quality
		useCORS: true,
		backgroundColor: "#ffffff", // white background for clean export
	});

	const imgData = canvas.toDataURL("image/png");
	const pdf = new jsPDF({
		orientation: "portrait",
		unit: "pt",
		format: "a4",
	});

	const pageWidth = pdf.internal.pageSize.getWidth();
	const pageHeight = pdf.internal.pageSize.getHeight();

	// Maintain aspect ratio
	const imgWidth = pageWidth - 40; // margins (20pt each side)
	const imgHeight = (canvas.height * imgWidth) / canvas.width;

	// Center vertically if shorter than one page
	const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

	pdf.addImage(imgData, "PNG", 20, yOffset, imgWidth, imgHeight);

	const timestamp = new Date().toISOString().split("T")[0];
	pdf.save(`SpendSense_Report_${timestamp}.pdf`);
}
