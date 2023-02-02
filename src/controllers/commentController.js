var Comment = require('../models/comment');
var Blog = require('../models/blog');
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const util = require('util')

exports.all_comments = function(req, res, next) {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error :: '+err));
};

exports.show_comments = async function(req, res, next) {
    
    let comments_with_username = [];
    await Blog.findById(req.params.id)
    .then(async (blog) => {
        await Comment.find({blog: blog})
        .then(async comments => {
            for(let i=0; i<comments.length; i++) {
                await User.findById(comments[i].user)
                .then(user => {
                    comments_with_username.push({comment:comments[i], userid: user.username, username:user.first_name+" "+user.last_name})
                })
            }
        })
    })
    .then(() => res.json(comments_with_username))
    .catch(err => res.status(400).json('Error fetching blog:: '+err));
};

exports.add_comment = async function(req, res, next) {

    //Fetch user from token
    let date = new Date();
    jwt.verify(req.body.token, "cats", (err, data) => {
        console.log("DATA IS ::  "+util.inspect(req.body))
        if (err) { 
            console.log("JWT error") 
        } else {
            // console.log("user name is "+data.username)
            User.findOne({ username: data.username }, (err, user) => {
                if (err) { 
                console.log("Error finding logged in user")
                }
                if (!user) {
                console.log("Something wrong here..")
                }
                // console.log("user is "+user)
                const blog = req.body.blog;
                const time = date;
                const text = req.body.text;
                // console.log("Blog is "+util.inspect(blog))

                const newComment = new Comment({user, blog, time, text});
                
                console.log("Comment is "+util.inspect(newComment))
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