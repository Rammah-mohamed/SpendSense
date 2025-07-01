// src/pages/renewals.tsx
import { useEffect, useState } from "react";
import { getRenewalUrgencyColor } from "@/functions/getRenewalUrgencyColor";
import { getUpcomingRenewalsWithUtilization } from "@/lib/queries";
import UpcomingRenewals from "@/components/Renewals/UpcomingRenewals";
import NotificationCard from "@/components/Renewals/NotificationCard";
import LicenseDetailsDrawer from "@/components/LicenseUtilization/LicenseDetailsDrawer";

type Tool = {
  id: string;
  name: string;
  renewal_date: string;
  monthly_cost: number;
  utilization: number;
  activeLicenses: number;
  totalLicenses: number;
};

const Renewals = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTool, setSelectedTool] = useState<{ id: string; name: string } | null>(null);

  const handleReviewClick = (toolId: string, toolName: string) => {
    setSelectedTool({ id: toolId, name: toolName });
  };

  useEffect(() => {
    getUpcomingRenewalsWithUtilization()
      .then(setTools)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading upcoming renewals...</p>;

  return (
    <div className="flex flex-col gap-4">
      <section className="flex-1">
        <h1 className="text-xl font-semibold mb-4">Upcoming Renewals</h1>
        <UpcomingRenewals tools={tools} getRenewalUrgencyColor={getRenewalUrgencyColor} />;
      </section>
      <section className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Renewal Actions</h2>
        <div className="space-y-2">
          {tools.map((tool) => (
            <NotificationCard
              key={tool.id}
              toolId={tool.id}
              name={tool.name}
              renewal_date={tool.renewal_date}
              monthly_cost={tool.monthly_cost}
              utilization={tool.utilization}
              activeLicenses={tool.activeLicenses}
              totalLicenses={tool.totalLicenses}
              onReviewClick={handleReviewClick}
            />
          ))}
        </div>
        {selectedTool && (
          <LicenseDetailsDrawer
            toolId={selectedTool.id}
            toolName={selectedTool.name}
            open={!!selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        )}
      </section>
    </div>
  );
};

export default Renewals;
