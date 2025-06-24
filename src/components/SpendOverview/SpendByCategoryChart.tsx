import { Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

interface Props {
  data: { category: string; total: number }[];
}

export function SpendByCategoryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Bar dataKey="total" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
