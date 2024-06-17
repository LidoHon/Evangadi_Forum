import React from 'react';
import Login from '../components/Login';
import Paragraph from '../components/paragraph';
const LoginPage = () => {
	return (
		<div className="container pt-2 flex flex-col md:flex-row items-center justify-center px-6 mx-auto mt-20 mb-20 space-y-12 md:space-y-0 md:space-x-8">
			<Login />
			<Paragraph />
		</div>
	);
};

export default LoginPage;
