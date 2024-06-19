import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AskQuestionsPage from './pages/AskQuestionsPage';
import AllQuestionsPage from './pages/AllQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailsPage';
import EditQuestionPage from './pages/EditQuestionPage';
const App = () => {
	return (
		<Routes>
			<Route index={true} path="/" element={<LandingPage />} />
			<Route path="/" element={<MainLayout />}>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* private routes */}
				<Route path="" element={<PrivateRoute />}>
					<Route path="/questions" element={<AllQuestionsPage />} />
					<Route path="/profile" element={<ProfilePage />} />

					<Route path="/ask-questions" element={<AskQuestionsPage />} />
					{/* <Route
						path="/questions/:questionId/answers"
						element={<AnswersPage />}
					/> */}
					<Route path="/questions/:id" element={<QuestionDetailPage />} />
					<Route path="/edit-questions/:id" element={<EditQuestionPage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
