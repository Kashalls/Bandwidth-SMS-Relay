const express = require('express');
const bodyParser = require('body-parser');
const Bandwidth = require('@bandwidth/messaging');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));

app.post('/sendgrid/incoming', async (req, res) => {
    console.log(req.body);
    return res.status(204);
})

app.listen(3000, () => console.log('Server is listening on 3000'));