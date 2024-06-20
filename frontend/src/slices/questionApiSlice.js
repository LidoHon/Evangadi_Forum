// src/api/questionsApiSlice.js

import { apiSlice } from './apiSlice';

const QUESTIONS_URL = '/api/questions';

export const questionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: () => QUESTIONS_URL,
			providesTags: ['Question'],
		}),
		getQuestionById: builder.query({
			query: (id) => `${QUESTIONS_URL}/${id}`,
			providesTags: (result, error, id) => [{ type: 'Question', id }],
		}),
		// addAnswer: builder.mutation({
		// 	query: ({ questionId, data }) => ({
		// 		url: `${QUESTIONS_URL}/${questionId}/answers`,
		// 		method: 'POST',
		// 		body: data,
		// 	}),
		// 	invalidatesTags: ['Answer'],
		// }),

		createQuestion: builder.mutation({
			query: (data) => ({
				url: `${QUESTIONS_URL}/askquestion`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Question'],
		}),
		// createAnswer: builder.mutation({
		// 	query: ({ questionId, text }) => ({
		// 		url: `${QUESTIONS_URL}/${questionId}/answers`,
		// 		method: 'POST',
		// 		body: { text },
		// 	}),
		// 	invalidatesTags: (result, error, { questionId }) => [
		// 		{ type: 'Question', id: questionId },
		// 	],
		// }),
		updateQuestion: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `${QUESTIONS_URL}/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }],
		}),
		deleteQuestion: builder.mutation({
			query: (id) => ({
				url: `${QUESTIONS_URL}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Question'],
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetQuestionByIdQuery,
	useCreateQuestionMutation,
	// useCreateAnswerMutation,
	useUpdateQuestionMutation,
	useDeleteQuestionMutation,
	// useAddAnswerMutation,
} = questionsApiSlice;
