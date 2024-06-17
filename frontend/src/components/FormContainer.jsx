import React from 'react';

const FormContainer = ({ children }) => {
	return (
		<div className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-md space-y-12">
			{children}
		</div>
	);
};

export default FormContainer;
