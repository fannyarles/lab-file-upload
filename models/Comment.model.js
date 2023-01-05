const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    }, 
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imagePath: {
        type: String,
    },
    imageName: {
        type: String
    }
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;