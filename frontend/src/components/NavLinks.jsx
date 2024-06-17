import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';

const NavLinks = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const [logoutApiCall] = useLogOutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(clearCredentials());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
	};

	return (
		<>
			<Link to={'/'}>
				<p className="text-sm font-medium mx-5 my-2 hover:text-gray-500">
					Home
				</p>
			</Link>
			<p className="text-sm font-medium mx-5 my-2 hover:text-gray-500">
				How it works
			</p>
			{userInfo ? (
				<div className="relative">
					<button
						onClick={toggleDropdown}
						className="text-sm cursor-pointer px-4 py-2 rounded-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
					>
						{userInfo.username}
					</button>
					{isDropdownOpen && ( // Render dropdown only if isDropdownOpen is true
						<div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20">
							<Link
								to="/profile"
								className="block px-4 py-2 text-sm hover:bg-gray-100"
							>
								Profile
							</Link>
							<button
								onClick={logoutHandler}
								className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			) : (
				<button className="text-sm cursor-pointer px-10 md:px-20 mx-5 bg-blue-600 rounded-full text-white baseline hover:bg-blue-800">
					Login
				</button>
			)}
		</>
	);
};

export default NavLinks;
