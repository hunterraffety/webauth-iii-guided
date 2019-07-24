const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  // get the token from Authorization header
  const token = req.headers.authorization;
  // verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token.' });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token.' });
  }
};

/*
//const options = {
//  headers: {
//  authorization: token
//  }
//}
*/

// axios.get(url, options);
// axios.post(url, options);
