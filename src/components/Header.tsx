import { Button } from "@/components/ui/button";

type Active = "Dashbaord" | "Utilization" | "Renewals" | "Redundancy" | "Export";

type Props = {
  text: Active;
};
const Header = ({ text }: Props) => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2 bg-background border-border">
      <h2 className="text-lg font-semibold text-text-Primary">{text}</h2>
      <Button className="text-white cursor-pointer bg-primary hover:bg-hover">Dark theme</Button>
    </header>
  );
};

export default Header;
