// src/features/auth/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const [username, setUsername] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username.trim()) return;
		login(username);
		navigate("/dashboard");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<form onSubmit={handleSubmit} className="p-6 rounded-xl bg-white shadow-md w-80">
				<h2 className="text-2xl font-semibold mb-4 text-center">SpendSense Login</h2>
				<input
					type="text"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<button
					type="submit"
					className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Log in
				</button>
			</form>
		</div>
	);
};
