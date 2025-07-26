import { useTheme } from "@/context/ThemeContext";
import { Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

type Props = {
  data: { category: string; total: number }[];
  ref: React.RefObject<HTMLDivElement | null>;
};

export function SpendByCategoryChart({ data, ref }: Props) {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer ref={ref} width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#94a3b8" : "#6b7280 "} />
        <XAxis
          dataKey="category"
          className="text-xs font-semibold"
          tick={{ fill: theme === "dark" ? "#94a3b8" : "#6b7280" }}
        />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          className="text-xs font-semibold"
          tick={{ fill: theme === "dark" ? "#94a3b8" : "#6b7280" }}
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Bar dataKey="total" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
