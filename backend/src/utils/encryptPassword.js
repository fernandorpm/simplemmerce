const bcrypt = require('bcryptjs');

module.exports = function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

// Load hash from DB
// bcrypt.compare(password, hash, function(err, res) {
//     // res === true
// });