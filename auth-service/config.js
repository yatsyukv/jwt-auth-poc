module.exports = {
    secret: 'somesecretforencodingstuff', //this is shared among services (could be a public key file instead)
    tokenLifetime: 3600,
    refreshTokenLifetime: 86400
};