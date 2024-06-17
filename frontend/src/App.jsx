import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/" element={<MainLayout />}>
				<Route path="register" element={<RegisterPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="home" element={<Homepage />} />
			</Route>
		</Routes>
	);
};

export default App;
