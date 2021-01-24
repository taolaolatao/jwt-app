const mongoose = require('mongoose');
const signale = require('signale');

let DB_CONNECTION = '';
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	DB_CONNECTION = process.env.DB_CONNECT_DEV;
} else {
	DB_CONNECTION = process.env.DB_CONNECT_PROD;
}
// signale.debug(process.env);
signale.success(`DB_CONNECT: ${DB_CONNECTION}`);

mongoose
	.connect(DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// connectTimeoutMS: 3000,
		serverSelectionTimeoutMS: 5000,
	})
	.then((val) => {
		signale.success({ val });
	})
	.catch((err) => {
		signale.fatal(`Connect error: ${err.message}`);
	});

module.exports = mongoose.connection;
