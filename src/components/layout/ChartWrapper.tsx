import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title: string;
  mode?: "Monthly" | "Yearly";
  setMode?: React.Dispatch<React.SetStateAction<"Monthly" | "Yearly">>;
  children: React.ReactNode;
  hasData: boolean;
};

const ChartWrapper = ({ title, mode, setMode, children, hasData }: Props) => {
  const { theme } = useTheme();
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className={`${theme === "dark" ? "text-text-dark" : "text-text"}`}>
          {title}
        </CardTitle>
        {mode && (
          <Button
            onClick={() => setMode && setMode(mode === "Monthly" ? "Monthly" : "Yearly")}
            className={`cursor-pointer text-sm px-4 py-2 font-semibold ${
              theme === "dark" ? "bg-accent-dark text-text-dark" : "bg-accent text-text "
            }`}
          >
            {mode}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {hasData ? (
          children
        ) : (
          <div className="text-center text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;
