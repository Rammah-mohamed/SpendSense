import ChartWrapper from "@/components/ChartWrapper";
import Dropdown from "@/components/Dropdown";
import UtilizationChart from "@/components/LicenseUtilization/UtilizationChart";
import UtilizationTable from "@/components/LicenseUtilization/UtilizationTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTheme } from "@/context/ThemeContext";
import {
  groupLicensesByDeparments,
  groupLicensesByTool,
  underutilizationAlerts,
} from "@/functions/calculateUtilization";
import { getLicenseUtilization } from "@/lib/queries";
import type { License } from "@/types/dataTypes";
import { useEffect, useMemo, useRef, useState } from "react";

const LicenseUtilization = () => {
  const [licenseData, setLicenseData] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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
    <div className="flex flex-col gap-10">
      <UtilizationTable data={groupedLicensesByTools} underUtilization={underUtiliztion} />
      <div
        className={`p-6 shadow-lg rounded-lg ${
          theme === "dark" ? "bg-surface-dark" : "bg-surface"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2
            className={`${theme === "dark" ? "text-text-dark" : "text-text"} font-semibold text-lg`}
          >
            Utilization Per Department
          </h2>
          <Dropdown ref={chartRef} text={["PDF", "PNG"]} />
        </div>
        <ChartWrapper
          title={"Tools License Utilization Per Department"}
          hasData={true}
          children={<UtilizationChart data={groupedLicensesByDepartments} />}
        />
      </div>
    </div>
  );
};

export default LicenseUtilization;
