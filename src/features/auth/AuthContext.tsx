import type { User } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

type AuthContextType = {
	user: User | null;
	login: (username: string) => void;
	logout: (queryClient: QueryClient) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	// Load from localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (username: string) => {
		const newUser = { username };
		setUser(newUser);
		localStorage.setItem("user", JSON.stringify(newUser));
		navigate("/dashboard");
	};

	const logout = (queryClient: QueryClient) => {
		setUser(null);
		localStorage.removeItem("user");
		queryClient.clear();
		navigate("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook for consuming the context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
