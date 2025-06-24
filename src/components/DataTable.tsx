import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSortableData } from "@/hooks/useSortableData";

type Props = {
  columns: { key: string; label: string }[];
  data: Record<string, unknown>[];
  sortable?: boolean;
};
const DataTable = ({ columns, data }: Props) => {
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData(data, columns[0].key);
  return (
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
        {sortedData.map((row, idx) => (
          <TableRow key={idx} className="border-2 border-border p-1">
            {columns.map((col) => (
              <TableCell key={col.key} className="py-2">
                {row[col.key] as string}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
