import asyncHandler from 'express-async-handler';
import Question from '../models/questionModel.js';

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private{ people should login to access this route}
const createQuestion = asyncHandler(async (req, res) => {
	const { title, description } = req.body;

	try {
		const question = await Question.create({
			title,
			description,
			user: req.user._id,
		});
		res.sendStatus(201).json(question);
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Failed to create question', error: error.message });
	}
});

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public

const getQuestions = asyncHandler(async (req, res) => {
	const questions = await Question.find({}).populate('user', 'username');

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
		res.status(404).json({ message: 'Question not found' });
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
			res.status(404).json({ message: 'Question not found' });
			return;
		}

		// Check if the user updating is the owner of the question
		if (question.user.toString() !== req.user._id.toString()) {
			res
				.status(401)
				.json({ message: 'Not authorized to update this question' });
			return;
		}

		question.title = title || question.title;
		question.description = description || question.description;

		const updatedQuestion = await question.save();
		res.json(updatedQuestion);
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Failed to update question', error: error.message });
	}
});

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private

const deleteQuestion = asyncHandler(async (req, res) => {
	try {
		const question = await Question.findById(req.params.id);

		if (!question) {
			res.status(404).json({ message: 'Question not found' });
			return;
		}

		// Check if the user deleting is the owner of the question
		if (question.user.toString() !== req.user._id.toString()) {
			res
				.status(401)
				.json({ message: 'Not authorized to delete this question' });
			return;
		}

		await question.remove();
		res.json({ message: 'Question removed' });
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Failed to delete question', error: error.message });
	}
});

export {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
};

// router
// 	.route('/question')
// 	.post(protect, createQuestion) // Create a new question
// 	.get(getQuestions); // Get all questions

// router
// 	.route('/question:id')
// 	.get(getQuestionById) // Get a single question by ID
// 	.put(protect, updateQuestion) // Update a question
// 	.delete(protect, deleteQuestion); // Delete a question

// router.get('/:id', getQuestionById);
// router.put('/:id', updateQuestion);
// router.delete('/:id', deleteQuestion);
