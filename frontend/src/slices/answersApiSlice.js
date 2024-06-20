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
		getAnswerById: builder.query({
			query: ({ questionId, answerId }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers/${answerId}`,
				method: 'GET',
			}),
			providesTags: (result, error, { answerId }) => [
				{ type: 'Answer', id: answerId },
			],
		}),
		addAnswer: builder.mutation({
			query: ({ questionId, data }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Answer'],
		}),
		// addAnswer: builder.mutation({
		// 	query: ({ questionId, data }) => ({
		// 		url: `${QUESTIONS_URL}/${questionId}/answers`,
		// 		method: 'POST',
		// 		body: data,
		// 	}),
		// 	invalidatesTags: ['Answer'],
		// }),
		updateAnswer: builder.mutation({
			query: ({ questionId, answerId, data }) => ({
				url: `${QUESTIONS_URL}/${questionId}/answers/${answerId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, { answerId }) => [
				{ type: 'Answer', id: answerId },
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
	useGetAnswerByIdQuery,
	useGetAnswersQuery,
	useAddAnswerMutation,
	useUpdateAnswerMutation,
	useDeleteAnswerMutation,
} = answerApiSlice;
