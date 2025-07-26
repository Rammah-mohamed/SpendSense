import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "@/context/ThemeContext";
import type { ToolUsage } from "@/types/dataTypes";
import Dropdown from "../Dropdown";
import { useRef } from "react";

type Props = {
  data: [string, ToolUsage[]][];
};

const columnKeys = ["id", "name", "totalLicenses", "usagePercent", "cost", "department", "action"];

const columns = columnKeys.map((key) => ({
  key: key as keyof ToolUsage,
  label: key.replace(/^./, (s) => s.toUpperCase()),
}));

const RedundancyTable = ({ data }: Props) => {
  const { theme } = useTheme();
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div className="flex flex-col gap-6 flex-1">
      {data.map((table) => (
        <div
          className={`p-6 shadow-lg rounded-lg ${
            theme === "dark" ? "bg-surface-dark" : "bg-surface"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2
              className={`${
                theme === "dark" ? "text-accent-dark" : "text-accent"
              } font-semibold text-lg`}
            >
              {table[0]}
            </h2>
            <Dropdown ref={tableRef} data={table[1]} text={["CSV", "PDF", "PNG"]} />
          </div>
          <Table
          ref={tableRef}
            className={`w-full text-left text-sm font-semibold text-text-Primary ${
              theme === "dark" ? "text-text-dark" : "text-text"
            }`}
          >
            <TableHeader>
              <TableRow
                className={`text-text-Muted border-2 p-1 ${
                  theme === "dark"
                    ? "border-border-dark text-text-muted-dark"
                    : "border-border text-text-muted"
                }`}
              >
                {columns.slice(1).map((col) => (
                  <TableHead key={col.key} className="py-2">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table[1]?.map((row, idx) => (
                <TableRow
                  key={idx}
                  className={`border-2 p-1 cursor-pointer  ${
                    theme === "dark" ? "border-border-dark" : "border-border"
                  }`}
                >
                  {columns.slice(1).map((col) => (
                    <TableCell key={col.key} className="py-2">
                      {col.key === "usagePercent" ? row[col.key] + "%" : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default RedundancyTable;
