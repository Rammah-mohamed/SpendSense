import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/features/auth/AuthContext";
import { Link } from "react-router-dom";

type Active = "Dashboard" | "Upload" | "Reports";

type Props = {
	text: Active;
};

const Header = ({ text }: Props) => {
	const { theme, toggleTheme } = useTheme();
	const { user, logout } = useAuth();

	return (
		<header
			className={`flex items-center justify-between p-4 border-b-2 ${
				theme === "dark"
					? "text-text-dark bg-bg-dark border-border-dark"
					: "text-text bg-bg border-border"
			}`}
		>
			<h2 className="text-2xl font-bold text-text-Primary">{text}</h2>
			<div className="flex items-center gap-2">
				{user ? (
					<div className="flex items-center gap-2">
						<h2 className="text-md font-semibold">Welcome, {user?.username}</h2>
						<Button variant={"outline"} className="cursor-pointer" onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button variant={"outline"} className="mr-4" asChild>
						<Link to={"/login"}>Login</Link>
					</Button>
				)}
				<Button variant={"outline"} className={"cursor-pointer"} onClick={toggleTheme}>
					Dark theme
				</Button>
			</div>
		</header>
	);
};

export default Header;
