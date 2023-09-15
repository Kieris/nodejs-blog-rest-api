const express = require('express')
const { createCategory, getCategory, deleteCategory, updateCategory } = require('../../controllers/categories/categoriesController');
const categoriesRouter = express.Router();

//POST/api/v1/categories
categoriesRouter.post('/', createCategory);

//GET/api/v1/categories/:id
categoriesRouter.get('/:id', getCategory);

//DELETE/api/v1/categories/:id
categoriesRouter.delete('/:id', deleteCategory);

//PUT/api/v1/categories/:id
categoriesRouter.put('/:id', updateCategory);

module.exports = categoriesRouter;