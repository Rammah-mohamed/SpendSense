import type { License, Tool, ActiveLicense, ToolUsage, LicensesWithTools } from "@/types/dataTypes";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";
import { formatCurrency } from "@/functions/formatCurrency";

// src/lib/queries.ts
export async function getUpcomingRenewalsWithUtilization() {
  const today = new Date();
  const sixtyDaysFromNow = new Date();
  sixtyDaysFromNow.setDate(today.getDate() + 60);

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      id,
      name,
      monthly_cost,
      renewal_date,
      licenses (
        is_active
      )
    `,
    )
    .gte("renewal_date", today.toISOString())
    .lte("renewal_date", sixtyDaysFromNow.toISOString())
    .order("renewal_date", { ascending: true });

  if (error) throw error;

  // Add utilization to each tool
  return data.map((tool) => {
    const total = tool.licenses.length;
    const active = tool.licenses.filter((l) => l.is_active).length;
    const utilization = total > 0 ? (active / total) * 100 : 0;
    return {
      ...tool,
      utilization,
      activeLicenses: active,
      totalLicenses: total,
    };
  });
}

export async function getTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("id, name, category, monthly_cost, renewal_date, departments (name)");

  if (error) throw error;
  return data as unknown as Tool[];
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("userss").select("id, department_id");

  if (error) throw error;
  return data as unknown as User[];
}

export async function getLicenseUtilization(): Promise<License[]> {
  const { data, error } = await supabase.from("licenses").select(`
      id,
      tool_id, 
      user_id,
      is_active,
      tools (
        id,
        name,
        monthly_cost,
        department_id,
        departments ( name )
      )
    `);

  if (error) throw error;
  return data as unknown as License[];
}

export async function getActiveLicenseWithCost(): Promise<ActiveLicense[]> {
  const { data, error } = await supabase
    .from("licenses")
    .select(`tool_id, assigned_at, tools(name, monthly_cost)`)
    .eq("is_active", true);

  if (error) throw error;
  return data as unknown as ActiveLicense[];
}

export async function getLicenseWithTools(): Promise<ToolUsage[]> {
  const { data, error } = (await supabase.from("licenses").select(`
    tool_id,
    is_active,
    tools (
      id,
      name,
      monthly_cost,
      category,
      department_id,
      departments ( name )
    )
  `)) as { data: LicensesWithTools[] | null; error: unknown };

  const usageMap = new Map<string, ToolUsage>();
  data?.forEach((license) => {
    const tool = license.tools;
    const key = tool.id;

    if (!usageMap.has(key)) {
      usageMap.set(key, {
        id: tool.id,
        name: tool.name,
        category: tool.category,
        monthlyCost: tool.monthly_cost,
        department: tool.departments?.name || "Unknown",
        totalLicenses: 0,
        activeLicenses: 0,
        usagePercent: 0,
      });
    }

    const usage = usageMap.get(key)!;
    usage.totalLicenses += 1;
    if (license.is_active) usage.activeLicenses += 1;
  });

  const result = Array.from(usageMap.values()).map((tool) => {
    const percent =
      tool.totalLicenses > 0 ? Math.round((tool.activeLicenses / tool.totalLicenses) * 100) : 0;

    const cost = formatCurrency(tool.totalLicenses * tool.monthlyCost);

    const action = percent < 80 ? "Keep" : percent < 50 ? "Investigate" : "Recommend Cancel";

    return { ...tool, usagePercent: percent, cost, action };
  });

  if (error) throw error;
  return result;
}
