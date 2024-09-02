const Category = require('../models/categoryModel');

// Create a new category
async function createCategory(req, res) {
    console.log(req.body);
    try {
        const { name } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({
            name,
            createdBy: req.user.id // Ensure that req.user is populated by authentication middleware
        });
        console.log('User ID:', req.user.id);


        const savedCategory = await category.save();
        res.status(201).send(savedCategory);
    } catch (error) {
        console.error('Error creating category:', error.message, error.stack);
        res.status(500).send({ message: 'Error creating category', error: error.message });
    }

    // try {
    //     const user = new User(req.body);
    //     await user.save();
    //     res.status(201).send({ msg: "Successfully registered" });
    // } catch (error) {
    //     res.status(400).send(error);
    // }
};

// Get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).send({ categories });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

// Get a category by ID
async function getCategoryById(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update a category by ID
async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body; // Use 'name' if it's the correct field in your schema

        let category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        category.name = name || category.name;
        category = await category.save();
        res.json(category);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

// Delete a category by ID
async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        let category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        await category.remove();
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};