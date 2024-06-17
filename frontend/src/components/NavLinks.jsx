import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
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
			<button className="text-sm cursor-pointer px-10 md:px-20 mx-5 bg-blue-600 rounded-full text-white baseline hover:bg-blue-800">
				SIGN IN
			</button>
		</>
	);
};

export default NavLinks;
