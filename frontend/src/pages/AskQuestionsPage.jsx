import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	useCreateQuestionMutation,
	// useUpdateQuestionMutation,
	// useDeleteQuestionMutation,
} from '../slices/questionApiSlice';

const AskQuestionsPage = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [createQuestion, { isLoading, isError, error }] =
		useCreateQuestionMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await createQuestion({ title, description });
			console.log('Response from createQuestion:', data);
			if (data && data._id) {
				navigate(`/questions/${data._id}`);
			} else {
				console.error('Failed to get question ID from response:', data);
			}
		} catch (error) {
			console.error('Failed to create the question:', error);
		}
	};

	return (
		<>
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
				<h1 className="text-2xl font-bold text-center mb-6">
					Steps to Write a Good Question
				</h1>
				<ul className="list-disc list-inside space-y-4">
					<li className="text-lg">
						Summarize your problem in a one-line title
					</li>
					<li className="text-lg">Describe your problem in more detail</li>
					<li className="text-lg">
						Describe what you tried and what you expected to happen
					</li>
					<li className="text-lg">
						Review your question and post it on the site
					</li>
				</ul>
			</div>

			<div className="bg-white p-8 rounded-lg shadow-md  mx-auto">
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-center mb-6">
						Ask a public question
					</h1>
					<Link to="/questions">
						<p>Go to question page</p>
					</Link>
				</div>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title..."
						className="w-full bg-gray-100 rounded-md px-3 py-2 mb-2"
						required
					/>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description..."
						className="w-full bg-gray-100 rounded-md px-3 py-2 mb-2"
						required
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						{isLoading ? 'Posting...' : 'Post Your Question'}
					</button>
					{isError && <p className="text-red-500 mt-2">{error.message}</p>}
				</form>
			</div>
		</>
	);
};

export default AskQuestionsPage;
