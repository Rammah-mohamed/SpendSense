import DataTable from "@/components/DataTable";
import type { Tool } from "@/types/Data";

const columns = [
  "id",
  "name",
  "category",
  "monthly_cost",
  "yearly_cost",
  "renewal_date",
  "departments",
];

type Props = {
  data: Tool[];
};
const SpendTable = ({ data }: Props) => {
  return (
    <div className="flex-1">
      <DataTable columns={columns.map((c) => ({ key: c, label: c }))} data={data} />
    </div>
  );
};

export default SpendTable;
