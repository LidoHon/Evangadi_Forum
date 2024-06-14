import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			username: { type: String, required: true },
		},
	},
	{
		timestamps: true,
	}
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
