import type { SortedLicenseUtilization } from "@/types/Data";
import DataTable from "../DataTable";
import { useState } from "react";

const columnKeys: (keyof SortedLicenseUtilization)[] = [
  "toolId",
  "toolName",
  "totalLicenses",
  "activeLicenses",
  "utilization",
];

const columns = columnKeys.map((key) => ({
  key,
  label: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()), // optional label prettifier
}));

type Props = {
  data: SortedLicenseUtilization[];
};

const UtilizationTable = ({ data }: Props) => {
  const [selectedTool, setSelectedTool] = useState<{ id: string; name: string } | null>(null);
  return (
    <div className="flex-1">
      <DataTable
        columns={columns}
        data={data}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
    </div>
  );
};

export default UtilizationTable;
