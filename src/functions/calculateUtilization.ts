import type { License } from "@/types/dataTypes";
import { formatCurrency } from "./formatCurrency";

export const groupLicensesByTool = (licenses: License[]) => {
  const summary = new Map();

  licenses.forEach(({ is_active, tools }) => {
    const key = tools?.id;
    if (!summary.has(key)) {
      summary.set(key, {
        toolId: tools?.id,
        toolName: tools?.name,
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

export const groupLicensesByDeparments = (licenses: License[]) => {
  type DepartmentToolUsage = {
    department: string;
    tool: string;
    totalLicenses: number;
    activeLicenses: number;
    utilization: number;
  };

  const usageMap = new Map<string, DepartmentToolUsage>();

  licenses.forEach((license) => {
    const key = `${license?.tools?.departments?.name}-${license?.tools?.name}`;

    if (!usageMap.has(key)) {
      usageMap.set(key, {
        department: license?.tools?.departments?.name,
        tool: license?.tools?.name,
        totalLicenses: 0,
        activeLicenses: 0,
        utilization: 0,
      });
    }

    const entry = usageMap.get(key)!;
    entry.totalLicenses += 1;
    if (license?.is_active) entry.activeLicenses += 1;
  });

  const usageMapArray = Array.from(usageMap.values()).map((entry) => ({
    ...entry,
    utilization: Math.round((entry.activeLicenses / entry.totalLicenses) * 100),
  }));

  const departmentMap = new Map<string, Record<string, unknown>>();

  usageMapArray.forEach(({ department, tool, utilization }) => {
    if (!departmentMap.has(department)) {
      departmentMap.set(department, { department });
    }

    departmentMap.get(department)![tool] = utilization;
  });

  const chartData = Array.from(departmentMap.values());

  return chartData;
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
    const tool = license?.tools;
    const key = tool?.name;

    if (!usageMap.has(key)) {
      usageMap.set(key, {
        name: tool?.name,
        totalLicenses: 0,
        activeLicenses: 0,
        costPerLicense: license?.tools?.monthly_cost,
      });
    }

    const entry = usageMap.get(key)!;
    entry.totalLicenses += 1;
    if (license?.is_active) entry.activeLicenses += 1;
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
