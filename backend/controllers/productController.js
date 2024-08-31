const Product = require('../models/products');
const Category = require('../models/categoryModel');

async function createProduct(req, res) {
    const { name, category, price, quantity } = req.body;
    try {
        const product = new Product({ name, category, price, quantity });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

async function getAllProduct(req, res) {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

async function getProductByCategoryName(req, res) {
    try {
        const category = await Category.findOne({ name: req.params.categoryName });
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        const products = await Product.find({ category: category._id });
        if (products.length === 0) {
            return res.status(404).send({ message: 'No products found for this category' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
async function updateProduct(req, res) {
    const { id, name, category, price, quantity } = req.body;

    try {

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }


        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;


        await product.save();

        res.status(200).send({
            message: `Product with name ${product.name} updated successfully`,
            product,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    getProductByCategoryName,
    updateProduct
};






// exports.updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!product) {
//             return res.status(404).send({ message: 'Product not found' });
//         }
//         res.status(200).send({ message: `Product with name ${product.name} updated successfully`, product });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };