const PORT = 7601;

const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('I AM SAMPLE AUTHENTICATION SERVICE');
});

app.post('/login', authController.login);
app.post('/logout', authController.logout);
app.post('/refresh', authController.refresh);


app.listen(PORT, () => console.log(`Test Auth service is ready and listening on http://localhost:${PORT}`));