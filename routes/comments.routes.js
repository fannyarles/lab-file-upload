const Comment = require('../models/Comment.model');
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn } = require('../middleware/route-guard');
const Post = require('../models/Post.model');
const router = require('express').Router();

router.post('/:postId/add', isLoggedIn, fileUploader.single('picture'), (req, res, next) => {
    const { postId } = req.params;
    const { _id } = req.session.user;
    const { content, imageName } = req.body;
    req.file ? filePath = req.file.path : filePath = '';
    Comment.create({ content, authorId: _id, imagePath: filePath, imageName })
        .then(comment => {
            Post.findById( postId )
                .then(post => {
                    post.comments.push(comment._id);
                    post.save();
                })
                .catch(err => console.log(err))
        })
        .then(() => res.redirect(`/posts/${ postId }`))
        .catch(err => console.log(err));
});

module.exports = router;