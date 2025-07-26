import { NavLink } from "react-router-dom";
import { IconReportMoney } from "@tabler/icons-react";
import { IconActivity } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { IconGitCompare } from "@tabler/icons-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type Active = "Spend Overview" | "License Utilization" | "Renewals Dates" | "Redundancy Tools";

type MainText = {
  text: Active;
  icon: React.ReactElement;
};

const mainText: MainText[] = [
  {
    text: "Spend Overview",
    icon: <IconReportMoney stroke={2} />,
  },
  {
    text: "License Utilization",
    icon: <IconActivity stroke={2} />,
  },
  {
    text: "Renewals Dates",
    icon: <IconCalendarEvent stroke={2} />,
  },
  {
    text: "Redundancy Tools",
    icon: <IconGitCompare stroke={2} />,
  },
];

const routes: string[] = ["", "utilization", "renewals", "redundancy"];

type Props = {
  setText: React.Dispatch<React.SetStateAction<Active>>;
};

const Sidebar = ({ setText }: Props) => {
  const [active, setActive] = useState<Active>("Spend Overview");
  const { theme } = useTheme();

  const handleActive = (text: Active) => {
    setActive(text);
    setText(text);
  };
  return (
    <aside
      className={`w-72 h-full py-6 border-r-2 ${
        theme === "dark"
          ? "border-border-dark text-text-dark bg-sidebar-dark"
          : "border-border text-text bg-sidebar"
      } `}
    >
      <h1
        className={`px-4 pb-4 mb-4 text-xl font-extrabold capitalize border-b-2 ${
          theme === "dark" ? "text-accent-dark border-border-dark" : "text-accent border-border"
        } `}
      >
        SaaS Spend Dashboard
      </h1>
      <nav className="flex flex-col justify-center gap-2 px-4 font-semibold">
        {mainText.map((m: MainText, index: number) => (
          <NavLink
            key={index}
            to={index === 0 ? "/" : "/" + routes[index]}
            className={`flex items-center p-2 ${
              theme === "dark"
                ? "border-accent-dark hover:text-accent-hover-dark"
                : "border-accent hover:text-accent-hover"
            } rounded-lg gap-2 ${active === m.text ? "border-2" : "border-0"}`}
            onClick={() => handleActive(m.text)}
          >
            {m.icon} <span>{m.text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
