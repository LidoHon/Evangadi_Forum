import React from 'react';

const Paragraph = () => {
	return (
		<div className="flex justify-center items-center bg-gray-100">
			<div className="w-full max-w-lg p-6 bg-white   space-y-6">
				<div>
					<p className="text-orange-400 text-xs font-medium my-2">About</p>
					<h1 className="font-medium text-2xl my-2">Evangadi Networks Q&A</h1>
				</div>
				<div className="text-sm">
					<p className="my-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
						mollitia, molestiae quas vel sint commodi repudiandae consequuntur
					</p>
					<p>
						Similique accusantium nemo autem. Veritatis obcaecati tenetur iure
						eius earum ut molestias architecto voluptate aliquam nihil, eveniet
					</p>
					<p className="my-2">
						Eos sapiente officiis modi at sunt excepturi expedita sint? Sed
						quibusdam recusandae alias error harum maxime
					</p>
				</div>
				<div className="text-center my-3 py-3">
					<p className="w-44 py-2 bg-orange-400">HOW IT WORKS</p>
				</div>
			</div>
		</div>
	);
};

export default Paragraph;
