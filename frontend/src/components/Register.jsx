import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-md space-y-12 ">
			<form className="w-full">
				<h2 className="text-2xl text-center font-bold mb-4">
					Join the network
				</h2>
				<p className="text-1xl text-center mb-6">
					Already have an account?{' '}
					<a href="">
						{' '}
						<span className="text-orange-400 underline">Sign in</span>
					</a>
				</p>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full mb-4 p-2 border rounded"
				/>
				<div className="flex space-x-4 mb-4">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						className="w-1/2 p-2 border rounded"
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						className="w-1/2 p-2 border rounded"
					/>
				</div>
				<input
					type="text"
					name="userName"
					placeholder="User Name"
					className="w-full mb-4 p-2 border rounded"
				/>
				<div className="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Password"
						className="w-full mb-4 p-2 border rounded"
					/>
					<div
						className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaEyeSlash className="text-gray-500" />
						) : (
							<FaEye className="text-gray-500" />
						)}
					</div>
				</div>
				<button
					type="submit"
					className="w-full p-2 bg-blue-500 text-white rounded"
				>
					Agree and Join
				</button>
			</form>
		</div>
	);
};

export default Register;
