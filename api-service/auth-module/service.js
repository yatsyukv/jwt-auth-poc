const axios = require('axios');
const authConfig = require('../config/auth');

module.exports.loginHandler = async (username, password) => {
    return axios.post(authConfig.endpointUrl + '/login', {
        username: username, password: password
    }).then(response => {
        return response.data;
    });
};

module.exports.logoutHandler = async (token) => {
    return axios.get(authConfig.endpointUrl + '/logout')
        .then(response => {
            return response.data;
        });
};

module.exports.refreshHandler = async (token) => {
    return axios.get(authConfig.endpointUrl + '/refresh')
        .then(response => {
            return response.data;
        });
};