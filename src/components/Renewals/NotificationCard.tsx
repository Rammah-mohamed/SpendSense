import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  return (
    <div
      className={`border-2 ${
        theme === "dark" ? "border-border-dark bg-bg-dark" : "border-border bg-bg"
      } p-4 rounded-xl shadow-md flex flex-col gap-3`}
    >
      <div className="flex justify-between items-center">
        <h2 className={`text-lg font-bold ${theme === "dark" ? "text-text-dark" : "text-text"}`}>
          {name}
        </h2>
        <span
          className={`text-sm ${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}`}
        >
          Renews: {new Date(renewal_date).toLocaleDateString()}
        </span>
      </div>

      <div className={`text-sm ${theme === "dark" ? "text-text-muted-dark" : "text-text-muted"}`}>
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
          className={`text-sm ${
            theme === "dark" ? "text-danger-dark bg-[#692f2f]" : "text-danger bg-[#621717]"
          }  px-3 py-1 rounded hover:bg-red-200 cursor-pointer`}
        >
          🛑 Cancel Subscription
        </Button>

        <Button
          onClick={() => onReviewClick(toolId, name)}
          className={`text-sm ${
            theme === "dark" ? "text-accent-dark bg-[#14347a]" : "text-accent bg-[#09286c]"
          } px-3 py-1 rounded hover:bg-blue-200 cursor-pointer`}
        >
          👀 Review Usage
        </Button>
      </div>
    </div>
  );
}
