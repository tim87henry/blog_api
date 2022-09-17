var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true}
    }
);

userSchema.virtual('name')
.get(function() {
    return this.first_name+" "+this.last_name;
});

module.exports = mongoose.model('User', userSchema);