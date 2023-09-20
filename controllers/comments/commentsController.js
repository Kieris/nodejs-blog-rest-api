const createComment = async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: 'Comment created'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getComment = async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: 'get comments by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const deleteComment = async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: 'delete comment route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const updateComment = async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: 'update comment route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

module.exports = {
    createComment,
    getComment,
    deleteComment,
    updateComment
}