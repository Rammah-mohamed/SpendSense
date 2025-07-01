import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  name: string;
  monthly_cost: number;
  renewal_date: string;
  utilization: number;
  activeLicenses: number;
  totalLicenses: number;
  toolId: string;
  onReviewClick: (toolId: string, toolName: string) => void;
};

export default function NotificationCard({
  name,
  monthly_cost,
  renewal_date,
  utilization,
  activeLicenses,
  totalLicenses,
  toolId,
  onReviewClick,
}: Props) {
  return (
    <div className="border-2 border-border p-4 rounded-xl shadow-md bg-white flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <span className="text-sm text-gray-500">
          Renews: {new Date(renewal_date).toLocaleDateString()}
        </span>
      </div>

      <div className="text-sm text-gray-700">
        <p>
          Monthly Cost: <strong>${monthly_cost.toFixed(2)}</strong>
        </p>
        <p>
          License Utilization: <strong>{utilization.toFixed(0)}%</strong> ({activeLicenses}/
          {totalLicenses})
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          onClick={() => toast.success(`${name} subscription cancellation simulated.`)}
          className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 cursor-pointer"
        >
          🛑 Cancel Subscription
        </Button>

        <Button
          onClick={() => onReviewClick(toolId, name)}
          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 cursor-pointer"
        >
          👀 Review Usage
        </Button>
      </div>
    </div>
  );
}
