let jwt = require('jsonwebtoken');
const config = require('../config/auth');

module.exports.verify = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log(token);
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized [Invalid Token]'
                });
            } else {
                req.userInfo = decoded;
                console.log(decoded);
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized [Invalid Token]'
        });
    }
};