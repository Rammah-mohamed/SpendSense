// src/features/auth/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconLock } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";

export const LoginForm = () => {
	const [username, setUsername] = useState("");
	const { login } = useAuth();
	const { theme } = useTheme();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username.trim()) return;
		login(username);
		navigate("/dashboard");
	};

	return (
		<div
			className={`flex min-h-screen items-center justify-center transition-colors duration-300
				${theme === "dark" ? "bg-bg-dark" : "bg-bg"}
			`}
		>
			<form
				onSubmit={handleSubmit}
				className={`p-6 rounded-2xl shadow-md w-80 border transition-colors duration-300
					${
						theme === "dark"
							? "bg-surface-dark border-border-dark text-text-dark"
							: "bg-surface border-border text-text"
					}
				`}
			>
				{/* Header */}
				<div className="flex flex-col items-center mb-6">
					<IconLock
						size={36}
						className={`${theme === "dark" ? "text-accent-dark" : "text-accent"} mb-2`}
					/>
					<h2
						className={`text-2xl font-semibold text-center ${
							theme === "dark" ? "text-text-dark" : "text-text"
						}`}
					>
						SpendSense Login
					</h2>
				</div>

				{/* Username Field */}
				<div className="mb-4">
					<Input
						type="text"
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className={`w-full text-sm ${
							theme === "dark"
								? "bg-surface-dark text-text-dark border-border-dark placeholder:text-text-muted-dark focus:ring-accent-dark"
								: "bg-surface text-text border-border placeholder:text-text-muted focus:ring-accent"
						}`}
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					className={`w-full text-sm font-medium py-2 transition-colors
						${
							theme === "dark"
								? "bg-accent-dark hover:bg-accent-hover-dark text-text-dark"
								: "bg-accent hover:bg-accent-hover text-white"
						}
					`}
				>
					Log In
				</Button>
			</form>
		</div>
	);
};
