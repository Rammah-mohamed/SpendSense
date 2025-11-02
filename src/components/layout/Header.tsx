import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/features/auth/AuthContext";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type Active = "Dashboard" | "Upload" | "Reports";

type Props = {
	text: Active;
};

const Header = ({ text }: Props) => {
	const { theme, toggleTheme } = useTheme();
	const { user } = useAuth();

	return (
		<header
			className={`flex items-center justify-between px-6 py-3 border-b transition-colors duration-300
				${
					theme === "dark"
						? "bg-bg-dark border-border-dark text-text-dark"
						: "bg-bg border-border text-text"
				}
			`}
		>
			{/* Left: Page Title */}
			<h2
				className={`text-xl md:text-2xl font-semibold tracking-tight ${
					theme === "dark" ? "text-text-dark" : "text-text"
				}`}
			>
				{text}
			</h2>

			{/* Right: Actions */}
			<div className="flex items-center gap-3">
				{user ? (
					<div className="flex items-center gap-2">
						<p
							className={`text-sm md:text-base font-medium ${
								theme === "dark" ? "text-text-dark" : "text-text"
							}`}
						>
							Welcome, <span className="font-semibold">{user.username}</span>
						</p>
						<LogoutButton />
					</div>
				) : (
					<Button
						variant="outline"
						asChild
						className={`text-sm ${
							theme === "dark"
								? "border-border-dark text-text-dark hover:bg-sidebar-dark"
								: "border-border text-text hover:bg-sidebar"
						}`}
					>
						<Link to="/login">Login</Link>
					</Button>
				)}

				{/* Theme Toggle Button */}
				<Button
					variant="outline"
					onClick={toggleTheme}
					className={`flex items-center gap-2 text-sm font-medium transition-all
						${
							theme === "dark"
								? "border-border-dark text-text-dark hover:bg-sidebar-dark"
								: "border-border text-text hover:bg-sidebar"
						}
					`}
				>
					{theme === "dark" ? (
						<>
							<IconSun size={18} />
							<span>Light</span>
						</>
					) : (
						<>
							<IconMoon size={18} />
							<span>Dark</span>
						</>
					)}
				</Button>
			</div>
		</header>
	);
};

export default Header;
