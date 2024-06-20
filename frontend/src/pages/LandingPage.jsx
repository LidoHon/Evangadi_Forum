import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/evangadi-logo-white.png';
import { Menu, X } from 'lucide-react';

const LandingPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="background h-screen flex items-center justify-center">
			<div className="container mx-auto px-4">
				<header className="container mx-auto fixed top-0 left-0 right-0 bg-transparent flex justify-between items-center py-4 z-50">
					<div className="p-1 pt-3">
						<img src={logo} alt="Logo" />
					</div>
					<nav className="ml-auto hidden md:flex justify-around pt-3 space-x-10">
						<ul className="flex space-x-4 text-white pt-5">
							<li>
								<Link to="#" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline">
									Student's Forum
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline">
									Scholarship
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline">
									Immersive
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline">
									Placement
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline">
									Contact
								</Link>
							</li>
						</ul>
						<div>
							<Link to="/login">
								<button className="bg-white text-black py-2 px-4 rounded-full">
									Sign In
								</button>
							</Link>
						</div>
					</nav>
					<div className="md:hidden pt-3">
						<button className="text-white" onClick={toggleNavbar}>
							{isOpen ? <X /> : <Menu />}
						</button>
					</div>
				</header>
				{isOpen && (
					<div className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 text-white flex flex-col items-center md:hidden z-40 p-4 pt-20">
						<ul className="flex flex-col space-y-4">
							<li>
								<Link to="#" className="hover:underline" onClick={toggleNavbar}>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className="hover:underline"
									onClick={toggleNavbar}
								>
									Student's Forum
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline" onClick={toggleNavbar}>
									Scholarship
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline" onClick={toggleNavbar}>
									Immersive
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline" onClick={toggleNavbar}>
									Placement
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:underline" onClick={toggleNavbar}>
									Contact
								</Link>
							</li>
							<li>
								<Link to="/login" onClick={toggleNavbar}>
									<button className="bg-white text-black py-2 px-4 rounded-full">
										Sign In
									</button>
								</Link>
							</li>
						</ul>
					</div>
				)}
				<main className="text-center mt-20">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 pt-10">
						Bypass The Industrial,
						<br /> Dive Into The Digital!
					</h1>
					<p className="text-lg md:text-xl lg:text-2xl text-white mb-6 pt-5">
						Before us is a golden opportunity, demanding us to take a bold step
						forward and join the new digital era.
					</p>
					<div className="space-x-4 pt-10">
						<Link to="/register">
							<button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full">
								Create An Account
							</button>
						</Link>
						<Link to="/login">
							<button className="bg-white hover:bg-gray-200 text-black py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full">
								Sign In
							</button>
						</Link>
					</div>
				</main>
			</div>
		</div>
	);
};

export default LandingPage;
