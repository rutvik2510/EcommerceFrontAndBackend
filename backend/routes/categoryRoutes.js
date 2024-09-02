const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');


router.post('/category', authMiddleware, createCategory);


router.put('/category/:id', updateCategory);


router.delete('/category/:id', deleteCategory);


router.get('/getAllcategory', getAllCategories);


router.get('/category/:id', getCategoryById);

module.exports = router;