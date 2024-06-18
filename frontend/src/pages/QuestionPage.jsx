import React from 'react';
import {
	useGetQuestionsQuery,
	useDeleteQuestionMutation,
} from '../slices/questionApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Spinners from '../components/Spinners';

const QuestionsPage = () => {
	const { data: questions, error, isLoading } = useGetQuestionsQuery();
	const [addQuestion] = useAddQuestionMutation();
	const [deleteQuestion] = useDeleteQuestionMutation();
	const dispatch = useDispatch();

	const handleAddQuestion = async (e) => {
		e.preventDefault();
		const newQuestion = {
			title: e.target.title.value,
			description: e.target.description.value,
		};
		try {
			const response = await addQuestion(newQuestion).unwrap();
			dispatch(setCredentials(response));
		} catch (err) {
			console.error('Failed to add question: ', err);
		}
	};

	const handleDeleteQuestion = async (id) => {
		try {
			await deleteQuestion(id).unwrap();
		} catch (err) {
			console.error('Failed to delete question: ', err);
		}
	};

	if (isLoading) return <Spinners />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<button>Ask Questions</button>
			<h1>Questions</h1>
			<form onSubmit={handleAddQuestion}>
				<input type="text" name="title" placeholder="Title" required />
				<textarea
					name="description"
					placeholder="Description"
					required
				></textarea>
				<button type="submit">Add Question</button>
			</form>
			<ul>
				{questions.map((question) => (
					<li key={question._id}>
						<h2>{question.title}</h2>
						<p>{question.description}</p>
						<button onClick={() => handleDeleteQuestion(question._id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuestionsPage;
