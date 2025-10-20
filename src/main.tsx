import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./features/auth/AuthContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query-client.ts";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
