// src/pages/renewals.tsx
import { useEffect, useState } from "react";
import { getUpcomingRenewals } from "@/lib/queries";
import { getRenewalUrgencyColor } from "@/functions/getRenewalUrgencyColor";

type Tool = {
  id: string;
  name: string;
  renewal_date: string;
  monthly_cost: number;
};

const Renewals = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingRenewals()
      .then(setTools)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading upcoming renewals...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Renewals</h1>

      {tools.length === 0 ? (
        <p>No upcoming renewals in the next 60 days.</p>
      ) : (
        <ul className="space-y-4">
          {tools.map((tool) => {
            const urgency = getRenewalUrgencyColor(tool.renewal_date);
            const badgeColor = {
              red: "bg-red-100 text-red-800",
              yellow: "bg-yellow-100 text-yellow-800",
              green: "bg-green-100 text-green-800",
            }[urgency];

            return (
              <li
                key={tool.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{tool.name}</h2>
                  <p className="text-sm text-gray-600">
                    Renews on:{" "}
                    <span className="font-medium">
                      {new Date(tool.renewal_date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
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

export default Renewals;
