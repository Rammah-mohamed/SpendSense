export function getRenewalUrgencyColor(renewalDate: string): "red" | "yellow" | "green" {
  const today = new Date();
  const renewal = new Date(renewalDate);
  const diffDays = Math.ceil((+renewal - +today) / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) return "red";
  if (diffDays <= 30) return "yellow";
  return "green";
}

export function getUnderUtilizationColor(risk: string): "red" | "yellow" | "green" {
  if (risk === "High") return "red";
  if (risk === "Medium") return "yellow";
  return "green";
}
