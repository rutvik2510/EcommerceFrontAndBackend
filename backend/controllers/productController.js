const Product = require('../modules/products');
const express = require('express');


// Route to handle adding a product
async function createProduct(req, res) {
    try {
        // Extract fields from the request body
        const { name, image, category, price, available, quantity, createdBy } = req.body;

        // Check if required fields are provided
        if (!createdBy) {
            return res.status(400).json({ message: 'CreatedBy field is required.' });
        }

        // Create new product
        const newProduct = new Product({
            name,
            image,
            category,
            price,
            available,
            quantity,
            createdBy: req.user.id, // Include createdBy field
        });

        console.log(newProduct);

        // Save product to the database
        await newProduct.save();

        // Send success response
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error adding product.', error });
    }
};

async function getAllProduct(req, res) {
    try {
        const products = await Product.find();
        // Modify each product object to include necessary fields
        const modifiedProducts = products.map(product => ({
            id: product._id,
            name: product.name,
            productImage: product.image ? `http://localhost:5000/uploads/${product.image}` : null,
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