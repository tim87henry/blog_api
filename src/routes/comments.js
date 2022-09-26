var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

router.get('/', function(req, res, next) {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error :: '+err));
});

router.post('/add', function(req, res, next) {
    const user = req.body.user;
    const time = req.body.time;
    const title = req.body.title;
    const text = req.body.text;

    const newComment = new Comment({user, time, title, text});
    
    newComment.save()
    .then(() => res.json('Comment added'))
    .catch(err => res.status(400).json('Error adding comment :: '+err));
});

module.exports = router;