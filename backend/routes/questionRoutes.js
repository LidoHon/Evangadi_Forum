import express from 'express';
import {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/askquestion', createQuestion);
// router
// 	.route('/question')
// 	.post(protect, createQuestion) // Create a new question
// 	.get(getQuestions); // Get all questions

// router
// 	.route('/question:id')
// 	.get(getQuestionById) // Get a single question by ID
// 	.put(protect, updateQuestion) // Update a question
// 	.delete(protect, deleteQuestion); // Delete a question

export default router;
