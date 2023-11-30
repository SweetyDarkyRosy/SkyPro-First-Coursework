import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { PrivateRoute } from "./components/PrivateRoute";


export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}/>
			<Route path="/workout/:id" element={<WorkoutPage />}/>

			<Route element={<PrivateRoute />}>
				<Route path="/profile" element={<ProfilePage />}/>
			</Route>

			<Route path="/login" element={<LoginPage />}/>
			<Route path="/register" element={<RegisterPage />}/>

			<Route path="*" element={<NotFoundPage />}/>
		</Routes>
	);
};