import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../assets/images/evangadi-logo-footer.png';

const Footer = () => {
	return (
		<div className="bg  sticky text-white">
			<div className="w-11/12 md:w-9/12 flex flex-col md:flex-row justify-between m-auto py-7">
				<div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
					<div className="mb-4">
						<img src={logo} alt="Logo" />
					</div>
					<div className="flex space-x-4">
						<FaFacebook />
						<FaInstagram />
						<FaYoutube />
					</div>
				</div>
				<div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
					<h2 className="mb-4">Useful Links</h2>
					<p className="text-xs font-light my-2">How it works</p>
					<p className="text-xs font-light my-2">Terms and Service</p>
					<p className="text-xs font-light my-2">Privacy and Policy</p>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h2 className="mb-4">Contact Info</h2>
					<p className="text-xs font-light my-2">Evangadi Networks</p>
					<p className="text-xs font-light my-2">support@gmail.com</p>
					<p className="text-xs font-light my-2">+1-202-386-2702</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
