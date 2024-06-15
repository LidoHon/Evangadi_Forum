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

router.post('/askquestion', protect, createQuestion);
router.get('/', protect, getQuestions);
router
	.route('/:id')
	.get(protect, getQuestionById)
	.put(protect, updateQuestion)
	.delete(protect, deleteQuestion);

export default router;
