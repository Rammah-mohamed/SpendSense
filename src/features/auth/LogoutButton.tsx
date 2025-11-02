import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { IconLogout2 } from "@tabler/icons-react";

export const LogoutButton = () => {
	const queryClient = useQueryClient();
	const { logout } = useAuth();
	const { theme } = useTheme();

	return (
		<Button
			onClick={() => logout(queryClient)}
			variant="outline"
			className={`flex items-center gap-2 text-sm font-medium transition-colors
				${
					theme === "dark"
						? "bg-surface-dark border-border-dark text-text-dark hover:bg-border-dark"
						: "bg-surface border-border text-text hover:bg-border"
				}`}
		>
			<IconLogout2 size={16} className={`${theme === "dark" ? "text-text-dark" : "text-text"}`} />
			Logout
		</Button>
	);
};
