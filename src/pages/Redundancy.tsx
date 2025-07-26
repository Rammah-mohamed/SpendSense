import { useEffect, useMemo, useState } from "react";
import { getLicenseWithTools } from "@/lib/queries";
import type { ToolUsage } from "@/types/dataTypes";
import RedundancyHeatmap from "@/components/Redundancy/RedundancyHeatmap";
import LoadingSpinner from "@/components/LoadingSpinner";
import RedundancyTable from "@/components/Redundancy/RedundancyTable";
import { useTheme } from "@/context/ThemeContext";

const Redundancy = () => {
  const [toolUsageData, setToolUsageData] = useState<ToolUsage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useTheme();

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
    <div className="flex flex-col gap-10">
      <div
        className={`p-6 shadow-lg rounded-lg ${
          theme === "dark" ? "bg-surface-dark" : "bg-surface"
        }`}
      >
        <h2
          className={`${
            theme === "dark" ? "text-accent-dark" : "text-accent"
          } font-semibold text-lg mb-2`}
        >
          Redundancy Heatmap
        </h2>
        <RedundancyHeatmap data={groupedByCategory} />
      </div>
      <RedundancyTable data={groupedByCategory} />
    </div>
  );
};

export default Redundancy;
