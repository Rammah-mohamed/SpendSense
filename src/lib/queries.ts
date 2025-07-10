import type { LicensesWithTools, License, Tool, ActiveLicense } from "@/types/Data";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

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
      tool:tools (
        id,
        name
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

export async function getLicenseWithTools(): Promise<LicensesWithTools[]> {
  const { data, error } = await supabase.from("licenses").select(`
    tool_id,
    is_active,
    tools (
      id,
      name,
      category,
      department_id,
      departments ( name )
    )
  `);

  if (error) throw error;
  return data as unknown as LicensesWithTools[];
}
