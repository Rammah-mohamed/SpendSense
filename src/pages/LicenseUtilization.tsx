import UtilizationTable from "@/components/LicenseUtilization/UtilizationTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { groupLicensesByTool, underutilizationAlerts } from "@/functions/calculateUtilization";
import { getLicenseUtilization } from "@/lib/queries";
import type { License } from "@/types/Data";
import { useEffect, useMemo, useState } from "react";

const LicenseUtilization = () => {
  const [licenseData, setLicenseData] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLicenseUtilization();
        setLicenseData(data);
      } catch (err) {
        console.error("Failed to load license utilization data", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedLicenses = useMemo(() => {
    return groupLicensesByTool(licenseData);
  }, [licenseData]);

  const underUtiliztion = useMemo(() => {
    return underutilizationAlerts(licenseData);
  }, [licenseData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <UtilizationTable data={groupedLicenses} underUtilization={underUtiliztion} />
    </div>
  );
};

export default LicenseUtilization;
