const express = require('express')

const categoriesRouter = express.Router();

//POST/api/v1/categories
categoriesRouter.post('/', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'category created'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/categories/:id
categoriesRouter.get('/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'get category by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//DELETE/api/v1/categories/:id
categoriesRouter.delete('/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete category route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//PUT/api/v1/categories/:id
categoriesRouter.put('/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update category route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

module.exports = categoriesRouter;