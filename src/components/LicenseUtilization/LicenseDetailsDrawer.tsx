import { supabase } from "@/lib/supabase";
import type { LicenseUtilization } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  toolId: string | null;
  toolName: string;
  open: boolean;
  onClose: () => void;
};

export default function LicenseDetailsDrawer({ toolId, toolName, open, onClose }: Props) {
  const [licenses, setLicenses] = useState<LicenseUtilization[]>([]);
  const [loading, setLoading] = useState(false);

  async function getToolLicenses(toolId: string) {
    const { data, error } = await supabase
      .from("licenses")
      .select(
        `
    id,
    is_active,
    assigned_at,
    users ( full_name, email )
  `,
      )
      .eq("tool_id", toolId);

    if (error) throw error;

    const licenseData = data as unknown as LicenseUtilization[];

    return licenseData;
  }

  useEffect(() => {
    if (!toolId) return;
    setLoading(true);
    getToolLicenses(toolId)
      .then(setLicenses)
      .finally(() => setLoading(false));
  }, [toolId]);

  if (!open) return null;
  console.log("License data:", licenses);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Licenses for {toolName}</h2>
        <Button
          onClick={onClose}
          className="bg-transparent text-gray-500 hover:text-black hover:bg-transparent  cursor-pointer"
        >
          X
        </Button>
      </div>

      {loading ? (
        <p>Loading licenses...</p>
      ) : (
        <ul className="space-y-4">
          {licenses.map((license) => (
            <li key={license.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{license?.users.full_name}</p>
                  <p className="text-sm text-gray-500">{license?.users.email}</p>
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    license?.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {license?.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-600">
                Assigned: {new Date(license?.assigned_at).toLocaleDateString()}
              </p>
              <Button
                className="text-sm mt-2 bg-transparent text-blue-600 hover:underline hover:bg-transparent cursor-pointer"
                onClick={() => alert("Simulated: Unassigned!")}
              >
                Unassign
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
