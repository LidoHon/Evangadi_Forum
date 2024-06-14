import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
// @desc    Auth user(login) & get token
// @route   POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(401);
		throw new Error('invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;
	// Regular expression for password validation
	const passwordRegex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	// Check if password meets criteria
	if (!passwordRegex.test(password)) {
		res.status(400);
		throw new Error(
			'Password must be at least 8 characters long and contain letters, numbers, and special characters.'
		);
	}

	// Check if username already exists
	const existingUsername = await User.findOne({ username });
	if (existingUsername) {
		res.status(400);
		throw new Error('Username is already taken');
	}
	// check for the email as well

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('user already exists');
	}
	const user = await User.create({
		username,
		firstname,
		lastname,
		email,
		password,
	});
	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: 'user logged out' });
});
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
	// console.log(req.user);
	const user = {
		_id: req.user._id,
		username: req.user.username,
		firstname: req.user.firstname,
		lastname: req.user.lastname,
		email: req.user.email,
	};
	res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.username = req.body.username || user.username;
		user.firstname = req.body.firstname || user.firstname;
		user.lastname = req.body.lastname || user.lastname;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			firstname: updatedUser.firstname,
			lastname: updatedUser.lastname,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error('user not found');
	}
});
export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
