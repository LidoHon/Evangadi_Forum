import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import avater from '../assets/images/istockphoto-1300845620-612x612.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import {
	useGetQuestionByIdQuery,
	useAddAnswerMutation,
} from '../slices/questionApiSlice';
import { useGetAnswersQuery } from '../slices/answersApiSlice';
import { useNavigate } from 'react-router-dom';
const QuestionDetailPage = () => {
	const { id } = useParams();
	const {
		data: question,
		isLoading: isQuestionLoading,
		isSuccess: isQuestionSuccess,
		isError: isQuestionError,
		error: questionError,
	} = useGetQuestionByIdQuery(id);
	// console.log(question);
	const [answerText, setAnswerText] = useState('');
	const [addAnswer, { isLoading: isAddingAnswer }] = useAddAnswerMutation();
	const {
		data: answers,
		isLoading: isAnswersLoading,
		isSuccess: isAnswersSuccess,
		isError: isAnswersError,
		error: answersError,
		refetch: refetchAnswers,
	} = useGetAnswersQuery(id);

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
	const navigate = useNavigate();
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
					</div>
					<div className="w-full max-w-5xl bg-white shadow-md p-4 rounded-lg mb-4">
						<h3 className="text-lg font-bold mb-2">
							Answers From The Community
						</h3>
						{isAnswersSuccess && answers && answers.length > 0 ? (
							sortedAnswers.map((answer) => (
								<div key={answer._id} className="answer-item ">
									<div className=" flex flex-col items-center py-10">
										<img
											src={avater}
											alt="avatar"
											className="w-12 h-12 mx-5rounded-full object-cover mr-3"
										/>
										<span className="text-gray-800 mr-5">
											{answer.user.username}
										</span>
									</div>
									<p className="text-gray-700">{answer.content}</p>
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
