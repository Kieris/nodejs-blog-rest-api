const Comment = require('../../model/Comment/Comment');
const { appError } = require('../../utils/appError');
const User = require('../../model/User/User');
const Post = require('../../model/Post/Post');

const createComment = async (req, res, next) => {
    const { description } = req.body;
    try {
        const post = await Post.findById(req.params.id);

        const user = await User.findById(req.userAuth);

        const comment = await Comment.create({
            description,
            user: req.userAuth,
            post: post._id
        });

        post.comments.push(comment._id);
        user.comments.push(comment._id);

        await post.save({ validateBeforeSave: false });
        await user.save({ validateBeforeSave: false });

        res.json({
            status: 'success',
            data: comment
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        res.json({
            status: 'success',
            data: comment
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user.toString() !== req.userAuth.toString()) {
            return next(appError('You are not authorized to delete this comment', 403));
        }

        await Comment.findByIdAndDelete(req.params.id);

        const user = await User.findById(req.userAuth);

        user.comments = user.comments.filter(comment => comment.toString() !== req.params.id);
        //posts will check for deleted comments independently
        await user.save();

        res.json({
            status: 'success',
            data: 'Comment has been deleted'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const updateComment = async (req, res, next) => {
    const { description } = req.body;
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user.toString() !== req.userAuth.toString()) {
            return next(appError('You are not authorized to update this comment', 403));
        }

        await Comment.findByIdAndUpdate(req.params.id, {
            description
        }, {
            new: true,
            runValidators: true
        });

        res.json({
            status: 'success',
            data: 'You updated the comment'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

module.exports = {
    createComment,
    getComment,
    deleteComment,
    updateComment
}