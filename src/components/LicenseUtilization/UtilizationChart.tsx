import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: Record<string, unknown>[];
};

const UtilizationChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} barCategoryGap="20%" barGap={6}>
        <XAxis dataKey="department" textAnchor="middle" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="GoogleMeet" fill="#6366f1" />
        <Bar dataKey="Slack" fill="#22c55e" />
        <Bar dataKey="Teams" fill="#0ea5e9" />
        <Bar dataKey="Zoom" fill="#f59e0b" />
        <Bar dataKey="Figma" fill="#ec4899" />
        <Bar dataKey="GitHub" fill="#566a85" />
        <Bar dataKey="GitLab" fill="#f97316" />
        <Bar dataKey="Jira" fill="#3b82f6" />
        <Bar dataKey="Notion" fill="#000000" />
        <Bar dataKey="BambooHR" fill="#54378a" />
        <Bar dataKey="Workday" fill="#ea0808" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UtilizationChart;
