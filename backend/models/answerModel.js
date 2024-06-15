import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = Schema(
	{
		content: {
			type: String,
			required: true,
		},
		question: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Question',
			required: true,
		},
		user: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			username: {
				type: String,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
