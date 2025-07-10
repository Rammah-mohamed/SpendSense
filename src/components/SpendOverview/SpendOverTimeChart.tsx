import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: { month: string; total: number }[];
};
const SpendOverTimeChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="month" className="text-xs font-semibold" />
        <YAxis className="text-xs font-semibold" />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendOverTimeChart;
