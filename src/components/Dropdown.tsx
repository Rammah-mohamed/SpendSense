import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportAsCSV, exportAsImage, exportAsPDF } from "@/functions/export";

type Props = {
  data?: Record<string, unknown>[];
  text: string[];
  ref?: React.RefObject<HTMLDivElement | null>;
};
const Dropdown = ({ data, text, ref }: Props) => {
  const handleExport = (text: string): void => {
    if (text === "CSV" && data) {
      exportAsCSV(data);
    } else if (text === "PDF" && ref) {
      exportAsPDF(ref);
    } else if (text === "PNG" && ref) {
      exportAsImage(ref);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Export</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Export As</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {text?.map((t) => (
          <DropdownMenuItem onClick={() => handleExport(t)}>{t}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
