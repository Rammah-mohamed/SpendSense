import { useRef, useState } from "react";
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
import { useTheme } from "@/context/ThemeContext";
import Dropdown from "../Dropdown";

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
  const { theme } = useTheme();
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div className="flex flex-col gap-10 flex-1">
      <div
        className={`p-6 shadow-lg rounded-lg ${
          theme === "dark" ? "bg-surface-dark" : "bg-surface"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2
            className={`${theme === "dark" ? "text-text-dark" : "text-text"} font-semibold text-lg`}
          >
            SaaS Tools License Utilization
          </h2>
          <Dropdown ref={tableRef} data={sortedData} text={["CSV", "PDF", "PNG"]} />
        </div>
        <Table
        ref={tableRef}
          className={`w-full text-left text-sm font-semibold text-text-Primary ${
            theme === "dark" ? "text-text-dark" : "text-text"
          }`}
        >
          <TableHeader>
            <TableRow
              className={`border-2 p-1 ${
                theme === "dark"
                  ? "border-border-dark text-text-muted-dark"
                  : "border-border text-text-muted"
              }`}
            >
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
            {sortedData?.map((row, idx) => (
              <TableRow
                key={idx}
                className={`border-2 p-1 cursor-pointer  ${
                  theme === "dark" ? "border-border-dark" : "border-border"
                }`}
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
      </div>
      <div
        className={`p-6 shadow-lg rounded-lg ${
          theme === "dark" ? "bg-surface-dark" : "bg-surface"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2
            className={`${theme === "dark" ? "text-text-dark" : "text-text"} font-semibold text-lg`}
          >
            SaaS Tools Wasted Cost
          </h2>
          <Dropdown ref={tableRef} data={underUtilization} text={["CSV", "PDF", "PNG"]} />
        </div>
        <Table
        ref={tableRef}
          className={`w-full text-left text-sm font-semibold text-text-Primary ${
            theme === "dark" ? "text-text-dark" : "text-text"
          }`}
        >
          <TableHeader>
            <TableRow
              className={`border-2 p-1 ${
                theme === "dark"
                  ? "border-border-dark text-text-muted-dark"
                  : "border-border text-text-muted"
              }`}
            >
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
                red: "text-danger",
                yellow: "text-warning",
                green: "text-success",
              }[urgency];
              const badgeColorDark = {
                red: "text-danger-dark",
                yellow: "text-warning-dark",
                green: "text-success-dark",
              }[urgency];
              return (
                <TableRow
                  key={idx}
                  className={`border-2 p-1 cursor-pointer  ${
                    theme === "dark" ? "border-border-dark" : "border-border"
                  }`}
                >
                  {underUtilizationColumn.map((col) => (
                    <TableCell
                      key={col.key}
                      onClick={() => col.key === "action" && alert(row[col.key] + " successed")}
                      className={`py-2 ${
                        col.key === "riskLevel"
                          ? theme === "dark"
                            ? badgeColorDark
                            : badgeColor
                          : ""
                      } ${col.key === "action" ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {row[col.key] as string}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
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
