const registerUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'User registered'
        })
        return res;
    } catch (error) {
        res.json(error.message)
    }
};

const loginUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'User logged in'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'profile route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getAllUsers = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'users route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const deleteUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete user route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const updateUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update user route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser
};