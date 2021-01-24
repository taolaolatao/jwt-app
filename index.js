require('dotenv').config();
const morgan = require('morgan');
const signale = require('signale');
const express = require('express');
const app = express();
const db = require('./db');

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/posts.route');

app.use(express.static(__dirname + '/views/'));
app.use(express.json());
app.use(morgan('dev'));

db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res) => {
	res.send('Hello World!! I am here...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// signale.success('Operation successful');
// signale.debug('Hello', 'from', 'L59');
// signale.pending('Write release notes for %s', '1.2.0');
// signale.fatal(new Error('Unable to acquire lock'));
// signale.watch('Recursively watching build directory...');
// signale.complete({
// 	prefix: '[task]',
// 	message: 'Fix issue #59',
// 	suffix: '(@klauscfhq)',
// });
