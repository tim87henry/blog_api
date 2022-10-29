var User = require('../models/user');
var Blog = require('../models/blog');
var async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("Auth")
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        res.json({error: err})
      }
      if (!user) {
        console.log("no user")
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
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
  console.log("login controller")
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log("Info is "+(info? info.message: "nothing"))
    if (!user) {
      console.log("no user returning")
      res.json({message: info.message})
    } else {
      req.login(user, {session: false}, (err) => {
        if (err) {
          res.send(err);
        }

        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({user}, 'your_jwt_secret');
        return res.json({user, token});
      });
    }
  })(req, res, next);
};

exports.show_user_blogs = function(req, res, next) {
    Blog.find({user: req.params.id})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};