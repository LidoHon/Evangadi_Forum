import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// i left this empity becouse am using a proxy so anyone who would use my code{ feels so good saying that :)} either should setup proxy or add the http:blah blah in here manually
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User', 'Question', 'Answer'],
	endpoints: (builder) => ({}),
});
export default apiSlice;
