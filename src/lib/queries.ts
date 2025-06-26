import type { LicenseUtilization, Tool } from "@/types/Data";
import { supabase } from "./supabase";

export async function getUpcomingRenewals() {
  const today = new Date();
  const sixtyDaysFromNow = new Date();
  sixtyDaysFromNow.setDate(today.getDate() + 60);

  const { data, error } = await supabase
    .from("tools")
    .select("id, name, renewal_date, monthly_cost")
    .gte("renewal_date", today.toISOString())
    .lte("renewal_date", sixtyDaysFromNow.toISOString())
    .order("renewal_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("id, name, category, monthly_cost, renewal_date, departments (name)");

  if (error) throw error;
  return data as unknown as Tool[];
}

export async function getLicenseUtilization(): Promise<LicenseUtilization[]> {
  const { data, error } = await supabase.from("licenses").select(`
      id,
      is_active,
      tool:tools (
        id,
        name
      )
    `);

  if (error) throw error;
  return data as unknown as LicenseUtilization[];
}
