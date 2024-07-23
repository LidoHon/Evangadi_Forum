import React, { useState } from 'react';
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
// import EditAnswerPage from './pages/EditAnswerPage';
import SavedQuestionsPage from './pages/SavedQuestionsPage';
const App = () => {
	const [savedQuestions, setSavedQuestions] = useState([]);
	return (
		<Routes>
			<Route index={true} path="/" element={<LandingPage />} />
			<Route path="/" element={<MainLayout />}>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* private routes */}
				<Route path="" element={<PrivateRoute />}>
					<Route
						path="/questions"
						element={
							<AllQuestionsPage
								savedQuestions={savedQuestions}
								setSavedQuestions={setSavedQuestions}
							/>
						}
					/>
					<Route path="/profile" element={<ProfilePage />} />

					<Route path="/ask-questions" element={<AskQuestionsPage />} />

					<Route path="/questions/:id" element={<QuestionDetailPage />} />
					<Route
						path="/saved-questions"
						element={<SavedQuestionsPage savedQuestions={savedQuestions} />}
					/>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
