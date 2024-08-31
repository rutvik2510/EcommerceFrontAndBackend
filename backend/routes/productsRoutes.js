const express = require('express');
const router = express.Router();
//const { protect, admin } = require('../middleware/auth');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductByCategoryName
} = require('../controllers/productController');


router.post('/products', createProduct);


router.put('/products/:id', updateProduct);


router.delete('/products/:id', deleteProduct);


router.get('/products', getAllProduct);


router.get('/products/category/:categoryname', getProductByCategoryName);

module.exports = router;