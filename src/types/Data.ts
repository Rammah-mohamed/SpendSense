export type Tool = {
  id: string;
  name: string;
  category: string;
  monthly_cost: number | string;
  yearly_cost: number | string;
  renewal_date: string;
  departments: { name: string } | string;
};

export type LicenseUtilization = {
  id: string;
  is_active: boolean;
  tool?: { id: string; name: string };
  assigned_at: string;
  users: {
    full_name: string;
    email: string;
  }[];
};

export type SortedLicenseUtilization = {
  toolId: string;
  toolName: string;
  totalLicenses: number;
  activeLicenses: number;
  utilization: number;
};
