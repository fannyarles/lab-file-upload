const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picPath: {
        type: String,
        required: true
    },
    picName: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{
    timestamps: true
});

const Post = model('Post', postSchema);

module.exports = Post;