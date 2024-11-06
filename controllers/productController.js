const Product = require('../models/Product'); 


exports.addProduct = async (req, res) => {
    const { name, description, price } = req.body; 

   
    if (!name || !description || isNaN(price)) {
        return res.status(400).json({ message: 'All fields are required and price must be a number' });
    }

    try {
        
        const newProduct = new Product({
            name,
            description,
            price: parseFloat(price), 
        });
        await newProduct.save();
        res.status(201).json(newProduct); 
    } catch (err) {
        console.error('Error saving product:', err); 
        res.status(500).json({ message: 'Server error', error: err.message }); 
    }
};



exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
