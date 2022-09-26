 var express = require('express');
 var router = express.Router();
 var User = require('../models/user');

 router.get('/', function(req, res, next) {
     User.find()
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error :: '+err));
 });

 router.post('/add', function(req, res, next) {
     const first_name = req.body.first_name;
     const last_name = req.body.last_name;
     const username = req.body.username;
     const password = req.body.password;

     const newUser = new User({first_name, last_name, username, password});
     
     newUser.save()
     .then(() => res.json('User added'))
     .catch(err => res.status(400).json('Error adding user :: '+err));
 });

 module.exports = router;