import ChartWrapper from "@/components/ChartWrapper";
import { SpendByCategoryChart } from "@/components/SpendOverview/SpendByCategoryChart";
import SpendTable from "@/components/SpendOverview/SpendTable";
import { formatCurrency } from "@/functions/formatCurrency";
import { getTools } from "@/lib/queries";
import type { Tool } from "@/types/Data";
import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer } from "recharts";

const SpendOverview = () => {
  const [mode, setMode] = useState<"Monthly" | "Yearly">("Monthly");
  const [toolsData, setToolsData] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch tools form supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTools();
        setToolsData(data);
      } catch (err) {
        console.error("Failed to load license utilization data", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 1- Convert deparments preperty's value which is object to string value
  // 2- Add yearly cost
  const updatedTools = useMemo(() => {
    return toolsData.map((t) => {
      const updated = { ...t };

      if (t.departments && typeof t.departments === "object" && "name" in t.departments) {
        updated.departments = t.departments.name;
      }

      if (typeof t.monthly_cost === "number") {
        updated.monthly_cost = formatCurrency(t.monthly_cost);
        updated.yearly_cost = formatCurrency(t.monthly_cost * 12);
      }

      return updated;
    });
  }, [toolsData]);

  // Grouped the matched tools and calculate the total cost of the tool
  const grouped = useMemo(
    () =>
      toolsData.reduce<Record<string, number>>((acc, tool) => {
        const cost = mode === "Yearly" ? +tool.monthly_cost * 12 : tool.monthly_cost;

        if (!acc[tool.category]) acc[tool.category] = 0;
        acc[tool.category] += +cost;

        return acc;
      }, {}),
    [mode, toolsData],
  );

  // Convert the grouped data to an object that has category/total properties
  const chartData = Object.entries(grouped).map(([category, total]) => ({
    category,
    total,
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  return (
    <div className="flex flex-col gap-4">
      <SpendTable data={updatedTools} />
      <ResponsiveContainer width="100%">
        <ChartWrapper
          title={mode + " spend per category"}
          hasData={true}
          children={<SpendByCategoryChart data={chartData} />}
          mode={mode === "Monthly" ? "Yearly" : "Monthly"}
          setMode={setMode}
        />
      </ResponsiveContainer>
    </div>
  );
};

export default SpendOverview;
