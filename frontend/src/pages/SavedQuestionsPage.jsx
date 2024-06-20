import React from 'react';
import { Link } from 'react-router-dom';
import avater from '../assets/images/istockphoto-1300845620-612x612.jpg';
import { FaChevronRight } from 'react-icons/fa';

const SavedQuestionsPage = ({ savedQuestions }) => {
	return (
		<div className="saved-questions-page p-4 flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4">Saved Questions</h2>
			<Link to="/questions">All questions</Link>
			{savedQuestions.length === 0 ? (
				<p>No saved questions yet.</p>
			) : (
				<ul className="questions-list space-y-4 container w-3/4">
					{savedQuestions.map((question) => (
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

export default SavedQuestionsPage;
