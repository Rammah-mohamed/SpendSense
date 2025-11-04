import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Upload = React.lazy(() => import("./pages/Upload"));

const App = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
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
		</Suspense>
	);
};

export default App;
