import UtilizationTable from "@/components/LicenseUtilization/UtilizationTable";
import { groupLicensesByTool } from "@/functions/groupLicensesByTool";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import type { LicenseUtilization } from "@/types/Data";
import { useMemo } from "react";

const LicenseUtilization = () => {
  // Fetch tools form supabase
  const {
    data: licenseUtilization,
    loading,
    error,
  } = useSupabaseData<LicenseUtilization>(
    "licenses",
    `id,
      is_active,
      tool:tools (
        id,
        name
      )`,
  );

  const groupedLicenses = useMemo(() => {
    return groupLicensesByTool(licenseUtilization);
  }, [licenseUtilization]);

  console.log(groupedLicenses);

  if (loading) return <div>{loading}</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <UtilizationTable data={groupedLicenses} />
    </div>
  );
};

export default LicenseUtilization;
