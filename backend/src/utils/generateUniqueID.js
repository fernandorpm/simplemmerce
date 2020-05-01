const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(6).toString('HEX');
}