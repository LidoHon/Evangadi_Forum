import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-md space-y-12 ">
			<form className="w-full">
				<h2 className="text-2xl text-center font-bold mb-4">
					Join the network
				</h2>
				<p className="text-1xl text-center mb-6">
					Already have an account?{' '}
					<Link to="/login">
						{' '}
						<span className="text-orange-400 underline">Sign in</span>
					</Link>
				</p>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full mb-4 p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="flex space-x-4 mb-4">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						className="w-1/2 p-2 border rounded"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						className="w-1/2 p-2 border rounded"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<input
					type="text"
					name="userName"
					placeholder="User Name"
					className="w-full mb-4 p-2 border rounded"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
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
				<div className="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Confirm Password"
						className="w-full mb-4 p-2 border rounded"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
