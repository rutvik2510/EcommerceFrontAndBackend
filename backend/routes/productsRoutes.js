const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductByCategoryName,
    getProductById
} = require('../controllers/productController');
const authorise = require("../middleware/auth");





// Route to create a product - requires authorization
router.post('/addProducts', authorise, createProduct);

// Route to update a product - should be a PUT request, and it requires authorization
router.put('/updateProduct/:id', authorise, updateProduct);

// Route to get product by ID - should be a GET request
router.get('/getProductById/:id', getProductById);

// Route to delete a product - should be a DELETE request, and it requires authorization
router.delete('/deleteProduct/:id', authorise, deleteProduct);

// Route to get all products - no authorization required
router.get('/getAllProduct', getAllProduct);

// Route to get products by category name - no authorization required
router.get('/getProductByCategoryName/:categoryname', getProductByCategoryName);

module.exports = router;