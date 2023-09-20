const User = require("../../model/User/User");
const Post = require("../../model/Post/Post");

const createPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const author = await User.findById(req.userAuth);

        const postCreated = await Post.create({
            title,
            description,
            user: author._id
        });

        author.posts.push(postCreated);
        await author.save();

        res.json({
            status: "success",
            data: postCreated
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getPost = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: 'get post by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getAllPosts = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: 'get all posts route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const deletePost = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: 'delete post route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const updatePost = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: 'update post route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    deletePost,
    updatePost
}