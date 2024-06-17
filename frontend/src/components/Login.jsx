import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-md space-y-12 ">
			<form className="w-full">
				<h2 className="text-2xl text-center font-bold mb-4">
					Login to your account
				</h2>
				<p className="text-1xl text-center mb-6">
					Dont have an account?{' '}
					<Link to="/register">
						{' '}
						<span className="text-orange-400 underline">
							Create a new account
						</span>
					</Link>
				</p>
				<input
					type="email"
					name="email"
					placeholder="Email"
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
		</div>
	);
};

export default Login;
