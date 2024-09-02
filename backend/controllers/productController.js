const Product = require('../models/products');


async function createProduct(req, res) {
    try {
        const { name, category, price, availability, quantity } = req.body;
        const image = req.file ? req.file.filename : null;

        // Check if the product already exists (optional)
        let product = await Product.findOne({ name });
        if (product) {
            return res.status(400).json({ msg: 'Product already exists' });
        }

        // Create a new product instance
        product = new Product({
            name,
            image,
            category,
            price,
            availability,
            quantity,
            createdBy: req.user.id,
        });

        // Save the product to the database
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


async function getAllProduct(req, res) {
    try {
        const products = await Product.find();
        // Modify each person object to include fullName, profileImage, and other necessary fields
        const modifiedProducts = people.map(product => ({
            id: product._id,
            name: product.name,
            productImage: product.image ? `http://localhost:5002/uploads/${product.image}` : null,
            category: product.category,
            price: product.price,
            availability: product.available ? 'InStock' : 'OutOfStock',
            quantity: product.quantity,
        }));

        // Send the modified response
        res.status(200).send(modifiedProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

async function deleteProduct(req, res) {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

async function getProductByCategoryName(req, res) {
    try {
        const products = await Product.find({ category: req.params.categoryId }).populate('category');
        if (!products) {
            return res.status(404).json({ msg: 'No products found for this category' });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
async function updateProduct(req, res) {
    try {
        const { name, category, price, availability, quantity } = req.body;

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;
        product.availability = availability !== undefined ? availability : product.availability;
        product.quantity = quantity || product.quantity;

        await product.save();
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    getProductByCategoryName,
    updateProduct,
    getProductById
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