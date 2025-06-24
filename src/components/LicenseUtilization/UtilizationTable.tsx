import type { LicenseUtilization } from "@/types/Data";
import DataTable from "../DataTable";

const columns = ["toolName", "activeLicenses", "totalLicenses", "utilization"];

type Props = {
  data: LicenseUtilization[];
};
const UtilizationTable = ({ data }: Props) => {
  return (
    <div className="flex-1">
      <DataTable columns={columns.map((c) => ({ key: c, label: c }))} data={data} />
    </div>
  );
};

export default UtilizationTable;
