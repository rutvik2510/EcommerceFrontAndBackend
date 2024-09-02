const express = require('express');
const router = express.Router();
//const { protect, admin } = require('../middleware/auth');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductByCategoryName,
    getProductById
} = require('../controllers/productController');


router.post('/products', createProduct);


router.put('/products/:id', updateProduct);
router.put('/products/:id', getProductById);

router.delete('/products/:id', deleteProduct);


router.get('/products', getAllProduct);


router.get('/products/category/:categoryname', getProductByCategoryName);

module.exports = router;