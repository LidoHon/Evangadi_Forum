import asyncHandler from 'express-async-handler';
import Question from '../models/questionModel.js';

// @desc    Create a new question
// @route   POST /api/questions/askquestions
// @access  Private{ people should login to access this route}

const createQuestion = asyncHandler(async (req, res) => {
	const { title, description } = req.body;

	if (!title || !description) {
		res.status(400);
		throw new Error('Title and description are required');
	}

	const { _id, username } = req.user;
	const question = await Question.create({
		title,
		description,
		user: {
			_id,
			username, // Include username in the question document
		},
	});

	res.status(201).json(question);
});

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public

const getQuestions = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'all questions' });
});

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public

const getQuestionById = asyncHandler(async (req, res) => {
	res.status(200).json({ message: ' questions' });
});
// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private

const updateQuestion = asyncHandler(async (req, res) => {
	// const { title, description } = req.body;
	res.status(200).json({ message: 'question updated' });
});

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private

const deleteQuestion = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'question deleted' });
});

export {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
};
