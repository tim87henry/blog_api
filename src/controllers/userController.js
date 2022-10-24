var User = require('../models/user');
var Blog = require('../models/blog');
var async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) { 
        res.status(400).json(err)
      }
      if (!user) {
        res.status(400).json("This user doesn't exist")
      }
      if(req.body.password === user.password) {
        res.status(400).json("Wrong password mate")
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
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
    console.log("HERE  ::  "+req.body)
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({first_name, last_name, username, password});
    
    newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error adding user :: '+err));
};

exports.login_user = passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/"
});

exports.show_user_blogs = function(req, res, next) {
    Blog.find({user: req.params.id})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};