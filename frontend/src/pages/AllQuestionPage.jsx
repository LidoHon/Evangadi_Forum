import React, { useEffect } from 'react';
import { useGetQuestionsQuery } from '../slices/questionApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import avater from '../assets/images/istockphoto-1300845620-612x612.jpg';
import Spinners from '../components/Spinners';
import { FaChevronRight } from 'react-icons/fa';
const AllQuestionsPage = () => {
	const {
		data: questions,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetQuestionsQuery();
	const navigate = useNavigate();
	const handleAskQuestion = () => {
		navigate('/ask-questions');
	};
	useEffect(() => {
		if (isError) {
			console.error('Error fetching questions:', error);
		}
	}, [isError, error]);
	// Sort questions by creation date in descending order
	const sortedQuestions = questions
		? [...questions].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		  )
		: [];
	return (
		<div className="questions-page p-4 p-4 flex flex-col items-center">
			<div className="questions-header mb-4 flex justify-end">
				<button
					className="ask-question-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					onClick={handleAskQuestion}
				>
					Ask Question
				</button>
			</div>
			<h2 className="text-2xl font-bold mb-4">Questions</h2>
			{isLoading && <Spinners />}
			{isSuccess && (
				<ul className="questions-list space-y-4 container w-3/4">
					{sortedQuestions.map((question) => (
						<li
							key={question._id}
							className="question-item p-4 border rounded shadow"
						>
							<div className="question-user flex flex-col items-center mb-4">
								<img
									src={avater}
									alt="avatar"
									className="avatar w-12 h-12 rounded-full object-cover"
								/>
								<span className="username mt-2 text-sm font-medium">
									{question.user.username}
								</span>
							</div>
							<div className="question-content">
								<p className="mb-2">{question.title}</p>
								<Link
									to={`/questions/${question._id}`}
									className="question-link text-blue-500 hover:underline"
								>
									<FaChevronRight />
								</Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AllQuestionsPage;