const createCategory = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'category created'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const getCategory = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'category obtained'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const deleteCategory = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete category route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

const updateCategory = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update category route'
        })
    } catch (error) {
        res.json(error.message)
    }
};

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
}