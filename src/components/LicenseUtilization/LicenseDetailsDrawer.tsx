import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import type { License } from "@/types/dataTypes";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  toolId: string | null;
  toolName: string;
  open: boolean;
  onClose: () => void;
};

export default function LicenseDetailsDrawer({ toolId, toolName, open, onClose }: Props) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

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

    const licenseData = data as unknown as License[];

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
    <div
      className={`fixed right-0 top-0 h-full w-96 ${
        theme === "dark" ? "bg-bg-dark" : "bg-bg"
      } shadow-lg z-50 p-6 overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${theme === "dark" ? "text-text-dark" : "text-text"}`}>
          Licenses for {toolName}
        </h2>
        <Button
          onClick={onClose}
          className={`bg-transparent ${
            theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
          } hover:text-black hover:bg-transparent  cursor-pointer`}
        >
          X
        </Button>
      </div>

      {loading ? (
        <p>Loading licenses...</p>
      ) : (
        <ul className="space-y-4">
          {licenses.map((license) => (
            <li
              key={license.id}
              className={`border rounded-lg p-3 ${
                theme === "dark" ? "bg-surface-dark" : "bg-surface"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-text-dark" : "text-text"}`}>
                    {license?.users.full_name}
                  </p>
                  <p
                    className={`text-sm text-gray-500 ${
                      theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
                    }`}
                  >
                    {license?.users.email}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    license?.is_active
                      ? theme === "dark"
                        ? "bg-[#184f3b] text-success-dark"
                        : "bg-[#22674e] text-success"
                      : theme === "dark"
                      ? "bg-[#692f2f] text-danger-dark"
                      : "bg-[#621717] text-danger"
                  }`}
                >
                  {license?.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-600">
                Assigned: {new Date(license?.assigned_at).toLocaleDateString()}
              </p>
              <Button
                className={`text-sm mt-2 bg-transparent ${
                  theme === "dark" ? "text-accent-dark" : "text-accent"
                } hover:underline hover:bg-transparent cursor-pointer`}
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
