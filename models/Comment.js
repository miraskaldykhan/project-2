const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const CommentSchema = new Schema({
    comment: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment