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
import { getUnderUtilizationColor } from "@/functions/getColors";

export type SortedLicenseUtilization = {
  toolId: string;
  toolName: string;
  totalLicenses: number;
  activeLicenses: number;
  utilization: number;
};

type UnderUtilization = {
  name: string;
  utilization: number;
  wastedCost: string;
  riskLevel: string;
  action: string;
};

const columnKeys: (keyof SortedLicenseUtilization)[] = [
  "toolId",
  "toolName",
  "totalLicenses",
  "activeLicenses",
  "utilization",
];

const underUtilizationColumnKeys: (keyof UnderUtilization)[] = [
  "name",
  "utilization",
  "wastedCost",
  "riskLevel",
  "action",
];

const columns = columnKeys.map((key) => ({
  key,
  label: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()), // optional label prettifier
}));

const underUtilizationColumn = underUtilizationColumnKeys.map((key) => ({
  key,
  label: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()), // optional label prettifier
}));

type Props = {
  data: SortedLicenseUtilization[];
  underUtilization: UnderUtilization[];
};

const UtilizationTable = ({ data, underUtilization }: Props) => {
  const [selectedTool, setSelectedTool] = useState<{ id: string; name: string } | null>(null);
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData<SortedLicenseUtilization>(
    data,
    columns[0].key,
  );
  return (
    <div className="flex flex-col gap-4 flex-1">
      <Table className="w-full text-left text-sm font-semibold text-text-Primary">
        <TableHeader>
          <TableRow className="text-text-Muted border-2 border-border p-1">
            {columns.slice(1).map((col) => (
              <TableHead
                key={col.key}
                className="py-2 cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
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
      <Table className="w-full text-left text-sm font-semibold text-text-Primary">
        <TableHeader>
          <TableRow className="text-text-Muted border-2 border-border p-1">
            {underUtilizationColumn.map((col) => (
              <TableHead key={col.key} className="py-2 cursor-pointer">
                {col.label}
                {sortKey === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {underUtilization?.map((row, idx) => {
            const urgency = getUnderUtilizationColor(row.riskLevel);
            const badgeColor = {
              red: "bg-red-100 text-red-800",
              yellow: "bg-yellow-100 text-yellow-800",
              green: "bg-green-100 text-green-800",
            }[urgency];
            return (
              <TableRow key={idx} className="border-2 border-border p-1 cursor-pointer">
                {underUtilizationColumn.map((col) => (
                  <TableCell
                    key={col.key}
                    className={`py-2 ${col.key === "riskLevel" ? badgeColor : ""}`}
                  >
                    {row[col.key] as string}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
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
