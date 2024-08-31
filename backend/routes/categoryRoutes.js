const express = require('express');
const router = express.Router();

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');


router.post('/category', createCategory);


router.put('/category/:id', updateCategory);


router.delete('/category/:id', deleteCategory);


router.get('/category', getAllCategories);


router.get('/category/:id', getCategoryById);

module.exports = router;