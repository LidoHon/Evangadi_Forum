import asyncHandler from 'express-async-handler';
import Question from '../models/questionModel.js';

// @desc    Create a new question
// @route   POST /api/questions/askquestions
// @access  Private{ people should login to access this route}
const createQuestion = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'create question' });
});

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public

const getQuestions = asyncHandler(async (req, res) => {});

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public

const getQuestionById = asyncHandler(async (req, res) => {});
// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private

const updateQuestion = asyncHandler(async (req, res) => {
	const { title, description } = req.body;
});

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private

const deleteQuestion = asyncHandler(async (req, res) => {});

export {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
};
