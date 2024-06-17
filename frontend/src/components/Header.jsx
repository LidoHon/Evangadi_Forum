import React, { useState } from 'react';
import logo from '../assets/images/evangadi-logo-black.png';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="relative container mx-auto p-6">
				<div className="flex items-center justify-between ">
					<div className="p-1 pt-3 ">
						<img src={logo} alt="Logo" />
					</div>
					<div className="ml-auto hidden md:flex justify-around pt-3 space-x-10 ">
						{}
						<NavLinks />
					</div>
					<div className="md:hidden pt-3">
						<button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
					</div>
				</div>
				{isOpen && (
					<div className="flex flex-col items-center md:hidden bg-background dark:bg-d-background">
						<NavLinks />
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
