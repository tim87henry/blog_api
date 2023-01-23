var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        blog: {type: Schema.Types.ObjectId, ref: 'Blog', required: true},
        time: {type: Date},
        text: {type: String, required: true}
    }
);

module.exports = mongoose.model('Comment', commentSchema);