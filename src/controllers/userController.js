var User = require('../models/user');
var Blog = require('../models/blog');
var async = require('async');

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

exports.show_user_blogs = function(req, res, next) {
    Blog.find({user: req.params.id})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};