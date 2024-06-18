import apiSlice from './apiSlice';

const QUESTIONS_URL = '/api/questions';

export const answerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnswers: builder.query({
			query: (questionId) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers`,
				method: 'GET',
			}),
			providesTags: ['Answer'],
		}),
		addAnswer: builder.mutation({
			query: ({ questionId, data }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Answer'],
		}),
		updateAnswer: builder.mutation({
			query: ({ questionId, answerId, data }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers/${answerId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, { answerId }) => [
				{ type: 'Answer', answerId },
			],
		}),
		deleteAnswer: builder.mutation({
			query: ({ questionId, answerId }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers/${answerId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Answer'],
		}),
	}),
});

export const {
	useGetAnswersQuery,
	useAddAnswerMutation,
	useUpdateAnswerMutation,
	useDeleteAnswerMutation,
} = answerApiSlice;
