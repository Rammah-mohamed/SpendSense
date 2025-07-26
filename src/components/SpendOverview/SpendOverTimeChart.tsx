import { useTheme } from "@/context/ThemeContext";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: { month: string; total: number }[];
};
const SpendOverTimeChart = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          className="text-xs font-semibold"
          stroke={theme === "dark" ? "#94a3b8" : "#6b7280"}
        />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          className="text-xs font-semibold"
          stroke={theme === "dark" ? "#94a3b8" : "#6b7280"}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#0f172a" : "#f3f4f6",
            border: "none",
          }}
          labelStyle={{ color: theme === "dark" ? "#94a3b8" : "#6b7280" }}
          itemStyle={{ color: theme === "dark" ? "#3b82f6" : "#2563eb" }}
        />
        <Line type="monotone" dataKey="total" stroke={theme === "dark" ? "#60a5fa" : "#2563eb"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendOverTimeChart;
