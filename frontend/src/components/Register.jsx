import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { toast } from 'react-toastify';
import Spinner from './Spinners';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);
	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		if (userInfo) {
			navigate('/questions');
		}
	}, [navigate, userInfo]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('passwords do not match');
		} else {
			try {
				const res = await register({
					username: userName,
					firstname: firstName,
					lastname: lastName,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate('/questions');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormContainer>
			<form className="w-full " onSubmit={submitHandler}>
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
				{isLoading && <Spinner />}
				<button
					type="submit"
					className="w-full p-2 bg-blue-500 text-white rounded"
				>
					Agree and Join
				</button>
			</form>
		</FormContainer>
	);
};

export default Register;
