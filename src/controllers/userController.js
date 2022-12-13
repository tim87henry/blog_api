var User = require('../models/user');
var Blog = require('../models/blog');
var async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
require('../passport');
const util = require('util');

passport.serializeUser(function(user, done) {
  console.log("Serialize")
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("Deserialize")
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.find_users = function(req, res, next) {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error :: '+err));
};

exports.add_user = function(req, res, next) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({first_name, last_name, username, password});
    
    newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error adding user :: '+err));
};

exports.login_user = (req, res, next) => {

  console.log("happening")
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) { 
      return res.json({error: err})
    }
    if (!user) {
      console.log("no user")
      return res.json( { message: "Incorrect username", loggedIn: false });
    }
    if (user.password !== req.body.password) {
      return res.json({ message: "Incorrect password", loggedIn: false});
    }
    const token = jwt.sign(JSON.stringify(user), "cats");
    req.user = user;
    return res.json({token, loggedIn: true})
  });
}

exports.show_user_blogs = function(req, res, next) {
    Blog.find({user: req.params.id})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};