import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	useGetQuestionByIdQuery,
	useUpdateQuestionMutation,
} from '../slices/questionApiSlice';
import Spinners from '../components/Spinners';
const EditQuestionPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: question,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetQuestionByIdQuery(id);

	const [
		updateQuestion,
		{ isLoading: isUpdating, isError: updateError, error: updateErrorMessage },
	] = useUpdateQuestionMutation();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (isSuccess && question) {
			setTitle(question.title);
			setDescription(question.description);
		}
	}, [isSuccess, question]);

	const handleUpdate = async () => {
		try {
			const updatedData = { title, description };
			const result = await updateQuestion({ id, ...updatedData }).unwrap();
			navigate(`/questions/${result._id}`);
		} catch (error) {
			console.error('Failed to update question:', error);
		}
	};

	if (isLoading) return <Spinners />;
	if (isError) return <p>Error: {error.message}</p>;

	return (
		<div className="edit-question-page flex flex-col items-center">
			{isSuccess && question && (
				<>
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
						onClick={handleUpdate}
						disabled={isUpdating}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						{isUpdating ? 'Updating...' : 'Update Question'}
					</button>
					{updateError && (
						<p className="text-red-500 mt-2">{updateErrorMessage.message}</p>
					)}
				</>
			)}
		</div>
	);
};

export default EditQuestionPage;
