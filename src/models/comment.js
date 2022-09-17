var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        time: {type: Date},
        title: {type: String, required: true},
        text: {type: String, required: true}
    }
);

module.exports = mongoose.model('Comment', commentSchema);