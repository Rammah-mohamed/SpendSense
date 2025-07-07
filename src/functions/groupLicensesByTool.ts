import type { License } from "@/types/Data";

export const groupLicensesByTool = (licenses: License[]) => {
  const summary = new Map();

  licenses.forEach(({ is_active, tool }) => {
    const key = tool?.id;
    if (!summary.has(key)) {
      summary.set(key, {
        toolId: tool?.id,
        toolName: tool?.name,
        totalLicenses: 0,
        activeLicenses: 0,
      });
    }

    const toolData = summary.get(key);
    toolData.totalLicenses += 1;
    if (is_active) toolData.activeLicenses += 1;
    toolData.utilization = Number(
      ((toolData.activeLicenses / toolData.totalLicenses) * 100).toFixed(2),
    );
  });

  return Array.from(summary.values());
};
