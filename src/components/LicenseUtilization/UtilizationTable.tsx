import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LicenseDetailsDrawer from "./LicenseDetailsDrawer";
import { useSortableData } from "@/hooks/useSortableData";

export type SortedLicenseUtilization = {
  toolId: string;
  toolName: string;
  totalLicenses: number;
  activeLicenses: number;
  utilization: number;
};

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
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData<SortedLicenseUtilization>(
    data,
    columns[0].key,
  );
  return (
    <div className="flex-1">
      <Table className="w-full text-left text-sm font-semibold text-text-Primary">
        <TableHeader>
          <TableRow className="text-text-Muted border-2 border-border p-1">
            {columns.slice(1).map((col) => (
              <TableHead key={col.key} className="py-2" onClick={() => handleSort(col.key)}>
                {col.label}
                {sortKey === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData?.slice(1).map((row, idx) => (
            <TableRow
              key={idx}
              className="border-2 border-border p-1 cursor-pointer"
              onClick={() =>
                setSelectedTool && setSelectedTool({ id: row.toolId, name: row.toolName })
              }
            >
              {columns.slice(1).map((col) => (
                <TableCell key={col.key} className="py-2">
                  {row[col.key] as string}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LicenseDetailsDrawer
        toolId={selectedTool?.id || null}
        toolName={selectedTool?.name || ""}
        open={!!selectedTool}
        onClose={() => setSelectedTool && setSelectedTool(null)}
      />
    </div>
  );
};

export default UtilizationTable;
