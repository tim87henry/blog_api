var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        time: {type: Date},
        title: {type: String, required: true},
        text: {type: String, required: true},
        comments: {type: Array}
    }
);

module.exports = mongoose.model('Blog', blogSchema);