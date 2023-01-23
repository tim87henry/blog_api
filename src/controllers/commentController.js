var Comment = require('../models/comment');
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const util = require('util')

exports.all_comments = function(req, res, next) {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error :: '+err));
};

exports.show_comments = function(req, res, next) {
    // Comment.find({blog: req.body.blog})
    console.log("TEST   "+util.inspect(req.query))
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error :: '+err));
};

exports.add_comment = async function(req, res, next) {

    //Fetch user from token
    let date = new Date();
    jwt.verify(req.body.token, "cats", (err, data) => {
        // console.log("DATA IS ::  "+util.inspect(data))
        if (err) { 
            console.log("JWT error") 
        } else {
            console.log("user name is "+data.username)
            User.findOne({ username: data.username }, (err, user) => {
                if (err) { 
                console.log("Error finding logged in user")
                }
                if (!user) {
                console.log("Something wrong here..")
                }
                console.log("user is "+user)
                const blog = req.body.blog;
                const time = date;
                const text = req.body.text;

                const newComment = new Comment({user, blog, time, text});
                
                newComment.save()
                .then(() => res.json('Comment added'))
                .catch(err => res.status(400).json('Error adding comment :: '+err));
            });
        }
    })
};

exports.delete_comment = function(req, res, next) {
    Comment.findByIdAndRemove(req.params.id)
    .catch(err => res.status(400).json('Error deleting comment :: '+err));
};