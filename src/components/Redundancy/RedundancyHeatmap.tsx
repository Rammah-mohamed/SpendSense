import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { ToolUsage } from "@/types/dataTypes";
type Props = {
  data: [string, ToolUsage[]][];
};
const RedundancyHeatmap = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <div className="flex gap-4">
      {data.map(([category, tools]) => (
        <div key={category}>
          <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-text-dark" : "text-text"}`}>
            {category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={cn(
                  "p-3 flex-1 rounded-lg shadow text-white w-32",
                  tool.usagePercent < 50
                    ? theme === "dark"
                      ? "bg-danger-dark"
                      : "bg-danger"
                    : tool.usagePercent < 80
                    ? theme === "dark"
                      ? "bg-warning-dark"
                      : "bg-warning"
                    : theme === "dark"
                    ? "bg-success-dark"
                    : "bg-success",
                )}
              >
                <div
                  className={`font-semibold ${theme === "dark" ? "text-text-dark" : "text-text"}`}
                >
                  {tool.name}
                </div>
                <div className={`text-sm ${theme === "dark" ? "text-text-dark" : "text-text"}`}>
                  {tool.usagePercent} used
                </div>
                <div
                  className={`text-xs mt-1 ${theme === "dark" ? "text-text-dark" : "text-text"}`}
                >
                  {tool.department}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedundancyHeatmap;
