import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "@/context/ThemeContext";
import { useSortableData } from "@/hooks/useSortableData";
import type { Tool } from "@/types/dataTypes";

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
  ref: React.RefObject<HTMLDivElement | null>;
};
const SpendTable = ({ data,ref }: Props) => {
  const { sortedData, handleSort, sortKey, sortOrder } = useSortableData<Tool>(
    data,
    columns[0].key,
  );
  const { theme } = useTheme();
  return (
    <div className="flex-1" ref={ref}>
      <Table
      
        className={`${
          theme === "dark" ? "text-text-dark" : "text-text"
        } w-full text-left text-sm font-semibold `}
      >
        <TableHeader>
          <TableRow
            className={`border-2 ${
              theme === "dark"
                ? "border-border-dark text-text-muted-dark"
                : "border-border text-text-muted"
            }  p-1`}
          >
            {columns.slice(1).map((col) => (
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
              className={`border-2 ${
                theme === "dark" ? "border-border-dark" : "border-border"
              } p-1 cursor-pointer`}
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
  );
};

export default SpendTable;
