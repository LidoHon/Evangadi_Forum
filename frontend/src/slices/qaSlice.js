import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' }); // Adjust baseURL as per your server setup

export const qaSlice = createApi({
	reducerPath: 'qaApi',
	baseQuery,
	tagTypes: ['Question', 'Answer'],
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: () => '/questions',
		}),
		postQuestion: builder.mutation({
			query: (data) => ({
				url: '/questions',
				method: 'POST',
				body: data,
			}),
		}),
		getAnswersForQuestion: builder.query({
			query: (questionId) => ` /questions/${questionId}/answers`,
		}),
		postAnswerToQuestion: builder.mutation({
			query: ({ questionId, data }) => ({
				url: `/questions/${questionId}/answers`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	usePostQuestionMutation,
	useGetAnswersForQuestionQuery,
	usePostAnswerToQuestionMutation,
} = qaSlice;

export default qaSlice.reducer;
