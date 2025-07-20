import { Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

type Props = {
  data: { category: string; total: number }[];
  ref: React.RefObject<HTMLDivElement | null>;
};

export function SpendByCategoryChart({ data, ref }: Props) {
  return (
    <ResponsiveContainer ref={ref} width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" className="text-xs font-semibold" />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          className="text-xs font-semibold"
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Bar dataKey="total" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
