import { useSortableData } from "@/hooks/useSortableData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SortedLicenseUtilization } from "@/types/Data";
import LicenseDetailsDrawer from "./LicenseUtilization/LicenseDetailsDrawer";

type Props = {
  columns: { key: keyof SortedLicenseUtilization; label: string }[];
  data: SortedLicenseUtilization[];
  sortable?: boolean;
  selectedTool?: { id: string; name: string } | null;
  setSelectedTool?: React.Dispatch<React.SetStateAction<{ id: string; name: string } | null>>;
};

const DataTable = ({ columns, data, selectedTool, setSelectedTool }: Props) => {
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData<SortedLicenseUtilization>(
    data,
    columns[0].key,
  );

  return (
    <div>
      <Table className="w-full text-left text-sm font-semibold text-text-Primary">
        <TableHeader>
          <TableRow className="text-text-Muted border-2 border-border p-1">
            {columns.map((col) => (
              <TableHead key={col.key} className="py-2" onClick={() => handleSort(col.key)}>
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
              className="border-2 border-border p-1 cursor-pointer"
              onClick={() =>
                setSelectedTool && setSelectedTool({ id: row.toolId, name: row.toolName })
              }
            >
              {columns.map((col) => (
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

export default DataTable;
