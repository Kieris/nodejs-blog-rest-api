const express = require('express')
const { createCategory, getCategory, deleteCategory, updateCategory, getAllCategories } = require('../../controllers/categories/categoriesController');
const categoriesRouter = express.Router();
const isLoggedIn = require('../../middleware/isLoggedIn');

//POST/api/v1/categories
categoriesRouter.post('/', isLoggedIn, createCategory);

//GET/api/v1/categories
categoriesRouter.get('/', getAllCategories);

//GET/api/v1/categories/:id
categoriesRouter.get('/:id', getCategory);

//DELETE/api/v1/categories/:id
categoriesRouter.delete('/:id', isLoggedIn, deleteCategory);

//PUT/api/v1/categories/:id
categoriesRouter.put('/:id', isLoggedIn, updateCategory);

module.exports = categoriesRouter;