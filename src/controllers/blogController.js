var Blog = require('../models/blog');
const util = require('util');

exports.find_all_blogs = function(req, res, next) {
    Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
};

exports.add_blog = function(req, res, next) {
    console.log("User is   "+req.user)
    // console.log("User is "+util.inspect(req, {showHidden: false, depth: null, colors: true}))
    const user = req.user;
    const time = new Date();
    const title = req.body.title;
    const text = req.body.text;
    const comments = [];

    const newBlog = new Blog({user, time, title, text, comments});
    
    newBlog.save()
    .then(() => res.json('Blog added'))
    .catch(err => res.status(400).json('Error adding blog :: '+err));
};

exports.show_blog = function(req, res, next) {
    Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error fetching blog:: '+err));
};

exports.edit_blog = function(req, res, next) {
    Blog.findByIdAndUpdate(req.params.id, req.body, {})
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error updating blog :: '+err));
};

exports.delete_blog = function(req, res, next) {
    Blog.findByIdAndRemove(req.params.id)
    .catch(err => res.status(400).json('Error deleting blog :: '+err));
};