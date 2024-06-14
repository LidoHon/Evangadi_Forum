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
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
