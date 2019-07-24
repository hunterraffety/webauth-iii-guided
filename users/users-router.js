const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  // restricted middleware will only be called if jwtToken exists. Might not have all properties of it.
  const department = req.jwtToken.department;

  console.log(req.jwtToken);
  Users.find(department)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
