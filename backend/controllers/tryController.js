import asyncHandler from 'express-async-handler';
import Answer from '../models/answerModel.js';

// @desc    Create a new answer
// @route   POST /api/answers
// @access  Private
const createAnswer = asyncHandler(async (req, res) => {
	const { content, questionId } = req.body;

	const answer = await Answer.create({
		content,
		question: questionId,
		user: {
			_id: req.user._id,
			username: req.user.username,
		},
	});

	res.status(201).json(answer);
});

// @desc    Get answers for a specific question
// @route   GET /api/answers/:questionId
// @access  Public
const getAnswersByQuestionId = asyncHandler(async (req, res) => {
	const { questionId } = req.params;

	const answers = await Answer.find({ question: questionId });

	res.json(answers);
});

// @desc    Update an answer
// @route   PUT /api/answers/:id
// @access  Private
const updateAnswer = asyncHandler(async (req, res) => {
	const { content } = req.body;
	const { id } = req.params;

	const answer = await Answer.findById(id);

	if (!answer) {
		res.status(404);
		throw new Error('Answer not found');
	}

	// Check if the user updating is the owner of the answer
	if (answer.user._id.toString() !== req.user._id.toString()) {
		res.status(401).json({ message: 'Not authorized to update this answer' });
		return;
	}

	answer.content = content;

	const updatedAnswer = await answer.save();
	res.json(updatedAnswer);
});

// @desc    Delete an answer
// @route   DELETE /api/answers/:id
// @access  Private
const deleteAnswer = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const answer = await Answer.findById(id);

	if (!answer) {
		res.status(404);
		throw new Error('Answer not found');
	}

	// Check if the user deleting is the owner of the answer
	if (answer.user._id.toString() !== req.user._id.toString()) {
		res.status(401).json({ message: 'Not authorized to delete this answer' });
		return;
	}

	await answer.remove();
	res.json({ message: 'Answer removed' });
});

export { createAnswer, getAnswersByQuestionId, updateAnswer, deleteAnswer };

import express from 'express';
import asyncHandler from 'express-async-handler';
import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// Create an answer
router.post(
	'/',
	protect,
	asyncHandler(async (req, res) => {
		const { content } = req.body;
		const questionId = req.params.questionId;

		const question = await Question.findById(questionId);

		if (!question) {
			res.status(404);
			throw new Error('Question not found');
		}

		const answer = new Answer({
			content,
			user: req.user._id,
			question: questionId,
		});

		const createdAnswer = await answer.save();
		res.status(201).json(createdAnswer);
	})
);

// Get answers for a specific question
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const questionId = req.params.questionId;

		const answers = await Answer.find({ question: questionId }).populate(
			'user',
			'name'
		);

		res.json(answers);
	})
);

// Update an answer
router.put(
	'/:id',
	protect,
	asyncHandler(async (req, res) => {
		const { content } = req.body;
		const answer = await Answer.findById(req.params.id);

		if (!answer) {
			res.status(404);
			throw new Error('Answer not found');
		}

		if (answer.user.toString() !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized to update this answer');
		}

		answer.content = content || answer.content;
		const updatedAnswer = await answer.save();
		res.json(updatedAnswer);
	})
);

// Delete an answer
router.delete(
	'/:id',
	protect,
	asyncHandler(async (req, res) => {
		const answer = await Answer.findById(req.params.id);

		if (!answer) {
			res.status(404);
			throw new Error('Answer not found');
		}

		if (answer.user.toString() !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized to delete this answer');
		}

		await answer.remove();
		res.json({ message: 'Answer removed' });
	})
);

export default router;

// const answer = new Answer({
// 	content,
// 	user: {
// 		_id,
// 		username,
// 	},
// 	question: questionId,
// });
