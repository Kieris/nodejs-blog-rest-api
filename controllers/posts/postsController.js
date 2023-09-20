const User = require("../../model/User/User");
const Post = require("../../model/Post/Post");
const { appError } = require('../../utils/appError');

const createPost = async (req, res, next) => {
    console.log(req.file);
    const { title, description, category } = req.body;
    try {
        const author = await User.findById(req.userAuth);

        //if admin blocked, don't allow creation
        if (author.isBlocked) return next(appError('Account is blocked', 403));
        
        const postCreated = await Post.create({
            title,
            description,
            category,
            user: author._id,
            photo: req?.file?.path
        });

        author.posts.push(postCreated);
        await author.save();

        res.json({
            status: "success",
            data: postCreated
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.numViews.includes(req.userAuth)) {
            post.numViews.push(req.userAuth);

            await post.save();
        }
        
        res.json({
            status: "success",
            data: post
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("user")
            .populate("category", "title");

        const user = await User.findById(req.userAuth);

        const filteredPosts = posts.filter(post => {
            //check if user has blocked post author
            if (user?.blocked?.includes(post.user._id)) return null;
            //check is post author has blocked user
            const isBlocked = post.user?.blocked?.includes(req.userAuth);
            
            return isBlocked ? null : post;
        });

        res.json({
            status: "success",
            data: filteredPosts
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getFollowedPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("user")
            .populate("category", "title");

        const user = await User.findById(req.userAuth);

        const filteredPosts = posts.filter(post => {
            //check if user has blocked post author
            if (user?.blocked?.includes(post.user._id)) return null;
            //check is post author has blocked user
            const isBlocked = post.user?.blocked?.includes(req.userAuth);
            //check if user follows post author
            if (user?.following?.includes(post.user._id)) return isBlocked ? null : post;
            
            return null;
        });

        res.json({
            status: "success",
            data: filteredPosts
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() !== req.userAuth.toString()) {
            return next(appError('You are not authorized to delete this post', 403));
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: 'Post has been deleted'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const toggleLike = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.includes(req.userAuth)) {
            post.likes = post.likes.filter(id => id.toString() !== req.userAuth.toString());
        } else {
            post.likes.push(req.userAuth);

            if (post.dislikes.includes(req.userAuth)) {
                post.dislikes = post.dislikes.filter(id => id.toString() !== req.userAuth.toString());
            } 
        }

        await post.save();

        res.json({
            status: "success",
            data: 'Toggled like'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const toggleDislike = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.dislikes.includes(req.userAuth)) {
            post.dislikes = post.dislikes.filter(id => id.toString() !== req.userAuth.toString());
        } else {
            post.dislikes.push(req.userAuth);

            if (post.likes.includes(req.userAuth)) {
                post.likes = post.likes.filter(id => id.toString() !== req.userAuth.toString());
            } 
        }

        await post.save();

        res.json({
            status: "success",
            data: 'Toggled dislike'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const updatePost = async (req, res, next) => {
    const { title, description, category } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (post.user.toString() !== req.userAuth.toString()) {
            return next(appError('You are not authorized to update this post', 403));
        }

        await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            category,
            photo: req?.file?.path ? req?.file?.path : post.photo
        });

        res.json({
            status: "success",
            data: 'update post route'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    getFollowedPosts,
    deletePost,
    updatePost,
    toggleLike,
    toggleDislike
}