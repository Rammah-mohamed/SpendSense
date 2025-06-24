import { NavLink } from "react-router-dom";
import { IconReportMoney } from "@tabler/icons-react";
import { IconActivity } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { IconGitCompare } from "@tabler/icons-react";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";

type Active = "Spend" | "Utilization" | "Renewals" | "Redundancy" | "Export";

type MainText = {
  text: Active;
  icon: React.ReactElement;
};

const mainText: MainText[] = [
  {
    text: "Spend",
    icon: <IconReportMoney stroke={2} />,
  },
  {
    text: "Utilization",
    icon: <IconActivity stroke={2} />,
  },
  {
    text: "Renewals",
    icon: <IconCalendarEvent stroke={2} />,
  },
  {
    text: "Redundancy",
    icon: <IconGitCompare stroke={2} />,
  },
  {
    text: "Export",
    icon: <IconDownload stroke={2} />,
  },
];

type Props = {
  setText: React.Dispatch<React.SetStateAction<Active>>;
};

const Sidebar = ({ setText }: Props) => {
  const [active, setActive] = useState<Active>("Spend");

  const handleActive = (text: Active) => {
    setActive(text);
    setText(text);
  };
  return (
    <aside className="w-64 h-full py-6 border-r-2 bg-sidebar border-border text-text-Primary">
      <h1 className="px-4 pb-4 mb-4 text-xl font-bold border-b-2 text-primary border-border">
        SaaS Spend
      </h1>
      <nav className="flex flex-col justify-center gap-2 px-4">
        {mainText.map((m: MainText, index: number) => (
          <NavLink
            key={index}
            to={index === 0 ? "/" : "/" + m.text}
            className={`flex items-center p-2 hover:text-hover  border-primary rounded-lg gap-2 ${
              active === m.text ? "border-2" : "border-0"
            }`}
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
