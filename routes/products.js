const express = require('express');
const Product = require('../models/Product'); // Adjust the path based on your project structure
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a Product
router.post('/', async (req, res) => {
    const { name, description, price } = req.body; // Get product details from request body

    try {
        const newProduct = new Product({ name, description, price: parseFloat(price) }); // Create product without image
        await newProduct.save(); // Save it to the database
        res.status(201).json(newProduct); // Respond with the created product
    } catch (err) {
        console.error('Error saving product:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

// Optional: Update a Product
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get product ID from the request parameters
    const { name, description, price } = req.body; // Get updated details from request body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct); // Respond with the updated product
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Optional: Delete a Product
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get product ID from the request parameters
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' }); // Respond with success message
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; // Export the router
