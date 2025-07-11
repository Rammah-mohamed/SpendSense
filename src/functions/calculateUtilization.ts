import type { License } from "@/types/Data";
import { formatCurrency } from "./formatCurrency";

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
      ((toolData.activeLicenses / toolData.totalLicenses) * 100).toFixed(1),
    );
  });

  return Array.from(summary.values());
};

export const underutilizationAlerts = (licenses: License[]) => {
  const usageMap = new Map<
    string,
    {
      name: string;
      totalLicenses: number;
      activeLicenses: number;
      costPerLicense: number;
    }
  >();

  licenses.forEach((license) => {
    const tool = license.tool;
    const key = tool.name;

    if (!usageMap.has(key)) {
      usageMap.set(key, {
        name: tool.name,
        totalLicenses: 0,
        activeLicenses: 0,
        costPerLicense: license.tool.monthly_cost,
      });
    }

    const entry = usageMap.get(key)!;
    entry.totalLicenses += 1;
    if (license.is_active) entry.activeLicenses += 1;
  });

  const alerts = Array.from(usageMap.values())
    .map((tool) => {
      const unused = tool.totalLicenses - tool.activeLicenses;
      const utilization = (tool.activeLicenses / tool.totalLicenses) * 100;
      const wasted = unused * tool.costPerLicense;

      const riskLevel =
        utilization < 60 && wasted > 100
          ? "High"
          : utilization < 80 && wasted > 60
          ? "Medium"
          : "Low";

      const action =
        utilization < 60 && wasted > 100
          ? "Reclaim Licenses"
          : utilization < 80 && wasted > 60
          ? "Investigate Usage"
          : "Keep Licenses";

      const wastedCost = formatCurrency(wasted);

      return {
        name: tool.name,
        utilization: Math.round(utilization),
        wastedCost,
        riskLevel,
        action,
      };
    })
    .sort((a, b) => Number(b.wastedCost.slice(1)) - Number(a.wastedCost.slice(1)));

  return alerts;
};
