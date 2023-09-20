const { appError } = require('../../utils/appError');
const Category = require('../../model/Category/Category');

const createCategory = async (req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.create({
            title,
            user: req.userAuth
        });

        res.json({
            status: 'success',
            data: 'category created'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getCategory = async (req, res, next) => {
    const id = req.params.id;
    
    const category = await Category.findById(id);

    try {
        res.json({
            status: 'success',
            data: category
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const getAllCategories = async (req, res, next) => {
    const categories = await Category.find();
    try {
        res.json({
            status: 'success',
            data: categories
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        await Category.findByIdAndDelete(id);

        res.json({
            status: 'success',
            data: 'Category has been deleted'
        })
    } catch (error) {
        next(appError(error.message));
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndUpdate(id, {
            title: req.body.title
        }, {
            new: true,
            runValidators: true
        });

        res.json({
            status: 'success',
            data: category
        })
    } catch (error) {
        next(appError(error.message));
    }
};

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    getAllCategories
}