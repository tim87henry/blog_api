var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

router.get('/', function(req, res, next) {
    Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error :: '+err));
});

router.post('/add', function(req, res, next) {
    const user = req.body.user;
    const time = req.body.time;
    const title = req.body.title;
    const text = req.body.text;
    const comments = [];

    const newBlog = new Blog({user, time, title, text, comments});
    
    newBlog.save()
    .then(() => res.json('Blog added'))
    .catch(err => res.status(400).json('Error adding blog :: '+err));
});

module.exports = router;