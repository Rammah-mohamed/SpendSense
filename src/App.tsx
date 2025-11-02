import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

const App = () => {
	return (
		<Routes>
			{/* Public route */}
			<Route path="/login" element={<Login />} />

			{/* Protected routes */}
			<Route
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/upload" element={<Upload />} />
			</Route>

			{/* Fallback */}
			<Route path="*" element={<Navigate to={"/login"} />} />
		</Routes>
	);
};

export default App;
