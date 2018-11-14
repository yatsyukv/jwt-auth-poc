const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let mockUsername = 'admin';
    let mockPass = 'password';

    // TODO: do user creds validation
    if (username && password) {
        if (username === mockUsername && password === mockPass) {
            let token = jwt.sign({
                    id: 12345,
                    firstName: 'John',
                    lastName: 'Doe',
                    roles: ['advertiser', 'publisher']
                },
                config.secret,
                {
                    expiresIn: config.tokenLifetime
                }
            );
            // TODO: create a refresh token, associate it to this access token and user and store it to persistent storage (really persistent? mb Redis is ok?)
            console.log(token);
            res.status(200).json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};

module.exports.logout = (req, res) => {
    // TODO: destroy or deactivate a refresh token, so user MUST login next time
    const token = req.body.token;
    res.status(501).json({
        success: false,
        message: 'Authentication failed! Please check the request'
    });
};

module.exports.refresh = (req, res) => {
    // TODO: lookup for the refresh token in a storage, check if it's valid and regenerate access token
    const token = req.body.token;
    res.status(501).json({
        success: false,
        message: 'Todo'
    });
};