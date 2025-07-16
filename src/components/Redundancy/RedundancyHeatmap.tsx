import { cn } from "@/lib/utils";
import type { ToolUsage } from "@/types/dataTypes";
type Props = {
  data: [string, ToolUsage[]][];
};
const RedundancyHeatmap = ({ data }: Props) => {
  return (
    <div className="flex">
      {data.map(([category, tools]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
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
                <div className="text-sm">{tool.usagePercent} used</div>
                <div className="text-xs mt-1">{tool.department}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedundancyHeatmap;
