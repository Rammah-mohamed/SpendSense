import { NavLink } from "react-router-dom";
import { IconDashboard, IconUpload, IconReport } from "@tabler/icons-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type Active = "Dashboard" | "Upload" | "Reports";

type MainText = {
	text: Active;
	icon: React.ReactElement;
};

const mainText: MainText[] = [
	{
		text: "Dashboard",
		icon: <IconDashboard stroke={2} />,
	},
	{
		text: "Upload",
		icon: <IconUpload stroke={2} />,
	},
	{
		text: "Reports",
		icon: <IconReport stroke={2} />,
	},
];

const routes: string[] = ["dashboard", "upload", "reports"];

type Props = {
	setText: React.Dispatch<React.SetStateAction<Active>>;
};

const Sidebar = ({ setText }: Props) => {
	const [active, setActive] = useState<Active>("Dashboard");
	const { theme } = useTheme();

	const handleActive = (text: Active) => {
		setActive(text);
		setText(text);
	};
	return (
		<aside
			className={`w-64 h-full py-6 border-r-2 ${
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
				SpendSense
			</h1>
			<nav className="flex flex-col justify-center gap-2 px-4 font-semibold">
				{mainText.map((m: MainText, index: number) => (
					<NavLink
						key={index}
						to={"/" + routes[index]}
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
