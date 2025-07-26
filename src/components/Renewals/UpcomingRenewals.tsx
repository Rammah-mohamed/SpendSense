import { useTheme } from "@/context/ThemeContext";
import React from "react";

type Tool = {
  id: string;
  name: string;
  renewal_date: string;
  monthly_cost: number;
};

type Props = {
  tools: Tool[];
  getRenewalUrgencyColor: (date: string) => "red" | "yellow" | "green";
};

const UpcomingRenewals: React.FC<Props> = ({ tools, getRenewalUrgencyColor }) => {
  const { theme } = useTheme();
  return (
    <div className="space-y-2">
      {tools.length === 0 ? (
        <p>No upcoming renewals in the next 60 days.</p>
      ) : (
        <ul className="space-y-4">
          {tools.map((tool) => {
            const urgency = getRenewalUrgencyColor(tool.renewal_date);
            const badgeColor = {
              red: theme === "dark" ? "bg-[#692f2f] text-danger-dark" : "bg-[#621717] text-danger",
              yellow:
                theme === "dark" ? "bg-[#5f4c1c] text-warning-dark" : "bg-[#8c712c] text-warning",
              green:
                theme === "dark" ? "bg-[#184f3b] text-success-dark" : "bg-[#22674e] text-success",
            }[urgency];

            return (
              <li
                key={tool.id}
                className={`border-2  ${
                  theme === "dark" ? "border-border-dark" : "border-border"
                } rounded-lg p-4 shadow-sm flex justify-between items-center`}
              >
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-text-dark" : "text-text"
                    }`}
                  >
                    {tool.name}
                  </h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
                    }`}
                  >
                    Renews on:{" "}
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
                      }`}
                    >
                      {new Date(tool.renewal_date).toLocaleDateString()}
                    </span>
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
                    }`}
                  >
                    Monthly Cost: ${tool.monthly_cost.toFixed(2)}
                  </p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${badgeColor}`}>
                  {urgency === "red"
                    ? "Urgent (7d)"
                    : urgency === "yellow"
                    ? "Soon (30d)"
                    : "Upcoming (60d)"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpcomingRenewals;
