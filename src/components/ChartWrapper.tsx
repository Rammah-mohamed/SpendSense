import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  title: string;
  mode?: "Monthly" | "Yearly";
  setMode?: React.Dispatch<React.SetStateAction<"Monthly" | "Yearly">>;
  children: React.ReactNode;
  hasData: boolean;
};

const ChartWrapper = ({ title, mode, setMode, children, hasData }: Props) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          onClick={() => setMode && setMode(mode === "Monthly" ? "Monthly" : "Yearly")}
          className="cursor-pointer bg-primary text-white"
        >
          {mode}
        </Button>
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
