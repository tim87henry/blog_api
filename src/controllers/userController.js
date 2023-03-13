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
      return res.json({message: "Incorrect username"});
    }
    if (user.password !== req.body.password) {
      return res.json({message: "Incorrect password"});
    }
    // const token = jwt.sign({user}, "cats", {expiresIn: "10s"});
    const access_token = jwt.sign({user}, "cats", { expiresIn: "30s"})
    const refresh_token = jwt.sign({user}, "dogs", { expiresIn: "1d"})
    User.findOne({_id: user.id}, (err, usr) => {
      usr.refresh_token = refresh_token;
      usr.save();
    });
    res.cookie('refresh_token', refresh_token, {httpOnly: true, maxAge: 24*60*60*100})
    req.user = user;
    return res.json({refresh_token})
  });
}

exports.show_user_blogs = function(req, res, next) {
    Blog.find({user: req.params.id})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};