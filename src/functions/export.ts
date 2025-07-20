import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportAsCSV = <T extends Record<string, unknown>>(data: T[]) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "export.csv";
  a.click();

  window.URL.revokeObjectURL(url);
};

export const exportAsImage = async (ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return;

  const canvas = await html2canvas(ref.current);
  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `chart-${new Date().toISOString()}.png`;
  link.click();
};

export const exportAsPDF = async (ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return;

  const canvas = await html2canvas(ref.current);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("landscape");
  pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
  pdf.save(`chart-${new Date().toISOString()}.pdf`);
};
