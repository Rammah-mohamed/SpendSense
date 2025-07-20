import { useEffect, useMemo, useRef, useState } from "react";
import ChartWrapper from "@/components/ChartWrapper";
import { SpendByCategoryChart } from "@/components/SpendOverview/SpendByCategoryChart";
import SpendTable from "@/components/SpendOverview/SpendTable";
import { formatCurrency } from "@/functions/formatCurrency";
import { getActiveLicenseWithCost, getTools } from "@/lib/queries";
import type { ActiveLicense, Tool } from "@/types/dataTypes";
import { ResponsiveContainer } from "recharts";
import LoadingSpinner from "@/components/LoadingSpinner";
import dayjs from "dayjs";
import SpendOverTimeChart from "@/components/SpendOverview/SpendOverTimeChart";
import Dropdown from "@/components/Dropdown";

const SpendOverview = () => {
  const [mode, setMode] = useState<"Monthly" | "Yearly">("Monthly");
  const [toolsData, setToolsData] = useState<Tool[]>([]);
  const [license, setLicense] = useState<ActiveLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch tools form supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const toolsData = await getTools();
        const licenseData = await getActiveLicenseWithCost();
        setToolsData(toolsData);
        setLicense(licenseData);
      } catch (err) {
        console.error("Failed to load tools data", err);
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
  const barChartData = Object.entries(grouped).map(([category, total]) => ({
    category,
    total,
  }));

  // Calulate Licenses cost for each month
  const monthlySpend = license?.reduce((acc: Record<string, number>, license) => {
    const month = dayjs(license.assigned_at).format("YYYY-MM");
    acc[month] = (acc[month] || 0) + license.tools.monthly_cost;
    return acc;
  }, {});

  const monthlySpendArray = Object.entries(monthlySpend).map(([month, total]) => ({
    month,
    total,
  }));

  const lineChartData = monthlySpendArray.sort((a, b) =>
    dayjs(a.month).isAfter(dayjs(b.month)) ? 1 : -1,
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading data</p>;
  return (
    <div className="flex flex-col gap-4">
      <Dropdown data={updatedTools} text={["CSV", "PDF", "PNG"]} />
      <SpendTable data={updatedTools} />
      <Dropdown ref={chartRef} text={["PDF", "PNG"]} />
      <ResponsiveContainer>
        <ChartWrapper
          title={mode + " Spend Per Category"}
          hasData={true}
          children={<SpendByCategoryChart ref={chartRef} data={barChartData} />}
          mode={mode === "Monthly" ? "Yearly" : "Monthly"}
          setMode={setMode}
        />
      </ResponsiveContainer>
      <ResponsiveContainer>
        <ChartWrapper
          title={"Monthly Spend Over Time"}
          hasData={true}
          children={<SpendOverTimeChart data={lineChartData} />}
        />
      </ResponsiveContainer>
    </div>
  );
};

export default SpendOverview;
