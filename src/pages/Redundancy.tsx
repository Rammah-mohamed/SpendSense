import { useEffect, useMemo, useState } from "react";
import { getLicenseWithTools } from "@/lib/queries";
import type { ToolUsage } from "@/types/dataTypes";
import RedundancyHeatmap from "@/components/Redundancy/RedundancyHeatmap";
import LoadingSpinner from "@/components/LoadingSpinner";
import RedundancyTable from "@/components/Redundancy/RedundancyTable";

const Redundancy = () => {
  const [toolUsageData, setToolUsageData] = useState<ToolUsage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLicenseWithTools();
        setToolUsageData(data);
      } catch (err) {
        console.error("Failed to load license utilization data", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧠 Group tools by category
  const groupedByCategory = useMemo(() => {
    const map = new Map<string, ToolUsage[]>();

    toolUsageData.forEach((tool) => {
      if (!map.has(tool.category)) {
        map.set(tool.category, []);
      }
      map.get(tool.category)!.push(tool);
    });

    return Array.from(map.entries()).filter(([, tools]) => tools.length > 1);
  }, [toolUsageData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading data</p>;
  return (
    <div className="flex flex-col gap-4">
      <RedundancyHeatmap data={groupedByCategory} />
      <RedundancyTable data={groupedByCategory} />
    </div>
  );
};

export default Redundancy;
