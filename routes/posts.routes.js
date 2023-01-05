const Post = require("../models/Post.model");
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn } = require("../middleware/route-guard");

const router = require("express").Router();

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('posts/create');
});

router.post('/new', isLoggedIn, fileUploader.single('picture'), (req, res, next) => {
    const { _id } = req.session.user;
    const { content, picName } = req.body;
    req.file ? picPath = req.file.path : picPath = '';
    Post.create({ content, creatorId: _id, picName, picPath })
        .then(() => res.redirect('/posts/list'))
        .catch(err => console.log(err));
});

router.get('/list', (req, res, next) => {
    Post.find()
        .populate( 'creatorId' )
        .then(posts => res.render('posts/list', { posts }))
        .catch(err => console.log(err));
});

router.get('/:postId', (req, res, next) => {
    const { postId } = req.params;
    Post.findById( postId )
        .populate( 'creatorId' )
        .populate({
          path: 'comments',
          populate: { path: 'authorId' }
        })
        .then(post => res.render('posts/single', { post }))
        .catch(err => console.log(err));
});

module.exports = router;