import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import { apiSlice } from './slices/apiSlice.js';
import { questionsApiSlice } from './slices/questionApiSlice.js';
import { answerApiSlice } from './slices/answersApiSlice.js';
const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[questionsApiSlice.reducerPath]: questionsApiSlice.reducer,
		[answerApiSlice.reducerPath]: answerApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			apiSlice.middleware,
			questionsApiSlice.middleware,
			answerApiSlice.middleware
		),
	devTools: true,
});

export default store;
