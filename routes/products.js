const express = require('express');
const Product = require('../models/Product'); 
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');


router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a Product
router.post('/', async (req, res) => {
    const { name, description, price } = req.body; 

    try {
        const newProduct = new Product({ name, description, price: parseFloat(price) });
        await newProduct.save(); 
        res.status(201).json(newProduct); 
    } catch (err) {
        console.error('Error saving product:', err); 
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const { name, description, price } = req.body; 
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct); 
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); 
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' }); 
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 
