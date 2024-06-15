import asyncHandler from 'express-async-handler';
import Answer from '../models/answerModel.js';

import Question from '../models/questionModel.js';

// @desc    Create a new answer
// @route   POST /api/questions/:questionId/answers
// @access  Private

const createAnswer = asyncHandler(async (req, res) => {
	const { content } = req.body;
	const { questionId } = req.params;
	const { _id, username } = req.user;
	const question = await Question.findById(questionId);

	if (!question) {
		res.status(404);
		throw new Error('Question not found');
	}

	const answer = await Answer.create({
		content,
		user: {
			_id,
			username,
		},
		question: questionId,
	});

	const createdAnswer = await answer.save();
	res.status(201).json(createdAnswer);
});

// @desc    Get answers for a specific question
// @route   GET /api/question/:questionId/answers
// @access  Public

const getAnswerByQuestionId = asyncHandler(async (req, res) => {
	const questionId = req.params.questionId;

	const answers = await Answer.find({ question: questionId }).populate(
		'user',
		'name'
	);
	res.json(answers);
});

// @desc    Update an answer
// @route   PUT /api/question/:questionId/answers/:answerid
// @access  Private
const updateAnswer = asyncHandler(async (req, res) => {
	const { content } = req.body;
	const { answerId } = req.params;
	const answer = await Answer.findById(answerId);

	if (!answer) {
		return res.status(404).json({ message: 'answer not found' });
	}

	if (answer.user._id.toString() !== req.user._id.toString()) {
		return res
			.status(401)
			.json({ message: 'sorry you are not authorized to edit this question' });
	}
	answer.content = content || answer.content;
	const updatedAnswer = await answer.save();
	res.json(updatedAnswer);
});

// @desc    Delete an answer
// @route   DELETE /api/question/:questionId/answers/:answerid
// @access  Private

const deleteAnswer = asyncHandler(async (req, res) => {
	const { answerId } = req.params;

	const answer = await Answer.findById(answerId);

	if (!answer) {
		return res.status(404).json({ message: 'Answer not found' });
	}
	if (answer.user._id.toString() !== req.user._id.toString()) {
		return res.status(401).json({
			message: 'sorry you are not authorized to delete this question',
		});
	}
	await answer.deleteOne();
	res.json({ message: 'answer deleted' });

	// res.status(200).json({ message: 'answer is deleted' });
});

export { createAnswer, getAnswerByQuestionId, updateAnswer, deleteAnswer };
