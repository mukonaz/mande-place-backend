// Import necessary modules
const Product = require('../models/Product'); // Ensure the path is correct for your Product model

// Add product
exports.addProduct = async (req, res) => {
    const { name, description, price } = req.body; // Get product details from request body

    // Validate required fields
    if (!name || !description || isNaN(price)) {
        return res.status(400).json({ message: 'All fields are required and price must be a number' });
    }

    try {
        // Create a new product instance without image
        const newProduct = new Product({
            name,
            description,
            price: parseFloat(price), // Ensure price is a number
        });
        await newProduct.save(); // Save it to the database
        res.status(201).json(newProduct); // Respond with the created product
    } catch (err) {
        console.error('Error saving product:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: err.message }); // Respond with error message
    }
};


// Fetch all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
