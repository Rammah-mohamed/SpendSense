import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { exportAsCSV, exportAsImage, exportAsPDF } from "@/functions/export";

type Props = {
  data?: Record<string, unknown>[];
  text: string[];
  ref?: React.RefObject<HTMLDivElement | null>;
};
const Dropdown = ({ data, text, ref }: Props) => {
  const { theme } = useTheme();
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
      <DropdownMenuTrigger
        className={`self-start py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer ${
          theme === "dark"
            ? "bg-accent-dark text-text-dark hover:bg-accent-hover-dark"
            : "bg-accent text-text hover:bg-accent-hover"
        }`}
      >
        Export
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`text-sm font-semibold ${
          theme === "dark" ? "bg-surface-dark text-text-dark" : "bg-surface text-text"
        }`}
      >
        <DropdownMenuLabel>Export As</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {text?.map((t) => (
        
          <DropdownMenuItem key={t} className="cursor-pointer" onClick={() => handleExport(t)}>
            {t}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
