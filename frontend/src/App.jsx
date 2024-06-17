import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
const App = () => {
	return (
		<Routes>
			<Route index={true} path="/" element={<LandingPage />} />
			<Route path="/" element={<MainLayout />}>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* private routes */}
				<Route path="" element={<PrivateRoute />}>
					<Route path="/home" element={<Homepage />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
