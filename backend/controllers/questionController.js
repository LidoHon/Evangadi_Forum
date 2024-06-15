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
			username,
		},
	});

	res.status(201).json(question);
});

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public

const getQuestions = asyncHandler(async (req, res) => {
	const questions = await Question.find().populate('user', 'username');
	res.json(questions);
});

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public

const getQuestionById = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id).populate(
		'user',
		'username'
	);

	if (question) {
		res.json(question);
	} else {
		res.status(404).json({ message: 'question not found' });
	}
});

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private

const updateQuestion = asyncHandler(async (req, res) => {
	const { title, description } = req.body;

	try {
		let question = await Question.findById(req.params.id);
		if (!question) {
			res.status(404).json({ message: 'queston not found' });
		}
		// we gotta check if the user updating the question is the owner of the question

		if (question.user._id.toString() !== req.user._id.toString()) {
			res.status(401).json({
				message: 'Sorry! your are not authorized to update this question',
			});
			return;
		}

		// if the user is the owner
		question.title = title || question.title;
		question.description = description || question.description;

		// save the changes
		const updatedQuestion = await question.save();
		res.json(updatedQuestion);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'failed to update question', error: error.message });
	}
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
