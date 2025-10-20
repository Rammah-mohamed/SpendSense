import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

type Active = "Spend Overview" | "License Utilization" | "Renewals Dates" | "Redundancy Tools";

type Props = {
  text: Active;
};
const Header = ({ text }: Props) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`flex items-center justify-between p-4 border-b-2 ${
        theme === "dark"
          ? "text-text-dark bg-bg-dark border-border-dark"
          : "text-text bg-bg border-border"
      }`}
    >
      <h2 className="text-2xl font-bold text-text-Primary">{text}</h2>
      <Button
        className={` cursor-pointer font-semibold text-sm  ${
          theme === "dark"
            ? "text-text-dark bg-accent-dark hover:bg-accent-hover-dark"
            : "text-text bg-accent hover:bg-accent-hover"
        }`}
        onClick={toggleTheme}
      >
        Dark theme
      </Button>
    </header>
  );
};

export default Header;
