import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading, error }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate('/home');
		}
	}, [navigate, userInfo]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate('/home');
		} catch (err) {
			toast.error('Failed to login:', err?.data?.message || err.error);
		}
	};
	return (
		<FormContainer>
			<form onSubmit={submitHandler} className="w-full">
				<h2 className="text-2xl text-center font-bold mb-4">
					Login to your account
				</h2>
				<p className="text-1xl text-center mb-6">
					Don't have an account?{' '}
					<Link to="/register">
						{' '}
						<span className="text-orange-400 underline">SignUp</span>
					</Link>
				</p>
				<input
					type="email"
					name="email"
					placeholder="Enter Email"
					className="w-full mb-4 p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div className="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Enter Password"
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
				<button
					type="submit"
					variant="primary"
					className="w-full p-2 bg-orange-400 text-white rounded"
				>
					Submit
				</button>
				<Link to="/register">
					<p className="text-orange-400 underline text-center">
						Create an account
					</p>
				</Link>
			</form>
		</FormContainer>
	);
};

export default Login;
