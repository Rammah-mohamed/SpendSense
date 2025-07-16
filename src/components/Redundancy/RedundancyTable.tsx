import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ToolUsage } from "@/types/dataTypes";

type Props = {
  data: [string, ToolUsage[]][];
};

const columnKeys = ["id", "name", "totalLicenses", "usagePercent", "cost", "department", "action"];

const columns = columnKeys.map((key) => ({
  key: key as keyof ToolUsage,
  label: key.replace(/^./, (s) => s.toUpperCase()),
}));

const RedundancyTable = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {data.map((table) => (
        <Table className="w-full text-left text-sm font-semibold text-text-Primary">
          <TableHeader>
            <TableRow className="text-text-Muted border-2 border-border p-1">
              {columns.slice(1).map((col) => (
                <TableHead key={col.key} className="py-2">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table[1]?.map((row, idx) => (
              <TableRow key={idx} className="border-2 border-border p-1 cursor-pointer">
                {columns.slice(1).map((col) => (
                  <TableCell key={col.key} className="py-2">
                    {col.key === "usagePercent" ? row[col.key] + "%" : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
};

export default RedundancyTable;
