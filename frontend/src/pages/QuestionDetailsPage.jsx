import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatar from '../assets/images/istockphoto-1300845620-612x612.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import {
	useGetQuestionByIdQuery,
	useAddAnswerMutation,
	useDeleteQuestionMutation,
} from '../slices/questionApiSlice';
import {
	useDeleteAnswerMutation,
	useUpdateAnswerMutation,
} from '../slices/answersApiSlice';
import { useGetAnswersQuery } from '../slices/answersApiSlice';

const QuestionDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.auth.userInfo);

	const {
		data: question,
		isLoading: isQuestionLoading,
		isSuccess: isQuestionSuccess,
		isError: isQuestionError,
		error: questionError,
	} = useGetQuestionByIdQuery(id);

	const {
		data: answers,
		isLoading: isAnswersLoading,
		isSuccess: isAnswersSuccess,
		isError: isAnswersError,
		error: answersError,
		refetch: refetchAnswers,
	} = useGetAnswersQuery(id);

	const [answerText, setAnswerText] = useState('');
	const [editingAnswer, setEditingAnswer] = useState(null);
	const [addAnswer, { isLoading: isAddingAnswer }] = useAddAnswerMutation();
	const [deleteQuestion] = useDeleteQuestionMutation();
	const [updateAnswer, { isLoading: isUpdatingAnswer }] =
		useUpdateAnswerMutation();
	const [deleteAnswer] = useDeleteAnswerMutation();

	const handleAnswerSubmit = async () => {
		try {
			await addAnswer({
				questionId: id,
				data: { content: answerText },
			}).unwrap();
			setAnswerText('');
			refetchAnswers();
		} catch (err) {
			console.error('Failed to post answer:', err);
		}
	};

	const handleDeleteQuestion = async () => {
		try {
			await deleteQuestion(id);
			navigate('/questions');
		} catch (error) {
			console.error('Failed to delete question:', error);
		}
	};

	const handleEditAnswer = async (answerId, content) => {
		try {
			await updateAnswer({
				questionId: id,
				answerId,
				data: { content },
			}).unwrap();
			setEditingAnswer(null);
			refetchAnswers();
		} catch (error) {
			console.error('Failed to update answer:', error);
		}
	};

	const handleDeleteAnswer = async (answerId) => {
		try {
			await deleteAnswer({ questionId: id, answerId }).unwrap();
			refetchAnswers();
		} catch (error) {
			console.error('Failed to delete answer:', error);
		}
	};

	const goBack = () => {
		navigate('/questions');
	};

	if (isQuestionLoading || isAnswersLoading) return <p>Loading...</p>;
	if (isQuestionError) return <p>Error: {questionError.message}</p>;
	if (isAnswersError) return <p>Error: {answersError.message}</p>;

	const sortedAnswers = answers
		? [...answers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		: [];

	return (
		<div className="question-detail-page flex flex-col items-center ">
			<button onClick={goBack} className="self-start mb-4 p-2">
				<FaArrowLeft className="text-1xl" />
			</button>
			{isQuestionSuccess && question && (
				<>
					<div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-lg mb-4">
						<h2 className="text-2xl font-bold mb-2">{question.title}</h2>
						<p className="text-gray-700">{question.description}</p>
						<div className="flex justify-between mt-4">
							<Link to={`/edit-questions/${question._id}`}>Edit Question</Link>
							<button
								onClick={handleDeleteQuestion}
								className="text-red-500 hover:text-red-700"
							>
								Delete Question
							</button>
						</div>
					</div>
					<div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-lg mb-4">
						<h3 className="text-lg font-bold mb-2">
							Answers From The Community
						</h3>
						{isAnswersSuccess && answers && answers.length > 0 ? (
							sortedAnswers.map((answer) => (
								<div key={answer._id} className="answer-item mb-4">
									<div>
										<div className="flex flex-col items-center mb-2">
											<img
												src={avatar}
												alt="avatar"
												className="w-12 h-12 rounded-full object-cover mr-3"
											/>
											<span className="text-gray-800 mr-5">
												{answer.user.username}
											</span>
										</div>
										{userInfo && answer.user._id === userInfo._id && (
											<>
												<button
													onClick={() => setEditingAnswer(answer._id)}
													className="mt-10 text-blue-500 hover:text-blue-700 mr-2"
												>
													Edit
												</button>
												<button
													onClick={() => handleDeleteAnswer(answer._id)}
													className="text-red-500 hover:text-red-700"
												>
													Delete
												</button>
											</>
										)}
									</div>
									{editingAnswer === answer._id ? (
										<div className="flex flex-col">
											<textarea
												value={answerText}
												onChange={(e) => setAnswerText(e.target.value)}
												placeholder="Edit your answer..."
												className="w-full bg-gray-100 rounded-md px-3 py-2 mb-2"
											/>
											<button
												onClick={() => handleEditAnswer(answer._id, answerText)}
												disabled={isUpdatingAnswer}
												className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
											>
												{isUpdatingAnswer ? 'Updating...' : 'Update Answer'}
											</button>
											<button
												onClick={() => setEditingAnswer(null)}
												className="text-gray-500 hover:text-gray-700 mt-2"
											>
												Cancel
											</button>
										</div>
									) : (
										<p className="text-gray-700">{answer.content}</p>
									)}
								</div>
							))
						) : (
							<p className="text-gray-700">
								No answers yet. Be the first to answer!
							</p>
						)}
					</div>
					<div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-lg">
						<h3 className="text-lg font-bold mb-2">Answer The Top Question</h3>
						<textarea
							value={answerText}
							onChange={(e) => setAnswerText(e.target.value)}
							placeholder="Your Answer..."
							className="w-full bg-gray-100 rounded-md px-3 py-2 mb-2"
						/>
						<button
							onClick={handleAnswerSubmit}
							disabled={isAddingAnswer}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							{isAddingAnswer ? 'Posting...' : 'Post Your Answer'}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default QuestionDetailPage;
