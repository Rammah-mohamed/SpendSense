// Layout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";

type Active = "Dashboard" | "Upload" | "Reports";

export default function Layout() {
	const [text, setText] = useState<Active>("Dashboard");
	const { theme } = useTheme();
	return (
		<div className="flex w-full h-screen">
			<Sidebar setText={setText} />
			<div className="flex flex-col flex-1">
				<Header text={text} />
				<main className={`flex-1 p-6 overflow-y-auto ${theme === "dark" ? "bg-bg-dark" : "bg-bg"}`}>
					<Outlet />
				</main>
				<Toaster richColors position="top-right" />
			</div>
		</div>
	);
}
