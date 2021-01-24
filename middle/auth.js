const { registerValidate, loginValidate } = require('../validation/validation');
const jwt = require('jsonwebtoken');

module.exports.registerAuth = (req, res, next) => {
	const { error } = registerValidate(req.body);
	if (error) res.status(400).send(error.details[0].message);
	next();
};

module.exports.loginAuth = (req, res, next) => {
	const { error } = loginValidate(req.body);
	if (error) res.status(400).send(error.details[0].message);
	next();
};

module.exports.authToken = (req, res, next) => {
	const token = req.header('auth-token') || req.query.token;
	if (!token) return res.status(401).send('Access Denined');

	try {
		const verify = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verify;
		next();
	} catch (error) {
		return res.status(400).send('Invalid Token');
	}
};
