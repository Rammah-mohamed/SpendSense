import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const MetricsCard = ({ title, footer, children }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default MetricsCard;
