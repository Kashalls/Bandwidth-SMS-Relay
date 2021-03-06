const express = require('express');
const morgan = require('morgan');
const multer = require('multer');

const Bandwidth = require('@bandwidth/messaging');
const Sendgrid = require('@sendgrid/mail');

const config = require('../config');

Sendgrid.setApiKey(config.sendgrid.key);

const app = express();

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

const upload = multer();

app.get('/', (req, res) => res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));

app.post('/sendgrid/incoming', upload.none(), async (req, res) => {
	console.log(req);
	return res.status(204).send();
});

app.post('/bandwidth/incoming', async (req, res) => {
	const msg = {
		to: 'jordpjones@gmail.com',
		from: 'jordpjones@gmail.com',
		subject: 'Sending with Sendgird',
		text: 'Its easy',
		html: '<strong>test</strong>'
	};

	Sendgrid.send(msg)
		.then(() => console.log('Email sent'))
		.catch((error) => console.error(error));
	return res.status(204).send();
});

app.listen(3000, () => console.log('Server is listening on 3000'));
