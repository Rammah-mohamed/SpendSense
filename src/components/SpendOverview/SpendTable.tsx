import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSortableData } from "@/hooks/useSortableData";
import type { Tool } from "@/types/Data";

const columnKeys: (keyof Tool)[] = [
  "id",
  "name",
  "category",
  "monthly_cost",
  "yearly_cost",
  "renewal_date",
  "departments",
];

const columns = columnKeys.map((key) => ({
  key,
  label: key.replace("_", " ").replace(/^./, (s) => s.toUpperCase()),
}));

type Props = {
  data: Tool[];
};
const SpendTable = ({ data }: Props) => {
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData<Tool>(
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
            <TableRow key={idx} className="border-2 border-border p-1 cursor-pointer">
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
  );
};

export default SpendTable;
