import { getLicenseWithTools } from "@/lib/queries";
import { useEffect, useMemo, useState } from "react";
import { Switch } from "../ui/switch";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type ToolUsage = {
  id: string;
  name: string;
  category: string;
  department: string;
  usagePercent: number;
  totalLicenses: number;
  activeLicenses: number;
};

const RedundancyHeatmap = () => {
  const [toolUsageData, setToolUsageData] = useState<ToolUsage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showRedundantOnly, setShowRedundantOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLicenseWithTools();

        console.log(data);

        const usageMap = new Map<string, ToolUsage>();

        data.forEach((license) => {
          const tool = license.tools;
          const key = tool.id;

          if (!usageMap.has(key)) {
            usageMap.set(key, {
              id: tool.id,
              name: tool.name,
              category: tool.category,
              department: tool.departments[0]?.name || "Unknown",
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
            tool.totalLicenses > 0
              ? Math.round((tool.activeLicenses / tool.totalLicenses) * 100)
              : 0;

          return { ...tool, usagePercent: percent };
        });

        setToolUsageData(result);
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

    return Array.from(map.entries()).filter(([, tools]) => !showRedundantOnly || tools.length > 1);
  }, [toolUsageData, showRedundantOnly]);

  if (error) return <p>Error loading data</p>;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Switch checked={showRedundantOnly} onCheckedChange={setShowRedundantOnly} />
        <span>Show only redundant categories</span>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        groupedByCategory.map(([category, tools]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className={cn(
                    "p-4 rounded-lg shadow text-white w-48",
                    tool.usagePercent < 50
                      ? "bg-red-500"
                      : tool.usagePercent < 80
                      ? "bg-yellow-500"
                      : "bg-green-500",
                  )}
                >
                  <div className="font-semibold">{tool.name}</div>
                  <div className="text-sm">{tool.usagePercent}% used</div>
                  <div className="text-xs mt-1">{tool.department}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RedundancyHeatmap;
