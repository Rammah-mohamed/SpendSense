import UtilizationChart from "@/components/LicenseUtilization/UtilizationChart";
import UtilizationTable from "@/components/LicenseUtilization/UtilizationTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  groupLicensesByDeparments,
  groupLicensesByTool,
  underutilizationAlerts,
} from "@/functions/calculateUtilization";
import { getLicenseUtilization } from "@/lib/queries";
import type { License } from "@/types/dataTypes";
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

  const groupedLicensesByTools = useMemo(() => {
    return groupLicensesByTool(licenseData);
  }, [licenseData]);

  const groupedLicensesByDepartments = useMemo(() => {
    return groupLicensesByDeparments(licenseData);
  }, [licenseData]);

  const underUtiliztion = useMemo(() => {
    return underutilizationAlerts(licenseData);
  }, [licenseData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading data</p>;
  console.log(groupedLicensesByDepartments);
  return (
    <div>
      <UtilizationTable data={groupedLicensesByTools} underUtilization={underUtiliztion} />
      <UtilizationChart data={groupedLicensesByDepartments} />
    </div>
  );
};

export default LicenseUtilization;
