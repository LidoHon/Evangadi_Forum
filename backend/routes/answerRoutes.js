import express from 'express';
import {
	createAnswer,
	getAnswerByQuestionId,
	updateAnswer,
	deleteAnswer,
} from '../controllers/answerController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(protect, createAnswer)
	.get(protect, getAnswerByQuestionId);

router
	.route('/:answerId')
	.put(protect, updateAnswer)
	.delete(protect, deleteAnswer);

export default router;
