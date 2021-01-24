const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { root } = require('../config/app');

// -------------------------REGISTER PAGE--------------------
registerPage = (req, res) => {
	res.sendFile(root);
};
register = async (req, res) => {
	// Check Username or Email is exists
	const userOrEmailExists = await User.findOne({
		$or: [{ name: req.body.name }, { email: req.body.email }],
	});
	if (userOrEmailExists)
		return res.status(400).send('Username or email already exists');

	// Hash and salt password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// Save user into database
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});
	try {
		const userSaved = await user.save();
		return res.send({ user: user._id });
	} catch (err) {
		return res.status(400).send({ err });
	}
};

// -------------------------LOGIN PAGE--------------------
loginPage = (req, res) => {
	res.send('This is the login page');
};
login = async (req, res) => {
	// Check email is exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(404).send('Email is not found!! X(');

	// Check password
	const passwordWrong = await bcrypt.compare(req.body.password, user.password);
	if (!passwordWrong) return res.status(400).send('Password is wrong!! :(');

	// Create and asign token header
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	return res.header('auth-token', token).send(token);
};

module.exports = {
	registerPage,
	register,
	loginPage,
	login,
};
