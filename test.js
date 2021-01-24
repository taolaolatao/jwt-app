const express = require('express');

const app = express();

const port = 8080;

app.listen(port, () => {
	console.log('listening for request on port 8080');
});

app.get('/', (req, res) => {
	console.log('request made');
	res.send('Hello World!! I am here...');
});

app.get('/about', (req, res) => {
	res.send('ABOUT!! I am here...');
});

app.get('/about-us', (req, res) => {
	res.send('ABOUT - US!! I am here...');
});

app.use((req, res) => {
	res.send('404!! I am here...');
});
