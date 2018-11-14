const PORT = 7600;

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const authService = require('./auth-module/service');
const authMiddleware = require('./auth-module/middleware');
app.use(bodyParser.json());


let ads = [
    {
        id: 123,
        headline: 'Some Awesome thing',
        caption: 'It\'s really cool'
    },
    {

        id: 1234,
        headline: 'Another Awesome thing',
        caption: 'This one either'
    },
];

app.get('/', (req, res) => {
    res.json('I am the auth proof of concept API. Welcome!');
});

/**
 * Open login route
 */
app.post('/login', async (req, res) => {
    try {
        //TODO: this logic gets duplicated among all the services, which will use auth module. Need to think how to get rid of it. (mb separate global login to be called by a client app?)
        const loginResponse = await authService.loginHandler(req.body.username, req.body.password);
        res.status(200).json({success: true, token: loginResponse.token});
    } catch (error) {
        res.status(401).json({success: false, message: 'Invalid credentials'});
    }
});

/**
 * Protected routes
 */
app.use(authMiddleware.verify);

app.get('/api', (req, res) => {
    res.json('I am sample Ad service API');
});

app.get('/api/ads', (req, res) => {
    // TODO: user data is being pushed to req by a middleware
    const user = req.userData;
    console.log(user);
    res.json(ads);
});

app.post('/api/ads', (req, res) => {
    const ad = req.body;
    ads.push(ad);
    res.json(ad)
});

app.get('/api/ads/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ad = _.find(ads, (a) => {
        return a.id === id
    });
    res.json(ad)
});


app.listen(PORT, () => console.log(`Test API is ready and listening on http://localhost:${PORT}`));